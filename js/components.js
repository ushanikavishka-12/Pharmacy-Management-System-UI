// ── Load HTML component (works with file:// protocol) ──
function loadComponent(selector, filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 0) {
        // status 0 = file:// protocol success
        const el = document.querySelector(selector);
        if (el) el.innerHTML = xhr.responseText;
        resolve();
      } else {
        reject(new Error(`Failed to load ${filePath}`));
      }
    };
    xhr.onerror = function () {
      reject(new Error(`Network error loading ${filePath}`));
    };
    xhr.send();
  });
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