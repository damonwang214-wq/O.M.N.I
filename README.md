# O.M.N.I. — School Project Site

**O**bviously **M**ore than a **N**ormal **I**ntelligence.

A voice-controlled AI butler. Two pages, zero dependencies, no API keys.

- **`index.html`** — Home page (hero, glowing core, capabilities, how-it-works)
- **`talk.html`** — "Talk to O.M.N.I." (voice input via Web Speech API, spoken replies via speech synthesis, rule-based brain)

## How to run

**Easiest:** double-click `index.html` in Chrome or Edge. Everything is static.

**Or serve it** (better for a presentation, lets you keep tabs clean):

```bash
# from this folder
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Requirements

- **Voice input & spoken replies:** Chrome or Edge with a microphone (Web Speech API). Allow mic access when prompted.
- Other browsers (Firefox, Safari): the site works fully via the **typing** bar; only the microphone button is disabled.
- Live weather needs an internet connection (free Open-Meteo API). Everything else works offline.
- No internet at all? The Google Fonts will fall back to system fonts — still looks good.

## Things to try saying

`hello` · `what time is it` · `what's the date` · `tell me a joke` ·
`tell me a fact` · `what is 12 * 8` · `open youtube` · `weather in london` ·
`my name is alex` (he'll remember it) · `open the pod bay doors` · `help`

## How to extend it

All the intelligence lives in **`js/omni.js`** — one function, `omniRespond(text)`.
Add your own rules there (e.g. a new regex + reply). The speech UI is in `talk.html`; colours, fonts and the glowing core are in `css/style.css`.

## Presenting / next steps

- Host it free: GitHub Pages (drag the folder into a repo → Settings → Pages) or Netlify Drop.
- To make it an "app": add a manifest + service worker and Chrome will let you *Install* it like an app (PWA). Say the word and I'll add it.
