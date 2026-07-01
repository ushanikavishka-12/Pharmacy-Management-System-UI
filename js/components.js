// ── Sidebar HTML ──
const SIDEBAR_HTML = `
<aside class="sidebar" id="sidebar">
  <div class="logo">
    <div class="logo-icon"><i class="fa-solid fa-plus"></i></div>
    <div class="logo-text">
      <span class="logo-title">PharmaPlus</span>
      <span class="logo-sub">Pharmacy Management System</span>
    </div>
  </div>

  <nav class="nav">
    <a href="dashboard.html" class="nav-item" data-page="dashboard">
      <i class="fa-solid fa-table-columns"></i> Dashboard
    </a>
    <a href="pos&billing.html" class="nav-item" data-page="pos&billing">
      <i class="fa-solid fa-cart-shopping"></i> POS &amp; Billing
    </a>
    <a href="inventory.html" class="nav-item" data-page="inventory">
      <i class="fa-solid fa-boxes-stacked"></i> Inventory
    </a>
    <a href="purchases.html" class="nav-item" data-page="purchases">
      <i class="fa-solid fa-file-invoice"></i> Purchases
    </a>
    <a href="suppliers.html" class="nav-item" data-page="suppliers">
      <i class="fa-solid fa-truck-field"></i> Suppliers
    </a>
    <a href="customers.html" class="nav-item" data-page="customers">
      <i class="fa-solid fa-users"></i> Customers
    </a>
    <a href="prescriptions.html" class="nav-item" data-page="prescriptions">
      <i class="fa-solid fa-file-prescription"></i> Prescriptions
    </a>
    <a href="reports.html" class="nav-item" data-page="reports">
      <i class="fa-solid fa-chart-column"></i> Reports
    </a>
    <a href="settings.html" class="nav-item" data-page="settings">
      <i class="fa-solid fa-gear"></i> Settings
    </a>
  </nav>

  <div class="sidebar-image">
    <img src="images/pharmacy.png" alt="Pharmacy products">
  </div>
</aside>
`;

// ── Topbar HTML ──
const TOPBAR_HTML = `
<header class="topbar">
  <h1 id="page-title">Dashboard</h1>
  <div class="search-box">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" placeholder="Search medicines, invoices, customers...">
  </div>
  <div class="topbar-actions">
    <button class="icon-btn"><i class="fa-regular fa-bell"></i></button>
    <button class="icon-btn"><i class="fa-regular fa-moon"></i></button>
    <div class="admin-chip">
      <img src="https://i.pravatar.cc/40?img=12" alt="Admin">
      <span>Admin</span>
    </div>
  </div>
</header>
`;

// ── Footer HTML ──
const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-content">

    <div class="footer-brand-col">
      <div class="footer-brand-name">EgoTECH World</div>
      <p class="footer-brand-desc">Developing ready made and custom solutions for modern challenges.</p>
    </div>

    <div class="footer-nav-col">
      <h5 class="footer-col-title">Navigation</h5>
      <div class="footer-links-grid">
        <div class="footer-links-col">
          <a href="#">Home</a>
          <a href="#">Job</a>
          <a href="#">Services</a>
        </div>
        <div class="footer-links-col">
          <a href="#">Projects</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </div>
      </div>
    </div>

    <div class="footer-divider-v"></div>

    <div class="footer-nav-col">
      <h5 class="footer-col-title">Resources</h5>
      <div class="footer-links-grid">
        <div class="footer-links-col">
          <a href="#">Documentation</a>
          <a href="#">Pricing</a>
          <a href="#">Support</a>
        </div>
        <div class="footer-links-col">
          <a href="#">Privacy &amp; Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </div>

    <div class="footer-divider-v"></div>

    <div class="footer-social-col">
      <h5 class="footer-col-title">Stay Connected</h5>
      <div class="footer-social-icons">
        <a href="#" class="social-icon facebook" aria-label="Facebook">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" class="social-icon linkedin" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
      <p class="footer-follow">Follow Us</p>
    </div>

  </div>

  <div class="footer-bottom">
    &copy; 2026 egotechworld.com &nbsp;&ndash;&nbsp; EGOTECHWORLD PVT LTD. All Rights Reserved.
  </div>
</footer>
`;

const THEME_STORAGE_KEY = 'pharmaplus_theme';

function getSavedTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
}

function applyTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
}

function applySavedTheme() {
  applyTheme(getSavedTheme());
}

window.PharmaPlusTheme = {
  getSavedTheme,
  applyTheme,
  applySavedTheme,
  storageKey: THEME_STORAGE_KEY,
};

// ── Set active nav item based on current page ──
function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === page) {
      item.classList.add('active');
    }
  });
}

// ── Set page title in topbar ──
function setPageTitle() {
  const title = document.body.dataset.title;
  const el = document.getElementById('page-title');
  if (title && el) el.textContent = title;
}

// ── Load all components (no fetch/XHR needed!) ──
function loadAllComponents() {
  const sidebar = document.querySelector('#sidebar-placeholder');
  const topbar = document.querySelector('#topbar-placeholder');
  const footer = document.querySelector('#footer-placeholder');

  if (sidebar) sidebar.innerHTML = SIDEBAR_HTML;
  if (topbar) topbar.innerHTML = TOPBAR_HTML;
  if (footer) footer.innerHTML = FOOTER_HTML;

  setActiveNav();
  setPageTitle();
}

applySavedTheme();

// Run on page load
document.addEventListener('DOMContentLoaded', loadAllComponents);