# Privacy Policy / プライバシーポリシー

Last updated: 2026-07-20

Story Maker is a static, browser-run application. It has no account system and no app-operated server that receives your API key.

## API keys / APIキー

- Enter API keys only in the browser UI.
- Story Maker does not persist API keys in `localStorage`, `sessionStorage`, or `window.name`. Reloading or closing the page clears the active key.
- When you invoke an AI feature, the key and the requested input are sent directly over HTTPS to the provider you selected: Google Gemini or OpenAI. The key is not sent to this repository, GitHub, documentation, or URL-fetch proxy services.
- Do not enter API keys on a shared or compromised device, and do not paste them into issues, screenshots, or chat.

## Content you provide / 入力コンテンツ

Text, settings, images, character data, and style samples are processed in your browser until you request an AI feature. That feature may transmit the relevant input to the selected provider to perform generation, image understanding, style analysis, editorial scoring, or keyword assistance.

URL body fetching through third-party proxy services is disabled. Paste source text yourself if you want to use it as material.

## Storage and third parties / 保存と第三者

The app does not provide server-side storage or analytics claims in this policy. Your browser, extensions, network, and the selected AI provider have their own behavior and policies. Review the provider policies before use:

- [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy/)
- [Google Privacy Policy](https://policies.google.com/privacy)

## Changes and contact / 改定・連絡

This policy may change when the application changes. For source and issue contact, use the repository's GitHub page.
