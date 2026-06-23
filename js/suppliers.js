// ── Sample suppliers data ──
const suppliers = [
  {
    name: 'Hemas Pharmacy',
    contact: 'T.K.D. Silva',
    phone: '011 234 5763',
    email: 'orders@hemas.lk',
    city: 'Colombo',
    status: 'Active',
    address: 'No 75, Braybrooke Place, Colombo 02',
    notes: ''
  },
  {
    name: 'Thusitha Pharmacy',
    contact: 'L.D.Manoj',
    phone: '011 278 7822',
    email: 'orders@hemas.lk',
    city: 'Gampaha',
    status: 'Active',
    address: 'No 12, Main Street, Gampaha',
    notes: ''
  },
  {
    name: 'Opsara Pharmacy',
    contact: 'D.M. Palitha',
    phone: '011 230 9000',
    email: 'orders@hemas.lk',
    city: 'Colombo',
    status: 'Active',
    address: 'No 45, High Level Road, Colombo 06',
    notes: ''
  },
  {
    name: 'Neeroga Pharmacy',
    contact: 'R.S.D.Dias',
    phone: '011 256 7887',
    email: 'orders@hemas.lk',
    city: 'Kandy',
    status: 'Inactive',
    address: 'No 8, Peradeniya Road, Kandy',
    notes: ''
  },
  {
    name: 'Lanka Medics',
    contact: 'S.K.N.Sujatha',
    phone: '011 412 7310',
    email: 'orders@hemas.lk',
    city: 'Galle',
    status: 'Active',
    address: 'No 22, Galle Fort Road, Galle',
    notes: ''
  },
  {
    name: 'HealthCare (Pvt) Lts',
    contact: 'C.P.H.Mala',
    phone: '011 298 2119',
    email: 'orders@hemas.lk',
    city: 'Colombo',
    status: 'Inactive',
    address: 'No 100, Duplication Road, Colombo 03',
    notes: ''
  }
];

// ── DOM Elements ──
const suppliersBody  = document.getElementById('suppliersBody');
const searchInput    = document.getElementById('searchInput');
const supplierFilter = document.getElementById('supplierFilter');
const statusFilter   = document.getElementById('statusFilter');
const resultsText    = document.getElementById('resultsText');
const supplierImportInput = document.getElementById('supplierImportInput');
const supplierImportModal = document.getElementById('supplierImportModal');
const closeSupplierImportModalBtn = document.getElementById('closeSupplierImportModalBtn');
const closeSupplierImportBtn = document.getElementById('closeSupplierImportBtn');
const changeSupplierImportFileBtn = document.getElementById('changeSupplierImportFileBtn');
const supplierImportName = document.getElementById('supplierImportName');
const supplierImportMeta = document.getElementById('supplierImportMeta');
const supplierImportPreview = document.getElementById('supplierImportPreview');
let supplierImportObjectUrl = '';

// ── Get initials for avatar ──
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ── Update KPI total ──
function updateKPIs() {
  document.getElementById('kpiTotal').textContent = suppliers.length;
}

function resetSupplierImportPreview() {
  if (supplierImportObjectUrl) {
    URL.revokeObjectURL(supplierImportObjectUrl);
    supplierImportObjectUrl = '';
  }

  if (supplierImportName) supplierImportName.textContent = 'No file selected';
  if (supplierImportMeta) supplierImportMeta.textContent = 'Choose an image or PDF to preview it here.';
  if (supplierImportPreview) {
    supplierImportPreview.innerHTML = '<div class="import-preview-empty">Select an image or PDF to preview it.</div>';
  }
}

function openSupplierImportModal() {
  if (!supplierImportModal) return;
  supplierImportModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSupplierImportModal() {
  if (!supplierImportModal) return;
  supplierImportModal.classList.remove('show');
  document.body.style.overflow = '';
  resetSupplierImportPreview();
}

function showSupplierImportPreview(file) {
  if (!supplierImportPreview || !supplierImportName || !supplierImportMeta) return;

  resetSupplierImportPreview();

  supplierImportName.textContent = file.name;
  supplierImportMeta.textContent = `${file.type || 'Unknown type'} • ${(file.size / 1024).toFixed(1)} KB`;

  const objectUrl = URL.createObjectURL(file);
  supplierImportObjectUrl = objectUrl;

  if (file.type.startsWith('image/')) {
    const image = document.createElement('img');
    image.className = 'import-preview-media';
    image.src = objectUrl;
    image.alt = file.name;
    supplierImportPreview.innerHTML = '';
    supplierImportPreview.appendChild(image);
    openSupplierImportModal();
    return;
  }

  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    const frame = document.createElement('iframe');
    frame.className = 'import-preview-frame';
    frame.src = objectUrl;
    frame.title = file.name;
    supplierImportPreview.innerHTML = '';
    supplierImportPreview.appendChild(frame);
    openSupplierImportModal();
    return;
  }

  supplierImportPreview.innerHTML = '<div class="import-preview-empty">This file type is not supported. Please choose an image or PDF.</div>';
  openSupplierImportModal();
}

// ── Render table rows ──
function renderSuppliers(data) {
  suppliersBody.innerHTML = '';

  if (data.length === 0) {
    suppliersBody.innerHTML = `
      <tr><td colspan="7"
        style="text-align:center; padding:30px; color:var(--text-muted);">
        No suppliers found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 results';
    updateKPIs();
    return;
  }

  data.forEach((sup) => {
    const realIndex = suppliers.indexOf(sup);
    const badgeCls = sup.status === 'Active' ? 'active' : 'inactive';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="sup-name-cell">
          <div class="sup-avatar">${getInitials(sup.name)}</div>
          <span>${sup.name}</span>
        </div>
      </td>
      <td>${sup.contact}</td>
      <td>${sup.phone}</td>
      <td>${sup.email}</td>
      <td>${sup.city}</td>
      <td>
        <span class="sup-badge ${badgeCls}">${sup.status}</span>
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
    suppliersBody.appendChild(row);
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
      const i = btn.dataset.index;
      openViewModal(i);
    });
  });

  // EDIT
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      openEditModal(i);
    });
  });

  // DELETE
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const sup = suppliers[i];
      if (confirm(`Delete supplier "${sup.name}"?`)) {
        suppliers.splice(i, 1);
        applyFilters();
      }
    });
  });
}

// ── Filter logic ──
function applyFilters() {
  const search   = searchInput.value.trim().toLowerCase();
  const supplier = supplierFilter.value;
  const status   = statusFilter.value;

  const filtered = suppliers.filter(sup => {
    const matchSearch   = sup.name.toLowerCase().includes(search) ||
                          sup.contact.toLowerCase().includes(search) ||
                          sup.phone.includes(search);
    const matchSupplier = !supplier || sup.name === supplier;
    const matchStatus   = !status   || sup.status === status;
    return matchSearch && matchSupplier && matchStatus;
  });

  renderSuppliers(filtered);
}

searchInput.addEventListener('input', applyFilters);
supplierFilter.addEventListener('change', applyFilters);
statusFilter.addEventListener('change', applyFilters);

/* ════════════════════════════
   ADD / EDIT SUPPLIER MODAL
════════════════════════════ */
const modal         = document.getElementById('supplierModal');
const supplierForm  = document.getElementById('supplierForm');
const modalTitle    = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn= document.getElementById('cancelModalBtn');
const editSupIndex  = document.getElementById('editSupIndex');

// Open ADD
document.getElementById('newSupplierBtn').addEventListener('click', () => {
  modalTitle.textContent = 'Add New Supplier';
  supplierForm.reset();
  editSupIndex.value = '';
  openModal();
});

// Open EDIT
function openEditModal(index) {
  const sup = suppliers[index];
  modalTitle.textContent = 'Edit Supplier';

  document.getElementById('supName').value    = sup.name;
  document.getElementById('supContact').value = sup.contact;
  document.getElementById('supPhone').value   = sup.phone;
  document.getElementById('supEmail').value   = sup.email;
  document.getElementById('supCity').value    = sup.city;
  document.getElementById('supStatus').value  = sup.status;
  document.getElementById('supAddress').value = sup.address || '';
  document.getElementById('supNotes').value   = sup.notes   || '';

  editSupIndex.value = index;
  openModal();
}

function openModal() {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  supplierForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// Form submit
supplierForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('supName').value.trim();
  const contact = document.getElementById('supContact').value.trim();
  const phone   = document.getElementById('supPhone').value.trim();
  const email   = document.getElementById('supEmail').value.trim();
  const city    = document.getElementById('supCity').value.trim();
  const status  = document.getElementById('supStatus').value;
  const address = document.getElementById('supAddress').value.trim();
  const notes   = document.getElementById('supNotes').value.trim();

  if (!name || !contact || !phone || !email || !city || !status) {
    alert('Please fill in all required fields.');
    return;
  }

  const supData = { name, contact, phone, email, city, status, address, notes };
  const idx = editSupIndex.value;

  if (idx !== '') {
    suppliers[idx] = supData;
  } else {
    suppliers.push(supData);
  }

  closeModal();
  applyFilters();
});

document.getElementById('importBtn').addEventListener('click', () => {
  if (!supplierImportInput) return;
  supplierImportInput.value = '';
  supplierImportInput.click();
});

if (supplierImportInput) {
  supplierImportInput.addEventListener('change', () => {
    const file = supplierImportInput.files && supplierImportInput.files[0];
    if (!file) return;

    showSupplierImportPreview(file);
  });
}

if (closeSupplierImportModalBtn) {
  closeSupplierImportModalBtn.addEventListener('click', closeSupplierImportModal);
}

if (closeSupplierImportBtn) {
  closeSupplierImportBtn.addEventListener('click', closeSupplierImportModal);
}

if (changeSupplierImportFileBtn) {
  changeSupplierImportFileBtn.addEventListener('click', () => {
    closeSupplierImportModal();
    if (!supplierImportInput) return;
    supplierImportInput.value = '';
    supplierImportInput.click();
  });
}

if (supplierImportModal) {
  supplierImportModal.addEventListener('click', (e) => {
    if (e.target === supplierImportModal) closeSupplierImportModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && supplierImportModal && supplierImportModal.classList.contains('show')) {
    closeSupplierImportModal();
  }
});

/* ════════════════════════════
   VIEW SUPPLIER MODAL
════════════════════════════ */
const viewModal    = document.getElementById('viewModal');
const viewBody     = document.getElementById('viewBody');
const closeViewBtn = document.getElementById('closeViewBtn');
const closeViewBtn2= document.getElementById('closeViewBtn2');
const editFromView = document.getElementById('editFromViewBtn');
let currentViewIndex = null;

function openViewModal(index) {
  currentViewIndex = index;
  const sup = suppliers[index];

  viewBody.innerHTML = `
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Supplier Name</span>
        <span class="view-value">${sup.name}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Contact Person</span>
        <span class="view-value">${sup.contact}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Phone</span>
        <span class="view-value">${sup.phone}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Email</span>
        <span class="view-value">${sup.email}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">City</span>
        <span class="view-value">${sup.city}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Status</span>
        <span class="view-value">
          <span class="sup-badge ${sup.status === 'Active' ? 'active' : 'inactive'}">
            ${sup.status}
          </span>
        </span>
      </div>
    </div>
    ${sup.address ? `
    <div class="view-field">
      <span class="view-label">Address</span>
      <span class="view-value">${sup.address}</span>
    </div>` : ''}
    ${sup.notes ? `
    <div class="view-field">
      <span class="view-label">Notes</span>
      <span class="view-value">${sup.notes}</span>
    </div>` : ''}
  `;

  viewModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeViewModal() {
  viewModal.classList.remove('show');
  document.body.style.overflow = '';
}

closeViewBtn.addEventListener('click', closeViewModal);
closeViewBtn2.addEventListener('click', closeViewModal);
viewModal.addEventListener('click', (e) => {
  if (e.target === viewModal) closeViewModal();
});

editFromView.addEventListener('click', () => {
  closeViewModal();
  openEditModal(currentViewIndex);
});

// ── Initial render ──
renderSuppliers(suppliers);