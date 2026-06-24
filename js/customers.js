// ── Sample customers data ──
const customers = [
  {
    id: 'CUS_078',
    name: 'M.J.I. Silva',
    phone: '011 234 5763',
    email: 'Silva12@gmail.com',
    city: 'Colombo',
    lastVisit: '2026.06.20',
    purchases: 12500.00,
    status: 'Active',
    notes: ''
  },
  {
    id: 'CUS_079',
    name: 'I.J.Manel',
    phone: '011 278 7822',
    email: 'Jamin@gmail.com',
    city: 'Gampaha',
    lastVisit: '2026.06.22',
    purchases: 2750.00,
    status: 'Active',
    notes: ''
  },
  {
    id: 'CUS_080',
    name: 'D.U.W.Silva',
    phone: '011 230 9000',
    email: 'Silva@gmail.com',
    city: 'Colombo',
    lastVisit: '2026.06.23',
    purchases: 14900.00,
    status: 'Active',
    notes: ''
  },
  {
    id: 'CUS_081',
    name: 'A.S.M.Malsha',
    phone: '011 256 7887',
    email: 'Sama@gamil.com',
    city: 'Kandy',
    lastVisit: '2026.06.25',
    purchases: 12700.50,
    status: 'Inactive',
    notes: ''
  },
  {
    id: 'CUS_082',
    name: 'S.S.M.Hettige',
    phone: '011 412 7310',
    email: 'Soma09@gmail.com',
    city: 'Galle',
    lastVisit: '2026.06.28',
    purchases: 2000.00,
    status: 'Active',
    notes: ''
  },
  {
    id: 'CUS_083',
    name: 'C.N.Hashim',
    phone: '011 298 2119',
    email: 'Hashim@gmail.com',
    city: 'Colombo',
    lastVisit: '2026.06.29',
    purchases: 78520.00,
    status: 'Inactive',
    notes: ''
  }
];

// ── DOM elements ──
const customersBody = document.getElementById('customersBody');
const searchInput   = document.getElementById('searchInput');
const statusFilter  = document.getElementById('statusFilter');
const cityFilter    = document.getElementById('cityFilter');
const resultsText   = document.getElementById('resultsText');

// ── Format currency ──
function formatPurchases(amount) {
  return 'RS.' + amount.toFixed(2);
}

// ── Generate next customer ID ──
function generateNextId() {
  const nums = customers.map(c => parseInt(c.id.replace('CUS_', ''), 10));
  const next = Math.max(...nums) + 1;
  return 'CUS_' + String(next).padStart(3, '0');
}

// ── Update KPI total ──
function updateKPIs() {
  document.getElementById('kpiTotal').textContent = customers.length;
}

// ── Render table rows ──
function renderCustomers(data) {
  customersBody.innerHTML = '';

  if (data.length === 0) {
    customersBody.innerHTML = `
      <tr><td colspan="9"
        style="text-align:center; padding:30px; color:var(--text-muted);">
        No customers found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 results';
    updateKPIs();
    return;
  }

  data.forEach((cus) => {
    const realIndex = customers.indexOf(cus);
    const badgeCls  = cus.status === 'Active' ? 'active' : 'inactive';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="cus-id">${cus.id}</td>
      <td>${cus.name}</td>
      <td>${cus.phone}</td>
      <td><span class="cus-email">${cus.email}</span></td>
      <td>${cus.city}</td>
      <td>${cus.lastVisit}</td>
      <td><strong>${formatPurchases(cus.purchases)}</strong></td>
      <td>
        <span class="cus-badge ${badgeCls}">${cus.status}</span>
      </td>
      <td>
        <div class="action-cell">
          <button class="action-btn view-btn"
            title="View" data-index="${realIndex}">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="action-btn edit-btn"
            title="Edit" data-index="${realIndex}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="action-btn delete-btn"
            title="Delete" data-index="${realIndex}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    customersBody.appendChild(row);
  });

  resultsText.textContent = `Showing 1 to ${data.length} results`;
  attachActionListeners();
  updateKPIs();
}

// ── Action listeners ──
function attachActionListeners() {

  // VIEW
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openViewModal(btn.dataset.index);
    });
  });

  // EDIT
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openEditModal(btn.dataset.index);
    });
  });

  // DELETE
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i   = btn.dataset.index;
      const cus = customers[i];
      if (confirm(`Delete customer "${cus.name}" (${cus.id})?`)) {
        customers.splice(i, 1);
        applyFilters();
      }
    });
  });
}

// ── Filter logic ──
function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const city   = cityFilter.value;

  const filtered = customers.filter(cus => {
    const matchSearch = cus.name.toLowerCase().includes(search) ||
                        cus.id.toLowerCase().includes(search)   ||
                        cus.phone.includes(search)              ||
                        cus.email.toLowerCase().includes(search);
    const matchStatus = !status || cus.status === status;
    const matchCity   = !city   || cus.city   === city;
    return matchSearch && matchStatus && matchCity;
  });

  renderCustomers(filtered);
}

searchInput.addEventListener('input',  applyFilters);
statusFilter.addEventListener('change', applyFilters);
cityFilter.addEventListener('change',   applyFilters);

/* ════════════════════════════
   ADD / EDIT CUSTOMER MODAL
════════════════════════════ */
const modal          = document.getElementById('customerModal');
const customerForm   = document.getElementById('customerForm');
const modalTitle     = document.getElementById('modalTitle');
const closeModalBtn  = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const editCusIndex   = document.getElementById('editCusIndex');
const importBtn      = document.getElementById('importBtn');
const importFileInput = document.getElementById('importFileInput');

// ── Convert display date (2026.06.20) ↔ input date (2026-06-20) ──
function toInputDate(d) {
  return d ? d.replace(/\./g, '-') : '';
}

function toDisplayDate(d) {
  return d ? d.replace(/-/g, '.') : '';
}

// ── Open ADD modal ──
document.getElementById('newCustomerBtn').addEventListener('click', () => {
  modalTitle.textContent = 'Add New Customer';
  customerForm.reset();
  document.getElementById('cusId').value = generateNextId();
  editCusIndex.value = '';
  openModal();
});

// ── Open EDIT modal ──
function openEditModal(index) {
  const cus = customers[index];
  modalTitle.textContent = 'Edit Customer';

  document.getElementById('cusId').value        = cus.id;
  document.getElementById('cusName').value      = cus.name;
  document.getElementById('cusPhone').value     = cus.phone;
  document.getElementById('cusEmail').value     = cus.email;
  document.getElementById('cusCity').value      = cus.city;
  document.getElementById('cusStatus').value    = cus.status;
  document.getElementById('cusLastVisit').value = toInputDate(cus.lastVisit);
  document.getElementById('cusPurchases').value = cus.purchases;
  document.getElementById('cusNotes').value     = cus.notes || '';

  editCusIndex.value = index;
  openModal();
}

function openModal() {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  customerForm.reset();
}

closeModalBtn.addEventListener('click',  closeModal);
cancelModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// ── Form submit ──
customerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name      = document.getElementById('cusName').value.trim();
  const phone     = document.getElementById('cusPhone').value.trim();
  const email     = document.getElementById('cusEmail').value.trim();
  const city      = document.getElementById('cusCity').value;
  const status    = document.getElementById('cusStatus').value;
  const lastVisit = document.getElementById('cusLastVisit').value;
  const purchases = parseFloat(document.getElementById('cusPurchases').value) || 0;
  const notes     = document.getElementById('cusNotes').value.trim();

  if (!name || !phone || !email || !city || !status) {
    alert('Please fill in all required fields.');
    return;
  }

  const cusData = {
    id: document.getElementById('cusId').value,
    name,
    phone,
    email,
    city,
    lastVisit: toDisplayDate(lastVisit),
    purchases,
    status,
    notes
  };

  const idx = editCusIndex.value;
  if (idx !== '') {
    customers[idx] = cusData;
  } else {
    customers.push(cusData);
  }

  closeModal();
  applyFilters();
});

importBtn.addEventListener('click', () => {
  importFileInput.value = '';
  importFileInput.click();
});

importFileInput.addEventListener('change', () => {
  const file = importFileInput.files && importFileInput.files[0];

  if (!file) return;

  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  if (!isImage && !isPdf) {
    alert('Please select an image or PDF file.');
    return;
  }

  alert(`Selected ${isImage ? 'image' : 'PDF'}: ${file.name}`);
});

/* ════════════════════════════
   VIEW CUSTOMER MODAL
════════════════════════════ */
const viewModal     = document.getElementById('viewModal');
const viewBody      = document.getElementById('viewBody');
const closeViewBtn  = document.getElementById('closeViewBtn');
const closeViewBtn2 = document.getElementById('closeViewBtn2');
const editFromView  = document.getElementById('editFromViewBtn');
let currentViewIndex = null;

function openViewModal(index) {
  currentViewIndex = index;
  const cus = customers[index];

  viewBody.innerHTML = `
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Customer ID</span>
        <span class="view-value">${cus.id}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Full Name</span>
        <span class="view-value">${cus.name}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Phone</span>
        <span class="view-value">${cus.phone}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Email</span>
        <span class="view-value">${cus.email}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">City</span>
        <span class="view-value">${cus.city}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Status</span>
        <span class="view-value">
          <span class="cus-badge ${cus.status === 'Active' ? 'active' : 'inactive'}">
            ${cus.status}
          </span>
        </span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Last Visit</span>
        <span class="view-value">${cus.lastVisit || '—'}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Total Purchases</span>
        <span class="view-value">${formatPurchases(cus.purchases)}</span>
      </div>
    </div>
    ${cus.notes ? `
    <div class="view-field">
      <span class="view-label">Notes</span>
      <span class="view-value">${cus.notes}</span>
    </div>` : ''}
  `;

  viewModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeViewModal() {
  viewModal.classList.remove('show');
  document.body.style.overflow = '';
}

closeViewBtn.addEventListener('click',  closeViewModal);
closeViewBtn2.addEventListener('click', closeViewModal);
viewModal.addEventListener('click', (e) => {
  if (e.target === viewModal) closeViewModal();
});

editFromView.addEventListener('click', () => {
  closeViewModal();
  openEditModal(currentViewIndex);
});

// ── Initial render ──
renderCustomers(customers);