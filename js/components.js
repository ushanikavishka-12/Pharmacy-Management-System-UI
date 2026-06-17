// ── Load HTML component into a placeholder element ──
async function loadComponent(selector, filePath) {
  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

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

// ── Load all components ──
async function loadAllComponents() {
  await loadComponent('#sidebar-placeholder', 'components/sidebar.html');
  await loadComponent('#topbar-placeholder', 'components/topbar.html');
  await loadComponent('#footer-placeholder', 'components/footer.html');
  setActiveNav();
  setPageTitle();
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadAllComponents);