/**
 * Charitree Charity Platform - Interactive Scripts
 * Handles:
 *  1. Accessible mobile navigation toggle
 *  2. Transparency fund category filters & ledger filtering
 *  3. Contact form validation with real-time and submit-time user feedback
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTransparencyFilters();
  initContactForm();
});

/**
 * Mobile Navigation Toggle
 * Expands/collapses #primary-nav and keeps aria-expanded synchronized.
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("primary-nav");

  if (!toggleBtn || !navMenu) return;

  const setMenuOpen = (isOpen) => {
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    navMenu.classList.toggle("is-open", isOpen);
  };

  toggleBtn.addEventListener("click", () => {
    const currentlyOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    setMenuOpen(!currentlyOpen);
  });

  // Close drawer when a navigation link is selected on mobile
  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 768) {
      setMenuOpen(false);
    }
  });

  // Close drawer on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggleBtn.focus();
    }
  });

  // Close drawer when clicking outside the header
  document.addEventListener("click", (event) => {
    if (
      toggleBtn.getAttribute("aria-expanded") === "true" &&
      !event.target.closest(".site-header")
    ) {
      setMenuOpen(false);
    }
  });

  // Reset mobile state if resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("is-open")) {
      setMenuOpen(false);
    }
  });
}

/**
 * Transparency Category Filters / Tabs
 * Filters both allocation breakdown cards and disbursement ledger rows.
 */
function initTransparencyFilters() {
  const tabButtons = document.querySelectorAll(".filter-tab[data-filter]");
  const allocationCards = document.querySelectorAll(".allocation-card[data-category]");
  const ledgerRows = document.querySelectorAll(".ledger-row[data-category]");
  const statusEl = document.getElementById("filter-status");
  const ledgerEmptyEl = document.getElementById("ledger-empty");

  if (!tabButtons.length) return;

  const applyFilter = (category) => {
    tabButtons.forEach((btn) => {
      const isSelected = btn.dataset.filter === category;
      btn.classList.toggle("is-active", isSelected);
      btn.setAttribute("aria-selected", String(isSelected));
    });

    let visibleCards = 0;
    let filteredTotal = 0;

    allocationCards.forEach((card) => {
      const matches = category === "all" || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) {
        visibleCards += 1;
        filteredTotal += Number(card.dataset.amount || 0);
      }
    });

    let visibleRows = 0;
    ledgerRows.forEach((row) => {
      const matches = category === "all" || row.dataset.category === category;
      row.hidden = !matches;
      if (matches) visibleRows += 1;
    });

    if (ledgerEmptyEl) {
      ledgerEmptyEl.hidden = visibleRows > 0;
    }

    if (statusEl) {
      const formattedTotal = filteredTotal.toLocaleString("en-US");
      const label = category === "all" ? "all categories" : `${category} programs`;
      statusEl.textContent = `Showing ${visibleCards} fund ${
        visibleCards === 1 ? "stream" : "streams"
      } ($${formattedTotal} allocated) and ${visibleRows} audited ledger ${
        visibleRows === 1 ? "entry" : "entries"
      } for ${label}.`;
    }
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  });

  // Initialize summary text on load
  const initialActive =
    document.querySelector(".filter-tab.is-active")?.dataset.filter || "all";
  applyFilter(initialActive);
}

/**
 * Contact Form Validation & Feedback
 * Validates required fields, email format, optional donation ref, message length, and consent.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedbackBox = document.getElementById("form-feedback");
  const messageField = document.getElementById("message");
  const messageCount = document.getElementById("message-count");

  const fields = {
    fullName: document.getElementById("full-name"),
    email: document.getElementById("email"),
    topic: document.getElementById("topic"),
    reference: document.getElementById("reference"),
    message: messageField,
    consent: document.getElementById("consent"),
  };

  const validators = {
    fullName(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Please enter your full name.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      return "";
    },
    email(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Please enter your email address.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(trimmed)) return "Please enter a valid email address (e.g., name@example.com).";
      return "";
    },
    topic(value) {
      if (!value) return "Please select an inquiry topic.";
      return "";
    },
    reference(value) {
      const trimmed = value.trim();
      if (!trimmed) return "";
      const refPattern = /^CHR-\d{4}-[A-Z0-9]{4,}$/i;
      if (!refPattern.test(trimmed)) {
        return "Format should match CHR-YYYY-XXXX (or leave blank).";
      }
      return "";
    },
    message(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Please enter your message.";
      if (trimmed.length < 15) {
        return `Please provide a bit more detail (${15 - trimmed.length} more characters needed).`;
      }
      return "";
    },
    consent(_, inputEl) {
      if (!inputEl.checked) {
        return "Please confirm that Charitree may use these details to reply to your inquiry.";
      }
      return "";
    },
  };

  const setFieldError = (inputEl, errorMessage) => {
    const errorEl = document.getElementById(`${inputEl.id}-error`);
    const hasError = Boolean(errorMessage);

    inputEl.setAttribute("aria-invalid", String(hasError));
    if (inputEl.type !== "checkbox") {
      inputEl.classList.toggle("is-invalid", hasError);
      inputEl.classList.toggle("is-valid", !hasError && inputEl.value.trim().length > 0);
    }
    if (errorEl) {
      errorEl.textContent = errorMessage;
    }
  };

  const validateSingleField = (key) => {
    const inputEl = fields[key];
    if (!inputEl) return true;
    const error = validators[key](inputEl.value, inputEl);
    setFieldError(inputEl, error);
    return !error;
  };

  // Live character counter for message
  if (messageField && messageCount) {
    const updateCounter = () => {
      messageCount.textContent = `${messageField.value.trim().length} / 15 min characters`;
    };
    messageField.addEventListener("input", updateCounter);
    updateCounter();
  }

  // Validate individual fields on blur / change after user interaction
  Object.entries(fields).forEach(([key, inputEl]) => {
    if (!inputEl) return;
    const eventName = inputEl.type === "checkbox" || inputEl.tagName === "SELECT" ? "change" : "blur";
    inputEl.addEventListener(eventName, () => {
      inputEl.dataset.touched = "true";
      validateSingleField(key);
    });
    inputEl.addEventListener("input", () => {
      if (inputEl.dataset.touched === "true") {
        validateSingleField(key);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalidEl = null;
    let allValid = true;

    Object.entries(fields).forEach(([key, inputEl]) => {
      if (!inputEl) return;
      inputEl.dataset.touched = "true";
      const isValid = validateSingleField(key);
      if (!isValid) {
        allValid = false;
        if (!firstInvalidEl) firstInvalidEl = inputEl;
      }
    });

    if (!allValid) {
      feedbackBox.hidden = false;
      feedbackBox.className = "form-feedback is-error";
      feedbackBox.textContent =
        "Please fix the highlighted fields below before sending your message.";
      if (firstInvalidEl) firstInvalidEl.focus();
      return;
    }

    const senderName = fields.fullName.value.trim();
    const senderTopic = fields.topic.options[fields.topic.selectedIndex].text;

    feedbackBox.hidden = false;
    feedbackBox.className = "form-feedback is-success";
    feedbackBox.textContent = `Thank you, ${senderName}. Your "${senderTopic}" message has been recorded and our Charitree coordinator team will respond within 1 business day.`;

    form.reset();
    Object.values(fields).forEach((inputEl) => {
      if (!inputEl) return;
      delete inputEl.dataset.touched;
      inputEl.removeAttribute("aria-invalid");
      inputEl.classList.remove("is-valid", "is-invalid");
      const errorEl = document.getElementById(`${inputEl.id}-error`);
      if (errorEl) errorEl.textContent = "";
    });

    if (messageCount) {
      messageCount.textContent = "0 / 15 min characters";
    }
  });
}
