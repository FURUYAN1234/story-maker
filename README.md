# Story Maker 窶・AI迚ｩ隱槭Γ繝ｼ繧ｫ繝ｼ

> **"Stop generating predictable stories. Start generating stories that surprise you."**
> **縲御ｺ亥ｮ夊ｪｿ蜥後↑迚ｩ隱槭ｒ逕滓・縺吶ｋ縺ｮ繧偵ｄ繧√∬・蛻・′鬩壹￥繧医≧縺ｪ迚ｩ隱槭ｒ逕滓・縺帙ｈ縲ゅ・*

A web application that generates high-variety stories (4-panel manga plots or fiction) using the Gemini API. Designed to minimize repetitive, "cookie-cutter" AI outputs through a multi-axis entropy injection system.

Gemini API繧剃ｽｿ縺・√ヰ繝ｩ繧ｨ繝・ぅ雎翫°縺ｪ繧ｹ繝医・繝ｪ繝ｼ・・繧ｳ繝樊ｼｫ逕ｻ繝阪ち繝ｻ蟆剰ｪｬ・峨ｒ逕滓・縺吶ｋWeb繧｢繝励Μ縺ｧ縺吶ゅ御ｼｼ縺溘ｊ蟇・▲縺溘ｊ縺ｫ縺ｪ繧句撫鬘後阪ｒ繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ繝ｻ繝・・繝槭・繧ｸ繝｣繝ｳ繝ｫ繝ｻ譎ゆｻ｣繝ｻ繧ｪ繝√・蝙九・螟夊ｻｸ繝ｩ繝ｳ繝繝蛹悶↓繧医▲縺ｦ讒矩逧・↓隗｣豎ｺ縺吶ｋ縺薙→繧堤岼逧・→縺励※縺・∪縺吶・

> [!TIP]
> **Detailed Commentary Available / 隧ｳ邏ｰ縺ｪ隗｣隱ｬ險倅ｺ九ｒ蜈ｬ髢倶ｸｭ**
> For insights into the design philosophy and behavior differences between Google Gemini API models, please refer to the following note article. / 譛ｬ繝励Ο繧ｸ繧ｧ繧ｯ繝医・險ｭ險域晄Φ繧・；oogle Gemini API縺ｮ繝｢繝・Ν豈弱・謖吝虚縺ｮ驕輔＞縺ｫ縺､縺・※縺ｯ縲∽ｻ･荳九・note險倅ｺ九〒隧ｳ縺励￥隗｣隱ｬ縺励※縺・∪縺吶・
> [Story Maker 窶・AI迚ｩ隱槭Γ繝ｼ繧ｫ繝ｼ縲AI迚ｹ譛峨・莨ｼ縺溘ｊ蟇・▲縺溘ｊ縺ｮ繧ｹ繝医・繝ｪ繝ｼ縺ｫ縺ｪ繧峨↑縺・す繧ｹ繝・Β / A system designed to break away from repetitive, generic AI-generated plots. (note / Japanese content)](https://note.com/happy_duck780/n/nd3d972922868)

---

## 笨ｨ Features / 讖溯・

- **Multi-axis randomization** 窶・Genre, era, ending style, narrative perspective, and characters can each be randomized independently or all at once
- **Anti-repetition prompt engine** 窶・Explicitly instructs the AI to avoid predictable story structures
- **Multiple Output Modes** 窶・Supports 4-panel manga plots (Ki-sho-ten-ketsu + dialogue), flash fiction (~1,000 chars), short stories (~3,000 chars), novellas (~4,000 chars), and full-length novels (~100,000 chars via prompt generation).
- **Random theme seeding** 窶・Combines base event + modifier + adjunct for unpredictable story seeds
- **One-shot full random** 窶・Single button randomizes all axes and generates immediately

---

- **螟夊ｻｸ繝ｩ繝ｳ繝繝蛹・* 窶・繧ｸ繝｣繝ｳ繝ｫ繝ｻ譎ゆｻ｣繝ｻ繧ｪ繝√・蝙九・隱槭ｊ蜿｣繝ｻ繧ｭ繝｣繝ｩ繧貞推蛟九∪縺溘・荳諡ｬ縺ｧ繝ｩ繝ｳ繝繝險ｭ螳・
- **蜿榊ｾｩ髦ｲ豁｢繝励Ο繝ｳ繝励ヨ繧ｨ繝ｳ繧ｸ繝ｳ** 窶・莠亥ｮ夊ｪｿ蜥後↑螻暮幕繧呈ｧ矩逧・↓蝗樣∩縺吶ｋ繧医≧譏守､ｺ逧・↓謖・､ｺ
- **隍・焚縺ｮ蜃ｺ蜉帙Δ繝ｼ繝・* 窶・4繧ｳ繝樊ｼｫ逕ｻ繝阪ち・郁ｵｷ謇ｿ霆｢邨撰ｼ九そ繝ｪ繝墓｡茨ｼ峨∪縺溘・繧ｷ繝ｧ繝ｼ繝茨ｼ医・000蟄暦ｼ峨∫洒邱ｨ蟆剰ｪｬ・医・000蟄暦ｼ峨∽ｸｭ邱ｨ蟆剰ｪｬ・医・000蟄暦ｼ峨・聞邱ｨ蟆剰ｪｬ・医・0荳・ｭ・繝励Ο繝ｳ繝励ヨ逕滓・・峨↑縺ｩ
- **繝ｩ繝ｳ繝繝繝・・繝槭す繝ｼ繝・* 窶・蝓ｺ譛ｬ繧､繝吶Φ繝茨ｼ倶ｿｮ鬟ｾ隱橸ｼ狗憾豕∬ｪ槭ｒ遒ｺ邇・噪縺ｫ邨・∩蜷医ｏ縺・
- **蜈ｨ繝ｩ繝ｳ繝繝荳逋ｺ逕滓・** 窶・1繝懊ち繝ｳ縺ｧ蜈ｨ鬆・岼繧偵Λ繝ｳ繝繝險ｭ螳壹＠縺ｦ蜊ｳ逕滓・

---

## 噫 Quick Start / 繧ｯ繧､繝・け繧ｹ繧ｿ繝ｼ繝・

### Web Browser / 繝悶Λ繧ｦ繧ｶ縺ｧ菴ｿ縺・ｼ域耳螂ｨ・・

1. [Story Maker (GitHub Pages)](https://furuyan1234.github.io/story-maker/) 縺ｫ繧｢繧ｯ繧ｻ繧ｹ / Open the web app
2. 荳企Κ縺ｮAPI繧ｭ繝ｼ谺・↓Gemini縺ｮAPI繧ｭ繝ｼ繧貞・蜉帙＠縺ｦ縲御ｿ晏ｭ倥・/ Enter your Gemini API key at the top
3. 縲交沁ｲ 蜈ｨ縺ｦ繝ｩ繝ｳ繝繝縺ｧ逕滓・縲阪∪縺溘・縲後せ繝医・繝ｪ繝ｼ逕滓・縲阪・繧ｿ繝ｳ繧呈款縺・/ Click generate buttons

### Run Locally (Windows) / 繝ｭ繝ｼ繧ｫ繝ｫ螳溯｡檎沿・・IP繝繧ｦ繝ｳ繝ｭ繝ｼ繝画凾・・

1. [Releases](https://github.com/FURUYAN1234/story-maker/releases) 縺九ｉZIP繝輔ぃ繧､繝ｫ繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝峨＠縲∝ｱ暮幕縺吶ｋ / Unzip the downloaded folder
2. 繝輔か繝ｫ繝蜀・・ `start_Story_app.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け縺吶ｋ / Double-click `start_Story_app.bat`
3. 萓晏ｭ倥Λ繧､繝悶Λ繝ｪ縺瑚・蜍輔う繝ｳ繧ｹ繝医・繝ｫ縺輔ｌ縲√ヶ繝ｩ繧ｦ繧ｶ縺瑚ｵｷ蜍輔＠縺ｾ縺吶・/ Node.js dependencies are automatically installed and the app launches.
*(窶ｻ螳溯｡後↓縺ｯ[Node.js](https://nodejs.org/)縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ縺悟ｿ・ｦ√〒縺・/ Requires Node.js installed)*

### Deploy to GitHub Pages / GitHub Pages縺ｧ繝・・繝ｭ繧､

```bash
git clone https://github.com/YOUR_USERNAME/story-maker
cd story-maker
# Push to main branch, then enable GitHub Pages in repo Settings
```

> **Note:** The API key is held in memory only and never sent anywhere except the official Google Gemini API endpoint.  
> **豕ｨ:** API繧ｭ繝ｼ縺ｯ繝｡繝｢繝ｪ蜀・・縺ｿ縺ｧ菫晄戟縺輔ｌ縲；oogle Gemini蜈ｬ蠑上お繝ｳ繝峨・繧､繝ｳ繝井ｻ･螟悶↓縺ｯ騾∽ｿ｡縺輔ｌ縺ｾ縺帙ｓ縲・

---

## 泊 Getting a Gemini API Key / Gemini API繧ｭ繝ｼ縺ｮ蜿門ｾ・

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) / [Google AI Studio](https://aistudio.google.com/app/apikey) 縺ｫ繧｢繧ｯ繧ｻ繧ｹ縺吶ｋ
2. Sign in with your Google Account / Google繧｢繧ｫ繧ｦ繝ｳ繝医〒繝ｭ繧ｰ繧､繝ｳ縺吶ｋ
3. Click "Create API Key" / 縲靴reate API Key縲阪・繧ｿ繝ｳ繧偵け繝ｪ繝・け縺吶ｋ
4. Copy the generated key / 逕滓・縺輔ｌ縺蘗PI繧ｭ繝ｼ繧偵さ繝斐・縺吶ｋ

> Billing is pay-per-use (or free tier). Story generation typically uses ~1,000窶・,500 tokens per request.
> 譁咎≡縺ｯ蠕馴㍼隱ｲ驥大宛・医∪縺溘・辟｡譁呎棧・峨〒縺吶る壼ｸｸ縲・蝗槭・迚ｩ隱樒函謌舌〒邏・,000縲・,500繝医・繧ｯ繝ｳ繧呈ｶ郁ｲｻ縺励∪縺吶・

---

## 寺・・How the Anti-Repetition System Works / 蜿榊ｾｩ髦ｲ豁｢繧ｷ繧ｹ繝・Β縺ｮ莉慕ｵ・∩

The core insight: AI outputs converge toward "average" stories when inputs have low entropy. This app injects entropy through multiple independent axes:
蝓ｺ譛ｬ縺ｨ縺ｪ繧玖・∴譁ｹ・哂I縺ｮ蜃ｺ蜉帙・縲∝・蜉帙・繧ｨ繝ｳ繝医Ο繝斐・・井ｸ咲｢ｺ螳滓ｧ・峨′菴弱＞縺ｨ縲悟ｹｳ蝮・噪縲阪↑迚ｩ隱槭↓蜿取據縺励′縺｡縺ｧ縺吶ゅ％縺ｮ繧｢繝励Μ縺ｧ縺ｯ縲∬､・焚縺ｮ迢ｬ遶九＠縺溯ｻｸ繧帝壹§縺ｦ繧ｨ繝ｳ繝医Ο繝斐・繧呈ｳｨ蜈･縺励∪縺吶・

```
Output = f(Character ﾃ・Theme ﾃ・Genre ﾃ・Era ﾃ・Ending ﾃ・Perspective)
```

Each axis is independently randomizable. The combination space is large enough that identical outputs are statistically improbable.
蜷・ｻｸ縺ｯ迢ｬ遶九＠縺ｦ繝ｩ繝ｳ繝繝蛹悶′蜿ｯ閭ｽ縺ｧ縺吶らｵ・∩蜷医ｏ縺帙・遨ｺ髢薙′髱槫ｸｸ縺ｫ蠎・ｯ・〒縺ゅｋ縺溘ａ縲∝・縺丞酔縺伜・蜉帙′逕滓・縺輔ｌ繧九％縺ｨ縺ｯ邨ｱ險育噪縺ｫ縺ｻ縺ｼ襍ｷ縺薙ｊ蠕励∪縺帙ｓ縲・

The prompt also explicitly instructs Gemini to:
縺輔ｉ縺ｫ縲√す繧ｹ繝・Β繝励Ο繝ｳ繝励ヨ縺九ｉGemini縺ｫ蟇ｾ縺励※莉･荳九・譏守｢ｺ縺ｪ謖・､ｺ繧貞・縺励※縺・∪縺呻ｼ・
- Avoid the most predictable development for the genre (繧ｸ繝｣繝ｳ繝ｫ縺ｫ縺翫￠繧区怙繧ゅ≠繧翫″縺溘ｊ縺ｪ螻暮幕繧帝∩縺代ｋ)
- Connect the theme in an indirect, unexpected way (繝・・繝槭ｒ髢捺磁逧・°縺､莠域悄縺帙〓蠖｢縺ｧ邨舌・縺､縺代ｋ)
- Use each character's personality to generate unique reactions (逋ｻ蝣ｴ莠ｺ迚ｩ縺昴ｌ縺槭ｌ縺ｮ諤ｧ譬ｼ繧呈ｴｻ縺九＠縲√Θ繝九・繧ｯ縺ｪ蜿榊ｿ懊ｒ逕溘∩蜃ｺ縺・

---

## 捗 Tech Stack / 謚陦薙せ繧ｿ繝・け

- **Vite + Vanilla HTML/CSS/JS** 窶・Lightweight frontend / 霆ｽ驥上ヵ繝ｭ繝ｳ繝医お繝ｳ繝画ｧ区・
- **Gemini API** 窶・`gemini-1.5-pro` / `gemini-1.5-flash` / Gemini繝｢繝・Ν繧剃ｸｻ霆ｸ縺ｫ讒狗ｯ・
- **Deployment** 窶・GitHub Pages (static hosting) / GitHub Pages・磯撕逧・・繧ｹ繝・ぅ繝ｳ繧ｰ縺ｫ繧医ｋ繝・・繝ｭ繧､・・

---

## 統 Changelog / 螟画峩螻･豁ｴ

### v2.8.0 窶・2026-04-06
- **Foreshadowing Settings Adjustment**: Introduced a 3-tier foreshadowing rule system to resolve contradictions where narrative modes demanded foreshadowing while non-narrative modes prohibited it. / 莨冗ｷ壹Ν繝ｼ繝ｫ縺ｮ繝｢繝ｼ繝牙挨繝・ぅ繧｢蛻ｶ繧貞ｰ主・縲ら黄隱樒ｳｻ繝｢繝ｼ繝峨′莨冗ｷ壹ｒ隕∵ｱゅ＠縲・撼迚ｩ隱樒ｳｻ繝｢繝ｼ繝峨′莨冗ｷ壹ｒ遖∵ｭ｢縺吶ｋ縺ｨ縺・≧遏帷崟繧定ｧ｣豸医・
  - **Tier 1 (Full)**: Narrative modes (`novel`, `medium`, `short_short`, `scenario`, `manga`, `documentary`, `radio`) retain all 7 foreshadowing & composition rules. / 迚ｩ隱樒ｳｻ繝｢繝ｼ繝峨・繝輔Ν莨冗ｷ壹・讒区・繝ｫ繝ｼ繝ｫ・・鬆・岼・峨ｒ縺昴・縺ｾ縺ｾ驕ｩ逕ｨ縲・
  - **Tier 2 (Light)**: `4koma` mode uses lightweight "setup & punchline" guidance instead of heavy foreshadowing rules, prioritizing comedic timing. / 4繧ｳ繝槭Δ繝ｼ繝峨・縲後ヵ繝ｪ縺ｨ繧ｪ繝√阪・霆ｽ驥上Ν繝ｼ繝ｫ縺ｫ蟾ｮ縺玲崛縺医√ユ繝ｳ繝昴→繧ｪ繝√・蛻・ｌ蜻ｳ繧貞━蜈医・
  - **Tier 3 (None)**: Non-narrative modes (`essay`, `poem`, `letter`, `diary`) exclude foreshadowing entirely, replaced with mode-specific composition rules (thematic coherence, imagery chains, emotional progression). / 髱樒黄隱樒ｳｻ繝｢繝ｼ繝会ｼ医お繝・そ繧､繝ｻ隧ｩ繝ｻ謇狗ｴ吶・譌･險假ｼ峨・莨冗ｷ壹Ν繝ｼ繝ｫ繧貞ｮ悟・髯､螟悶＠縲∝推繝｢繝ｼ繝牙崋譛峨・讒区・繝ｫ繝ｼ繝ｫ縺ｫ蟾ｮ縺玲崛縺医・

### v2.7.1 窶・2026-04-05
- **Bugfix: Stale Alert Message**: Fixed a bug where the global alert bar displayed "逕ｻ蜒剰ｪ崎ｭ倅ｸｭ" (image recognition in progress) when clicking the story generation button after importing character sheet images. The shared `global-alert` element's innerHTML was not reset before re-display during story generation. / 繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ繧ｷ繝ｼ繝育判蜒上ｒ蜿悶ｊ霎ｼ繧薙□蠕後↓繧ｹ繝医・繝ｪ繝ｼ逕滓・繝懊ち繝ｳ繧呈款縺吶→縲√檎判蜒剰ｪ崎ｭ倅ｸｭ縲阪・蜿､縺・Γ繝・そ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧九ヰ繧ｰ繧剃ｿｮ豁｣縲ょ・譛峨・`global-alert`隕∫ｴ縺ｮinnerHTML縺後せ繝医・繝ｪ繝ｼ逕滓・譎ゅ↓繝ｪ繧ｻ繝・ヨ縺輔ｌ縺ｦ縺・↑縺九▲縺溷撫鬘後ｒ隗｣豸医・

### v2.7.0 窶・2026-04-03
- **Character Sheet OCR Import**: Drag & drop character sheet images onto the new drop zone to auto-extract character data via Gemini Vision API. Supports multiple images at once with progress indicator. / 繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ繧ｷ繝ｼ繝育判蜒上ｒ繝峨Ο繝・・繧ｾ繝ｼ繝ｳ縺ｫ繝峨Λ繝・げ・・ラ繝ｭ繝・・縺吶ｋ縺縺代〒縲；emini Vision API縺瑚・蜍戊ｪ崎ｭ倥＠縺ｦ繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ諠・ｱ繧呈歓蜃ｺ縲り､・焚譫壼酔譎ょ・逅・・騾ｲ謐苓｡ｨ遉ｺ縺ｫ蟇ｾ蠢懊・
- **AI 4koma Scenario Link (STEP2)**: New output mode that generates scenarios in Nano Banana Pro STEP2-compatible format with EMOTION tags, Location, and dialogue formatting. / AI 4koma 繧ｷ繝翫Μ繧ｪ騾｣謳ｺ・・TEP2・峨Δ繝ｼ繝峨ｒ霑ｽ蜉縲・ano Banana Pro縺ｮSTEP2蜈･蜉帶ｬ・↓縺昴・縺ｾ縺ｾ雋ｼ繧贋ｻ倥￠蜿ｯ閭ｽ縺ｪ繝輔か繝ｼ繝槭ャ繝医〒蜃ｺ蜉帙・
- **Multi-Image Drop Support**: Drop zone now accepts multiple images simultaneously, processing each sequentially and merging all detected characters into a single review modal with gallery preview. / 繝峨Ο繝・・繧ｾ繝ｼ繝ｳ縺瑚､・焚逕ｻ蜒上・蜷梧凾繝峨Ο繝・・縺ｫ蟇ｾ蠢懊る・ｬ｡蜃ｦ逅・＠縲∝・繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ繧堤ｵｱ蜷医＠縺ｦ繧ｮ繝｣繝ｩ繝ｪ繝ｼ莉倥″繝｢繝ｼ繝繝ｫ縺ｧ陦ｨ遉ｺ縲・
- **UI Improvements**: Moved "繧ｹ繝医・繝ｪ繝ｼ逕滓・" button to top of settings panel (below "蜈ｨ鬆・岼繝ｩ繝ｳ繝繝"). Added clear guidance for character input methods (drop/manual/auto). Fixed API input bar stretching issue. / 逕滓・繝懊ち繝ｳ繧偵ヱ繝阪Ν譛荳企Κ縺ｫ遘ｻ蜍輔ゅく繝｣繝ｩ繧ｯ繧ｿ繝ｼ蜈･蜉帙・3繝代ち繝ｼ繝ｳ譯亥・繧定ｿｽ蜉縲・PI蜈･蜉帶ｬ・・讓ｪ莨ｸ縺ｳ蝠城｡後ｒ菫ｮ豁｣縲・
- **OCR Progress Bar**: Added global alert bar during character sheet recognition to match story generation UX. / 繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ繧ｷ繝ｼ繝郁ｪ崎ｭ倅ｸｭ縺ｫ繧ｰ繝ｭ繝ｼ繝舌Ν繧｢繝ｩ繝ｼ繝医ヰ繝ｼ繧定｡ｨ遉ｺ縺励√せ繝医・繝ｪ繝ｼ逕滓・譎ゅ→蜷檎ｭ峨・UX繧貞ｮ溽樟縲・
- **Model Priority Update**: Image recognition models follow Nano Banana Pro v2.26 priority (gemini-2.5-pro first for filter tolerance). Text generation models updated with gemini-3-flash-preview as top priority. / 逕ｻ蜒剰ｪ崎ｭ倥Δ繝・Ν繧誰BP v2.26貅匁侠縺ｮ蜆ｪ蜈磯・ｽ阪↓譖ｴ譁ｰ縲ゅユ繧ｭ繧ｹ繝育函謌舌Δ繝・Ν繧Ｈemini-3-flash-preview繧呈怙蜆ｪ蜈医↓螟画峩縲・

### v2.6.0 窶・2026-03-31
- **Full-Category Style Guide Engine**: Added comprehensive AI writing-style guides for ALL preset categories. Previously, preset selections (e.g., "繧ｷ繝･繝ｼ繝ｫ繧ｮ繝｣繧ｰ", "縺ｩ繧薙〒繧楢ｿ斐＠") were passed as mere label text and largely ignored by the AI. Now, each selection injects specific, actionable writing instructions into the prompt. / 蜈ｨ繧ｫ繝・ざ繝ｪﾃ怜・繧ｵ繝悶・繝ｪ繧ｻ繝・ヨ縺ｫ蟇ｾ蠢懊☆繧帰I譁・ｽ薙ぎ繧､繝峨お繝ｳ繧ｸ繝ｳ繧定ｿｽ蜉縲ょｾ捺擂縺ｯ繝励Μ繧ｻ繝・ヨ驕ｸ謚槭′繝ｩ繝吶Ν蜷阪→縺励※縺励°繝励Ο繝ｳ繝励ヨ縺ｫ貂｡縺輔ｌ縺壹、I縺ｫ辟｡隕悶＆繧後′縺｡縺縺｣縺溷撫鬘後ｒ隗｣豸医・
  - **Genre (繧ｸ繝｣繝ｳ繝ｫ)**: 7 categories + 50 sub-presets with specific tone/style rules (e.g., "繧ｷ繝･繝ｼ繝ｫ繧ｮ繝｣繧ｰ" 竊・prohibit serious inner conflict, require escalating nonsense with deadpan delivery). / 7螟ｧ繧ｫ繝・ざ繝ｪ・・0繧ｵ繝悶・繝ｪ繧ｻ繝・ヨ縺ｫ譁・ｽ薙Ν繝ｼ繝ｫ莉倅ｸ弱・
  - **Ending (繧ｪ繝√・蝙・**: 6 categories + 25 sub-presets with structural direction (e.g., "縺ｩ繧薙〒繧楢ｿ斐＠" 竊・require 3+ foreshadowing elements). / 6螟ｧ繧ｫ繝・ざ繝ｪ・・5繧ｵ繝悶・邨先忰貍泌・謖・､ｺ縲・
  - **Worldview (荳也阜隕ｳ)**: 7 categories + 40 sub-presets with atmosphere/setting guides. / 7螟ｧ繧ｫ繝・ざ繝ｪ・・0繧ｵ繝悶・闊槫床謠丞・謖・､ｺ縲・
  - **Target (繧ｿ繝ｼ繧ｲ繝・ヨ螻､)**: 5 categories + 25 sub-presets with language-level adjustments. / 5螟ｧ繧ｫ繝・ざ繝ｪ・・5繧ｵ繝悶・譁・ｽ薙Ξ繝吶Ν謖・ｮ壹・
  - **Narration (隱槭ｊ蜿｣)**: 3 categories + 15 sub-presets with perspective rules. / 3螟ｧ繧ｫ繝・ざ繝ｪ・・5繧ｵ繝悶・隱槭ｊ譁ｹ謖・ｮ壹・
- **New File**: `src/styleGuides.js` 窶・Centralized style guide data (~250 entries). / 譁・ｽ薙ぎ繧､繝峨ョ繝ｼ繧ｿ繧貞ｰら畑繝輔ぃ繧､繝ｫ縺ｫ蛻・屬縲・

### v2.5.0 窶・2026-03-31
- **Title Bracket Enforcement**: Enhanced title parsing to always wrap story titles in 縲舌・brackets. AI output is now sanitized of existing decorations before JS-side bracketing, ensuring consistent formatting regardless of AI behavior. / 繧ｿ繧､繝医Ν縺ｮ縲舌台ｻ倅ｸ弱ｒ蜴ｳ譬ｼ蛹悶・I蜃ｺ蜉帙°繧画里蟄倥・陬・｣ｾ險伜捷繧帝勁蜴ｻ縺励◆荳翫〒JS蛛ｴ縺ｧ蠢・★縲舌代ｒ莉倅ｸ弱☆繧九ｈ縺・ｼｷ蛹悶・I縺ｮ蜃ｺ蜉帛ｽ｢蠑上↓萓晏ｭ倥○縺壼ｸｸ縺ｫ荳雋ｫ縺励◆繝輔か繝ｼ繝槭ャ繝医ｒ菫晁ｨｼ縲・
- **Output Panel Scroll**: Added `max-height` and `overflow-y: auto` to the output box, enabling in-frame scrolling for long stories. The OUTPUT header (title, character count, copy/download buttons) remains always visible. / OUTPUT谺・↓`max-height`縺ｨ譫蜀・せ繧ｯ繝ｭ繝ｼ繝ｫ繧定ｿｽ蜉縲る聞譁・〒繧ゅ・繝・ム繝ｼ・医ち繧､繝医Ν繝ｻ蟄玲焚繝ｻ繧ｳ繝斐・/菫晏ｭ倥・繧ｿ繝ｳ・峨′蟶ｸ縺ｫ陦ｨ遉ｺ縺輔ｌ繧玖ｨｭ險医↓螟画峩縲・

### v2.4.9 窶・2026-03-31
- **Narrative Structure Rules**: Added 7-rule "Foreshadowing & Composition Rules" to the prompt engine, dramatically improving story quality. / 繝励Ο繝ｳ繝励ヨ繧ｨ繝ｳ繧ｸ繝ｳ縺ｫ7鬆・岼縺ｮ縲御ｼ冗ｷ壹・讒区・繝ｫ繝ｼ繝ｫ・亥宍螳茨ｼ峨阪ｒ霑ｽ蜉縺励∫函謌舌＆繧後ｋ迚ｩ隱槭・蜩∬ｳｪ繧貞括逧・↓蜷台ｸ翫・
  - **Foreshadowing**: Elements important in the second half must be hinted at in the first half. / 蠕悟濠縺ｧ驥崎ｦ√↑隕∫ｴ縺ｯ蜑榊濠縺ｧ蠢・★證礼､ｺ縲・
  - **Character Function**: All characters must have a narrative role; passive bystanders are prohibited. / 蜈ｨ繧ｭ繝｣繝ｩ縺ｫ迚ｩ隱樒噪讖溯・繧堤ｾｩ蜍吩ｻ倥￠縲∝ｍ隕ｳ閠・く繝｣繝ｩ遖∵ｭ｢縲・
  - **Ending Conviction**: Protagonists must show clear will/action; acceptance requires prior resistance. / 邨先忰縺ｧ荳ｻ莠ｺ蜈ｬ縺ｮ譏守｢ｺ縺ｪ諢丞ｿ苓｡ｨ遉ｺ繧定ｦ∵ｱゅ∝女螳ｹ蜑阪・謚ｵ謚玲緒蜀吶ｒ蠢・亥喧縲・
  - **Setting Necessity**: Special elements must connect to protagonist's personal background. / 迚ｹ谿願ｨｭ螳壹・荳ｻ莠ｺ蜈ｬ縺ｮ蛟倶ｺｺ逧・レ譎ｯ縺ｨ謗･邯壼ｿ・医・
  - **Show Don't Tell**: Prohibits info-dump via dialogue, monologue, or single "explainer" characters. / 蜿ｰ隧槭・迢ｬ逋ｽ繝ｻ隱ｬ譏主ｽｹ繧ｭ繝｣繝ｩ縺ｫ繧医ｋ險ｭ螳壹・荳諡ｬ隱ｬ譏弱ｒ遖∵ｭ｢縲・
  - **Farewell Weight**: Meaningful partings must carry emotional weight. / 蛻･髮｢繧ｷ繝ｼ繝ｳ縺ｫ諢滓ュ逧・㍾縺ｿ縺ｮ謠丞・繧定ｦ∵ｱゅ・
  - **Tonal Variation**: Writing style must shift with protagonist's emotional state; shock scenes require immersive body/mind description. / 蠢・炊迥ｶ諷九↓蠢懊§縺滓枚菴灘､牙喧縺ｨ陦晄茶繧ｷ繝ｼ繝ｳ縺ｮ霑ｽ菴馴ｨ捺緒蜀吶ｒ隕∵ｱゅ・

### v2.4.8 窶・2026-03-30
- **Maintenance Release**: Version bump and redeployment for stable release packaging. / 螳牙ｮ夂沿繝ｪ繝ｪ繝ｼ繧ｹ繝代ャ繧ｱ繝ｼ繧ｸ繝ｳ繧ｰ逕ｨ縺ｮ繝舌・繧ｸ繝ｧ繝ｳ譖ｴ譁ｰ縺ｨ蜀阪ョ繝励Ο繧､縲・

### v2.4.7 窶・2026-03-30
- **Mode-Specific Style Guide**: Added unique tone/writing-style instructions for all 14 output modes (4-panel, essay, poem, etc.) to eliminate the "everything sounds the same" problem. / 蜈ｨ14蜃ｺ蜉帙Δ繝ｼ繝峨↓蛟句挨縺ｮ譁・ｽ薙・繝医・繝ｳ謖・､ｺ繧定ｿｽ蜉縺励√←縺ｮ繝｢繝ｼ繝峨〒繧ゆｼｼ縺溘ｈ縺・↑蜴ｨ莠檎羅逧・枚遶縺ｫ縺ｪ繧句撫鬘後ｒ隗｣豸医・
- **Era Consistency Rules**: AI now auto-corrects anachronistic expressions when historical era settings are selected (e.g., no "smartphone" in Taisho era). / 髱樒樟莉｣縺ｮ譎ゆｻ｣險ｭ螳壽凾縺ｫAI縺梧凾莉｣縺ｫ縺昴＄繧上↑縺・ｪ槫ｽ吶ｒ閾ｪ蜍輔〒隱ｭ縺ｿ譖ｿ縺医ｋ繝ｫ繝ｼ繝ｫ繧定ｿｽ蜉縲・
- **Preset Data Expansion**: Doubled character name pools (M/F: 10竊・0), detail memos (7竊・5), roles (10竊・8), personalities (10竊・8), and all ORIGINALS lists (5-8竊・2-14) to reduce repetitive randomization. / 繧ｭ繝｣繝ｩ蜷阪・隧ｳ邏ｰ繝｡繝｢繝ｻ蠖ｹ蜑ｲ繝ｻ諤ｧ譬ｼ繝ｻ蜷・Λ繝ｳ繝繝逕滓・繝励・繝ｫ繧貞､ｧ蟷・僑蜈・＠縲√Λ繝ｳ繝繝逕滓・譎ゅ・繝ｯ繝ｳ繝代ち繝ｼ繝ｳ蛹悶ｒ隗｣豸医・
- **Bugfix: Random Mode Field**: Fixed the output mode custom field being empty when using "All Random & Generate". / 蜈ｨ繝ｩ繝ｳ繝繝逕滓・譎ゅ↓蜃ｺ蜉帙Δ繝ｼ繝画ｬ・′遨ｺ谺・↓縺ｪ繧九ヰ繧ｰ繧剃ｿｮ豁｣縲・
- **Random Character Count**: Increased max random character count from 3 to 4. / 繝ｩ繝ｳ繝繝逕滓・譎ゅ・譛螟ｧ莠ｺ謨ｰ繧・莠ｺ竊・莠ｺ縺ｫ螟画峩縲・
- **Output Footer**: Added "Generated by Super FURU AI Story vX.Y.Z" credit line after story endings. / 逕滓・邨先棡縺ｮ譛ｫ蟆ｾ縺ｫ繧ｯ繝ｬ繧ｸ繝・ヨ繝輔ャ繧ｿ繝ｼ繧定・蜍戊｡ｨ遉ｺ縲・

### v2.4.6 窶・2026-03-29
- **UI Bugfix**: Added missing `autocomplete="off"` to custom input fields (Theme, Era, Ending Type) to prevent browser default auto-complete history from covering the UI as speech bubble-like popups. / 荳驛ｨ縺ｮ繧ｫ繧ｹ繧ｿ繝蜈･蜉帶ｬ・ｼ医ユ繝ｼ繝槭・譎ゆｻ｣險ｭ螳壹・繧ｪ繝√・蝙具ｼ峨〒繝悶Λ繧ｦ繧ｶ縺ｮ閾ｪ蜍戊｣懷ｮ悟ｱ･豁ｴ縺後ヵ繧ｭ繝繧ｷ縺ｮ繧医≧縺ｫ陲ｫ縺｣縺ｦ陦ｨ遉ｺ縺輔ｌ繧九ヰ繧ｰ繧剃ｿｮ豁｣縲・

### v2.4.5 窶・2026-03-28
- **Icon Redesign**: Replaced white-washed emoji book icon (当) with a custom SVG book icon in vivid purple with glow effect. / 逋ｽ鬟帙・縺励※縺・◆邨ｵ譁・ｭ励い繧､繧ｳ繝ｳ繧偵∫ｴｫ濶ｲ縺ｮSVG繧｢繧､繧ｳ繝ｳ・医げ繝ｭ繧ｦ繧ｨ繝輔ぉ繧ｯ繝井ｻ倥″・峨↓蟾ｮ縺玲崛縺医・
- **Critical Layout Fix**: Fixed output box background not covering full text content by adding `flex-shrink: 0`. Added bottom margin to prevent text sticking to screen edge. / 蜃ｺ蜉帙ユ繧ｭ繧ｹ繝医′譫縺九ｉ縺ｯ縺ｿ蜃ｺ縺呵・蜻ｽ逧・ヰ繧ｰ繧・`flex-shrink: 0` 縺ｧ菫ｮ豁｣縲ゆｸ倶ｽ咏區繧りｿｽ蜉縲・
- **Long-Form Mode Enhancement**: Removed placeholder text from master prompt template. Added direct instruction for receiving LLM to write full chapter text. Added "縲仙ｮ後・縲千ｶ壹￥縲・ end markers for all output modes. / 髟ｷ邱ｨ繝槭せ繧ｿ繝ｼ繝励Ο繝ｳ繝励ヨ縺ｮ髮帛ｽ｢繝・Φ繝励Ξ繝ｼ繝医ｒ逶ｴ謗･逧・↑蝓ｷ遲・多莉､縺ｫ譖ｸ縺肴鋤縺医ょ・繝｢繝ｼ繝峨↓邨ゆｺ・・繝ｼ繧ｫ繝ｼ繧定ｿｽ蜉縲・
- **Deploy Fix**: Corrected GitHub Pages source from `main` branch to `gh-pages` branch, resolving the issue where presets were not displayed on the deployed site. / GitHub Pages縺ｮ驟堺ｿ｡蜈・ｒ `main` 縺九ｉ `gh-pages` 縺ｫ菫ｮ豁｣縺励√ョ繝励Ο繧､蜈医〒繝励Μ繧ｻ繝・ヨ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｪ縺・撫鬘後ｒ隗｣豸医・

### v2.4.4 窶・2026-03-28
- **Cleanup**: Removed remaining Claude residues in documentation. / 繝峨く繝･繝｡繝ｳ繝医↓谿句ｭ倥＠縺ｦ縺・◆Claude縺ｮ險倩ｿｰ谿矩ｪｸ繧貞ｮ悟・縺ｫ蜑企勁縲・
- **UI Logic**: Fixed long novel prompt logic so that the prompt string is directly displayed in the main output panel. / 髟ｷ邱ｨ蟆剰ｪｬ繝｢繝ｼ繝峨↓縺翫＞縺ｦAPI騾壻ｿ｡繧呈検縺ｾ縺夂峩謗･OUTPUT縺ｸ繝励Ο繝ｳ繝励ヨ繧貞・蜉帙☆繧九Ο繧ｸ繝・け縺ｫ菫ｮ豁｣縲・
- **UI Tweaks**: Added smart display control to hide the yellow alert banner outside of active generation windows. Removed right-aligned unnecessary prompt pane. / 鮟・牡縺ｮ隴ｦ蜻願｡ｨ遉ｺ繧但PI騾壻ｿ｡荳ｭ縺ｮ縺ｿ陦ｨ遉ｺ縺輔ｌ繧九ｈ縺・､画峩繝ｻ荳崎ｦ√↑蜿ｳ蛛ｴ繝代ロ繝ｫ繧貞炎髯､縲・

### v2.4.3 窶・2026-03-28
- **UI & Layout Revamp**: Removed the experimental System Dashboard from `index.html` and `main.js`.
- **Alert Notifications**: Added a global yellow alert banner (鮟・牡縺ｮ隴ｦ蜻願｡ｨ遉ｺ) to clarify wait times during API communication.
- **Model Reversion**: Fully scrubbed all unintended Claude API references, cementing the application on Gemini models. / Claude API縺ｸ縺ｮ險蜿翫ｒ螳悟・縺ｫ謗帝勁縺励；emini蟆ら畑縺ｨ縺励※蜀肴ｧ狗ｯ峨・

### v2.4.2 窶・2026-03-28
- Long novel generation prompt fixes / 髟ｷ邱ｨ蟆剰ｪｬ逕滓・譎ゅ・繝励Ο繝ｳ繝励ヨ菫ｮ豁｣
- UI hint enhancements / UI繝偵Φ繝郁ｿｽ蜉

### v1.0.0 窶・2026-03-27
- Initial release / 蛻晏屓繝ｪ繝ｪ繝ｼ繧ｹ

---

## 笞厄ｸ・Compliance & Legal Stance / 豕慕噪驕ｵ螳医↓縺､縺・※

**Japanese Copyright Law (Article 30-4)**
This project is developed in full compliance with Article 30-4 of the Japanese Copyright Act, which allows for the exploitation of copyrighted works for information analysis and technological development of AI.
譛ｬ繝励Ο繧ｸ繧ｧ繧ｯ繝医・縲∵律譛ｬ縺ｮ闡嶺ｽ懈ｨｩ豕慕ｬｬ30譚｡縺ｮ4・域ュ蝣ｱ隗｣譫千岼逧・ｭ峨〒縺ｮ蛻ｩ逕ｨ・峨↓蝓ｺ縺･縺阪∵橿陦捺､懆ｨｼ縺翫ｈ縺ｳ諠・ｱ隗｣譫舌ｒ逶ｮ逧・→縺励※髢狗匱縺輔ｌ縺ｦ縺翫ｊ縲∵ｳ慕噪縺ｫ驕ｩ豁｣縺ｪ遽・峇蜀・〒蜈ｬ髢九＆繧後※縺・∪縺吶・

**Official API Usage**
All generations are performed through the official Google Gemini API. This system adheres strictly to Google's "Generative AI Forbidden Use Policy" and Terms of Service.
譛ｬ繧ｷ繧ｹ繝・Β縺ｯGoogle蜈ｬ蠑上・Gemini API繧剃ｻ九＠縺ｦ蜍穂ｽ懊＠縺ｦ縺翫ｊ縲；oogle縺悟ｮ壹ａ繧九檎函謌植I遖∵ｭ｢莠矩・阪♀繧医・蛻ｩ逕ｨ隕冗ｴ・ｒ蜴ｳ譬ｼ縺ｫ驕ｵ螳医＠縺ｦ縺・∪縺吶・

**Autonomous & Deterministic Text Generation**
Unlike simple prompt wrappers, this system uses a deterministic middleware pipeline (Multi-Axis Randomization and Anti-Repetition Prompt Engine). It does not aim to plagiarize specific existing novels or stories. It generates original narrative structures based on high-dimensional semantic control.
蜊倥↑繧九・繝ｭ繝ｳ繝励ヨ縺ｮ繝ｩ繝・ヱ繝ｼ繝・・繝ｫ縺ｨ縺ｯ逡ｰ縺ｪ繧翫∵悽繧ｷ繧ｹ繝・Β縺ｯ縲悟､夊ｻｸ繝ｩ繝ｳ繝繝蛹悶阪♀繧医・縲悟渚蠕ｩ髦ｲ豁｢繝励Ο繝ｳ繝励ヨ繧ｨ繝ｳ繧ｸ繝ｳ縲阪→縺・≧豎ｺ螳夊ｫ也噪縺ｪ繝溘ラ繝ｫ繧ｦ繧ｧ繧｢繝代う繝励Λ繧､繝ｳ繧剃ｽｿ逕ｨ縺励※縺・∪縺吶よ里蟄倥・迚ｹ螳壹・蟆剰ｪｬ繧・黄隱槭・逶礼畑繧堤岼逧・→縺励◆繧ゅ・縺ｧ縺ｯ縺ｪ縺上・ｫ俶ｬ｡蜈・・諢丞袖逧・宛蠕｡縺ｫ蝓ｺ縺･縺阪が繝ｪ繧ｸ繝翫Ν縺ｮ迚ｩ隱樊ｧ矩繧定・蠕狗噪縺ｫ逕滓・縺励∪縺吶・

**No-Profit & Research Focus**
The core logic (Prompts/Protocols) is released under CC BY-NC-SA 4.0. Any commercial misuse by third parties is strictly prohibited. This project exists solely for the advancement of LLM control technology and the democratization of creative writing tools.
譬ｸ蠢・噪縺ｪ繝ｭ繧ｸ繝・け縺ｯCC BY-NC-SA 4.0・磯撼蝟ｶ蛻ｩ・峨・荳九〒蜈ｬ髢九＆繧後※縺・∪縺吶らｬｬ荳芽・↓繧医ｋ謔ｪ雉ｪ縺ｪ蝠・畑蛻ｩ逕ｨ縺ｯ繝ｩ繧､繧ｻ繝ｳ繧ｹ驕募渚縺ｨ縺ｪ繧翫∪縺吶よ悽繝励Ο繧ｸ繧ｧ繧ｯ繝医・縲´LM蛻ｶ蠕｡謚陦薙・逋ｺ螻輔→縲∝濤遲・ｴｻ蜍輔・豌台ｸｻ蛹悶ｒ逶ｮ逧・→縺励◆遐皮ｩｶ謌先棡縺ｧ縺吶・

---

## 笞厄ｸ・License & Rights / 繝ｩ繧､繧ｻ繝ｳ繧ｹ繝ｻ讓ｩ蛻ｩ髢｢菫・

This project uses a hybrid license to balance technology sharing and intellectual property protection.
謚陦薙・蜈ｱ譛峨→蜑ｵ菴懊・菫晁ｭｷ繧剃ｸ｡遶九☆繧九◆繧√∽ｻ･荳九・繝上う繝悶Μ繝・ラ繝ｩ繧､繧ｻ繝ｳ繧ｹ繧呈治逕ｨ縺励※縺・∪縺吶・

* **Source Code**: [MIT License](https://opensource.org/licenses/MIT)
  Applies to software logic and implementation code. / 繧ｽ繝輔ヨ繧ｦ繧ｧ繧｢縺ｮ蜍穂ｽ懊Ο繧ｸ繝・け繧・ｮ溯｣・さ繝ｼ繝峨↓驕ｩ逕ｨ縲・
* **Logic & Prompts**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
  Applies to original design philosophy, multi-axis randomization arrays, and anti-repetition structures. / 險ｭ險域晄Φ縲∝､夊ｻｸ繝ｩ繝ｳ繝繝蛹悶・驟榊・縲√♀繧医・蜿榊ｾｩ髦ｲ豁｢繝励Ο繝ｳ繝励ヨ讒矩縺ｫ驕ｩ逕ｨ縲・

* **Output Ownership / 逕滓・迚ｩ縺ｮ蟶ｰ螻・*:
  The CC SA (ShareAlike) requirement **does not apply** to texts generated by this system. Rights belong to the user.
  譛ｬ繧ｷ繧ｹ繝・Β縺ｧ逕滓・縺輔ｌ縺溘ユ繧ｭ繧ｹ繝茨ｼ育黄隱槭・繝励Ο繝・ヨ・峨↓荳願ｨ呂C繝ｩ繧､繧ｻ繝ｳ繧ｹ縺ｮ邯呎価鄒ｩ蜍吶・驕ｩ逕ｨ縺輔ｌ縺ｾ縺帙ｓ縲よｨｩ蛻ｩ縺ｯ繝ｦ繝ｼ繧ｶ繝ｼ縺ｫ蟶ｰ螻槭＠縺ｾ縺吶・

**Commercial Use and Paid Seminars / 蝠・畑蛻ｩ逕ｨ繝ｻ譛画侭繧ｻ繝溘リ繝ｼ縺ｫ縺､縺・※**
Usage of this system (including prompts and logic) in high-priced information products, paid seminars, or any "get-rich-quick" schemes is strictly prohibited under the CC BY-NC-SA 4.0 license.
譛ｬ繧ｷ繧ｹ繝・Β・医・繝ｭ繝ｳ繝励ヨ縺翫ｈ縺ｳ繝ｭ繧ｸ繝・け繧貞性繧・峨ｒ縲・ｫ倬｡阪↑諠・ｱ蝠・攝縲∵怏譁吶そ繝溘リ繝ｼ縲√∪縺溘・縲悟憶讌ｭ繝ｻ遞ｼ縺偵ｋ縲咲ｭ峨・隰ｳ縺・枚蜿･繧剃ｼｴ縺・ン繧ｸ繝阪せ縺ｫ辟｡譁ｭ縺ｧ菴ｿ逕ｨ縺吶ｋ縺薙→縺ｯ縲，C BY-NC-SA 4.0繝ｩ繧､繧ｻ繝ｳ繧ｹ縺ｫ蝓ｺ縺･縺阪∝崋縺冗ｦ√§縺ｾ縺吶・

Any commercial or educational use involving fees requires explicit prior written consent from the developer (FURU).
譛画侭縺ｮ謨呵ご逶ｮ逧・ｄ蝠・畑蛻ｩ逕ｨ繧呈､懆ｨ弱＆繧後ｋ蝣ｴ蜷医・縲∝ｿ・★莠句燕縺ｫ髢狗匱閠・ｼ・URU・峨・譖ｸ髱｢縺ｫ繧医ｋ謇ｿ隲ｾ繧貞ｾ励※縺上□縺輔＞縲・

---

## 蛻ｩ逕ｨ隕冗ｴ・/ Terms of Use

### 1. 逶ｮ逧・/ Purpose

譛ｬ繝・・繝ｫ縺ｯ蜑ｵ菴懈髪謠ｴ繧堤岼逧・→縺励◆繧ゅ・縺ｧ縺ゅｊ縲∵里蟄倥・闡嶺ｽ懃黄縲√ヶ繝ｩ繝ｳ繝峨√く繝｣繝ｩ繧ｯ繧ｿ繝ｼ縲√∪縺溘・迚ｹ螳壹・菴懷ｮｶ繝ｻ菴懷刀縺ｮ蜀咲樟繧・ｻ｣譖ｿ繧堤岼逧・→縺励◆蛻ｩ逕ｨ縺ｯ諠ｳ螳壹＠縺ｦ縺・∪縺帙ｓ縲・ 
This tool is intended for creative assistance and is not designed to reproduce, substitute, or replicate existing copyrighted works, brands, characters, or specific creators.

---

### 2. 逕滓・繧ｳ繝ｳ繝・Φ繝・↓髢｢縺吶ｋ遖∵ｭ｢莠矩・/ Prohibited Uses

繝ｦ繝ｼ繧ｶ繝ｼ縺ｯ縲∵悽繝・・繝ｫ繧剃ｽｿ逕ｨ縺励※莉･荳九・陦檎ぜ繧定｡後▲縺ｦ縺ｯ縺ｪ繧翫∪縺帙ｓ縲・ 
Users must not engage in the following:

#### (1) 闡嶺ｽ懈ｨｩ繝ｻ遏･逧・ｲ｡逕｣讓ｩ萓ｵ螳ｳ / Intellectual Property Infringement
譌｢蟄倥・蟆剰ｪｬ縲∬・譛ｬ縲∬ｨ倅ｺ九∵ｼｫ逕ｻ蜴滉ｽ懊√◎縺ｮ莉匁枚遶繧ｳ繝ｳ繝・Φ繝・ｒ螳溯ｳｪ逧・↓蜀咲樟繝ｻ讓｡蛟｣縺吶ｋ陦檎ぜ
Reproducing or closely imitating existing written works such as novels, scripts, articles, or story content

迚ｹ螳壹・菴懷ｮｶ繝ｻ菴懷刀縺ｮ譁・ｽ薙∬ｪ槭ｊ蜿｣縲√・繝ｭ繝・ヨ讒矩縲√く繝｣繝ｩ繧ｯ繧ｿ繝ｼ讒区・繧定ｭ伜挨蜿ｯ閭ｽ縺ｪ繝ｬ繝吶Ν縺ｧ蜀咲樟縺吶ｋ陦檎ぜ  
Replicating the writing style, narrative voice, plot structure, or character composition of a specific author or work in a recognizable manner

譌｢蟄倅ｽ懷刀縺ｮ繧ｹ繝医・繝ｪ繝ｼ螻暮幕縲∬ｨｭ螳壹√・繝ｭ繝・ヨ繧定ｨ縺・鋤縺医・螟牙ｽ｢縺励※蜀榊茜逕ｨ縺吶ｋ陦檎ぜ  
Reusing or paraphrasing existing storylines, settings, or plots from copyrighted works
  
#### (2) 讓ｩ蛻ｩ萓ｵ螳ｳ繧ｳ繝ｳ繝・Φ繝・・蛻ｩ逕ｨ / Use of Infringing Content
- 隨ｬ荳芽・・闡嶺ｽ懈ｨｩ縲∝膚讓呎ｨｩ縲∬ｖ蜒乗ｨｩ縲√ヱ繝悶Μ繧ｷ繝・ぅ讓ｩ遲峨ｒ萓ｵ螳ｳ縺吶ｋ繧ｳ繝ｳ繝・Φ繝・・逕滓・縲∝・髢九∬ｲｩ螢ｲ縲∝・譛・ 
- 譌｢蟄露P縺ｫ鬘樔ｼｼ縺励◆繧ｳ繝ｳ繝・Φ繝・・辟｡譁ｭ蝠・畑蛻ｩ逕ｨ  

Generating, distributing, or monetizing infringing or derivative content without permission.

#### (3) 蜈･蜉帙ョ繝ｼ繧ｿ縺ｮ荳肴ｭ｣蛻ｩ逕ｨ / Misuse of Input Data
- 繝ｦ繝ｼ繧ｶ繝ｼ縺ｯ縲∝・蜉帙☆繧狗判蜒上・繝・く繧ｹ繝育ｭ峨↓縺､縺・※縲・←豕輔↑讓ｩ蛻ｩ縺ｾ縺溘・菴ｿ逕ｨ險ｱ隲ｾ繧呈怏縺吶ｋ縺薙→繧剃ｿ晁ｨｼ縺吶ｋ繧ゅ・縺ｨ縺励∪縺・ 
- 讓ｩ蛻ｩ繧呈怏縺励↑縺・ｬｬ荳芽・さ繝ｳ繝・Φ繝・ｒ蜈･蜉帙→縺励※菴ｿ逕ｨ縺吶ｋ陦檎ぜ  

Users must have legal rights to all input data.

#### (4) 荳肴ｭ｣蛻ｩ逕ｨ縺ｮ蜉ｩ髟ｷ / Facilitation of Misuse
- 讓ｩ蛻ｩ萓ｵ螳ｳ繧堤岼逧・→縺励◆繝励Ο繝ｳ繝励ヨ縲√ユ繝ｳ繝励Ξ繝ｼ繝医√Ρ繝ｼ繧ｯ繝輔Ο繝ｼ縺ｮ菴懈・繝ｻ蜈ｱ譛・ 
- 莉冶・↓萓ｵ螳ｳ陦檎ぜ繧剃ｿ・☆陦檎ぜ  

Creating or sharing tools intended for infringement.

#### (5) 豕穂ｻ､驕募渚繝ｻ荳肴ｭ｣陦檎ぜ / Illegal Activities
- 驕ｩ逕ｨ縺輔ｌ繧区ｳ穂ｻ､縺ｫ驕募渚縺吶ｋ陦檎ぜ  
- 隧先ｬｺ縲∽ｸ肴ｭ｣陦檎ぜ縲√∪縺溘・譛牙ｮｳ縺ｪ逶ｮ逧・〒縺ｮ蛻ｩ逕ｨ  

Any illegal or harmful use.

---

### 3. 逕滓・迚ｩ縺ｮ雋ｬ莉ｻ縺翫ｈ縺ｳ讓ｩ蛻ｩ / Responsibility & Ownership

逕滓・縺輔ｌ縺溘さ繝ｳ繝・Φ繝・・蜀・ｮｹ縺翫ｈ縺ｳ蛻ｩ逕ｨ縺ｫ髢｢縺吶ｋ縺吶∋縺ｦ縺ｮ雋ｬ莉ｻ縺ｯ繝ｦ繝ｼ繧ｶ繝ｼ縺ｫ蟶ｰ螻槭＠縺ｾ縺吶・ 
The user bears full responsibility for generated content.

譛ｬ繝・・繝ｫ縺ｮ蛻ｩ逕ｨ縺ｫ繧医▲縺ｦ逕滓・縺輔ｌ縺溘さ繝ｳ繝・Φ繝・↓縺､縺・※縲・幕逋ｺ閠・・闡嶺ｽ懈ｨｩ縺昴・莉悶・讓ｩ蛻ｩ繧剃ｸｻ蠑ｵ縺励∪縺帙ｓ縺後√◎縺ｮ驕ｩ豕墓ｧ繝ｻ蛻ｩ逕ｨ蜿ｯ閭ｽ諤ｧ繧剃ｿ晁ｨｼ縺吶ｋ繧ゅ・縺ｧ縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲・ 
The developer does not claim ownership of generated content but does not guarantee its legality or usability.

---

### 4. 蜈崎ｲｬ莠矩・/ Disclaimer

譛ｬ繝・・繝ｫ縺ｯ縲檎樟迥ｶ譛牙ｧｿ・・S IS・峨阪〒謠蝉ｾ帙＆繧後∵・遉ｺ縺ｾ縺溘・鮟咏､ｺ繧貞撫繧上★縲√＞縺九↑繧倶ｿ晁ｨｼ繧り｡後＞縺ｾ縺帙ｓ縲・ 
This tool is provided "as is" without any warranties.

髢狗匱閠・・縲∵悽繝・・繝ｫ縺ｮ蛻ｩ逕ｨ縺ｾ縺溘・逕滓・繧ｳ繝ｳ繝・Φ繝・↓襍ｷ蝗縺吶ｋ縺・°縺ｪ繧区錐螳ｳ縺ｫ縺､縺・※繧りｲｬ莉ｻ繧定ｲ縺・∪縺帙ｓ縲・ 
The developer shall not be liable for any damages arising from use.

---

### 5. 讓ｩ蛻ｩ萓ｵ螳ｳ縺ｸ縺ｮ蟇ｾ蠢・/ Infringement & Takedown

讓ｩ蛻ｩ萓ｵ螳ｳ縺ｮ逕ｳ縺礼ｫ九※縺後≠縺｣縺溷ｴ蜷医・幕逋ｺ閠・・迢ｬ閾ｪ縺ｮ蛻､譁ｭ縺ｫ繧医ｊ莉･荳九・蟇ｾ蠢懊ｒ陦後≧蝣ｴ蜷医′縺ゅｊ縺ｾ縺吶・ 
Upon receiving a valid claim, the developer may:

- 隧ｲ蠖薙さ繝ｳ繝・Φ繝・・蜑企勁隕∬ｫ九∪縺溘・蜑企勁  
- 蛻ｩ逕ｨ縺ｮ蛻ｶ髯舌∪縺溘・遖∵ｭ｢  
- 繝ｪ繝昴ず繝医Μ縺ｮ蜈ｬ髢句●豁｢遲峨・謗ｪ鄂ｮ  

Remove content, restrict usage, or take necessary actions.

---

### 6. 隕冗ｴ・・螟画峩 / Changes

譛ｬ隕冗ｴ・・莠亥相縺ｪ縺丞､画峩縺輔ｌ繧句ｴ蜷医′縺ゅｊ縺ｾ縺吶・ 
These terms may be updated without notice.

---

### 7. 貅匁侠豕・/ Governing Law

譛ｬ隕冗ｴ・・譌･譛ｬ豕輔↓貅匁侠縺励∪縺吶・ 
These terms are governed by the laws of Japan.

---

## AI Manga Creative Suite / AI縺ｾ繧薙′蛻ｶ菴懊お繧ｳ繧ｷ繧ｹ繝・Β

This project is part of an integrated ecosystem designed to support AI-powered manga and story creation.
譛ｬ繝励Ο繧ｸ繧ｧ繧ｯ繝医・縲、I繧呈ｴｻ逕ｨ縺励◆貍ｫ逕ｻ繝ｻ繧ｹ繝医・繝ｪ繝ｼ蛻ｶ菴懊ｒ謾ｯ謠ｴ縺吶ｋ邨ｱ蜷医お繧ｳ繧ｷ繧ｹ繝・Β縺ｮ荳驛ｨ縺ｧ縺吶・

### Ecosystem Components / 讒区・繧ｷ繧ｹ繝・Β

#### 1. Nano Banana 2 Powered Super AI 4-koma System
A system specialized in creating 4-panel manga with AI.
AI繧呈ｴｻ逕ｨ縺励◆4繧ｳ繝樊ｼｫ逕ｻ蛻ｶ菴懊↓迚ｹ蛹悶＠縺溘す繧ｹ繝・Β縺ｧ縺吶・
- [Explanation / 隗｣隱ｬ](https://note.com/happy_duck780/n/ndf063558c1f5)
- [Demo / 繝・Δ](https://furuyan1234.github.io/nano-banana-pro/)
- [Code / 繧ｳ繝ｼ繝云(https://github.com/FURUYAN1234/nano-banana-pro)

#### 2. AI Story Maker
A tool for generating creative stories and plots using AI.
AI繧堤畑縺・※繧ｯ繝ｪ繧ｨ繧､繝・ぅ繝悶↑繧ｹ繝医・繝ｪ繝ｼ繧・・繝ｭ繝・ヨ繧堤函謌舌☆繧九ヤ繝ｼ繝ｫ縺ｧ縺吶・
- [Explanation / 隗｣隱ｬ](https://note.com/happy_duck780/n/nd3d972922868)
- [Demo / 繝・Δ](https://furuyan1234.github.io/story-maker/)
- [Code / 繧ｳ繝ｼ繝云(https://github.com/FURUYAN1234/story-maker)

#### 3. AI Character Sheet Maker
An assistant for designing detailed character sheets and settings.
隧ｳ邏ｰ縺ｪ繧ｭ繝｣繝ｩ繧ｯ繧ｿ繝ｼ繧ｷ繝ｼ繝医ｄ險ｭ螳壹ｒ繝・じ繧､繝ｳ縺吶ｋ縺溘ａ縺ｮ謾ｯ謠ｴ繝・・繝ｫ縺ｧ縺吶・
- [Explanation / 隗｣隱ｬ](https://note.com/happy_duck780/n/neccbebd7d957)
- [Demo / 繝・Δ](https://furuyan1234.github.io/character-sheet-maker/)
- [Code / 繧ｳ繝ｼ繝云(https://github.com/FURUYAN1234/character-sheet-maker)

---

Developed by **FURU**

