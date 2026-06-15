// ---------- Sales Overview Chart ----------
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [42000, 45000, 48000, 50000, 55000, 53000, 62000, 58000, 51000, 49000, 47000, 44000]
};

const ctx = document.getElementById('salesChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: salesData.labels,
    datasets: [{
      label: 'Sales (Rs)',
      data: salesData.values,
      backgroundColor: '#1f9d6e',
      borderRadius: 4,
      maxBarThickness: 36
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => 'Rs ' + ctx.parsed.y.toLocaleString()
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (value / 1000) + 'k'
        },
        grid: { color: '#f0f0f0' }
      },
      x: {
        grid: { display: false }
      }
    }
  }
});

// ---------- Recent Transactions ----------
const transactions = [
  { id: 'INV-0012', name: 'Kamal Perera',  date: '2026-06-01 12:27 PM', amount: 'RS.12500.00', status: 'Paid' },
  { id: 'INV-0013', name: 'Kushi Bandara', date: '2026-06-01 1:00 PM',  amount: 'RS.12500.00', status: 'Paid' },
  { id: 'INV-0014', name: 'S. Fernando',   date: '2026-06-01 1:10 PM',  amount: 'RS.12500.00', status: 'Paid' },
  { id: 'INV-0015', name: 'Amal Kumara',   date: '2026-06-01 1:33 PM',  amount: 'RS.12500.00', status: 'Paid' },
  { id: 'INV-0016', name: 'Mathi kavine',  date: '2026-06-01 1:37 PM',  amount: 'RS.12500.00', status: 'Paid' }
];

const transactionsBody = document.getElementById('transactionsBody');
transactions.forEach(tx => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${tx.id}</td>
    <td>${tx.name}</td>
    <td>${tx.date}</td>
    <td>${tx.amount}</td>
    <td><span class="status-badge">${tx.status}</span></td>
  `;
  transactionsBody.appendChild(row);
});

// ---------- Top Selling Medicines ----------
const topSelling = [
  { name: 'Paracetamol 500mg',  color: '#ec4899', icon: 'fa-tablets', sold: 120 },
  { name: 'Vitamin C 500mg',    color: '#f59e0b', icon: 'fa-capsules', sold: 95 },
  { name: 'Amoxicillin 250mg',  color: '#3b82f6', icon: 'fa-pills', sold: 80 },
  { name: 'Panadol Extra',      color: '#374151', icon: 'fa-tablets', sold: 75 },
  { name: 'Cetirizine 10mg',    color: '#10b981', icon: 'fa-capsules', sold: 60 }
];

const topSellingBody = document.getElementById('topSellingBody');
topSelling.forEach(med => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <span class="med-name">
        <span class="med-icon" style="background:${med.color}">
          <i class="fa-solid ${med.icon}"></i>
        </span>
        ${med.name}
      </span>
    </td>
    <td class="align-right">${med.sold}</td>
  `;
  topSellingBody.appendChild(row);
});

// ---------- Quick Action buttons (demo alerts) ----------
document.querySelectorAll('.qa-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert(btn.textContent.trim() + ' clicked');
  });
});
