# Project implementation notes

- All campaign records live in `js/data.js`; campaign cards and detail content are rendered from this data.
- Shared navigation, favorite controls, toast messages, and common rendering live in `js/app.js`.
- `localStorage` stores only saved campaign IDs and recently viewed campaign IDs.
- `sessionStorage` retains a small demo receipt history containing campaign ID, amount, frequency and timestamp. Donor name and email are not stored.
- The donation journey is local simulation only. No backend or payment gateway exists.
- The three HTML pages share the same header/footer and the same stylesheet for consistent branding.
