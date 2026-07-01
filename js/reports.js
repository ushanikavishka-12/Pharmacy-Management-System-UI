// ── Report configurations ──
const reportConfig = {
  sales: {
    title: 'Sales Report',
    icon:  'fa-solid fa-chart-line',
    color: 'linear-gradient(135deg, #20c997, #12b886)',
    summary: [
      { label: 'Total Sales',    value: 'RS. 84,500', sub: '+12.5% vs last month' },
      { label: 'Total Invoices', value: '124',        sub: 'This month' },
      { label: 'Avg Sale Value', value: 'RS. 681',    sub: 'Per invoice' },
      { label: 'Top Product',    value: 'Paracetamol',sub: '120 units sold' }
    ],
    tableHeaders: ['Invoice ID', 'Customer', 'Date & Time', 'Amount', 'Status'],
    tableRows: [
      ['INV-0012', 'Kamal Perera',    '2026-06-01 12:27 PM', 'RS. 2,450',  'paid'],
      ['INV-0013', 'Kushi Bandara',   '2026-06-01  1:00 PM', 'RS. 1,200',  'paid'],
      ['INV-0014', 'S. Fernando',     '2026-06-01  1:10 PM', 'RS. 5,800',  'pending'],
      ['INV-0015', 'Amal Kumara',     '2026-06-01  1:33 PM', 'RS. 980',    'paid'],
      ['INV-0016', 'Malshi Kavina',   '2026-06-01  1:37 PM', 'RS. 12,500', 'paid']
    ]
  },

  purchase: {
    title: 'Purchase Report',
    icon:  'fa-solid fa-cart-shopping',
    color: 'linear-gradient(135deg, #339af0, #1971c2)',
    summary: [
      { label: 'Total Orders',    value: '24',           sub: 'This month' },
      { label: 'Total Spent',     value: 'RS. 280,906',  sub: 'This month' },
      { label: 'Pending Orders',  value: '6',            sub: 'To be received' },
      { label: 'Top Supplier',    value: 'Hemas Pharma', sub: 'Most orders' }
    ],
    tableHeaders: ['Order ID', 'Supplier', 'Order Date', 'Amount', 'Status'],
    tableRows: [
      ['PO 0010', 'T.K.D. Silva',    '12 Jun 2026', 'RS. 2,500',  'shipped'],
      ['PO 0011', 'L.D.Manoj',       '15 Jun 2026', 'RS. 1,000',  'received'],
      ['PO 0012', 'D.M. Palitha',    '16 Jun 2026', 'RS. 1,300',  'received'],
      ['PO 0013', 'R.S.D.Dias',      '18 Jun 2026', 'RS. 7,500',  'pending'],
      ['PO 0014', 'S.K.N.Sujatha',   '19 Jun 2026', 'RS. 4,775',  'shipped']
    ]
  },

  inventory: {
    title: 'Inventory Report',
    icon:  'fa-solid fa-cube',
    color: 'linear-gradient(135deg, #9775fa, #7048e8)',
    summary: [
      { label: 'Total Medicines', value: '1,450', sub: 'In stock' },
      { label: 'Low Stock',       value: '28',    sub: 'Need reorder' },
      { label: 'Out of Stock',    value: '5',     sub: 'Unavailable' },
      { label: 'Expiring Soon',   value: '15',    sub: 'Within 60 days' }
    ],
    tableHeaders: ['Medicine', 'Category', 'Stock', 'Expiry', 'Status'],
    tableRows: [
      ['Paracetamol 500mg', 'Pain Relief',      '1500', 'Dec 2030', 'in-stock'],
      ['Omeprazole 20mg',   'Gastrointestinal', '40',   'Jan 2027', 'low-stock'],
      ['Cetirizine 10mg',   'Antihistamine',    '0',    'Dec 2025', 'out-stock'],
      ['Cough Syrup',       'Cold & Cough',     '3500', 'Jun 2030', 'in-stock'],
      ['Amoxicillin 500mg', 'Antibiotics',      '80',   'Aug 2028', 'in-stock']
    ]
  },

  supplier: {
    title: 'Supplier Report',
    icon:  'fa-solid fa-users',
    color: 'linear-gradient(135deg, #ff8787, #e64980)',
    summary: [
      { label: 'Total Suppliers', value: '12',          sub: 'Active suppliers' },
      { label: 'Total Orders',    value: '24',          sub: 'This month' },
      { label: 'Total Spent',     value: 'RS. 280,906', sub: 'This month' },
      { label: 'Total Due',       value: 'RS. 245,600', sub: 'Pending payments' }
    ],
    tableHeaders: ['Supplier', 'Contact', 'Phone', 'City', 'Status'],
    tableRows: [
      ['Hemas Pharmacy',       'T.K.D. Silva',   '011 234 5763', 'Colombo', 'active'],
      ['Thusitha Pharmacy',    'L.D.Manoj',      '011 278 7822', 'Gampaha', 'active'],
      ['Opsara Pharmacy',      'D.M. Palitha',   '011 230 9000', 'Colombo', 'active'],
      ['Neeroga Pharmacy',     'R.S.D.Dias',     '011 256 7887', 'Kandy',   'inactive'],
      ['Lanka Medics',         'S.K.N.Sujatha',  '011 412 7310', 'Galle',   'active']
    ]
  },

  customer: {
    title: 'Customer Report',
    icon:  'fa-solid fa-user',
    color: 'linear-gradient(135deg, #ff6b6b, #e03131)',
    summary: [
      { label: 'Total Customers',  value: '28',           sub: 'All customers' },
      { label: 'New Customers',    value: '7',            sub: 'This month' },
      { label: 'Total Sales',      value: 'RS. 520,390',  sub: 'This month' },
      { label: 'Repeat Customers', value: '15',           sub: 'This month' }
    ],
    tableHeaders: ['Customer ID', 'Name', 'Phone', 'City', 'Total Purchases'],
    tableRows: [
      ['CUS_078', 'M.J.I. Silva',   '011 234 5763', 'Colombo', 'RS. 12,500'],
      ['CUS_079', 'I.J.Manel',      '011 278 7822', 'Gampaha', 'RS.  2,750'],
      ['CUS_080', 'D.U.W.Silva',    '011 230 9000', 'Colombo', 'RS. 14,900'],
      ['CUS_081', 'A.S.M.Malsha',   '011 256 7887', 'Kandy',   'RS. 12,700'],
      ['CUS_082', 'S.S.M.Hettige',  '011 412 7310', 'Galle',   'RS.  2,000']
    ]
  },

  expiry: {
    title: 'Expiry Report',
    icon:  'fa-solid fa-file-lines',
    color: 'linear-gradient(135deg, #ffd43b, #e67700)',
    summary: [
      { label: 'Expiring in 30 days', value: '8',  sub: 'Urgent' },
      { label: 'Expiring in 60 days', value: '15', sub: 'Warning' },
      { label: 'Already Expired',     value: '3',  sub: 'Remove immediately' },
      { label: 'Total at Risk',       value: '26', sub: 'Need attention' }
    ],
    tableHeaders: ['Medicine', 'Category', 'Stock', 'Expiry Date', 'Status'],
    tableRows: [
      ['Cetirizine 10mg',    'Antihistamine',    '120', 'Dec 2025', 'expiring'],
      ['Vitamin C 500mg',    'Vitamins',         '50',  'Jan 2026', 'expiring'],
      ['Omeprazole 20mg',    'Gastrointestinal', '40',  'Jan 2027', 'expiring'],
      ['Ibuprofen 200mg',    'Pain Relief',      '200', 'Mar 2026', 'expiring'],
      ['Azithromycin 500mg', 'Antibiotics',      '30',  'Feb 2026', 'expiring']
    ]
  }
};

/* ════════════════════════════
   VIEW REPORT MODAL
════════════════════════════ */
const modal           = document.getElementById('reportModal');
const modalTitle      = document.getElementById('modalTitle');
const modalSubtitle   = document.getElementById('modalSubtitle');
const modalIcon       = document.getElementById('modalIcon');
const modalIconWrap   = document.getElementById('modalIconWrap');
const modalReportBody = document.getElementById('modalReportBody');
const closeModalBtn   = document.getElementById('closeModalBtn');
const printReportBtn  = document.getElementById('printReportBtn');
const downloadReportBtn = document.getElementById('downloadReportBtn');
const reportModalBox = modal.querySelector('.modal-box');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const dateRangeText = document.getElementById('dateRangeText');

let currentReportType = null;

// ── Build modal content ──
function buildReportContent(type) {
  const config = reportConfig[type];
  if (!config) return;

  // Header
  modalTitle.textContent    = config.title;
  modalSubtitle.textContent = dateRangeText.textContent;
  modalIcon.className       = config.icon;
  modalIconWrap.style.background = config.color;

  // Summary cards
  const summaryHTML = config.summary.map(s => `
    <div class="summary-card">
      <span class="summary-label">${s.label}</span>
      <span class="summary-value">${s.value}</span>
      <span class="summary-sub">${s.sub}</span>
    </div>
  `).join('');

  // Table rows
  const rowsHTML = config.tableRows.map(row => {
    const cells = row.slice(0, -1).map(cell => `<td>${cell}</td>`).join('');
    const lastCell = row[row.length - 1];
    const badgeCell = `<td><span class="r-badge ${lastCell}">${capitalize(lastCell.replace('-', ' '))}</span></td>`;
    return `<tr>${cells}${badgeCell}</tr>`;
  }).join('');

  const theadsHTML = config.tableHeaders.map(h => `<th>${h}</th>`).join('');

  modalReportBody.innerHTML = `
    <div class="report-summary-row">${summaryHTML}</div>
    <p class="report-table-title">Detailed Records</p>
    <div style="overflow-x:auto;">
      <table class="report-table">
        <thead><tr>${theadsHTML}</tr></thead>
        <tbody>${rowsHTML}</tbody>
      </table>
    </div>
  `;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Open modal ──
function openReportModal(type) {
  currentReportType = type;
  buildReportContent(type);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// ── Close modal ──
function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function formatDateForDisplay(dateValue) {
  if (!dateValue) return '';
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace(/ /g, ' ');
}

function syncDateRangeLabel() {
  const startValue = startDateInput.value;
  const endValue = endDateInput.value;

  if (!startValue || !endValue) {
    dateRangeText.textContent = 'Select a date range';
    return;
  }

  let start = startValue;
  let end = endValue;
  if (start > end) {
    [start, end] = [end, start];
    startDateInput.value = start;
    endDateInput.value = end;
  }

  dateRangeText.textContent = `${formatDateForDisplay(start)} - ${formatDateForDisplay(end)}`;
}

function setDateRange(startValue, endValue) {
  if (startValue) startDateInput.value = startValue;
  if (endValue) endDateInput.value = endValue;
  syncDateRangeLabel();
}

function normalizeExportFormat(rawFormat) {
  const format = (rawFormat || '').trim().toLowerCase();
  if (format === 'photo' || format === 'png' || format === 'image') return 'png';
  if (format === 'pdf') return 'pdf';
  return null;
}

function getDateRangeFileSuffix() {
  const value = dateRangeText.textContent.trim();
  if (!value) return '';
  return value
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

async function captureReport(type) {
  buildReportContent(type);

  const exportContainer = document.createElement('div');
  exportContainer.style.position = 'fixed';
  exportContainer.style.left = '-10000px';
  exportContainer.style.top = '0';
  exportContainer.style.background = '#fff';
  exportContainer.style.pointerEvents = 'none';

  const clone = reportModalBox.cloneNode(true);
  const actionBar = clone.querySelector('.modal-header-right');
  if (actionBar) actionBar.style.display = 'none';

  exportContainer.appendChild(clone);
  document.body.appendChild(exportContainer);

  try {
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);

    return await html2canvas(clone, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });
  } finally {
    exportContainer.remove();
  }
}

async function exportReport(type, format) {
  if (!type) {
    alert('Please select a specific Report Type from the filter to export.');
    return;
  }

  if (typeof html2canvas !== 'function' || !window.jspdf || !window.jspdf.jsPDF) {
    alert('Export is still loading. Please try again in a moment.');
    return;
  }

  const normalizedFormat = normalizeExportFormat(format);
  if (!normalizedFormat) return;

  const canvas = await captureReport(type);
  const dateSuffix = getDateRangeFileSuffix();
  const fileBase = dateSuffix ? `${type}-report-${dateSuffix}` : `${type}-report`;

  if (normalizedFormat === 'png') {
    downloadDataUrl(canvas.toDataURL('image/png'), `${fileBase}.png`);
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const imageWidth = pageWidth - margin * 2;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;
  const imageData = canvas.toDataURL('image/png');

  let remainingHeight = imageHeight;
  let position = margin;

  pdf.addImage(imageData, 'PNG', margin, position, imageWidth, imageHeight);
  remainingHeight -= pageHeight - margin * 2;

  while (remainingHeight > 0) {
    position = remainingHeight - imageHeight + margin;
    pdf.addPage();
    pdf.addImage(imageData, 'PNG', margin, position, imageWidth, imageHeight);
    remainingHeight -= pageHeight - margin * 2;
  }

  pdf.save(`${fileBase}.pdf`);
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// ── Print ──
printReportBtn.addEventListener('click', () => {
  window.print();
});

// ── Download ──
downloadReportBtn.addEventListener('click', async () => {
  await exportReport(currentReportType, 'pdf');
});

// ── Bind View Report buttons ──
document.querySelectorAll('.btn-view-report').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    openReportModal(type);
  });
});

// ── Report Type Filter (show/hide cards) ──
document.getElementById('reportTypeFilter').addEventListener('change', (e) => {
  const selected = e.target.value;
  document.querySelectorAll('.report-card').forEach(card => {
    if (!selected || card.dataset.type === selected) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});

startDateInput.addEventListener('change', syncDateRangeLabel);
endDateInput.addEventListener('change', syncDateRangeLabel);

syncDateRangeLabel();

// ── Export Button (same as download but prompts type) ──
document.getElementById('exportBtn').addEventListener('click', async () => {
  const selected = currentReportType || document.getElementById('reportTypeFilter').value;
  if (!selected) {
    alert('Please select a specific Report Type from the filter to export.');
    return;
  }

  await exportReport(selected, 'pdf');
});

// ── Quick Filter updates date range label ──
document.getElementById('quickFilter').addEventListener('change', (e) => {
  const today = new Date();
  const val = e.target.value;

  if (val === 'today') {
    const value = today.toISOString().slice(0, 10);
    setDateRange(value, value);
  } else if (val === 'week') {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    setDateRange(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
  } else if (val === 'month') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end   = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    setDateRange(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
  } else if (val === 'year') {
    const start = new Date(today.getFullYear(), 0, 1);
    const end   = new Date(today.getFullYear(), 11, 31);
    setDateRange(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
  } else {
    setDateRange('2026-06-01', '2026-06-30');
  }
});