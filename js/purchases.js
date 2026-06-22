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

const purchasesBody = document.getElementById('purchasesBody');
const supplierFilter = document.getElementById('supplierFilter');
const statusFilter = document.getElementById('statusFilter');
const resultsText = document.getElementById('resultsText');

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
      alert(`Printing order ${o.id}...`);
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
  alert('Add Supplier — open your Suppliers page or modal here.');
});

document.getElementById('qaImport').addEventListener('click', () => {
  alert('Import Purchase — open your import dialog here.');
});

document.getElementById('importBtn').addEventListener('click', () => {
  alert('Import — open your import dialog here.');
});

// ── Initial render ──
renderOrders(orders);