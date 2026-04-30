# AGENT.md — Claude Code Instructions for Hercules

## What this project is
A PWA fitness app for kids/teens. Single-purpose, personal use, runs on one kid's phone.
No backend, no auth, no accounts. Just HTML, CSS, JS.

## Tech stack
- **Pure HTML/CSS/JS** — single `index.html` file. No React, no Vue, no framework.
- **No build step** — opens directly in a browser. Do not add Vite, Webpack, or any bundler.
- **No npm** — do not create or modify `package.json`. Do not run `npm install`.
- **localStorage** — only persistence layer. No Firebase, no Supabase, no external DB.
- **Lottie / video** — exercise animations via local MP4 files in `videos/` folder.

## File structure
```
hercules/
├── index.html          ← entire app lives here
├── manifest.json       ← PWA manifest
├── sw.js               ← service worker
├── AGENT.md            ← this file
├── DESIGN.md           ← visual contract, read before touching CSS
├── ROADMAP.md          ← feature status, read before adding anything
├── icons/
│   ├── icon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── videos/
    └── pushup.mp4      ← exercise videos, MP4 only
```

## Rules — read before every task

1. **Do not refactor working code.** If something works, leave it alone unless explicitly asked.
2. **Do not change design tokens** (colors, fonts, spacing) without checking DESIGN.md first.
3. **Do not add dependencies.** No CDN imports beyond what already exists (Google Fonts, Lottie if added).
4. **Do not split into multiple files** unless explicitly asked. Keep everything in index.html.
5. **Do not "improve" features** that weren't mentioned in the prompt. Scope = exactly what was asked.
6. **Always test localStorage persistence** when touching any data-related feature.
7. **Mobile first.** Test every UI change at 390px width mentally. No hover-only interactions.
8. **Video elements** must always have `autoplay loop muted playsinline` — all four attributes, always.
9. **When in doubt, ask.** Don't assume. One wrong refactor breaks everything.

## Current known issues / in progress
- Exercise add flow: needs "Add" confirm button (see ROADMAP.md)
- More exercise videos to be added to `videos/` folder as they are generated
- PWA manifest and service worker may need icons updated

## Do not touch
- The EXERCISES array structure — adding videos is done by adding a `video` property only
- The localStorage key `hercules-state` — do not rename or restructure without migrating existing data
- Theme toggle logic — light/dark is working, don't rewrite it
