# Charitree — Jawad's Three Website Pages

**Tagline:** Growing hope together  
**Theme:** Charity & Donation Drive  
**Member:** Muhammad Jawad Ahmad  
**Roll No.:** 26I-3028  
**Pages:** Home, Explore Campaigns, Campaign Details & Donation

Charitree is a student-project prototype that helps visitors explore sample community causes and experience a guided donation journey. It uses the supplied Charitree logo and the project palette: Teal `#1A535C`, Soft Sage `#4ECDC4`, Warm Coral `#FF6B6B`, and an Off-White background `#F7F8F3`.

> **Prototype disclaimer:** Campaign names, campaign totals, goals, supporters and progress values are illustrative sample data. The donation form is simulated. It does not collect payment-card or bank information, connect to a payment provider, or transfer money. Do not present the sample campaigns as live fundraising campaigns.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Charitree introduction, featured causes and how-it-works overview |
| Explore Campaigns | `pages/explore-campaigns.html` | Search, category filters, sorting, saving campaigns and recently viewed campaigns |
| Campaign Details & Donation | `pages/campaign-details.html?id=education` | Dynamic campaign detail, progress, FAQ and validated demo donation journey |

The campaign details page reads the `id` query parameter. Supported sample IDs are `education`, `clean-water`, and `food-support`.

## Feature table

| Feature | Category | Page | Member |
|---|---|---|---|
| Campaigns and impact cards generated from the JavaScript campaign data array | Data & Display | Home, Explore Campaigns | Muhammad Jawad Ahmad (26I-3028) |
| Search by campaign name, category, location and description | Data & Display | Explore Campaigns | Muhammad Jawad Ahmad (26I-3028) |
| Dynamic campaign detail page selected by URL query parameter | Data & Display | Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Donation form with name/email/amount validation and inline error messages | Forms & Input | Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Category filters and campaign sorting | Interaction | Explore Campaigns | Muhammad Jawad Ahmad (26I-3028) |
| Save/unsave campaigns using browser localStorage | State & Memory | Home, Explore Campaigns, Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Recently viewed campaigns remembered across page visits | State & Memory | Explore Campaigns, Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Donation amount presets, one-time/monthly selector, expandable FAQs and mobile menu | Interaction | Home, Explore Campaigns, Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Donation impact preview updates when the amount changes | Logic & Calculation | Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Funding progress percentage calculated from sample raised and goal values | Logic & Calculation | Home, Explore Campaigns, Campaign Details & Donation | Muhammad Jawad Ahmad (26I-3028) |
| Responsive desktop/tablet/mobile layouts, skip link, semantic landmarks, labels, keyboard focus and reduced-motion support | Responsive & Accessible | All three pages | Muhammad Jawad Ahmad (26I-3028) |

## Contribution table

| Name | Roll Number | Pages Built | Features Built |
|---|---|---|---|
| Muhammad Jawad Ahmad | 26I-3028 | Home; Explore Campaigns; Campaign Details & Donation | Data-driven campaign display; search/filter/sort; saved and recently viewed campaigns; validated donation simulator; impact calculation; responsive and accessible navigation |

## Folder structure

```text
Charitree_Jawad_Website/
├── index.html
├── pages/
│   ├── explore-campaigns.html
│   └── campaign-details.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js
│   └── app.js
├── images/
│   └── charitree-logo.jpg
└── README.md
```

## Run the website

The project uses HTML5, CSS3 and vanilla JavaScript. It does not require a build step or package installation.

**Option A — VS Code Live Server**

1. Extract the ZIP file.
2. Open the extracted `Charitree_Jawad_Website` folder in VS Code.
3. Install/enable the Live Server extension if your VS Code does not already have it.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Test the navigation and donation simulation.

**Option B — Python local server**

Open a terminal in the extracted folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Do not open nested pages directly using `file://` if your browser restricts local storage or URL behaviour. Use Live Server or the local server instead.

## Before merging into the group repository

1. Keep the group's existing shared file/folder structure where possible. Copy `index.html`, `pages/`, `css/`, `js/`, and `images/` into the group's repository root, merging folders carefully rather than deleting other members' work.
2. Check that the shared navigation and footer labels match the rest of the group's website.
3. Replace the sample campaign content and illustrative progress figures only after the group has agreed on final project content.
4. Compare the implementation with the hand-drawn horizontal and vertical prototypes and incorporate the actual user feedback/change table. This ZIP was built from the assigned page names and project brief; no personal prototype chart or completed feedback data was supplied with this request.
5. Test on desktop and mobile, including empty search results, all category filters, saved campaigns, custom donation amounts below/above the allowed range, invalid name/email, and a successful simulated donation.
6. Make your own meaningful commits and pull request in your own branch. Do not fabricate commits, user testing responses or AI session logs.

## Image disclosure

The Charitree logo in `images/charitree-logo.jpg` was supplied by the project owner. Its creation tool/source was not provided, so confirm its origin with your group and add the required tool disclosure to the website/report if it was AI-generated. Campaign artwork on the pages is drawn with inline SVG in the site's JavaScript; it is illustrative artwork, not photography.

## Technology

- HTML5 semantic page structure
- CSS3 Flexbox and Grid, responsive breakpoints and reduced-motion styling
- Vanilla JavaScript for data rendering, filtering, localStorage state, validation and donation simulation
- No React, Vue, Angular, jQuery or other JavaScript framework

## Links to fill in after deployment

- GitHub repository: `ADD_GROUP_REPOSITORY_URL`
- Live website: `ADD_GITHUB_PAGES_URL`
- Google Form: `ADD_CHARITREE_FEEDBACK_FORM_URL`
