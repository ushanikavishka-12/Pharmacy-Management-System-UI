// ============================================================
//  PharmaPlus POS & Billing — script.js
// ============================================================

// ─── DATA ────────────────────────────────────────────────────
const MEDICINES = [
  { id: 1, name: "Paracetamol 500mg Tablet", price: 475, stock: 120, category: "OTC",
    img: "images/paracetamoll.jpg" },
  { id: 2, name: "Amoxicillin 500mg Capsule", price: 970, stock: 105, category: "Antibiotics",
    img: "images/Amoxicillin.jpg" },
  { id: 3, name: "Cough Syrup 100ml Bottle", price: 850, stock: 100, category: "Cough & Cold",
    img: "images/CoughSyrup.jpg" },
  { id: 4, name: "Vitamin C 500mg Tablet", price: 350, stock: 76, category: "Vitamins",
    img: "images/VitaminC.jpg" },
  { id: 5, name: "Omeprazole 20mg Capsule", price: 920, stock: 88, category: "OTC",
    img: "images/Omeprazole.jpg" },
  { id: 6, name: "Cetirizine 10mg Tablet", price: 300, stock: 95, category: "OTC",
    img: "images/Cetirizine.jpg" },
  { id: 7, name: "Ibuprofen 400mg Tablet", price: 726, stock: 0, category: "Pain Relief",
    img: "images/Ibuprofen.jpg" },
  { id: 8, name: "Azithromycin 500mg Tablet", price: 1200, stock: 200, category: "Antibiotics",
    img: "images/Azithromycin2.jpg" },
  { id: 9, name: "Metformin 500mg Tablet", price: 560, stock: 140, category: "OTC",
    img: "images/Metformin.jpg" },
  { id: 10, name: "Aspirin 75mg Tablet", price: 220, stock: 300, category: "Pain Relief",
    img: "images/Aspirin.jpg" },
  { id: 11, name: "Loratadine 10mg Tablet", price: 450, stock: 60, category: "OTC",
    img: "images/Loratadine.jpg" },
  { id: 12, name: "Zinc Supplement 50mg", price: 680, stock: 85, category: "Vitamins",
    img: "images/ZincSupplement.jpg" },
];

const CUSTOMERS = [
  { name: "John Silva",    phone: "0771234567" },
  { name: "Nimal Perera",  phone: "0759876543" },
  { name: "Amali Fernando",phone: "0764561234" },
  { name: "Kasun Bandara", phone: "0712345678" },
];

const PROMO_CODES = { "SAVE10": 10, "PHARMA5": 5, "DISCOUNT15": 15 };

// ─── STATE ───────────────────────────────────────────────────
let bill          = [];   // [{ medicine, qty }]
let discount      = 5;    // percent
let paymentMethod = "cash";
let visibleCount  = 8;    // medicines visible
let filterCategory= "All";

// ─── DOM REFS ────────────────────────────────────────────────
const medicineGrid  = document.getElementById("medicineGrid");
const billTableBody = document.getElementById("billTableBody");
const itemCount     = document.getElementById("itemCount");
const subTotalEl    = document.getElementById("subTotal");
const discountEl    = document.getElementById("discountDisplay");
const grandTotalEl  = document.getElementById("grandTotal");
const reservedEl    = document.getElementById("reservedAmt");
const changeEl      = document.getElementById("changeAmt");
const viewMoreBtn   = document.getElementById("viewMoreBtn");
const promoInput    = document.getElementById("promoInput");
const customerSearch= document.getElementById("customerSearch");
const selectedCust  = document.getElementById("selectedCustomer");

// ─── RENDER MEDICINES ────────────────────────────────────────
function renderMedicines() {
  const filtered = filterCategory === "All"
    ? MEDICINES
    : MEDICINES.filter(m => m.category === filterCategory);

  const visible = filtered.slice(0, visibleCount);
  medicineGrid.innerHTML = visible.map(m => `
    <div class="medicine-card" data-id="${m.id}">
      <img src="${m.img}" alt="${m.name}" loading="lazy"
     onerror="this.src='https://placehold.co/100x60/e8f5e9/1b4332?text=Medicine'" />
      <div class="med-name">${m.name}</div>
      <div class="med-price">Rs.${m.price.toFixed(2)}</div>
      <div class="med-stock ${m.stock === 0 ? 'out' : ''}">
        ${m.stock === 0 ? 'Out of Stock' : `In Stock: ${m.stock}`}
      </div>
      <button class="add-btn" onclick="addToBill(${m.id})" ${m.stock === 0 ? 'disabled' : ''}>
        + Add
      </button>
    </div>
  `).join("");

  viewMoreBtn.style.display = filtered.length > visibleCount ? "block" : "none";
}

// ─── FILTER TABS ─────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    filterCategory = tab.textContent.trim().replace(" keyboard_arrow_down","");
    // Normalize
    if (filterCategory.includes("More")) filterCategory = "All";
    visibleCount = 8;
    renderMedicines();
  });
});

// View More
viewMoreBtn.addEventListener("click", () => {
  visibleCount += 4;
  renderMedicines();
});

// ─── ADD TO BILL ─────────────────────────────────────────────
function addToBill(id) {
  const med = MEDICINES.find(m => m.id === id);
  if (!med || med.stock === 0) return;
  const existing = bill.find(b => b.medicine.id === id);
  if (existing) {
    if (existing.qty < med.stock) {
      existing.qty++;
      showToast(`${med.name} qty updated`);
    } else {
      showToast("Max stock reached!", true);
    }
  } else {
    bill.push({ medicine: med, qty: 1 });
    showToast(`${med.name} added`);
  }
  renderBill();
}

// ─── RENDER BILL ─────────────────────────────────────────────
function renderBill() {
  if (bill.length === 0) {
    billTableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;color:var(--muted);padding:16px;font-size:12px;">
          No items added yet. Browse medicines and click + Add.
        </td>
      </tr>`;
  } else {
    billTableBody.innerHTML = bill.map((b, i) => `
      <tr>
        <td>
          <div class="item-name">${b.medicine.name}</div>
        </td>
        <td>
          <div class="qty-control">
            <button onclick="changeQty(${i}, -1)">−</button>
            <span>${b.qty}</span>
            <button onclick="changeQty(${i}, 1)">+</button>
          </div>
        </td>
        <td>Rs.${b.medicine.price.toFixed(2)}</td>
        <td>Rs.${(b.medicine.price * b.qty).toFixed(2)}</td>
        <td>
          <button class="delete-btn" onclick="removeItem(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join("");
  }

  updateTotals();
}

// ─── QTY CONTROL ─────────────────────────────────────────────
function changeQty(index, delta) {
  const b   = bill[index];
  const newQ = b.qty + delta;
  if (newQ < 1) { removeItem(index); return; }
  if (newQ > b.medicine.stock) { showToast("Max stock reached!", true); return; }
  b.qty = newQ;
  renderBill();
}

function removeItem(index) {
  const name = bill[index].medicine.name;
  bill.splice(index, 1);
  renderBill();
  showToast(`${name} removed`);
}

// ─── TOTALS ──────────────────────────────────────────────────
function updateTotals() {
  const subTotal  = bill.reduce((sum, b) => sum + b.medicine.price * b.qty, 0);
  const discAmt   = subTotal * (discount / 100);
  const grand     = subTotal - discAmt;

  itemCount.textContent    = bill.reduce((s, b) => s + b.qty, 0);
  subTotalEl.textContent   = `Rs.${subTotal.toFixed(2)}`;
  discountEl.textContent   = `${discount}%`;
  grandTotalEl.textContent = `Rs.${grand.toFixed(2)}`;
  reservedEl.value         = `Rs.${grand.toFixed(2)}`;
  changeEl.value           = "Rs.0.00";
}

// ─── PROMO CODE ──────────────────────────────────────────────
document.getElementById("applyPromo").addEventListener("click", () => {
  const code = promoInput.value.trim().toUpperCase();
  if (PROMO_CODES[code] !== undefined) {
    discount = PROMO_CODES[code];
    showToast(`Promo applied! ${discount}% off`);
    updateTotals();
  } else if (code === "") {
    showToast("Enter a promo code first", true);
  } else {
    showToast("Invalid promo code", true);
  }
});

promoInput.addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("applyPromo").click();
});

// ─── CLEAR ALL ───────────────────────────────────────────────
document.getElementById("clearAllBtn").addEventListener("click", () => {
  if (bill.length === 0) return;
  if (confirm("Clear all items from the bill?")) {
    bill = [];
    discount = 5;
    promoInput.value = "";
    renderBill();
    showToast("Bill cleared");
  }
});

// ─── CHECKOUT ────────────────────────────────────────────────
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (bill.length === 0) { showToast("Add items to bill first", true); return; }
  const total = grandTotalEl.textContent;
  alert(`✅ Checkout successful!\n\nGrand Total: ${total}\nPayment: ${paymentMethod.toUpperCase()}\n\nThank you for your purchase!`);
  bill = [];
  discount = 5;
  promoInput.value = "";
  renderBill();
});

// ─── SAVE AS DRAFT ───────────────────────────────────────────
document.getElementById("draftBtn").addEventListener("click", () => {
  if (bill.length === 0) { showToast("Nothing to save", true); return; }
  showToast("Bill saved as draft");
});

// ─── PAYMENT METHODS ─────────────────────────────────────────
document.querySelectorAll(".pay-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pay-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    paymentMethod = btn.dataset.method;
    showToast(`Payment method: ${paymentMethod.toUpperCase()}`);
  });
});

// ─── CUSTOMER SEARCH ─────────────────────────────────────────
customerSearch.addEventListener("input", () => {
  const q = customerSearch.value.trim().toLowerCase();
  if (!q) { selectedCust.style.display = "none"; return; }
  const found = CUSTOMERS.find(c =>
    c.name.toLowerCase().includes(q) || c.phone.includes(q)
  );
  if (found) {
    selectedCust.style.display = "block";
    selectedCust.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--green-mid)"></i>
      <strong>${found.name}</strong> — ${found.phone}`;
  } else {
    selectedCust.style.display = "none";
  }
});

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg, isError = false) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = isError ? "#ef4444" : "var(--green-dark)";
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ─── INIT ────────────────────────────────────────────────────
renderMedicines();
renderBill();


