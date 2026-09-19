# urienix.moe

Personal website of Jairo Medrano (Urienix): vanilla HTML, CSS and JavaScript
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

- Career and projects live in `assets/js/data.js`: pure JS objects, bilingual.
- Copy in `assets/js/i18n.js`: one flat dictionary per language.
- Colors and typography in `:root` inside `assets/css/style.css`.

### Projects

`data.js` splits projects into two groups, `projects.work` (client and
employer work) and `projects.personal` (side quests). Each one renders as a
card with a **Details** button that opens a modal built from its `details`
block (`about`, `responsibilities`, `achievements`) plus `stack` and `href`.

- **Logo:** set `img: 'assets/img/<file>'`. Without it the card shows a pixel
  monogram from `mono` (initials) in the `accent` color, meant as a stand-in
  until the real logo arrives.
- **No public link:** leave `href` out and set `status` to `internal`,
  `offline` or `advisory`; the card prints a note instead of a link.

### Skills

`data.js` also holds `skills`: groups of chips. A chip finds its own evidence
in the projects: `match` lists lowercase needles tested against every
project's `tags` + `stack`, and `projects` names ids directly (for things like
"Tech lead"). Chips with evidence show a tooltip listing those projects and
light their cards up on click; chips without any are drawn as plain "in the
toolbox". `primary: true` marks the daily drivers. So adding a tag to a
project automatically updates the chips that mention it.

## Deploy

The `CNAME` file points at **urienix.moe**. GitHub Pages serves this repo
from `main:/docs`, so pushing to `main` publishes.
