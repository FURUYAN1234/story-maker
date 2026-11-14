import { getNanoScenarioIssue } from './nanoScenarioContract.js';
import { stripGeneratedFooter } from './footerHelpers.js';

export const NANO_CHARACTER_MARKER = '[SMK_NANO_CHARACTER_HANDOFF]';
export const hasImportedCharacterSheet = (characters = []) => characters.some(character => character.characterSheetImported === true);

export function buildNanoCharacterPrompt(source, characters = [], issue = '') {
  return [
    NANO_CHARACTER_MARKER,
    '完成した漫画台本を、参照画像なしで描くための人物設定に変換してください。台本の改稿・続編・講評はしません。',
    '漫画アプリのSTEP1「人物設定」へ貼るテキストだけを返します。人物ごとに「## 1. 名前」「## 2. 名前」の見出しを付け、名前は台本の表記に一致させます。人物以外の見出し、前置き、コードフェンス、画像番号、架空の添付画像やM1等の参照IDは出力しません。',
    '全ての主要な登場人物を含め、無言の人物も省きません。同一人物の年齢違い・回想は同一人物の項目内で説明し、別人を追加しません。',
    '各人物に「基本:」「外見:」「服装:」「性格・口調:」「関係・演技:」を記述します。外見は年齢感、髪の色・長さ・形、顔、眼鏡・髭、体格を具体化し、画像がなくても人物を描き分けられるようにします。',
    '入力と台本に明示された容姿・衣装・関係を最優先し、矛盾させません。指定がない創作上の外見だけを補完し、実在人物の未確認情報を事実として足しません。台本中の動作・台詞・物語は変更しません。',
    issue ? `前回の不適合: ${issue}。人物設定だけを修正して返してください。` : '',
    '--- 入力された人物設定（資料） ---', JSON.stringify(characters),
    '--- 完成した台本（資料） ---', stripGeneratedFooter(source),
  ].filter(Boolean).join('\n');
}

export function validateNanoCharacterText(text, source, characters = []) {
  const clean = String(text || '').replace(/\r\n?/g,'\n').trim();
  const headers = [...clean.matchAll(/^##\s+(\d+)[.．]\s*([^\n]+)$/gm)];
  const names = headers.map(h => h[2].trim());
  const fail = issue => ({ok:false,names,issue});
  if (!headers.length || headers[0].index !== 0 || headers.some((h,i)=>Number(h[1])!==i+1)) return fail('人物名の見出しを「## 1. 名前」から順に書いてください');
  if ([...clean.matchAll(/^##(?!#)\s[^\n]*$/gm)].length !== headers.length) return fail('全ての人物見出しに番号を付け、人物以外の見出しは出力しないでください');
  if (new Set(names).size !== names.length) return fail('同じ人物の重複見出しがあります');
  for (let i=0;i<headers.length;i++) {
    if (!String(source).includes(names[i])) return fail(`${names[i]}は台本に登場しない名前です`);
    const block = clean.slice(headers[i].index,headers[i+1]?.index ?? clean.length);
    for (const field of ['基本','外見','服装','性格・口調','関係・演技']) {
      if (!new RegExp('^'+field+'[:：][^\\S\\n]*\\S[^\\n]*$', 'm').test(block)) return fail(`${names[i]}の${field}が不足しています`);
    }
  }
  const speakers = [...String(source).matchAll(/^BalloonLayout:\s*(.+)$/gm)].flatMap(match => {
    try {return JSON.parse(match[1]).map(item=>item.speaker);} catch {return [];}
  });
  for (const speaker of new Set(speakers)) if (!names.includes(speaker)) return fail(`台本の話者${speaker}の人物設定がありません`);
  for (const character of characters) if (character.name && String(source).includes(character.name) && !names.includes(character.name)) return fail(`入力された登場人物${character.name}の設定がありません。無言の人物も保持してください`);
  if (/^Topic:|^Scenario:|^\[\d+コマ目\]/m.test(clean)) return fail('台本を人物設定へ混ぜないでください');
  return {ok:true,names,issue:''};
}

export function buildNanoFullCopy(characterText, source) {
  const scenario = stripGeneratedFooter(source).trim();
  return characterText ? `【STEP1用：人物設定・ここから】\n${characterText.trim()}\n【STEP1用：ここまで】\n\n【ここから下は台本用：STEP2へ貼付 → STEP3】\n${scenario}` : scenario;
}

export function createNanoCharacterHandoff({getInput,callAi,onState}) {
  let token=0, active=null, attempted='', cached=null;
  const cancel=()=>{token++;active?.abort();active=null;};
  const sync=async({retry=false}={})=>{
    const input=getInput();
    const source=stripGeneratedFooter(input.source || '').trim();
    if(input.mode!=='4koma_scenario') {cancel();attempted='';onState({phase:'hidden',text:''});return;}
    if(hasImportedCharacterSheet(input.characters)) {cancel();attempted='';onState({phase:'sheet-imported',text:''});return;}
    if(input.busy || !input.settled || getNanoScenarioIssue(source)) {
      cancel();attempted='';onState({phase:'waiting',text:''});return;
    }
    const key=JSON.stringify([source,input.characters || []]);
    if(cached?.key===key && !retry) {cancel();attempted=key;onState({phase:'ready',text:cached.text});return;}
    if(attempted===key && !retry)return;
    cancel();const mine=token;active=new AbortController();attempted=key;
    onState({phase:'running',text:''});
    try {
      let issue='';
      for(let attempt=0;attempt<2;attempt++) {
        const response=await callAi(buildNanoCharacterPrompt(source,input.characters,issue),{stage:'character_setup',mode:'4koma_scenario',charLength:source.length,signal:active.signal});
        if(token!==mine)return;
        const text=String(response?.text || response || '').trim();
        const validation=validateNanoCharacterText(text,source,input.characters);
        if(validation.ok) {cached={key,text};onState({phase:'ready',text});return;}
        issue=validation.issue;
      }
      throw new Error(issue);
    } catch(error) {
      if(token===mine)onState({phase:'failed',text:'',error:error?.message || String(error)});
    } finally {if(token===mine)active=null;}
  };
  return {sync,dispose:cancel};
}

export function installNanoCharacterHandoff({doc=globalThis.document,timers=globalThis,callAi,clipboard=globalThis.navigator?.clipboard}={}) {
  const byId=id=>doc.getElementById(id);
  const output=byId('output'), box=byId('nano-character-handoff');
  if(!output || !box)return ()=>{};
  let state={phase:'waiting',text:''}, scheduled;
  const copyTimers=new Map();
  const currentMode=()=>doc.querySelector('#mode-chips .chip.active')?.dataset.v;
  const getInput=()=>{
    const data=doc.documentElement.dataset;
    return {source:output.textContent,mode:currentMode(),
      busy:Boolean(byId('btn-generate')?.disabled || byId('settings')?.classList.contains('generating') || data.editorialBrushupResult==='running'),
      settled:output.dataset.manualOutput==='true' || data.editorialBrushupResult==='completed'
        || (data.editorialReviewResult==='completed' && (!byId('longify-auto-brushup-until-pass')?.checked || Number(data.editorialReviewScore)>=100)),
      characters:[...doc.querySelectorAll('#char-list .char-card')].map(card=>({
        name:card.querySelector('.char-name-input')?.value || '',
        note:card.querySelector('.char-memo')?.value || '',
        characterSheetImported:card.dataset.characterSheetImported==='true',
        attributes:[...card.querySelectorAll('.char-sel')].map(el=>el.value).filter(Boolean).join('、'),
      })),
    };
  };
  const render=next=>{
    state=next;
    const manga=currentMode()==='4koma_scenario';
    const imported=hasImportedCharacterSheet(getInput().characters);
    byId('nano-handoff-options').classList.toggle('hidden',!manga);
    byId('nano-handoff-status').textContent=imported
      ? 'キャラクターシートから人物を登録済みのため、シナリオだけを出力します。漫画のSTEP1にも同じシートを読み込み、登場人物全員分の資料を用意してください。両アプリの画像が同じかは自動照合しません。'
      : 'キャラクターシートを取り込んでいないため、台本の完成後にSTEP1用の人物設定をAPIで追加生成します。全文・シナリオ・人物設定をそれぞれコピーできます。';
    box.classList.toggle('hidden',!manga || imported);
    byId('nano-scenario-boundary').classList.toggle('hidden',!manga);
    byId('nano-character-text').textContent=next.text;
    byId('nano-character-status').textContent={waiting:'台本の完成後に人物設定を追加生成します。',running:'APIでSTEP1用の人物設定を生成中…',ready:'ここまでがSTEP1用です。人物設定だけをコピーして貼り付けてください。',failed:`人物設定を作成できませんでした：${next.error || ''}`}[next.phase] || '';
    byId('nano-copy-characters').disabled=next.phase!=='ready';
    byId('nano-retry-characters').classList.toggle('hidden',next.phase!=='failed');
    byId('nano-copy-scenario').disabled=Boolean(getNanoScenarioIssue(output.textContent));
    byId('btn-copy').disabled=manga && !imported && next.phase!=='ready';
    box.dataset.phase=next.phase;
  };
  const controller=createNanoCharacterHandoff({getInput,callAi,onState:render});
  const schedule=()=>{timers.clearTimeout(scheduled);scheduled=timers.setTimeout(()=>controller.sync(),100);};
  const copy=async(button,text)=>{
    button.dataset.copyLabel ||= button.textContent;
    timers.clearTimeout(copyTimers.get(button));
    try {await clipboard.writeText(text);button.textContent='コピーしました';}
    catch {button.textContent='コピーできませんでした';}
    copyTimers.set(button,timers.setTimeout(()=>{button.textContent=button.dataset.copyLabel;copyTimers.delete(button);},1600));
  };
  const copyCharacters=()=>copy(byId('nano-copy-characters'),state.text);
  const copyScenario=()=>copy(byId('nano-copy-scenario'),stripGeneratedFooter(output.textContent).trim());
  const copyAll=event=>{
    if(currentMode()!=='4koma_scenario')return;
    event.preventDefault();event.stopImmediatePropagation();
    copy(byId('btn-copy'),buildNanoFullCopy(hasImportedCharacterSheet(getInput().characters)?'':state.text,output.textContent));
  };
  const retry=()=>controller.sync({retry:true});
  byId('nano-copy-characters').addEventListener('click',copyCharacters);
  byId('nano-copy-scenario').addEventListener('click',copyScenario);
  byId('nano-retry-characters').addEventListener('click',retry);
  byId('btn-copy').addEventListener('click',copyAll,{capture:true});
  byId('char-list')?.addEventListener('input',schedule);
  const Observer=doc.defaultView?.MutationObserver || globalThis.MutationObserver;
  const observer=new Observer(schedule);
  observer.observe(output,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['class','data-manual-output']});
  observer.observe(byId('mode-chips'),{attributes:true,subtree:true,attributeFilter:['class']});
  if(byId('char-list'))observer.observe(byId('char-list'),{childList:true,subtree:true,attributes:true,attributeFilter:['data-character-sheet-imported']});
  observer.observe(byId('btn-generate'),{attributes:true,attributeFilter:['disabled']});
  observer.observe(doc.documentElement,{attributes:true,attributeFilter:['data-editorial-review-result','data-editorial-brushup-result','data-editorial-review-score']});
  schedule();
  return ()=>{controller.dispose();observer.disconnect();timers.clearTimeout(scheduled);for(const timer of copyTimers.values())timers.clearTimeout(timer);byId('nano-copy-characters').removeEventListener('click',copyCharacters);byId('nano-copy-scenario').removeEventListener('click',copyScenario);byId('nano-retry-characters').removeEventListener('click',retry);byId('btn-copy').removeEventListener('click',copyAll,{capture:true});byId('char-list')?.removeEventListener('input',schedule);};
}
