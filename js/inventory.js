// ── Sample medicine data ──
const medicines = [
  {
    name: 'Paracetamol 500mg',
    form: 'Tablet',
    category: 'Pain Relief',
    stock: 1500,
    expiry: 'Dec 2030',
    status: 'In stock',
    color: '#136F5E',
    img: 'images/paracetamoll.jpg'
  },
  {
    name: 'Omeprazole 20mg',
    form: 'Capsule',
    category: 'Gastrointestinal',
    stock: 40,
    expiry: 'Jan 2027',
    status: 'Low Stock',
    color: '#d6336c',
    img: 'images/omeprazole.jpg'
  },
  {
    name: 'Cetirizine 10mg',
    form: 'Tablet',
    category: 'Antihistamine',
    stock: 0,
    expiry: 'Dec 2025',
    status: 'Out Of stock',
    color: '#3b82f6',
    img: 'images/cetirizine.jpg'
  },
  {
    name: 'Cough Syrup',
    form: 'Syrup',
    category: 'Cold & Cough',
    stock: 3500,
    expiry: 'Jun 2030',
    status: 'In stock',
    color: '#f59e0b',
    img: 'images/CoughSyrup.jpg'
  },
  {
    name: 'Amoxicillin 500mg',
    form: 'Capsule',
    category: 'Antibiotics',
    stock: 80,
    expiry: 'Aug 2028',
    status: 'In stock',
    color: '#2563eb',
    img: 'images/Amoxicillin.jpg'
  },
  {
    name: 'Vitamin C 500mg',
    form: 'Tablet',
    category: 'Vitamins',
    stock: 20,
    expiry: 'Sep 2027',
    status: 'Low Stock',
    color: '#f97316',
    img: 'images/VitaminC.jpg'
  }
];

const inventoryBody = document.getElementById('inventoryBody');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const resultsText = document.getElementById('resultsText');
const resetBtn = document.getElementById('resetBtn');
const selectAll = document.getElementById('selectAll');

// ── Status badge class + text mapping ──
function getStatusBadge(status) {
  const map = {
    'In stock': { cls: 'in-stock', text: 'In stock' },
    'Low Stock': { cls: 'low-stock', text: 'Low Stock' },
    'Out Of stock': { cls: 'out-stock', text: 'Out Of stock' }
  };
  return map[status] || { cls: 'in-stock', text: status };
}

// ── Stock number color class ──
function getStockClass(stock) {
  if (stock === 0) return 'stock-out';
  if (stock <= 50) return 'stock-low';
  return 'stock-ok';
}

// ── Update KPI cards based on current medicines array ──
function updateKPIs() {
  const total = medicines.length;
  const inStock = medicines.filter(m => m.status === 'In stock').length;
  const lowStock = medicines.filter(m => m.status === 'Low Stock').length;
  const outStock = medicines.filter(m => m.status === 'Out Of stock').length;

  document.getElementById('kpiTotal').textContent = total;
  document.getElementById('kpiInStock').textContent = inStock;
  document.getElementById('kpiLowStock').textContent = lowStock;
  document.getElementById('kpiOutStock').textContent = outStock;
  // kpiExpiring stays static (no expiry-tracking logic yet)
}

// ── Render table rows ──
function renderInventory(data) {
  inventoryBody.innerHTML = '';

  if (data.length === 0) {
    inventoryBody.innerHTML = `
      <tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">
        No medicines found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 results';
    updateKPIs();
    return;
  }

  data.forEach((med) => {
    const badge = getStatusBadge(med.status);
    const stockClass = getStockClass(med.stock);
    const realIndex = medicines.indexOf(med);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" class="row-check"></td>
      <td>
        <div class="med-cell">
          <img class="med-thumb" src="${med.img}" alt="${med.name}" onerror="this.style.background='${med.color}20'; this.src='';">
          <div class="med-cell-info">
            <p class="med-cell-name">${med.name}</p>
            <p class="med-cell-form">${med.form}</p>
          </div>
        </div>
      </td>
      <td>${med.category}</td>
      <td><span class="stock-num ${stockClass}">${med.stock}</span></td>
      <td>${med.expiry}</td>
      <td><span class="inv-badge ${badge.cls}">${badge.text}</span></td>
      <td>
        <div class="action-cell">
          <button class="action-btn edit-btn" title="Edit" data-index="${realIndex}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <div class="more-wrap">
            <button class="action-btn more-btn" title="More" data-index="${realIndex}">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div class="more-dropdown" id="dropdown-${realIndex}">
              <button class="dropdown-item view-item" data-index="${realIndex}">
                <i class="fa-solid fa-eye"></i> View Details
              </button>
              <button class="dropdown-item duplicate-item" data-index="${realIndex}">
                <i class="fa-solid fa-copy"></i> Duplicate
              </button>
              <button class="dropdown-item delete-item" data-index="${realIndex}">
                <i class="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </td>
    `;
    inventoryBody.appendChild(row);
  });

  resultsText.textContent = `Showing 1 to ${data.length} results`;
  attachActionListeners();
  updateKPIs();
}

// ── Attach Edit / More / View / Duplicate / Delete listeners ──
function attachActionListeners() {

  // EDIT button — opens modal pre-filled
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      openEditModal(i);
    });
  });

  // MORE (3-dot) button — toggle dropdown
  document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = btn.dataset.index;
      const dropdown = document.getElementById(`dropdown-${i}`);

      document.querySelectorAll('.more-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });

      dropdown.classList.toggle('show');
    });
  });

  // VIEW DETAILS
  document.querySelectorAll('.view-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const med = medicines[i];
      alert(`Medicine Details:\n\nName: ${med.name}\nForm: ${med.form}\nCategory: ${med.category}\nStock: ${med.stock}\nExpiry: ${med.expiry}\nStatus: ${med.status}`);
      closeAllDropdowns();
    });
  });

  // DUPLICATE
  document.querySelectorAll('.duplicate-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const med = { ...medicines[i] };
      med.name = med.name + ' (Copy)';
      medicines.push(med);
      applyFilters();
      closeAllDropdowns();
    });
  });

  // DELETE
  document.querySelectorAll('.delete-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const med = medicines[i];
      if (confirm(`Are you sure you want to delete "${med.name}"?`)) {
        medicines.splice(i, 1);
        applyFilters();
      }
      closeAllDropdowns();
    });
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.more-dropdown').forEach(d => d.classList.remove('show'));
}

// Close dropdown when clicking anywhere outside
document.addEventListener('click', closeAllDropdowns);

// ── Filter logic ──
function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const status = statusFilter.value;

  const filtered = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(search);
    const matchesCategory = !category || med.category === category;
    const matchesStatus = !status || med.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  renderInventory(filtered);
}

// ── Event listeners ──
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
statusFilter.addEventListener('change', applyFilters);

resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = '';
  statusFilter.value = '';
  document.getElementById('supplierFilter').value = '';
  renderInventory(medicines);
});

selectAll.addEventListener('change', () => {
  document.querySelectorAll('.row-check').forEach(cb => {
    cb.checked = selectAll.checked;
  });
});

/* ════════════════════════════
   ADD / EDIT MEDICINE MODAL
════════════════════════════ */

const modal = document.getElementById('addMedicineModal');
const modalTitle = document.getElementById('modalTitle');
const medicineForm = document.getElementById('medicineForm');
const addMedicineBtn = document.getElementById('addMedicineBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const editIndexInput = document.getElementById('editIndex');

// ── Open modal for ADD ──
addMedicineBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Add New Medicine';
  medicineForm.reset();
  editIndexInput.value = '';
  openModal();
});

// ── Open modal for EDIT ──
function openEditModal(index) {
  const med = medicines[index];
  modalTitle.textContent = 'Edit Medicine';

  document.getElementById('medName').value = med.name;
  document.getElementById('medForm').value = med.form;
  document.getElementById('medCategory').value = med.category;
  document.getElementById('medStock').value = med.stock;
  document.getElementById('medImage').value = med.img || '';
  document.getElementById('medPrice').value = med.price || '';
  document.getElementById('medNotes').value = med.notes || '';
  document.getElementById('medExpiry').value = convertExpiryToInputFormat(med.expiry);

  editIndexInput.value = index;
  openModal();
}

function openModal() {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  medicineForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// ── Convert month input (2030-12) to display format (Dec 2030) ──
function formatExpiry(monthValue) {
  if (!monthValue) return '';
  const [year, month] = monthValue.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

// ── Convert display format (Dec 2030) back to month input (2030-12) ──
function convertExpiryToInputFormat(expiryText) {
  if (!expiryText) return '';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const parts = expiryText.split(' ');
  const monthIndex = months.indexOf(parts[0]);
  if (monthIndex === -1) return '';
  const month = String(monthIndex + 1).padStart(2, '0');
  return `${parts[1]}-${month}`;
}

// ── Determine status automatically based on stock ──
function getAutoStatus(stock) {
  if (stock === 0) return 'Out Of stock';
  if (stock <= 50) return 'Low Stock';
  return 'In stock';
}

// ── Random color for new medicine thumbnail fallback ──
function getRandomColor() {
  const colors = ['#136F5E', '#d6336c', '#3b82f6', '#f59e0b', '#2563eb', '#f97316', '#8b5cf6', '#06b6d4'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ── Handle form submit (Add or Edit) ──
medicineForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('medName').value.trim();
  const form = document.getElementById('medForm').value;
  const category = document.getElementById('medCategory').value;
  const stock = parseInt(document.getElementById('medStock').value, 10);
  const expiryRaw = document.getElementById('medExpiry').value;
  const price = document.getElementById('medPrice').value;
  const img = document.getElementById('medImage').value.trim();
  const notes = document.getElementById('medNotes').value.trim();

  if (!name || !form || !category || isNaN(stock) || !expiryRaw) {
    alert('Please fill in all required fields.');
    return;
  }

  const editIndex = editIndexInput.value;

  const medicineData = {
    name,
    form,
    category,
    stock,
    expiry: formatExpiry(expiryRaw),
    status: getAutoStatus(stock),
    price: price || '',
    img: img || 'images/placeholder.jpg',
    color: editIndex !== '' ? medicines[editIndex].color : getRandomColor(),
    notes
  };

  if (editIndex !== '') {
    medicines[editIndex] = medicineData;
  } else {
    medicines.push(medicineData);
  }

  closeModal();
  applyFilters();
});

document.getElementById('importBtn').addEventListener('click', () => {
  alert('Import clicked — open your import dialog here.');
});

// ── Initial render ──
renderInventory(medicines);