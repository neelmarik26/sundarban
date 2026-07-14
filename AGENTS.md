# Project guide for AI agents

Use this file as the starting context. Do not scan the entire repository unless the task needs it.

## Quick map

- `index.js` — Express server and route setup.
- `views/mainpage.ejs` — public landing page, booking modal, and local-image UI.
- `views/admin.ejs` — admin login/dashboard UI; it calls protected JSON APIs.
- `public/css/mainpage.css` — landing page styles and responsive rules.
- `public/js/mainpagenew.js` — landing page rendering, 10-second booking prompt, and public booking submission.
- `public/css/admin.css` and `public/js/admin.js` — responsive admin dashboard.
- `public/album/` — approved website image assets. Use only these local images for visual content; do not add remote image URLs.
- `models/Tour.js` — admin-editable tours; the browser must never set a booking price.
- `models/Booking.js` — public booking records and marketing-consent flag.
- `routes/tours.js` — public tour listing and admin CRUD.
- `routes/bookings.js` — public booking endpoint (`POST /api/bookings/public`) and authenticated booking tools.
- `routes/admin.js` — protected dashboard statistics and email sender.
- `models/Review.js` and `routes/reviews.js` — real customer review submission and admin approval. Only approved reviews are public.
- `models/GalleryImage.js`, `routes/media.js` — admin-only local gallery upload and management; uploads live in `public/album/uploads/`.
- `models/SiteSetting.js`, `routes/settings.js` — editable public homepage hero content.
- `routes/auth.js`, `middleware/auth.js` — JWT login and admin protection.

## Working rules

1. Start with only the files listed above that match the requested task.
2. Preserve existing user changes and avoid unrelated refactors.
3. For frontend image changes, add assets to `public/album/` and reference them with `/album/<filename>`.
4. Public bookings must be saved through the API and their amount must be calculated server-side from an active tour.
5. Bulk promotional email must target only `Booking` records with `marketingConsent: true`. Individual emails remain available to administrators.
6. Create the first admin with `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env`, then run `npm run create-admin`. No default credentials are stored in source control.
7. Email requires `EMAIL` and `EMAIL_PASSWORD` in `.env` (optional `EMAIL_SERVICE`, default: Gmail). Never expose secrets.
8. Keep pages usable on mobile and keyboard-friendly. Run the smallest relevant verification after changes. `npm start` runs the app.
9. Gallery uploads and email attachments are limited to 8 MB. Keep images local under `public/album/`; never use external image URLs.
