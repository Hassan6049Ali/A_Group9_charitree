# AI Interaction Log — Charitree Platform Setup

- **Student ID:** 26I-6049
- **Email:** i266049@isb.nu.edu.pk
- **Project:** A_Group9_charitree
- **Branch:** `i266049`
- **Model Used:** Gemini 3.8 Flash
- **Date:** 2026-11-27

---

## 1. Prompt Recorded

```text
Using Gemini 3.8 Flash, build the initial Charitree charity platform files inside this project (A_Group9_charitree) with our exact color palette:

Color System (css/style.css): Define :root CSS custom properties for:

--color-teal: #1A535C; (headers, primary headings, key structural bars)

--color-sage: #4ECDC4; (accents, badges, progress bars, subtle borders)

--color-coral: #FF6B6B; (primary buttons, callouts, active highlights)

--color-off-white: #F7FFF7; (page background, paired with #FFFFFF cards and high-contrast #1B262C / #4A5568 text)
Make the layout clean, accessible, and responsive across mobile and desktop.

Pages (pages/): Create pages/about.html, pages/transparency.html, and pages/contact.html using semantic HTML5, consistent shared navigation and footers across all pages, and clear content for Charitree's mission, transparent fund/impact breakdown, and contact form.

Scripts (js/main.js): Add clean interactive behavior for mobile menu toggle, transparency category filters/tabs, and contact form validation/feedback.

AI Log (docs/ai-logs/26i-6049/): Create docs/ai-logs/26i-6049/2026-11-27_gemini-3-8-flash-setup.md recording this prompt, the model used (Gemini 3.8 Flash), the color variables applied, and a summary of the generated files for student 26I-6049 (i266049@isb.nu.edu.pk).
```

---

## 2. Color System Applied (`css/style.css`)

The following CSS custom properties are established in `:root` and mapped throughout the design system:

| CSS Custom Property | Value | Usage / Semantic Role |
| :--- | :--- | :--- |
| `--color-teal` | `#1A535C` | Sticky header background, primary headings (`h1`–`h4`), key structural bars, table headers, dark card borders, and primary footer |
| `--color-sage` | `#4ECDC4` | Accents, badges, progress bar fills, subtle card/divider borders, active navigation indicator, and focus states |
| `--color-coral` | `#FF6B6B` | Primary call-to-action buttons (`.btn-cta`), urgent drive alert banner, callout cards, active tab pill highlights |
| `--color-off-white` | `#F7FFF7` | Base page background (`body`), high-contrast text on teal surfaces (`--color-text-on-teal`) |
| `--color-surface` | `#FFFFFF` | Crisp card backgrounds, form input container backgrounds, ledger table surfaces |
| `--color-text-primary` | `#1B262C` | High-contrast dark charcoal text for body typography, form labels, and table content |
| `--color-text-secondary` | `#4A5568` | Secondary copy, metadata descriptions, subtitles, and input placeholder hints |

### Layout & Accessibility Highlights:
- **Responsive Design:** Mobile-first layout with CSS Grid (`grid-2`, `grid-3`, `grid-4`) and Flexbox containers that gracefully collapse down to 320px screens.
- **Accessibility:** Skip-to-content link (`.skip-link`), visible focus outlines (`:focus-visible`), ARIA attributes (`aria-expanded`, `aria-controls`, `aria-selected`, `aria-invalid`, `aria-live`), and high contrast ratios meeting WCAG AA requirements.

---

## 3. Summary of Generated & Configured Files

| File | Type | Description |
| :--- | :--- | :--- |
| [`css/style.css`](../../../css/style.css) | Stylesheet | Complete design system defining the 4 core `:root` color variables, responsive typography, urgent banner, sticky header, mobile drawer navigation, cards, filter tabs, ledger tables, form states, and footer. |
| [`js/main.js`](../../../js/main.js) | JavaScript | Vanilla ES6+ interactions for: (1) accessible mobile navigation toggle with Escape & outside-click dismissal; (2) transparency category filter tabs updating allocation cards and audit ledger rows; (3) contact form validation with real-time feedback, character counter, and accessible status banner. |
| [`pages/about.html`](../../../pages/about.html) | Page | Semantic HTML5 About page containing Charitree's mission hero, 4 key verified outcome stats, origin story, 4 core operating principles, leadership team cards, shared header/footer, and call to action. |
| [`pages/transparency.html`](../../../pages/transparency.html) | Page | Semantic HTML5 Financial Transparency hub featuring FY 2026 financial summary metrics ($480k total, 91.4% direct program ratio), interactive category filters (`all`, `education`, `water`, `health`, `forest`, `operations`), progress-bar allocation cards, and an audited disbursement ledger table. |
| [`pages/contact.html`](../../../pages/contact.html) | Page | Semantic HTML5 Contact page featuring an accessible multi-field inquiry form (Full Name, Email, Inquiry Topic, optional Donation Reference ID `CHR-YYYY-XXXX`, Message with live count, and Consent Checkbox) alongside direct contact points and volunteer callout cards. |
| [`index.html`](../../../index.html) | Page | Responsive platform homepage linking directly to all sections, highlighting Charitree's mission, verified track record, and core focus areas. |
| [`docs/ai-logs/26i-6049/2026-11-27_gemini-3-8-flash-setup.md`](./2026-11-27_gemini-3-8-flash-setup.md) | Documentation | This AI interaction log recording student info, prompt, Gemini 3.8 Flash model, color system specification, and generated file inventory. |

---

## 4. Verification

- All HTML files validate semantically and share identical navigation structures and footers.
- Mobile menu toggle transitions smoothly on viewports `< 768px`.
- Transparency filter buttons toggle active classes and show/hide corresponding allocation cards and disbursement rows dynamically.
- Contact form triggers inline error feedback for invalid inputs and displays a success confirmation message upon valid submission.
- Color palette strictly conforms to `--color-teal: #1A535C`, `--color-sage: #4ECDC4`, `--color-coral: #FF6B6B`, and `--color-off-white: #F7FFF7`.
