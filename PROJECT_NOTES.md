# Project implementation notes

- All campaign records live in `js/data.js`; campaign cards and detail content are rendered from this data.
- Shared navigation, favorite controls, toast messages, and common rendering live in `js/app.js`.
- `localStorage` stores only saved campaign IDs and recently viewed campaign IDs.
- `sessionStorage` retains a small demo receipt history containing campaign ID, amount, frequency and timestamp. Donor name and email are not stored.
- The donation journey is local simulation only. No backend or payment gateway exists.
- The three HTML pages share the same header/footer and the same stylesheet for consistent branding.


## Feedback-driven revision (November 28, 2026)
- Moved the donation panel from the right-hand sidebar to a centered position below the campaign information.
- Increased the donation panel width for clearer reading and made the preset amount buttons display in one row on wider screens, while retaining a two-column layout on small screens.
- Strengthened the visual treatment of the minimum and maximum donation limits (Rs. 100 to Rs. 1,000,000) beside the amount field.
- These changes respond to the two prototype feedback responses. Re-test the updated page in a browser before marking the relevant QA checklist items complete.
