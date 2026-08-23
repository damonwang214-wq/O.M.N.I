# O.M.N.I. — School Project Site

**O**bviously **M**ore than a **N**ormal **I**ntelligence.

A voice-controlled AI butler. Two pages, zero dependencies, no API keys.

- **`index.html`** — Home page (hero, glowing core, capabilities, how-it-works)
- **`talk.html`** — "Talk to O.M.N.I." (voice input via Web Speech API, spoken replies via speech synthesis, rule-based brain)

The site is split into small files (this keeps it under GitHub's upload limits, and is tidy anyway):
- `css/core.css` + `css/home.css` — home page styles; `css/talk.css` — talk console styles
- `js/omni-data.js` + `js/omni-data2.js` — the brain's speeches, jokes, facts, weather codes
- `js/omni.js` — the brain logic (`omniRespond()`); `js/talk.js` — the talk page UI (mic, speech, typing)

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

The intelligence lives in **`js/omni.js`** (`omniRespond()` — the rule engine) and
**`js/omni-data.js` / `js/omni-data2.js`** (the speeches, jokes and facts).
Add a rule to `omni.js`, or a line to the data files, and you're done. The speech UI
is in `js/talk.js`; colours, fonts and the glowing core are in `css/core.css`, `css/home.css`, `css/talk.css`.

## Presenting / next steps

- Host it free: GitHub Pages (drag the folder into a repo → Settings → Pages) or Netlify Drop.
- **It's now a PWA!** `manifest.json` + `sw.js` give it an app icon and offline support — on a phone: **Share → Add to Home Screen** (iOS) or the browser's **Install app** (Android/Chrome). It opens like a real app with its own icon.
- When you push updates, bump the `CACHE` version at the top of `sw.js` so returning visitors get the new version.
