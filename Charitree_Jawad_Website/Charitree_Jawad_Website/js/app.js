(function () {
  "use strict";

  const STORAGE = {
    favorites: "charitree_favorites_v1",
    recentlyViewed: "charitree_recently_viewed_v1"
  };

  const campaigns = window.CHARITREE_CAMPAIGNS || [];
  const page = document.body.dataset.page || "home";
  const currency = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

  function readList(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeList(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      showToast("Your browser could not save this preference. It will work for this visit only.");
      return false;
    }
  }

  function getBasePath() {
    return page === "home" ? "" : "../";
  }

  function campaignUrl(id) {
    return `${getBasePath()}pages/campaign-details.html?id=${encodeURIComponent(id)}`;
  }

  function formatMoney(value) {
    return `Rs. ${currency.format(Number(value) || 0)}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function showToast(message) {
    const region = document.getElementById("toast-region");
    if (!region) return;
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3400);
  }

  function updateFavoriteCount() {
    const count = readList(STORAGE.favorites).length;
    document.querySelectorAll("[data-favorites-count]").forEach((node) => {
      node.textContent = String(count);
    });
  }

  function campaignCard(campaign, compact) {
    const favorites = readList(STORAGE.favorites);
    const saved = favorites.includes(campaign.id);
    const percent = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));
    return `
      <article class="campaign-card ${compact ? "campaign-card--compact" : ""}">
        <a class="campaign-card__visual campaign-art campaign-art--${campaign.art}" href="${campaignUrl(campaign.id)}" aria-label="View ${escapeHtml(campaign.title)} details">
          ${artwork(campaign.art)}
          <span class="campaign-card__category">${escapeHtml(campaign.category)}</span>
        </a>
        <div class="campaign-card__body">
          <div class="campaign-card__meta"><span>⌖ ${escapeHtml(campaign.location)}</span><span>${campaign.daysLeft} days left</span></div>
          <h3><a href="${campaignUrl(campaign.id)}">${escapeHtml(campaign.title)}</a></h3>
          <p>${escapeHtml(campaign.shortDescription)}</p>
          <div class="progress-meta"><span><strong>${formatMoney(campaign.raised)}</strong> raised</span><span>${percent}%</span></div>
          <div class="progress-track" role="progressbar" aria-label="${escapeHtml(campaign.title)} funding progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div>
          <div class="campaign-card__bottom"><span>Goal: ${formatMoney(campaign.target)}</span><div class="campaign-card__actions"><button class="save-button ${saved ? "is-saved" : ""}" type="button" data-save-campaign="${campaign.id}" aria-pressed="${saved}" aria-label="${saved ? "Remove" : "Save"} ${escapeHtml(campaign.title)}">${saved ? "♥" : "♡"}</button><a class="text-link text-link--small" href="${campaignUrl(campaign.id)}">View details <span aria-hidden="true">→</span></a></div></div>
        </div>
      </article>`;
  }

  function artwork(kind) {
    const commonStart = '<svg viewBox="0 0 520 260" class="campaign-art__svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
    const commonEnd = "</svg>";
    if (kind === "education") return `${commonStart}<circle cx="395" cy="74" r="56" fill="#FFF1D7"/><path d="M0 205Q110 160 220 205T520 195V260H0Z" fill="#D5F0E6"/><rect x="128" y="93" width="188" height="126" rx="12" fill="#fff"/><path d="M222 106v104" stroke="#C8E5DA" stroke-width="7"/><path d="M147 119h60M147 139h60M244 119h49M244 139h49" stroke="#4ECDC4" stroke-width="7" stroke-linecap="round"/><path d="M337 181c0-31 24-55 55-55s55 24 55 55v40H337Z" fill="#1A535C"/><circle cx="391" cy="119" r="24" fill="#FFCBAC"/><path d="M372 112q20-29 41 0" fill="#1A535C"/><path d="M356 160q35-28 70 0" fill="#4ECDC4"/><path d="M100 218h328" stroke="#1A535C" stroke-width="7" stroke-linecap="round" opacity=".18"/><path d="M70 72l13-23 13 23M434 52l10-18 10 18" stroke="#4ECDC4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>${commonEnd}`;
    if (kind === "water") return `${commonStart}<circle cx="386" cy="80" r="61" fill="#DDF6F1"/><path d="M0 197q90-36 180 0t180 0 160 0v63H0Z" fill="#B9EDE5"/><path d="M259 44c-42 57-74 90-74 132a74 74 0 00148 0c0-42-32-75-74-132Z" fill="#4ECDC4"/><path d="M259 81c-23 35-40 58-40 88a40 40 0 0080 0c0-30-17-53-40-88Z" fill="#E9FCF6"/><path d="M115 145h82v67h-82z" fill="#1A535C" opacity=".9"/><path d="M104 144l52-37 52 37" fill="none" stroke="#1A535C" stroke-width="10" stroke-linejoin="round"/><path d="M125 159h62M125 178h62" stroke="#4ECDC4" stroke-width="6" stroke-linecap="round"/><path d="M360 203h88" stroke="#1A535C" stroke-width="7" stroke-linecap="round" opacity=".2"/><circle cx="94" cy="67" r="9" fill="#FF6B6B"/><circle cx="429" cy="168" r="7" fill="#FF6B6B"/>${commonEnd}`;
    return `${commonStart}<circle cx="393" cy="80" r="59" fill="#FFF1D7"/><path d="M0 204q130-42 260 0t260 0v56H0Z" fill="#E6F3D9"/><path d="M165 98q95-54 190 0l-15 118H180Z" fill="#fff"/><path d="M168 101q90-48 184 0" fill="none" stroke="#1A535C" stroke-width="9" stroke-linecap="round"/><path d="M205 130h110" stroke="#F3C86A" stroke-width="9" stroke-linecap="round"/><path d="M216 157c-21-18-52 12 0 48 52-36 21-66 0-48Z" fill="#FF6B6B"/><path d="M315 158c-16-14-40 9 0 36 40-27 16-50 0-36Z" fill="#4ECDC4"/><path d="M150 216h230" stroke="#1A535C" stroke-width="7" stroke-linecap="round" opacity=".2"/><path d="M94 169q18-34 37 0v42H94Z" fill="#4ECDC4"/><circle cx="114" cy="151" r="15" fill="#FFCBAC"/><path d="M405 178q19-31 38 0v32h-38Z" fill="#1A535C"/><circle cx="424" cy="161" r="14" fill="#FFCBAC"/>${commonEnd}`;
  }

  function bindSaveButtons(root) {
    root.querySelectorAll("[data-save-campaign]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.saveCampaign;
        const favorites = readList(STORAGE.favorites);
        const wasSaved = favorites.includes(id);
        const updated = wasSaved ? favorites.filter((item) => item !== id) : [...favorites, id];
        writeList(STORAGE.favorites, updated);
        updateFavoriteCount();
        document.querySelectorAll(`[data-save-campaign="${CSS.escape(id)}"]`).forEach((sameButton) => {
          sameButton.classList.toggle("is-saved", !wasSaved);
          sameButton.setAttribute("aria-pressed", String(!wasSaved));
          sameButton.setAttribute("aria-label", `${wasSaved ? "Save" : "Remove"} ${campaigns.find((item) => item.id === id)?.title || "campaign"}`);
          sameButton.textContent = wasSaved ? "♡" : "♥";
        });
        showToast(wasSaved ? "Campaign removed from your saved list." : "Campaign saved for later.");
      });
    });
  }

  function initShared() {
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.getElementById("primary-nav");
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const open = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!open));
        menuButton.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
        nav.classList.toggle("is-open", !open);
        document.body.classList.toggle("menu-open", !open);
      });
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      }));
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          menuButton.click();
          menuButton.focus();
        }
      });
    }
    document.querySelectorAll("[data-year]").forEach((node) => node.textContent = String(new Date().getFullYear()));
    updateFavoriteCount();
  }

  function initHome() {
    const target = document.getElementById("featured-campaigns");
    if (!target) return;
    const featured = campaigns.filter((campaign) => campaign.featured).slice(0, 3);
    target.innerHTML = featured.map((campaign) => campaignCard(campaign, false)).join("");
    bindSaveButtons(target);
  }

  function initExplore() {
    const grid = document.getElementById("campaign-results");
    if (!grid) return;
    const search = document.getElementById("campaign-search");
    const sort = document.getElementById("campaign-sort");
    const count = document.getElementById("results-count");
    const empty = document.getElementById("empty-state");
    const recentSection = document.getElementById("recent-section");
    const recentGrid = document.getElementById("recent-campaigns");
    let category = "all";

    function render() {
      const term = (search.value || "").trim().toLowerCase();
      let filtered = campaigns.filter((campaign) => {
        const categoryMatch = category === "all" || campaign.category === category;
        const text = `${campaign.title} ${campaign.category} ${campaign.location} ${campaign.shortDescription}`.toLowerCase();
        return categoryMatch && text.includes(term);
      });
      if (sort.value === "progress") filtered.sort((a, b) => (b.raised / b.target) - (a.raised / a.target));
      if (sort.value === "goal-low") filtered.sort((a, b) => a.target - b.target);
      if (sort.value === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
      grid.innerHTML = filtered.map((campaign) => campaignCard(campaign, false)).join("");
      grid.hidden = filtered.length === 0;
      empty.hidden = filtered.length !== 0;
      count.textContent = `Showing ${filtered.length} of ${campaigns.length} sample campaigns`;
      bindSaveButtons(grid);
    }

    search.addEventListener("input", render);
    sort.addEventListener("change", render);
    document.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        category = button.dataset.category;
        document.querySelectorAll("[data-category]").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("is-selected", selected);
          item.setAttribute("aria-pressed", String(selected));
        });
        render();
      });
    });
    document.getElementById("clear-filters")?.addEventListener("click", () => {
      search.value = "";
      sort.value = "featured";
      category = "all";
      document.querySelectorAll("[data-category]").forEach((item) => {
        const selected = item.dataset.category === "all";
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      render();
      search.focus();
    });

    const recent = readList(STORAGE.recentlyViewed)
      .map((id) => campaigns.find((campaign) => campaign.id === id))
      .filter(Boolean)
      .slice(0, 3);
    if (recent.length) {
      recentSection.hidden = false;
      recentGrid.innerHTML = recent.map((campaign) => campaignCard(campaign, true)).join("");
      bindSaveButtons(recentGrid);
    }
    render();
  }

  function rememberViewed(id) {
    const items = readList(STORAGE.recentlyViewed).filter((item) => item !== id);
    items.unshift(id);
    writeList(STORAGE.recentlyViewed, items.slice(0, 5));
  }

  function initDetails() {
    const content = document.getElementById("campaign-detail-content");
    if (!content) return;
    const requestedId = new URLSearchParams(window.location.search).get("id") || "education";
    const campaign = campaigns.find((item) => item.id === requestedId) || campaigns[0];
    if (!campaign) {
      content.innerHTML = `<div class="empty-state"><h2>Campaign unavailable</h2><p>Please explore the available sample campaigns.</p><a class="button button--primary" href="explore-campaigns.html">Explore campaigns</a></div>`;
      return;
    }
    rememberViewed(campaign.id);
    document.title = `${campaign.title} | Charitree`;
    document.getElementById("breadcrumb-campaign").textContent = campaign.title;
    const percent = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));
    content.innerHTML = `
      <div class="detail-art campaign-art campaign-art--${campaign.art}">${artwork(campaign.art)}<span class="campaign-card__category">${escapeHtml(campaign.category)}</span></div>
      <div class="detail-label-row"><span class="pill pill--sage">${escapeHtml(campaign.category)} initiative</span><button class="save-button detail-save" type="button" data-save-campaign="${campaign.id}" aria-pressed="${readList(STORAGE.favorites).includes(campaign.id)}" aria-label="Save ${escapeHtml(campaign.title)}">${readList(STORAGE.favorites).includes(campaign.id) ? "♥" : "♡"} <span>Save cause</span></button></div>
      <h1 class="detail-title">${escapeHtml(campaign.title)}<span class="accent-dot">.</span></h1>
      <p class="detail-lead">${escapeHtml(campaign.shortDescription)}</p>
      <div class="detail-stat-row"><div><span>Location</span><strong>⌖ ${escapeHtml(campaign.location)}</strong></div><div><span>Sample supporters</span><strong>${campaign.supporters} people</strong></div><div><span>Time remaining</span><strong>${campaign.daysLeft} days</strong></div></div>
      <div class="detail-progress-card"><div class="progress-meta"><span><strong>${formatMoney(campaign.raised)}</strong> raised in sample data</span><span>${percent}% of goal</span></div><div class="progress-track progress-track--large" role="progressbar" aria-label="Funding progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div><div class="progress-foot"><span>Campaign goal</span><strong>${formatMoney(campaign.target)}</strong></div></div>
      <div class="detail-copy"><h2>The story behind the cause</h2><p>${escapeHtml(campaign.description)}</p><blockquote>“${escapeHtml(campaign.story)}”</blockquote><h2>What this campaign focuses on</h2><ul class="highlight-list">${campaign.highlights.map((item) => `<li><span aria-hidden="true">✓</span>${escapeHtml(item)}</li>`).join("")}</ul><div class="detail-note"><span class="detail-note__icon">i</span><p><strong>Prototype transparency</strong><br>All campaign details, raised amounts and supporter counts on this page are example data for a student project. They are not live fundraising figures.</p></div></div>
      <div class="detail-faq"><h2>Questions you may have</h2><details><summary>Will my contribution be processed?</summary><p>No. This website is a student prototype. The donation journey is simulated and does not connect to a payment provider.</p></details><details><summary>Can I choose a different amount?</summary><p>Yes. Use one of the suggested amounts or enter a custom amount between Rs. 100 and Rs. 1,000,000 in the demo form.</p></details><details><summary>What happens after I submit?</summary><p>You will see a sample confirmation summary. No payment, bank details or card information is collected.</p></details></div>`;
    bindSaveButtons(content);
    renderRelated(campaign.id);
    initDonationForm(campaign);
  }

  function renderRelated(activeId) {
    const target = document.getElementById("related-campaigns");
    if (!target) return;
    const related = campaigns.filter((campaign) => campaign.id !== activeId).slice(0, 2);
    target.innerHTML = related.map((campaign) => campaignCard(campaign, false)).join("");
    bindSaveButtons(target);
  }

  function initDonationForm(campaign) {
    const form = document.getElementById("donation-form");
    if (!form) return;
    const amountInput = document.getElementById("custom-amount");
    const amountButtons = Array.from(document.querySelectorAll("[data-amount]"));
    const impactCopy = document.getElementById("impact-copy");
    const success = document.getElementById("donation-success");
    let selectedAmount = 500;

    function impactText(amount) {
      const tier = [...campaign.impact].reverse().find((item) => amount >= item.amount);
      if (tier) return tier.text;
      return `could make a thoughtful contribution towards ${campaign.title.toLowerCase()}.`;
    }

    function updateImpact() {
      const typed = amountInput.value.trim();
      const amount = typed === "" ? selectedAmount : Number(typed);
      impactCopy.textContent = Number.isFinite(amount) && amount >= 0 ? impactText(amount) : "Enter a valid amount to preview its possible impact.";
    }

    function clearAmountError() {
      document.getElementById("amount-error").textContent = "";
      amountInput.setAttribute("aria-invalid", "false");
    }

    amountButtons.forEach((button) => button.addEventListener("click", () => {
      selectedAmount = Number(button.dataset.amount);
      amountInput.value = "";
      clearAmountError();
      amountButtons.forEach((item) => {
        const chosen = item === button;
        item.classList.toggle("is-selected", chosen);
        item.setAttribute("aria-pressed", String(chosen));
      });
      updateImpact();
    }));
    amountInput.addEventListener("input", () => {
      amountButtons.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });
      clearAmountError();
      updateImpact();
    });
    updateImpact();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = amountInput.value.trim() === "" ? selectedAmount : Number(amountInput.value);
      const name = document.getElementById("donor-name").value.trim();
      const email = document.getElementById("donor-email").value.trim();
      const frequency = form.querySelector('input[name="frequency"]:checked')?.value || "One-time";
      const anonymous = document.getElementById("anonymous-gift").checked;
      let valid = true;

      const amountError = document.getElementById("amount-error");
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      amountError.textContent = ""; nameError.textContent = ""; emailError.textContent = "";
      [amountInput, document.getElementById("donor-name"), document.getElementById("donor-email")].forEach((input) => input.setAttribute("aria-invalid", "false"));

      if (!Number.isFinite(amount) || amount < 100 || amount > 1000000) {
        amountError.textContent = "Enter an amount between Rs. 100 and Rs. 1,000,000.";
        amountInput.setAttribute("aria-invalid", "true"); valid = false;
      }
      if (name.length < 2) {
        nameError.textContent = "Please enter your name (at least 2 characters).";
        document.getElementById("donor-name").setAttribute("aria-invalid", "true"); valid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email address, such as name@example.com.";
        document.getElementById("donor-email").setAttribute("aria-invalid", "true"); valid = false;
      }
      if (!valid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        showToast("Please correct the highlighted fields.");
        return;
      }

      // Only a sample receipt number and amount are retained; personal details are not stored.
      const receipt = `CHR-DEMO-${Date.now().toString().slice(-7)}`;
      try {
        const demoHistory = JSON.parse(sessionStorage.getItem("charitree_demo_donations") || "[]");
        demoHistory.push({ receipt, campaignId: campaign.id, amount, frequency, createdAt: new Date().toISOString() });
        sessionStorage.setItem("charitree_demo_donations", JSON.stringify(demoHistory.slice(-5)));
      } catch (error) {
        // The confirmation still works if browser storage is unavailable.
      }
      form.hidden = true;
      success.hidden = false;
      document.getElementById("success-summary").textContent = `${formatMoney(amount)} ${frequency.toLowerCase()} demo contribution for ${campaign.title}. Thank you, ${name}! Display preference: ${anonymous ? "anonymous" : "name visible in this demo"}. No money has been transferred.`;
      document.getElementById("receipt-id").textContent = `Sample reference: ${receipt}`;
      success.focus?.();
      showToast("Your demo donation journey is complete.");
    });

    document.getElementById("reset-donation").addEventListener("click", () => {
      form.reset();
      selectedAmount = 500;
      amountInput.value = "";
      amountButtons.forEach((item) => {
        const chosen = Number(item.dataset.amount) === 500;
        item.classList.toggle("is-selected", chosen);
        item.setAttribute("aria-pressed", String(chosen));
      });
      ["amount-error", "name-error", "email-error"].forEach((id) => document.getElementById(id).textContent = "");
      [amountInput, document.getElementById("donor-name"), document.getElementById("donor-email")].forEach((input) => input.setAttribute("aria-invalid", "false"));
      success.hidden = true;
      form.hidden = false;
      updateImpact();
      document.getElementById("donor-name").focus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initShared();
    if (page === "home") initHome();
    if (page === "explore") initExplore();
    if (page === "details") initDetails();
  });
})();
