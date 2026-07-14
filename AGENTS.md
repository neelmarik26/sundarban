# Project guide for AI agents

Use this file as the starting context. Do not scan the entire repository unless the task needs it.

## Quick map

- `index.js` — Express server and route setup.
- `views/mainpage.ejs` — the public landing page markup.
- `public/css/mainpage.css` — landing page styles and responsive rules.
- `public/js/mainpagenew.js` — landing page data, rendering, forms, and interactions.
- `public/album/` — approved website image assets. Use only these local images for visual content; do not add remote image URLs.
- `routes/`, `models/`, `middleware/` — API, database models, and authentication; inspect only for backend tasks.

## Working rules

1. Start with only the files listed above that match the requested task.
2. Preserve existing user changes and avoid unrelated refactors.
3. For frontend image changes, add assets to `public/album/` and reference them with `/album/<filename>`.
4. Keep the landing page usable on mobile and keyboard-friendly.
5. Run the smallest relevant verification after changes. `npm start` runs the app.
