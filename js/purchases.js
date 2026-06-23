// ── Sample purchase orders data ──
const orders = [
  {
    id: 'PO 0010',
    supplier: 'T.K.D. Silva',
    orderDate: '12 Jun 2026',
    delivery: '17 Jun 2026',
    amount: 2500.00,
    status: 'Shipped'
  },
  {
    id: 'PO 0011',
    supplier: 'L.D.Manoj',
    orderDate: '15 Jun 2026',
    delivery: '20 Jun 2026',
    amount: 1000.75,
    status: 'Received'
  },
  {
    id: 'PO 0012',
    supplier: 'D.M. Palitha',
    orderDate: '16 Jun 2026',
    delivery: '21 Jun 2026',
    amount: 1300.00,
    status: 'Received'
  },
  {
    id: 'PO 0013',
    supplier: 'R.S.D.Dias',
    orderDate: '18 Jun 2026',
    delivery: '23 Jun 2026',
    amount: 7500.00,
    status: 'Pending'
  },
  {
    id: 'PO 0014',
    supplier: 'S.K.N.Sujatha',
    orderDate: '19 Jun 2026',
    delivery: '24 Jun 2026',
    amount: 4775.00,
    status: 'Shipped'
  },
  {
    id: 'PO 0015',
    supplier: 'C.P.H.Mala',
    orderDate: '21 Jun 2026',
    delivery: '26 Jun 2026',
    amount: 2300.50,
    status: 'Cancelled'
  }
];

const suppliers = Array.from(new Set(orders.map(order => order.supplier)));

const purchasesBody = document.getElementById('purchasesBody');
const supplierFilter = document.getElementById('supplierFilter');
const statusFilter = document.getElementById('statusFilter');
const resultsText = document.getElementById('resultsText');
const purchaseImportInput = document.getElementById('purchaseImportInput');
const purchaseImportModal = document.getElementById('purchaseImportModal');
const closePurchaseImportModalBtn = document.getElementById('closePurchaseImportModalBtn');
const closePurchaseImportBtn = document.getElementById('closePurchaseImportBtn');
const changeImportFileBtn = document.getElementById('changeImportFileBtn');
const purchaseImportName = document.getElementById('purchaseImportName');
const purchaseImportMeta = document.getElementById('purchaseImportMeta');
const purchaseImportPreview = document.getElementById('purchaseImportPreview');
const addSupplierModal = document.getElementById('addSupplierModal');
const supplierForm = document.getElementById('supplierForm');
const closeSupplierModalBtn = document.getElementById('closeSupplierModalBtn');
const cancelSupplierModalBtn = document.getElementById('cancelSupplierModalBtn');
const editSupplierIndex = document.getElementById('editSupplierIndex');

const supplierIdField = document.getElementById('supplierId');
const supplierNameField = document.getElementById('supplierName');
const companyNameField = document.getElementById('companyName');
const contactPersonField = document.getElementById('contactPerson');
const supplierPhoneField = document.getElementById('supplierPhone');
const supplierEmailField = document.getElementById('supplierEmail');
const supplierAddressField = document.getElementById('supplierAddress');
const supplierCategoryField = document.getElementById('supplierCategory');
const paymentTermsField = document.getElementById('paymentTerms');
const supplierNotesField = document.getElementById('supplierNotes');
let purchaseImportObjectUrl = '';

// ── Status badge class mapping ──
function getStatusBadge(status) {
  const map = {
    'Shipped':   { cls: 'shipped',   text: 'Shipped' },
    'Received':  { cls: 'received',  text: 'Received' },
    'Pending':   { cls: 'pending',   text: 'Pending' },
    'Cancelled': { cls: 'cancelled', text: 'Cancelled' }
  };
  return map[status] || { cls: 'pending', text: status };
}

// ── Format currency ──
function formatAmount(amount) {
  return 'RS. ' + amount.toFixed(2);
}

function openOrderPrintView(order) {
  const printWindow = window.open('', '_blank', 'width=900,height=700');

  if (!printWindow) {
    alert('Please allow pop-ups to print the purchase order.');
    return;
  }

  const printContent = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Print ${order.id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 32px;
          color: #1f2937;
        }
        .sheet {
          max-width: 760px;
          margin: 0 auto;
          border: 1px solid #d1d5db;
          border-radius: 16px;
          padding: 28px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          border-bottom: 2px solid #0f766e;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .brand {
          margin: 0;
          font-size: 24px;
          color: #0f766e;
        }
        .subtle {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 13px;
        }
        .badge {
          display: inline-block;
          padding: 8px 12px;
          border-radius: 999px;
          background: #e0f2fe;
          color: #075985;
          font-weight: 700;
          font-size: 12px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 24px;
        }
        .field {
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fafafa;
        }
        .label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .value {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          word-break: break-word;
        }
        .full {
          grid-column: 1 / -1;
        }
        .amount {
          font-size: 22px;
          color: #0f766e;
        }
        .notes {
          white-space: pre-wrap;
          line-height: 1.5;
        }
        .footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
        }
        @media print {
          body {
            padding: 0;
          }
          .sheet {
            border: none;
            border-radius: 0;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="sheet">
        <div class="header">
          <div>
            <h1 class="brand">PharmaPlus</h1>
            <p class="subtle">Purchase Order Printout</p>
            <p class="subtle">Generated on ${new Date().toLocaleString()}</p>
          </div>
          <div class="badge">${order.status}</div>
        </div>

        <div class="grid">
          <div class="field">
            <span class="label">Order ID</span>
            <div class="value">${order.id}</div>
          </div>
          <div class="field">
            <span class="label">Supplier</span>
            <div class="value">${order.supplier}</div>
          </div>
          <div class="field">
            <span class="label">Order Date</span>
            <div class="value">${order.orderDate}</div>
          </div>
          <div class="field">
            <span class="label">Expected Delivery</span>
            <div class="value">${order.delivery}</div>
          </div>
          <div class="field full">
            <span class="label">Total Amount</span>
            <div class="value amount">${formatAmount(order.amount)}</div>
          </div>
          <div class="field full">
            <span class="label">Notes</span>
            <div class="value notes">${order.notes || 'No notes provided.'}</div>
          </div>
        </div>

        <div class="footer">
          This document was generated from the purchase management system.
        </div>
      </div>

      <script>
        window.addEventListener('load', function () {
          window.print();
          window.onafterprint = function () {
            window.close();
          };
        });
      <\/script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
}

function generateNextSupplierId() {
  return 'SUP ' + String(suppliers.length + 1).padStart(4, '0');
}

function renderSupplierOptions() {
  const optionsHtml = ['<option value="">Select supplier</option>']
    .concat(suppliers.map(name => `<option value="${name}">${name}</option>`))
    .join('');

  document.getElementById('orderSupplier').innerHTML = optionsHtml;
  supplierFilter.innerHTML = ['<option value="">All Suppliers</option>']
    .concat(suppliers.map(name => `<option value="${name}">${name}</option>`))
    .join('');
}

// ── Render table rows ──
function renderOrders(data) {
  purchasesBody.innerHTML = '';

  if (data.length === 0) {
    purchasesBody.innerHTML = `
      <tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">
        No purchase orders found.
      </td></tr>`;
    resultsText.textContent = 'Showing 0 results';
    return;
  }

  data.forEach((order) => {
    const badge = getStatusBadge(order.status);
    const realIndex = orders.indexOf(order);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${order.id}</strong></td>
      <td>${order.supplier}</td>
      <td>${order.orderDate}</td>
      <td>${order.delivery}</td>
      <td>${formatAmount(order.amount)}</td>
      <td><span class="pur-badge ${badge.cls}">${badge.text}</span></td>
      <td>
        <div class="action-cell">
          <button class="action-btn view-btn" title="View" data-index="${realIndex}">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="action-btn print-btn" title="Print" data-index="${realIndex}">
            <i class="fa-solid fa-print"></i>
          </button>
          <div class="more-wrap">
            <button class="action-btn more-btn" title="More" data-index="${realIndex}">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div class="more-dropdown" id="dropdown-${realIndex}">
              <button class="dropdown-item edit-item" data-index="${realIndex}">
                <i class="fa-solid fa-pen"></i> Edit Order
              </button>
              <button class="dropdown-item duplicate-item" data-index="${realIndex}">
                <i class="fa-solid fa-copy"></i> Duplicate
              </button>
              <button class="dropdown-item cancel-item" data-index="${realIndex}">
                <i class="fa-solid fa-ban"></i> Cancel Order
              </button>
            </div>
          </div>
        </div>
      </td>
    `;
    purchasesBody.appendChild(row);
  });

  resultsText.textContent = `Showing 1 to ${data.length} results`;
  attachActionListeners();
}

// ── Action listeners ──
function attachActionListeners() {

  // VIEW
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const o = orders[i];
      alert(`Order Details:\n\nID: ${o.id}\nSupplier: ${o.supplier}\nOrder Date: ${o.orderDate}\nDelivery: ${o.delivery}\nAmount: ${formatAmount(o.amount)}\nStatus: ${o.status}`);
    });
  });

  // PRINT
  document.querySelectorAll('.print-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const o = orders[i];
      openOrderPrintView(o);
    });
  });

  // MORE toggle
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

  // EDIT
  document.querySelectorAll('.edit-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      openEditModal(i);
      closeAllDropdowns();
    });
  });

  // DUPLICATE
  document.querySelectorAll('.duplicate-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      const order = { ...orders[i] };
      // Generate new ID
      const lastNum = parseInt(orders[orders.length - 1].id.replace('PO ', ''), 10);
      order.id = 'PO ' + String(lastNum + 1).padStart(4, '0');
      orders.push(order);
      applyFilters();
      closeAllDropdowns();
    });
  });

  // CANCEL ORDER
  document.querySelectorAll('.cancel-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.index;
      if (confirm(`Cancel order ${orders[i].id}?`)) {
        orders[i].status = 'Cancelled';
        applyFilters();
      }
      closeAllDropdowns();
    });
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('.more-dropdown').forEach(d => d.classList.remove('show'));
}

document.addEventListener('click', closeAllDropdowns);

function resetPurchaseImportPreview() {
  if (purchaseImportObjectUrl) {
    URL.revokeObjectURL(purchaseImportObjectUrl);
    purchaseImportObjectUrl = '';
  }

  if (purchaseImportName) purchaseImportName.textContent = 'No file selected';
  if (purchaseImportMeta) purchaseImportMeta.textContent = 'Choose an image or PDF to preview it here.';
  if (purchaseImportPreview) {
    purchaseImportPreview.innerHTML = '<div class="import-preview-empty">Select an image or PDF to preview it.</div>';
  }
}

function openPurchaseImportModal() {
  if (!purchaseImportModal) return;
  purchaseImportModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePurchaseImportModal() {
  if (!purchaseImportModal) return;
  purchaseImportModal.classList.remove('show');
  document.body.style.overflow = '';
  resetPurchaseImportPreview();
}

function showPurchaseImportPreview(file) {
  if (!purchaseImportPreview || !purchaseImportName || !purchaseImportMeta) return;

  resetPurchaseImportPreview();

  purchaseImportName.textContent = file.name;
  purchaseImportMeta.textContent = `${file.type || 'Unknown type'} • ${(file.size / 1024).toFixed(1)} KB`;

  const objectUrl = URL.createObjectURL(file);
  purchaseImportObjectUrl = objectUrl;

  if (file.type.startsWith('image/')) {
    const image = document.createElement('img');
    image.className = 'import-preview-media';
    image.src = objectUrl;
    image.alt = file.name;
    purchaseImportPreview.innerHTML = '';
    purchaseImportPreview.appendChild(image);
    openPurchaseImportModal();
    return;
  }

  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    const frame = document.createElement('iframe');
    frame.className = 'import-preview-frame';
    frame.src = objectUrl;
    frame.title = file.name;
    purchaseImportPreview.innerHTML = '';
    purchaseImportPreview.appendChild(frame);
    openPurchaseImportModal();
    return;
  }

  purchaseImportPreview.innerHTML = '<div class="import-preview-empty">This file type is not supported. Please choose an image or PDF.</div>';
  openPurchaseImportModal();
}

function openPurchaseImportPicker() {
  if (!purchaseImportInput) return;
  purchaseImportInput.value = '';
  purchaseImportInput.click();
}

purchaseImportInput.addEventListener('change', () => {
  const file = purchaseImportInput.files && purchaseImportInput.files[0];
  if (!file) return;

  showPurchaseImportPreview(file);
});

if (closePurchaseImportModalBtn) {
  closePurchaseImportModalBtn.addEventListener('click', closePurchaseImportModal);
}

if (closePurchaseImportBtn) {
  closePurchaseImportBtn.addEventListener('click', closePurchaseImportModal);
}

if (changeImportFileBtn) {
  changeImportFileBtn.addEventListener('click', () => {
    closePurchaseImportModal();
    openPurchaseImportPicker();
  });
}

if (purchaseImportModal) {
  purchaseImportModal.addEventListener('click', (e) => {
    if (e.target === purchaseImportModal) closePurchaseImportModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && purchaseImportModal && purchaseImportModal.classList.contains('show')) {
    closePurchaseImportModal();
  }
});

function openSupplierModal() {
  supplierForm.reset();
  supplierIdField.value = generateNextSupplierId();
  editSupplierIndex.value = '';
  addSupplierModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSupplierModal() {
  addSupplierModal.classList.remove('show');
  document.body.style.overflow = '';
  supplierForm.reset();
}

closeSupplierModalBtn.addEventListener('click', closeSupplierModal);
cancelSupplierModalBtn.addEventListener('click', closeSupplierModal);
addSupplierModal.addEventListener('click', (e) => { if (e.target === addSupplierModal) closeSupplierModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && addSupplierModal.classList.contains('show')) closeSupplierModal();
});

supplierForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const supplierName = supplierNameField.value.trim();
  const supplierPhone = supplierPhoneField.value.trim();
  const supplierAddress = supplierAddressField.value.trim();

  if (!supplierName || !supplierPhone || !supplierAddress) {
    alert('Please fill in all required supplier fields.');
    return;
  }

  if (!suppliers.includes(supplierName)) {
    suppliers.push(supplierName);
    suppliers.sort((left, right) => left.localeCompare(right));
    renderSupplierOptions();
  }

  alert(`Supplier saved: ${supplierName}`);
  closeSupplierModal();
});

// ── Filter logic ──
function applyFilters() {
  const supplier = supplierFilter.value;
  const status = statusFilter.value;

  const filtered = orders.filter(o => {
    const matchSupplier = !supplier || o.supplier === supplier;
    const matchStatus = !status || o.status === status;
    return matchSupplier && matchStatus;
  });

  renderOrders(filtered);
}

supplierFilter.addEventListener('change', applyFilters);
statusFilter.addEventListener('change', applyFilters);

/* ════════════════════════════
   MODAL — New / Edit Order
════════════════════════════ */
const modal = document.getElementById('newOrderModal');
const orderForm = document.getElementById('orderForm');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const editOrderIndex = document.getElementById('editOrderIndex');
const modalTitle = document.getElementById('modalTitle');

function generateNextId() {
  const lastNum = parseInt(orders[orders.length - 1].id.replace('PO ', ''), 10);
  return 'PO ' + String(lastNum + 1).padStart(4, '0');
}

function formatDateForInput(dateStr) {
  // Converts "12 Jun 2026" → "2026-06-12"
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const parts = dateStr.split(' ');
  const day = parts[0].padStart(2, '0');
  const month = String(months.indexOf(parts[1]) + 1).padStart(2, '0');
  const year = parts[2];
  return `${year}-${month}-${day}`;
}

function formatDateForDisplay(inputDate) {
  // Converts "2026-06-12" → "12 Jun 2026"
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const [year, month, day] = inputDate.split('-');
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

// ── Open ADD modal ──
document.getElementById('newOrderBtn').addEventListener('click', () => {
  modalTitle.textContent = 'New Purchase Order';
  orderForm.reset();
  document.getElementById('orderId').value = generateNextId();
  editOrderIndex.value = '';
  openModal();
});

// ── Open EDIT modal ──
function openEditModal(index) {
  const o = orders[index];
  modalTitle.textContent = 'Edit Purchase Order';

  document.getElementById('orderId').value = o.id;
  document.getElementById('orderSupplier').value = o.supplier;
  document.getElementById('orderDate').value = formatDateForInput(o.orderDate);
  document.getElementById('deliveryDate').value = formatDateForInput(o.delivery);
  document.getElementById('orderAmount').value = o.amount;
  document.getElementById('orderStatus').value = o.status;
  document.getElementById('orderNotes').value = o.notes || '';

  editOrderIndex.value = index;
  openModal();
}

function openModal() {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  orderForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// ── Form submit ──
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const supplier = document.getElementById('orderSupplier').value;
  const orderDate = document.getElementById('orderDate').value;
  const deliveryDate = document.getElementById('deliveryDate').value;
  const amount = parseFloat(document.getElementById('orderAmount').value);
  const status = document.getElementById('orderStatus').value;
  const notes = document.getElementById('orderNotes').value;

  if (!supplier || !orderDate || !deliveryDate || isNaN(amount) || !status) {
    alert('Please fill in all required fields.');
    return;
  }

  const orderData = {
    id: document.getElementById('orderId').value,
    supplier,
    orderDate: formatDateForDisplay(orderDate),
    delivery: formatDateForDisplay(deliveryDate),
    amount,
    status,
    notes
  };

  const idx = editOrderIndex.value;
  if (idx !== '') {
    orders[idx] = orderData;
  } else {
    orders.push(orderData);
  }

  closeModal();
  applyFilters();
});

// ── Quick Actions ──
document.getElementById('qaNewOrder').addEventListener('click', () => {
  modalTitle.textContent = 'New Purchase Order';
  orderForm.reset();
  document.getElementById('orderId').value = generateNextId();
  editOrderIndex.value = '';
  openModal();
});

document.getElementById('qaAddSupplier').addEventListener('click', () => {
  openSupplierModal();
});

document.getElementById('qaImport').addEventListener('click', () => {
  openPurchaseImportPicker();
});

document.getElementById('importBtn').addEventListener('click', () => {
  openPurchaseImportPicker();
});

// ── Initial render ──
renderSupplierOptions();
renderOrders(orders);