# Royal Home Care — Website

A single-page marketing site for Royal Home Care (AC installation, repair,
maintenance, plumbing, electrical work and home deep cleaning), built with
React, Vite and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

- `src/App.jsx` — page composition
- `src/components/` — Navbar, Hero, Services, Process, About, Contact, Footer
- `src/hooks/useReveal.js` — scroll-reveal IntersectionObserver hook
- `src/assets/logo.jpeg` — your logo
- `src/index.css` — Tailwind v4 theme tokens (colors/fonts) + globals

## Notes

- **No backend yet.** The contact form currently opens the visitor's email
  client addressed to `royalhomecare@gmail.com` via a `mailto:` link, so it
  works with zero setup. When you're ready for a real backend (e.g. to save
  enquiries to a database or send email server-side with Nodemailer), say
  the word and I'll wire up an Express API for the form.
- Update the placeholder phone number in `src/components/Contact.jsx`.
- Swap in real photos anywhere you'd like — everything visual right now is
  custom SVG so there are no broken external image links.
- Colors, fonts and copy all live in a few clearly-named files, so it's easy
  to hand off or extend.
