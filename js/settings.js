/* ==========================================================
   settings.js
   Handles: tab switching, save buttons, theme radio, toast
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const menuItems = document.querySelectorAll(".menu-item");
  const tabContents = document.querySelectorAll(".tab-content");
  const toast = document.getElementById("settingsToast");

  // ---------- Tab switching ----------
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");

      menuItems.forEach((m) => m.classList.remove("active"));
      item.classList.add("active");

      tabContents.forEach((tab) => {
        tab.classList.toggle("active", tab.id === `tab-${targetTab}`);
      });
    });
  });

  // ---------- Save buttons ----------
  document.querySelectorAll(".btn-save").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab-save");
      saveTabSettings(tabName);
      showToast("Changes saved successfully");
    });
  });

  // ---------- Add user button (placeholder hook) ----------
  const addUserBtn = document.getElementById("addUserBtn");
  if (addUserBtn) {
    addUserBtn.addEventListener("click", () => {
      // TODO: open your existing "add user" modal here,
      // or route to a dedicated add-user flow.
      alert("Hook this up to your Add User modal / form.");
    });
  }

  // ---------- Theme radio preview (optional live toggle) ----------
  document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const theme = e.target.value;
      localStorage.setItem('pharmaplus_theme', theme);
      if (window.PharmaPlusTheme) {
        window.PharmaPlusTheme.applyTheme(theme);
      } else {
        document.body.classList.toggle("dark-theme", theme === "dark");
      }
    });
  });

  // ---------- Toast helper ----------
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ---------- Collect + persist settings per tab ----------
  // Replace localStorage with an API call to your backend when ready.
  function saveTabSettings(tabName) {
    let data = {};

    switch (tabName) {
      case "general":
        data = {
          systemName: val("systemName"),
          systemCurrency: val("systemCurrency"),
          dateFormat: val("dateFormat"),
          timeFormat: val("timeFormat"),
          language: val("systemLanguage"),
          timezone: val("systemTimezone"),
          theme: document.querySelector('input[name="theme"]:checked')?.value,
          itemsPerPage: val("itemsPerPage"),
          defaultDashboard: val("defaultDashboard"),
        };
        break;

      case "business":
        data = {
          businessName: val("businessName"),
          address: val("businessAddress"),
          phone: val("businessPhone"),
          email: val("businessEmail"),
          regNo: val("businessRegNo"),
          licenseNo: val("businessLicenseNo"),
        };
        break;

      case "notifications":
        data = collectToggles("#tab-notifications");
        break;

      case "payment":
        data = {
          ...collectToggles("#tab-payment"),
          taxRate: val("taxRate"),
          invoicePrefix: val("invoicePrefix"),
        };
        break;

      case "backup":
        data = {
          autoBackupFreq: val("autoBackupFreq"),
        };
        break;

      case "security":
        data = {
          ...collectToggles("#tab-security"),
          sessionTimeout: val("sessionTimeout"),
          minPasswordLength: val("minPasswordLength"),
        };
        break;
    }

    localStorage.setItem(`pharmaplus_settings_${tabName}`, JSON.stringify(data));
    console.log(`[settings] Saved "${tabName}" ->`, data);
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value : null;
  }

  function collectToggles(scopeSelector) {
    const scope = document.querySelector(scopeSelector);
    if (!scope) return {};
    const result = {};
    scope.querySelectorAll(".toggle-row").forEach((row) => {
      const label = row.querySelector("strong")?.textContent?.trim();
      const checked = row.querySelector('input[type="checkbox"]')?.checked;
      if (label) result[label] = checked;
    });
    return result;
  }

  // ---------- Load previously saved values on page open ----------
  loadSavedSettings();

  function loadSavedSettings() {
    const general = JSON.parse(localStorage.getItem("pharmaplus_settings_general") || "null");
    if (general) {
      if (general.systemName) setVal("systemName", general.systemName);
      if (general.theme) {
        const radio = document.querySelector(`input[name="theme"][value="${general.theme}"]`);
        if (radio) radio.checked = true;
        localStorage.setItem('pharmaplus_theme', general.theme);
        if (window.PharmaPlusTheme) {
          window.PharmaPlusTheme.applyTheme(general.theme);
        } else {
          document.body.classList.toggle("dark-theme", general.theme === "dark");
        }
      }
    }
  }

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }

});
