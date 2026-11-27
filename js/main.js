/**
 * Charitree Support Module - Interactive Behavior
 * Handles shared mobile navigation and Eligibility Guide interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initEligibilityGuide();
});

/**
 * Accessible Mobile Hamburger Drawer
 * Keeps aria-expanded synchronized and closes on Escape or outside clicks.
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("primary-nav");

  if (!toggleBtn || !navMenu) return;

  const setOpen = (isOpen) => {
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    navMenu.classList.toggle("is-open", isOpen);
  };

  toggleBtn.addEventListener("click", () => {
    const currentlyOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    setOpen(!currentlyOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 768) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggleBtn.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      toggleBtn.getAttribute("aria-expanded") === "true" &&
      !event.target.closest(".site-header")
    ) {
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("is-open")) {
      setOpen(false);
    }
  });
}

/**
 * Safe JSON localStorage helpers
 */
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in restricted browsing contexts
  }
}

/**
 * Format PKR amounts cleanly (e.g. Rs. 50,000)
 */
function formatPkr(amount) {
  return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
}

/**
 * Eligibility Guide Initialization
 */
function initEligibilityGuide() {
  const programsGrid = document.getElementById("programs-grid");
  if (!programsGrid || typeof CHARITREE_DATA === "undefined") return;

  initProgramBrowser(programsGrid);
  initEligibilityCalculator();
  initChecklistActivity();
  initFaqAccordion();
}

function initProgramBrowser(programsGrid) {
  const tabButtons = document.querySelectorAll("#eligibility-tabs .tab-btn[data-category]");
  const searchInput = document.getElementById("program-search");
  const statusEl = document.getElementById("programs-status");
  const emptyEl = document.getElementById("programs-empty");
  const calcCategory = document.getElementById("calc-category");

  let activeCategory = "all";

  const renderPrograms = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const matches = CHARITREE_DATA.programs.filter((program) => {
      const matchesTab = activeCategory === "all" || program.category === activeCategory;
      if (!matchesTab) return false;
      if (!query) return true;

      const searchable = [
        program.category,
        program.title,
        program.summary,
        ...program.requiredDocs
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });

    programsGrid.innerHTML = "";

    matches.forEach((program) => {
      const card = document.createElement("article");
      card.className = "card card--teal";

      const docsHtml = program.requiredDocs.map((doc) => `<li>${doc}</li>`).join("");

      card.innerHTML = `
        <span class="badge badge-sage">${program.category}</span>
        <h3 style="margin-top: 0.65rem;">${program.title}</h3>
        <p>${program.summary}</p>
        <div class="program-meta">
          <div>
            <strong>Max Aid Cap</strong>
            <span>${formatPkr(program.maxCapPkr)}</span>
          </div>
          <div>
            <strong>Per-Person Limit</strong>
            <span>&le; ${formatPkr(program.perCapitaLimitPkr)}/mo</span>
          </div>
          <div>
            <strong>Review Window</strong>
            <span>${program.turnaround}</span>
          </div>
          <div>
            <strong>Direct Action</strong>
            <a href="request-help.html?category=${encodeURIComponent(program.category)}">Apply Now &rarr;</a>
          </div>
        </div>
        <strong style="font-size: 0.88rem; color: var(--color-teal);">Required Documents:</strong>
        <ul class="doc-list">${docsHtml}</ul>
      `;

      programsGrid.appendChild(card);
    });

    if (emptyEl) {
      emptyEl.hidden = matches.length > 0;
    }

    if (statusEl) {
      const scope = activeCategory === "all" ? "all categories" : activeCategory;
      statusEl.textContent = `Showing ${matches.length} program${matches.length === 1 ? "" : "s"} under ${scope}.`;
    }
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category || "all";

      tabButtons.forEach((btn) => {
        const selected = btn === button;
        btn.classList.toggle("is-active", selected);
        btn.setAttribute("aria-selected", String(selected));
      });

      if (calcCategory && activeCategory !== "all") {
        calcCategory.value = activeCategory;
      }

      renderPrograms();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", renderPrograms);
  }

  renderPrograms();
}

function initEligibilityCalculator() {
  const form = document.getElementById("eligibility-form");
  if (!form) return;

  const incomeInput = document.getElementById("calc-income");
  const membersInput = document.getElementById("calc-members");
  const categorySelect = document.getElementById("calc-category");
  const docsCheckbox = document.getElementById("calc-docs-ready");
  const resultBox = document.getElementById("eligibility-result");

  const setFieldError = (input, errorId, message) => {
    const errorEl = document.getElementById(errorId);
    input.classList.toggle("is-invalid", Boolean(message));
    input.classList.toggle("is-valid", !message && input.value.trim() !== "");
    if (errorEl) errorEl.textContent = message;
  };

  const evaluateEligibility = ({ income, members, category, docsReady }) => {
    const program =
      CHARITREE_DATA.programs.find((item) => item.category === category) ||
      CHARITREE_DATA.programs[0];

    const perCapita = Math.round(income / members);
    const limit = program.perCapitaLimitPkr;

    let tier = "Guided Referral";
    let statusClass = "is-warning";
    let estimatedCap = Math.round(program.maxCapPkr * 0.4);
    let advice =
      "Your per-person household income exceeds our direct threshold, so our team recommends partial co-funding or partner referral.";

    if (perCapita <= limit * 0.75) {
      tier = docsReady ? "Priority Tier A (100% Cap)" : "Priority Tier A (Docs Pending)";
      statusClass = "is-success";
      estimatedCap = program.maxCapPkr;
      advice = docsReady
        ? "You qualify for full priority coverage and fast-track verification."
        : "You meet Priority Tier A income criteria. Gather your documents before submitting.";
    } else if (perCapita <= limit) {
      tier = docsReady ? "Standard Tier B (75% Cap)" : "Standard Tier B (Docs Pending)";
      statusClass = "is-success";
      estimatedCap = Math.round(program.maxCapPkr * 0.75);
      advice = "You qualify for standard Charitree program support within this category.";
    }

    return {
      income,
      members,
      category: program.category,
      docsReady,
      perCapita,
      tier,
      statusClass,
      estimatedCap,
      advice
    };
  };

  const renderResult = (assessment) => {
    if (!resultBox) return;

    resultBox.className = `status-banner ${assessment.statusClass}`;
    resultBox.hidden = false;
    resultBox.innerHTML = `
      <strong>Result: ${assessment.tier}</strong>
      <p style="margin: 0.4rem 0; color: var(--color-text-primary);">
        Income per household member: <strong>${formatPkr(assessment.perCapita)}/mo</strong> &bull;
        Recommended aid cap: <strong>${formatPkr(assessment.estimatedCap)}</strong>
      </p>
      <p style="margin: 0 0 0.75rem; color: var(--color-text-secondary);">${assessment.advice}</p>
      <a class="btn btn-teal btn-sm" href="request-help.html?category=${encodeURIComponent(assessment.category)}">
        Apply for ${assessment.category} Support &rarr;
      </a>
    `;
  };

  // Restore saved assessment on page reload
  const savedDraft = readStorage(CHARITREE_DATA.storageKeys.eligibilityDraft, null);
  if (savedDraft && savedDraft.category) {
    incomeInput.value = savedDraft.income ?? "";
    membersInput.value = savedDraft.members ?? "";
    categorySelect.value = savedDraft.category ?? "";
    docsCheckbox.checked = Boolean(savedDraft.docsReady);
    renderResult(savedDraft);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const incomeVal = incomeInput.value.trim();
    const membersVal = membersInput.value.trim();
    const categoryVal = categorySelect.value.trim();

    const income = Number(incomeVal);
    const members = Number(membersVal);

    let isValid = true;

    if (incomeVal === "" || Number.isNaN(income) || income < 0) {
      setFieldError(incomeInput, "calc-income-error", "Enter a valid non-negative monthly income.");
      isValid = false;
    } else {
      setFieldError(incomeInput, "calc-income-error", "");
    }

    if (membersVal === "" || !Number.isInteger(members) || members < 1 || members > 25) {
      setFieldError(membersInput, "calc-members-error", "Enter household members between 1 and 25.");
      isValid = false;
    } else {
      setFieldError(membersInput, "calc-members-error", "");
    }

    if (!categoryVal) {
      setFieldError(categorySelect, "calc-category-error", "Please select a support category.");
      isValid = false;
    } else {
      setFieldError(categorySelect, "calc-category-error", "");
    }

    if (!isValid) {
      if (resultBox) {
        resultBox.className = "status-banner is-error";
        resultBox.hidden = false;
        resultBox.innerHTML = "<strong>Please fix the highlighted fields above to calculate eligibility.</strong>";
      }
      return;
    }

    const assessment = evaluateEligibility({
      income,
      members,
      category: categoryVal,
      docsReady: docsCheckbox.checked
    });

    writeStorage(CHARITREE_DATA.storageKeys.eligibilityDraft, assessment);
    renderResult(assessment);
  });
}

function initChecklistActivity() {
  const listEl = document.getElementById("checklist-items");
  const progressBar = document.getElementById("checklist-progress-bar");
  const progressLabel = document.getElementById("checklist-progress-label");
  const resetBtn = document.getElementById("checklist-reset");

  if (!listEl) return;

  let checkedIds = readStorage(CHARITREE_DATA.storageKeys.checklistState, []);
  if (!Array.isArray(checkedIds)) checkedIds = [];

  const updateProgress = () => {
    const total = CHARITREE_DATA.checklistItems.length;
    const completed = checkedIds.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressLabel) {
      progressLabel.textContent = `${completed} of ${total} completed (${percent}%)`;
    }
  };

  const renderList = () => {
    listEl.innerHTML = "";

    CHARITREE_DATA.checklistItems.forEach((item) => {
      const isChecked = checkedIds.includes(item.id);
      const li = document.createElement("li");
      li.className = `checklist-item${isChecked ? " is-checked" : ""}`;

      li.innerHTML = `
        <label>
          <input type="checkbox" value="${item.id}" ${isChecked ? "checked" : ""}>
          <span>${item.label}</span>
        </label>
      `;

      const checkbox = li.querySelector("input");
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          if (!checkedIds.includes(item.id)) checkedIds.push(item.id);
        } else {
          checkedIds = checkedIds.filter((id) => id !== item.id);
        }
        li.classList.toggle("is-checked", checkbox.checked);
        writeStorage(CHARITREE_DATA.storageKeys.checklistState, checkedIds);
        updateProgress();
      });

      listEl.appendChild(li);
    });

    updateProgress();
  };

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      checkedIds = [];
      writeStorage(CHARITREE_DATA.storageKeys.checklistState, checkedIds);
      renderList();
    });
  }

  renderList();
}

function initFaqAccordion() {
  const faqContainer = document.getElementById("eligibility-faq-list");
  if (!faqContainer) return;

  faqContainer.innerHTML = "";

  CHARITREE_DATA.faqs.forEach((faq, index) => {
    const item = document.createElement("article");
    item.className = "accordion-item";

    const expanded = index === 0;
    const panelId = `faq-panel-${faq.id}`;

    item.innerHTML = `
      <button
        class="accordion-trigger"
        type="button"
        aria-expanded="${expanded}"
        aria-controls="${panelId}"
      >
        <span>${faq.question}</span>
        <span class="accordion-icon" aria-hidden="true">${expanded ? "&minus;" : "+"}</span>
      </button>
      <div id="${panelId}" class="accordion-panel" ${expanded ? "" : "hidden"}>
        <p>${faq.answer}</p>
      </div>
    `;

    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    const icon = item.querySelector(".accordion-icon");

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
      icon.innerHTML = isOpen ? "+" : "&minus;";
    });

    faqContainer.appendChild(item);
  });
}
