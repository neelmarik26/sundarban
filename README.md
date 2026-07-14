# Sundarban Nova Travels

A full-stack Sundarban travel website with public bookings, locally hosted gallery images, customer reviews, email notifications, and a protected admin workspace.

## Features

- Responsive travel landing page using only images in `public/album/`.
- Public booking form that stores requests in MongoDB and sends a confirmation email.
- Customer reviews stored as pending and published only after admin approval.
- Admin dashboard at `/admin` for tours, bookings, completed trips, review moderation, gallery uploads, homepage content, and email campaigns.
- Consent-based bulk email campaigns, individual emails, optional attachments, and prewritten review-invitation emails.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `example.env` to `.env`, then replace every placeholder with real values.

3. Create the first administrator:

   ```bash
   npm run create-admin
   ```

4. Start the app:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` for the public website and `http://localhost:3000/admin` for the admin workspace.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Local server port. |
| `MONGODB_URI` | MongoDB connection string. |
| `JWT_SECRET` | Long random secret used to sign login tokens. |
| `PERSON_NAME`, `PERSON_MOBILE`, `PERSON_ADDRESS` | Company details displayed in the site and emails. |
| `PERSON_WEBSITE` | Deployed public URL, such as `https://yourdomain.com`. Review emails link to `/#reviews`. Use `http://localhost:3000` locally. |
| `EMAIL`, `EMAIL_PASSWORD`, `EMAIL_SERVICE` | Outbound email configuration. For Gmail, `EMAIL_PASSWORD` must be a Gmail App Password. |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Only used by `npm run create-admin`. |

Never commit `.env`. The included `.gitignore` already excludes it.

## Admin guide

Sign in at `/admin` with the admin created above.

- **Bookings:** move active requests through their status. Marking a trip `completed` removes it from active enquiries but keeps it in MongoDB.
- **Completed trips:** send the separate, prewritten review-request email. Completed customer details remain available for records and consent-based marketing.
- **Email campaigns:** leave recipient blank to email only customers who opted into marketing; enter an address for an individual email. Attachments can be images, PDFs, or documents up to 8 MB.
- **Tours:** create, edit, hide, or delete packages and set the correct per-person price.
- **Gallery manager:** upload JPG, PNG, WebP, or GIF photos up to 8 MB. Files are saved under `public/album/uploads/` and can be hidden or deleted.
- **Homepage content:** update the hero eyebrow, title, and introduction text.
- **Reviews:** approve or reject submitted customer reviews. Only approved reviews are visible publicly.

## Email notes

For Gmail, enable two-step verification and create an App Password. Set that generated password as `EMAIL_PASSWORD`. Do not use your normal Gmail password.

If review emails point to the wrong address, update `PERSON_WEBSITE` in `.env` with the real public domain, restart the server, and send the invitation again.

## Project map

- `index.js` — Express app and routes.
- `views/mainpage.ejs` — public page.
- `views/admin.ejs` — admin page.
- `public/album/` — local website image assets.
- `routes/` — API endpoints.
- `models/` — MongoDB schemas.
- `AGENTS.md` — compact context and guardrails for future AI agents.
