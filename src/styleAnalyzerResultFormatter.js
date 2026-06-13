function pushLine(lines, icon, label, value) {
  if (value) lines.push(`${icon} ${label}: ${value}`);
}

function pushDetail(lines, label, value) {
  if (value) lines.push(`  ・${label}: ${value}`);
}

function pushSection(lines, icon, label) {
  lines.push('');
  lines.push(`${icon} ${label}:`);
}

function formatStyleAnalysisResult(analysis) {
  const lines = [];
  const style = analysis;

  pushLine(lines, '🏷️', '作風名', style.style_name);
  pushLine(lines, '🎭', 'トーン', style.tone);

  if (typeof style.narrative_voice === 'object' && style.narrative_voice) {
    pushSection(lines, '🎙️', '語りの視点');
    pushDetail(lines, '人称', style.narrative_voice.person);
    pushDetail(lines, '距離感', style.narrative_voice.distance);
    pushDetail(lines, '信頼度', style.narrative_voice.reliability);
    pushDetail(lines, '介入度', style.narrative_voice.intrusion);
  } else {
    pushLine(lines, '🎙️', '語りの視点', style.narrative_voice);
  }

  pushSection(lines, '📝', '文体');
  if (style.sentence_style) {
    pushDetail(lines, '平均文長', style.sentence_style.avg_length || style.sentence_style.length);
    pushDetail(lines, '文長変動', style.sentence_style.length_variation);
    pushDetail(lines, '文末パターン', style.sentence_style.ending_patterns || style.sentence_style.ending);
    pushDetail(lines, 'リズム', style.sentence_style.rhythm);
    pushDetail(lines, '段落長', style.sentence_style.paragraph_length);
    pushDetail(lines, '段落構成', style.sentence_style.paragraph_structure);
  }

  pushSection(lines, '📖', '語彙');
  if (style.vocabulary) {
    pushDetail(lines, 'レベル', style.vocabulary.level);
    pushDetail(lines, '情報密度', style.vocabulary.density);
    pushDetail(lines, 'レジスター', style.vocabulary.register);
    pushDetail(lines, '特徴', style.vocabulary.quirks);
    pushDetail(lines, '外来語', style.vocabulary.foreign_words);
    pushDetail(lines, '古語/現代語', style.vocabulary.archaic_modern);
  }

  if (style.rhetoric) {
    pushSection(lines, '🔮', '修辞技法');
    pushDetail(lines, '比喩スタイル', style.rhetoric.metaphor_style);
    pushDetail(lines, '比喩素材', style.rhetoric.metaphor_source);
    pushDetail(lines, '反復技法', style.rhetoric.repetition);
    pushDetail(lines, 'アイロニー', style.rhetoric.irony_level);
    pushDetail(lines, 'ユーモア', style.rhetoric.humor_type);
    pushDetail(lines, 'その他', style.rhetoric.other_techniques);
  }

  pushSection(lines, '🖼️', '描写フォーカス');
  if (style.description_focus) {
    pushDetail(lines, '視覚', style.description_focus.visual);
    pushDetail(lines, '聴覚', style.description_focus.auditory);
    pushDetail(lines, '触覚', style.description_focus.tactile);
    pushDetail(lines, '嗅覚/味覚', style.description_focus.olfactory_gustatory);
    pushDetail(lines, '運動感覚', style.description_focus.kinesthetic);
    pushDetail(lines, '空間把握', style.description_focus.spatial);
    pushDetail(lines, '心理描写', style.description_focus.psychological_depth || style.description_focus.psychological);
    pushDetail(lines, 'Show:Tell', style.description_focus.show_tell_ratio);
  }

  if (style.dialogue) {
    pushSection(lines, '💬', 'セリフ');
    pushDetail(lines, '文体', style.dialogue.style);
    pushDetail(lines, '機能', style.dialogue.function);
    pushDetail(lines, 'タグ', style.dialogue.tag_style);
    pushDetail(lines, '方言', style.dialogue.dialect_sociolect);
    pushDetail(lines, 'サブテキスト', style.dialogue.subtext);
  } else {
    pushLine(lines, '💬', 'セリフ回し', style.dialogue_style);
  }

  if (style.structure) {
    pushSection(lines, '🏗️', '構造');
    pushDetail(lines, 'テンポ', style.structure.pacing);
    pushDetail(lines, '場面転換', style.structure.scene_transition);
    pushDetail(lines, '時制', style.structure.time_handling);
    pushDetail(lines, '緊張曲線', style.structure.tension_curve);
    pushDetail(lines, '冒頭パターン', style.structure.opening_style);
    pushDetail(lines, '結末パターン', style.structure.closing_style);
  } else {
    pushLine(lines, '⏱️', 'テンポ', style.pacing);
  }

  if (style.emotional_architecture) {
    pushSection(lines, '❤️', '感情設計');
    pushDetail(lines, '主要感情', style.emotional_architecture.dominant_emotions);
    pushDetail(lines, '振り幅', style.emotional_architecture.emotional_range);
    pushDetail(lines, 'カタルシス', style.emotional_architecture.catharsis_method);
    pushDetail(lines, '読者距離', style.emotional_architecture.reader_distance);
  }

  pushLine(lines, '🎯', 'テーマ傾向', style.themes_tendency);
  pushLine(lines, '📚', '文学的影響', style.literary_influences);
  lines.push('');

  if (style.unique_features?.length) {
    lines.push('✨ 固有の特徴:');
    style.unique_features.forEach((item) => lines.push(`  ・${item}`));
  }

  if (style.anti_patterns?.length) {
    lines.push('');
    lines.push('🚫 回避パターン:');
    style.anti_patterns.forEach((item) => lines.push(`  ・${item}`));
  }

  lines.push('');
  lines.push('━━━ 再現プロンプト ━━━');
  lines.push(style.reproduction_prompt || '（生成されませんでした）');

  return lines.join('\n');
}

export { formatStyleAnalysisResult };
