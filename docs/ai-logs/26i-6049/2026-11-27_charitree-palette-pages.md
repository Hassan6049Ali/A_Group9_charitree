# AI Interaction Log — Charitree Color System & Initial Pages

- **Student ID:** 26I-6049
- **Email:** i266049@isb.nu.edu.pk
- **Project:** A_Group9_charitree
- **Branch:** `i266049`
- **Date:** 2026-11-27

---

## 1. Prompt Recorded

> Build the initial Charitree charity platform files inside this project (A_Group9_charitree) using our exact color system:
>
> Color Palette:
>
> Teal (#1A535C): Primary structural color for headers, primary headings, and key structural elements.
>
> Soft Sage (#4ECDC4): Secondary accent for highlights, badges, progress indicators, and subtle card accents.
>
> Warm Coral (#FF6B6B): Call-to-action accent for key buttons, urgent alerts/campaigns, and active highlights.
>
> Off-White (#F7FFF7): Primary page background, paired with crisp white cards (#FFFFFF) and high-contrast dark charcoal text (#1B262C / #4A5568) so all text and buttons stay sharp and legible.
>
> Pages (pages/): Create pages/about.html, pages/transparency.html, and pages/contact.html using semantic HTML5, consistent shared navigation and footers across all three pages, and responsive layouts for both desktop and mobile.
>
> Stylesheet (css/style.css): Define :root CSS custom properties for --color-teal: #1A535C, --color-sage: #4ECDC4, --color-coral: #FF6B6B, and --color-off-white: #F7FFF7 (plus surface/text tokens), and apply them consistently across navigation, sections, cards, transparency breakdowns, forms, and footers.
>
> Scripts (js/main.js): Implement clean interactive functionality for the mobile menu toggle, transparency category filters/tabs, and contact form validation with clear user feedback.
>
> AI Log (docs/ai-logs/26i-6049/): Create docs/ai-logs/26i-6049/2026-11-27_charitree-palette-pages.md recording this prompt, the color palette applied, and a summary of the generated files for student 26I-6049 (i266049@isb.nu.edu.pk).

---

## 2. Color Palette Applied

Defined in `css/style.css` under `:root` custom properties and applied consistently across all pages:

| Token | Hex / Value | Role in UI |
| :--- | :--- | :--- |
| `--color-teal` | `#1A535C` | Sticky header, hero backgrounds, primary headings (`h1`–`h4`), ledger table headers, highlight boxes, and footer |
| `--color-sage` | `#4ECDC4` | Secondary accents, header/footer structural borders, eyebrow bars, active nav indicators, category badges, and progress bars |
| `--color-coral` | `#FF6B6B` | Primary CTA buttons (`.btn-cta`), urgent drive alert banner, urgent campaign highlights, and active transparency filter tabs |
| `--color-off-white` | `#F7FFF7` | Primary `body` background and high-contrast light text on Teal surfaces (`--color-text-on-teal`) |
| `--color-surface` | `#FFFFFF` | Crisp card surfaces, form container backgrounds, filter controls, and ledger table body |
| `--color-text-primary` | `#1B262C` | High-contrast dark charcoal primary body/label text and legible dark text on Sage/Coral accents (`--color-text-on-accent`) |
| `--color-text-secondary` | `#4A5568` | Supporting paragraph copy, metadata labels, and form hints |

---

## 3. Summary of Generated Files

| File | Purpose & Key Details |
| :--- | :--- |
| [`css/style.css`](../../../css/style.css) | Complete responsive stylesheet with `:root` color/surface/text tokens, urgent bar, sticky header & mobile drawer, cards, progress tracks, ledger table, accessible form validation states, CTA panels, and footer. |
| [`js/main.js`](../../../js/main.js) | Vanilla JS implementing `initMobileMenu()` (toggle, Escape/outside-click/resize handling), `initTransparencyFilters()` (category tabs filtering allocation cards, ledger rows, and live status counts), and `initContactForm()` (real-time + submit validation, character counter, and accessible feedback banner). |
| [`pages/about.html`](../../../pages/about.html) | Semantic HTML5 About page featuring mission hero, 4 impact stat cards, story & milestones, four operating principles aside, leadership team cards, shared navigation/footer, and CTA panel. |
| [`pages/transparency.html`](../../../pages/transparency.html) | Semantic HTML5 Financial Transparency page featuring FY 2026 overview stats, interactive category filter tabs (`All Funds`, `Education`, `Clean Water`, `Healthcare`, `Reforestation`, `Operations`), progress-tracked allocation cards, and a filterable audited disbursement ledger table. |
| [`pages/contact.html`](../../../pages/contact.html) | Semantic HTML5 Contact page featuring a validated inquiry form (Name, Email, Topic, optional Donation Ref `CHR-YYYY-XXXX`, Message with live character count, and Consent checkbox) alongside direct support desk details and volunteer callout cards. |
| [`docs/ai-logs/26i-6049/2026-11-27_charitree-palette-pages.md`](./2026-11-27_charitree-palette-pages.md) | This AI interaction log documenting the prompt, applied color tokens, and generated files for student `26I-6049`. |
