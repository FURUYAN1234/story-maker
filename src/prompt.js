// ============================================================
// prompt.js - Story Maker v4.9.8
// Clean compatibility prompt helpers for modular source files.
// The production app currently uses src/main.js directly.
// ============================================================

import {
  THEME_RANDOM_BASE,
  THEME_MODIFIERS,
  THEME_ADJUNCTS,
  MODES,
} from './data.js';
import {
  GENRE_STYLE_GUIDES,
  ENDING_STYLE_GUIDES,
  WORLDVIEW_STYLE_GUIDES,
  TARGET_STYLE_GUIDES,
  NARR_STYLE_GUIDES,
  lookupGuide,
} from './styleGuides.js';
import { retrieveKnowledge } from './knowledge.js';

const rnd = arr => arr[Math.floor(Math.random() * arr.length)];
const MODE_LABELS = Object.fromEntries(MODES.map(mode => [mode.value, mode.label]));

function valueOf(...values) {
  return values.map(v => String(v || '').trim()).find(Boolean) || '';
}

function listCharacters(characters = []) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return '- 未設定。AIが物語に必要な人物を自然に設定する。';
  }
  return characters.map((char, index) => {
    const name = valueOf(char.name, `人物${index + 1}`);
    const sex = valueOf(char.sex, '未指定');
    const role = valueOf(char.role, '役割未指定');
    const personality = valueOf(char.personality, '性格未指定');
    const note = valueOf(char.note);
    return `- ${name}: 性別=${sex} / 役割=${role} / 性格=${personality}${note ? ` / メモ=${note}` : ''}`;
  }).join('\n');
}

function collectStyleGuides(settings) {
  return [
    lookupGuide(settings.genre, GENRE_STYLE_GUIDES),
    lookupGuide(settings.ending, ENDING_STYLE_GUIDES),
    lookupGuide(settings.worldview, WORLDVIEW_STYLE_GUIDES),
    lookupGuide(settings.target, TARGET_STYLE_GUIDES),
    lookupGuide(settings.narration, NARR_STYLE_GUIDES),
  ].filter(Boolean).join('\n\n');
}

function outputContract(mode) {
  const contracts = {
    '4koma': 'タイトル、1コマ目、2コマ目、3コマ目、4コマ目を必ず置き、各コマに絵/状況、セリフ、狙いを書く。',
    '4koma_scenario': 'Topic、Logline、Location、Outfit、Punchline、Scenario、[1コマ目]〜[4コマ目]を置く。本文説明は日本語で書く。',
    short_short: '400〜750字、4段落以内。短い場面で完結させ、800字を超えない。',
    novel: '900〜1500字、5段落以内。短編小説として閉じ、2000字を超えない。',
    medium: 'タイトル、第1節、第2節、第3節をこの順で置く。3節だけで構成し、各節2段落以内にする。',
    scenario: 'タイトル、登場人物、場面、ト書き、人物名: セリフを守る。散文小説だけにしない。',
    manga: 'タイトル、ページ、各コマ、絵、セリフ、演出を明示する。小説本文だけにしない。',
    essay: '主張、体験または観察、考察、結論で構成する。事件解決型の小説にしない。',
    poem: 'タイトルと詩行だけで構成する。解説や散文段落を付けない。',
    fairy: '童話/絵本のやさしい語り口で閉じる。サスペンス小説にしない。',
    letter: '日本語の手紙だけを書く。必ず「宛先:」「本文:」「結び:」「差出人:」をこの順で置く。必要なら「追伸:」を最後に置く。タイトル、ログライン、内部メモ、英語説明、書き方説明を本文に出さない。',
    diary: '日付、天気、本文を必ず置き、一人称の日記として書く。',
    documentary: 'ナレーション、記録映像、証言/インタビュー、締めを必ず置く。',
    radio: 'タイトル、登場人物、BGM、SEを必ず置き、人物名: セリフで音だけのドラマとして書く。',
  };
  return contracts[String(mode || '4koma')] || contracts['4koma'];
}

export function buildPrompt(appState = {}) {
  const settings = {
    mode: valueOf(appState.mode, '4koma'),
    modeLabel: valueOf(appState.modeCustom, MODE_LABELS[appState.mode], '4コマ漫画風'),
    theme: valueOf(appState.themeCustom, appState.themeSelected, appState.theme, '日常の小さな事件'),
    genre: valueOf(appState.genreCustom, appState.genre, 'コメディ'),
    worldview: valueOf(appState.worldviewCustom, appState.worldview, '現代日本'),
    era: valueOf(appState.eraCustom, appState.era, '現代'),
    target: valueOf(appState.targetCustom, appState.target, '全年齢'),
    ending: valueOf(appState.endingCustom, appState.ending, 'ハッピーエンド'),
    narration: valueOf(appState.narrCustom, appState.narration, '三人称'),
    supplement: valueOf(appState.supplement),
  };

  if (settings.mode === 'long' || /長編|long[-_\s]*novel/i.test(settings.modeLabel)) {
    return '長編モードは現在機能停止中です。公開版では短編・中編などの公開モードを選択してください。';
  }

  const guide = collectStyleGuides(settings);
  const knowledge = retrieveKnowledge ? retrieveKnowledge(`${settings.theme} ${settings.genre} ${settings.worldview}`) : '';

  return [
    'あなたは商業向けの日本語ストーリーライターです。',
    '出力本文は必ず日本語で書いてください。英語のメタ説明、内部指示、プロンプト断片、JSON、自己採点、書式説明は本文に出力しないでください。',
    '',
    `出力モード: ${settings.modeLabel}`,
    `出力契約: ${outputContract(settings.mode)}`,
    `テーマ: ${settings.theme}`,
    `ジャンル: ${settings.genre}`,
    `世界観: ${settings.worldview}`,
    `時代: ${settings.era}`,
    `読者層: ${settings.target}`,
    `結末: ${settings.ending}`,
    `語り口: ${settings.narration}`,
    '',
    '登場人物:',
    listCharacters(appState.characters),
    settings.supplement ? `\n補足:\n${settings.supplement}` : '',
    guide ? `\n文体ガイド:\n${guide}` : '',
    knowledge ? `\n参考ナレッジ:\n${knowledge}` : '',
    '',
    '読みやすい段落に分け、選択した出力モードの形式を崩さず完成稿だけを出力してください。',
  ].filter(Boolean).join('\n');
}

export function generateRandomTheme() {
  let theme = rnd(THEME_RANDOM_BASE);
  if (Math.random() < 0.55) theme += rnd(THEME_MODIFIERS);
  if (Math.random() < 0.35) theme += rnd(THEME_ADJUNCTS);
  return theme;
}

export function buildLongNovelInitPrompt() {
  return '長編モードは現在機能停止中です。公開版では起動しません。';
}

export function buildLongNovelContinuePrompt() {
  return '長編モードは現在機能停止中です。次章生成は開始しません。';
}

export function buildLongNovelInstructionSheet() {
  return '長編モードは現在機能停止中です。公開用の指示書は生成しません。';
}
