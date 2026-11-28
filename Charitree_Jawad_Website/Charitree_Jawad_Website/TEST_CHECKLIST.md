# Charitree manual test checklist

Use these checks before merging/deploying. No test responses or donations are submitted to a server.

## Navigation
- [ ] Home opens from `index.html`.
- [ ] Explore Campaigns opens from the header and homepage CTAs.
- [ ] Each campaign card opens the matching details URL.
- [ ] Logo returns to Home from every page.
- [ ] Mobile menu opens, closes, and closes after choosing a link.
- [ ] Keyboard Escape closes the mobile menu.

## Explore page
- [ ] Search finds a campaign by title, category, location and description.
- [ ] Category filters show only the selected category.
- [ ] Sort options change campaign order.
- [ ] Empty results message and Clear filters work.
- [ ] Save/unsave works and saved count updates.
- [ ] Saved campaigns remain saved after refresh.
- [ ] Recently viewed section appears after opening a campaign detail page.

## Campaign details and donation
- [ ] `?id=education`, `?id=clean-water` and `?id=food-support` show the correct campaign.
- [ ] Unknown IDs fall back to the first available campaign.
- [ ] Progress percent is calculated from raised and goal values.
- [ ] Suggested donation amounts update the impact text.
- [ ] Custom amount updates the impact text.
- [ ] Amount below Rs. 100 or above Rs. 1,000,000 shows an error.
- [ ] Invalid/blank name and invalid/blank email show inline errors.
- [ ] Valid form shows a sample confirmation and reference number.
- [ ] Confirmation explicitly says no money was transferred.
- [ ] Reset donation returns the form to its initial state.
- [ ] No card number, bank account or payment credentials are requested.

## Accessibility and responsive layout
- [ ] Skip link is keyboard-accessible.
- [ ] All form fields have labels.
- [ ] Save buttons expose pressed state and descriptive labels.
- [ ] Focus indicator is visible when tabbing.
- [ ] Layout works at desktop, tablet and mobile widths.
- [ ] Reduced-motion preference disables non-essential animation.
- [ ] Campaign artwork is marked decorative; the supplied logo has descriptive alt text.
