# Deploy Rules: story-maker

## Deploy Targets
- GitHub Pages

## Deploy Commands
```bash
npm run build
npm run deploy
```

## Platform-Specific Guardrails
- このプロジェクトは標準的な GitHub Pages を利用してデプロイする。
- ❌ 他プロジェクト（例: Nano Banana Pro）にあるような Hugging Face Spaces 向けの特殊なスクリプト（`deploy:hf` 等）を実行したり、設定を流用したりしてはならない。

## Protected Settings
- `vite.config.js` の `base` は GitHub Pages 用の相対パス（通常 `./` またはリポジトリ名）等の適切な設定がなされているため推測で触らない。

## Not Applicable
- Hugging Face Spaces (`.git` 保存、`deploy:hf` 等のルールは**一切不要**)
- Vercel / Netlify / Cloudflare Pages / Firebase Hosting
