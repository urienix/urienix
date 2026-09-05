# urienix.moe

Personal website of Jairo Medrano (Urienix) — vanilla HTML, CSS and JavaScript
with Tailwind (via CDN). No bundler, no framework, no build step.

## Layout

```
docs/
├── index.html            single-page: home · about · career · skills · projects · contact
├── CNAME                 GitHub Pages domain (urienix.moe)
├── robots.txt
├── favicon.ico
└── assets/
    ├── css/style.css     Dracula palette · Press Start 2P + JetBrains Mono
    ├── js/
    │   ├── data.js       career & project data (bilingual)
    │   ├── i18n.js       EN/ES dictionary
    │   └── main.js       bootstrap · i18n · render · effects
    └── img/              logos & project previews
```

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

- Career and projects live in `assets/js/data.js` — pure JS objects, bilingual.
- Copy in `assets/js/i18n.js` — one flat dictionary per language.
- Colors and typography in `:root` inside `assets/css/style.css`.

## Deploy

The `CNAME` file points at **urienix.moe**. GitHub Pages serves this repo
from `main:/docs` — pushing to `main` publishes.
