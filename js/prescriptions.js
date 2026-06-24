// ── Sample prescriptions data ──
const prescriptions = [
  {
    id: 'PRE_058',
    patient: 'M.J.I. Silva',
    doctor: 'Dr K.P.Himash',
    date: '2026.06.20',
    item: 'Colombo',
    status: 'Dispensed',
    notes: ''
  },
  {
    id: 'PRE_059',
    patient: 'I.J.Manel',
    doctor: 'Dr Y.L.Saman',
    date: '2026.06.22',
    item: 'Gampaha',
    status: 'Dispensed',
    notes: ''
  },
  {
    id: 'PRE_060',
    patient: 'D.U.W.Silva',
    doctor: 'Dr N.M.Perera',
    date: '2026.06.23',
    item: 'Colombo',
    status: 'Pending',
    notes: ''
  },
  {
    id: 'PRE_061',
    patient: 'A.S.M.Malsha',
    doctor: 'Dr W.L.Nimal',
    date: '2026.06.25',
    item: 'Kandy',
    status: 'Cancelled',
    notes: ''
  },
  {
    id: 'PRE_062',
    patient: 'S.S.M.Hettige',
    doctor: 'Dr P.W.Rudrigo',
    date: '2026.06.28',
    item: 'Galle',
    status: 'Pending',
    notes: ''
  },
  {
    id: 'PRE_063',
    patient: 'C.N.Hashim',
    doctor: 'Dr G.L.P.Fathima',
    date: '2026.06.29',
    item: 'Colombo',
    status: 'Inactive',
    notes: ''
  }
];

// ── DOM elements ──
const prescriptionsBody = document.getElementById('prescriptionsBody');
const searchInput       = document.getElementById('searchInput');
const statusFilter      = document.getElementById('statusFilter');
const doctorFilter      = document.getElementById('doctorFilter');
const resultsText       = document.getElementById('resultsText');

// ── Generate next ID ──
function generateNextId() {
  const nums = prescriptions.map(p =>
    parseInt(p.id.replace('PRE_', ''), 10)
  );
  const next = Math.max(...nums) + 1;
  return 'PRE_' + String(next).padStart(3, '0');
}

// ── Status badge class mapping ──
function getStatusBadge(status) {
  const map = {
    'Dispensed': { cls: 'dispensed', text: 'Dispensed' },
    'Pending':   { cls: 'pending',   text: 'Pending'   },
    'Cancelled': { cls: 'cancelled', text: 'Cancelled' },
    'Inactive':  { cls: 'inactive',  text: 'Inactive'  }
  };
  return map[status] || { cls: 'pending', text: status };
}

// ── Convert date formats ──
function toInputDate(d) {
  return d ? d.replace(/\./g, '-') : '';
}

function toDisplayDate(d) {
  return d ? d.replace(/-/g, '.') : '';
}

// ── Update KPI counts ──
function updateKPIs() {
  document.getElementById('kpiTotal').textContent =
    prescriptions.length;
  document.getElementById('kpiDispensed').textContent =
    prescriptions.filter(p => p.status === 'Dispensed').length;
  document.getElementById('kpiPending').textContent =
    prescriptions.filter(p => p.status === 'Pending').length;
}

// ── Render table rows ──
function renderPrescriptions(data) {
  prescriptionsBody.innerHTML = '';

  if (data.length === 0) {
    prescriptionsBody.innerHTML = `
      <tr><td colspan="7"
        style="text-align:center;padding:30px;color:var(--text-muted);">
        No prescriptions found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 results';
    updateKPIs();
    return;
  }

  data.forEach((pre) => {
    const realIndex = prescriptions.indexOf(pre);
    const badge     = getStatusBadge(pre.status);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="pre-id">${pre.id}</td>
      <td>${pre.patient}</td>
      <td>${pre.doctor}</td>
      <td>${pre.date}</td>
      <td>${pre.item}</td>
      <td>
        <span class="pre-badge ${badge.cls}">${badge.text}</span>
      </td>
      <td>
        <div class="action-cell">
          <button class="action-btn view-btn"
            title="View" data-index="${realIndex}">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="action-btn print-btn"
            title="Print" data-index="${realIndex}">
            <i class="fa-solid fa-print"></i>
          </button>
          <div class="more-wrap">
            <button class="action-btn more-btn"
              title="More" data-index="${realIndex}">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div class="more-dropdown" id="dropdown-${realIndex}">
              <button class="dropdown-item edit-item"
                data-index="${realIndex}">
                <i class="fa-solid fa-pen"></i> Edit
              </button>
              <button class="dropdown-item duplicate-item"
                data-index="${realIndex}">
                <i class="fa-solid fa-copy"></i> Duplicate
              </button>
              <button class="dropdown-item cancel-item"
                data-index="${realIndex}">
                <i class="fa-solid fa-ban"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </td>
    `;
    prescriptionsBody.appendChild(row);
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

  // PRINT
  document.querySelectorAll('.print-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = prescriptions[btn.dataset.index];
      alert(`Printing prescription ${p.id} for ${p.patient}...`);
    });
  });

  // MORE toggle
  document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = btn.dataset.index;
      const dd = document.getElementById(`dropdown-${i}`);
      document.querySelectorAll('.more-dropdown').forEach(d => {
        if (d !== dd) d.classList.remove('show');
      });
      dd.classList.toggle('show');
    });
  });

  // EDIT
  document.querySelectorAll('.edit-item').forEach(btn => {
    btn.addEventListener('click', () => {
      openEditModal(btn.dataset.index);
      closeAllDropdowns();
    });
  });

  // DUPLICATE
  document.querySelectorAll('.duplicate-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i   = btn.dataset.index;
      const pre = { ...prescriptions[i] };
      pre.id    = generateNextId();
      prescriptions.push(pre);
      applyFilters();
      closeAllDropdowns();
    });
  });

  // CANCEL
  document.querySelectorAll('.cancel-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      if (confirm(`Cancel prescription ${prescriptions[i].id}?`)) {
        prescriptions[i].status = 'Cancelled';
        applyFilters();
      }
      closeAllDropdowns();
    });
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.more-dropdown')
    .forEach(d => d.classList.remove('show'));
}

document.addEventListener('click', closeAllDropdowns);

// ── Filter logic ──
function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const doctor = doctorFilter.value;

  const filtered = prescriptions.filter(pre => {
    const matchSearch =
      pre.patient.toLowerCase().includes(search) ||
      pre.id.toLowerCase().includes(search)      ||
      pre.doctor.toLowerCase().includes(search);
    const matchStatus = !status || pre.status === status;
    const matchDoctor = !doctor || pre.doctor === doctor;
    return matchSearch && matchStatus && matchDoctor;
  });

  renderPrescriptions(filtered);
}

searchInput.addEventListener('input',   applyFilters);
statusFilter.addEventListener('change', applyFilters);
doctorFilter.addEventListener('change', applyFilters);

/* ════════════════════════════
   ADD / EDIT MODAL
════════════════════════════ */
const modal            = document.getElementById('prescriptionModal');
const prescriptionForm = document.getElementById('prescriptionForm');
const modalTitle       = document.getElementById('modalTitle');
const closeModalBtn    = document.getElementById('closeModalBtn');
const cancelModalBtn   = document.getElementById('cancelModalBtn');
const editPreIndex     = document.getElementById('editPreIndex');

// Open ADD
document.getElementById('newPrescriptionBtn').addEventListener('click', () => {
  modalTitle.textContent = 'New Prescription';
  prescriptionForm.reset();
  document.getElementById('preId').value = generateNextId();
  editPreIndex.value = '';
  openModal();
});

// Open EDIT
function openEditModal(index) {
  const pre = prescriptions[index];
  modalTitle.textContent = 'Edit Prescription';

  document.getElementById('preId').value      = pre.id;
  document.getElementById('prePatient').value = pre.patient;
  document.getElementById('preDoctor').value  = pre.doctor;
  document.getElementById('preDate').value    = toInputDate(pre.date);
  document.getElementById('preItem').value    = pre.item;
  document.getElementById('preStatus').value  = pre.status;
  document.getElementById('preNotes').value   = pre.notes || '';

  editPreIndex.value = index;
  openModal();
}

function openModal() {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  prescriptionForm.reset();
}

closeModalBtn.addEventListener('click',  closeModal);
cancelModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// Form submit
prescriptionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const patient = document.getElementById('prePatient').value.trim();
  const doctor  = document.getElementById('preDoctor').value;
  const date    = document.getElementById('preDate').value;
  const item    = document.getElementById('preItem').value.trim();
  const status  = document.getElementById('preStatus').value;
  const notes   = document.getElementById('preNotes').value.trim();

  if (!patient || !doctor || !date || !item || !status) {
    alert('Please fill in all required fields.');
    return;
  }

  const preData = {
    id:      document.getElementById('preId').value,
    patient,
    doctor,
    date:    toDisplayDate(date),
    item,
    status,
    notes
  };

  const idx = editPreIndex.value;
  if (idx !== '') {
    prescriptions[idx] = preData;
  } else {
    prescriptions.push(preData);
  }

  closeModal();
  applyFilters();
});

document.getElementById('importBtn').addEventListener('click', () => {
  alert('Import — open your import dialog here.');
});

/* ════════════════════════════
   VIEW MODAL
════════════════════════════ */
const viewModal     = document.getElementById('viewModal');
const viewBody      = document.getElementById('viewBody');
const closeViewBtn  = document.getElementById('closeViewBtn');
const closeViewBtn2 = document.getElementById('closeViewBtn2');
const editFromView  = document.getElementById('editFromViewBtn');
let currentViewIndex = null;

function openViewModal(index) {
  currentViewIndex = index;
  const pre   = prescriptions[index];
  const badge = getStatusBadge(pre.status);

  viewBody.innerHTML = `
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Prescription ID</span>
        <span class="view-value">${pre.id}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Patient Name</span>
        <span class="view-value">${pre.patient}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Doctor Name</span>
        <span class="view-value">${pre.doctor}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Date</span>
        <span class="view-value">${pre.date}</span>
      </div>
    </div>
    <div class="view-row">
      <div class="view-field">
        <span class="view-label">Item / Location</span>
        <span class="view-value">${pre.item}</span>
      </div>
      <div class="view-field">
        <span class="view-label">Status</span>
        <span class="view-value">
          <span class="pre-badge ${badge.cls}">${badge.text}</span>
        </span>
      </div>
    </div>
    ${pre.notes ? `
    <div class="view-field">
      <span class="view-label">Notes</span>
      <span class="view-value">${pre.notes}</span>
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
renderPrescriptions(prescriptions);