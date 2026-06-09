// ── Password toggle ──
document.querySelectorAll('.pass-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const inp  = document.getElementById(btn.dataset.target);
    const icon = btn.querySelector('i');
    if (inp.type === 'password') {
      inp.type = 'text';
      icon.className = 'bi bi-eye';
    } else {
      inp.type = 'password';
      icon.className = 'bi bi-eye-slash';
    }
  });
});

// ── Form validation & submit ──
const form = document.getElementById('signupForm');

function setError(groupId, show, msg) {
  const grp = document.getElementById(groupId);
  if (show) {
    grp.classList.add('has-error');
    if (msg) grp.querySelector('.err-msg').textContent = msg;
  } else {
    grp.classList.remove('has-error');
  }
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateFullName(v) {
  return /^[a-zA-Z\s]+$/.test(v) && v.length > 0;
}

function validatePhone(v) {
  return /^[0-9]{10}$/.test(v);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name  = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pass  = document.getElementById('password').value;
  const cpass = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  // Name - only letters and spaces
  if (!validateFullName(name)) {
    setError('grp-name', true, 'Full Name must contain only letters and spaces.');
    valid = false;
  } else {
    setError('grp-name', false);
  }

  // Email
  if (!validateEmail(email)) { setError('grp-email', true); valid = false; }
  else                          setError('grp-email', false);

  // Phone
  if (!validatePhone(phone)) {
    setError('grp-phone', true, 'Phone number must contain exactly 10 digits.');
    valid = false;
  } else {
    setError('grp-phone', false);
  }

  // Password - minimum 8 characters
  if (pass.length < 8) {
    setError('grp-pass', true, 'Password must be at least 8 characters.');
    valid = false;
  } else {
    setError('grp-pass', false);
  }

  // Confirm password
  if (pass !== cpass) {
    setError('grp-cpass', true, 'Passwords do not match.');
    valid = false;
  } else if (cpass.length === 0) {
    setError('grp-cpass', true, 'Please confirm your password.');
    valid = false;
  } else {
    setError('grp-cpass', false);
  }

  // Terms
  if (!terms) {
    alert('Please agree to the Terms of Service and Privacy Policy.');
    valid = false;
  }

  if (!valid) return;

  // Success feedback
  const btn = document.getElementById('submitBtn');
  btn.textContent = '✓ Account Created!';
  btn.style.background = '#145f49';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Sign up';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 2500);
});

// Live clear errors on input
['fullName', 'email', 'phone', 'password', 'confirmPassword'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const map = {
      fullName: 'grp-name', email: 'grp-email',
      phone: 'grp-phone', password: 'grp-pass', confirmPassword: 'grp-cpass'
    };
    setError(map[id], false);
  });
});

// Enforce numeric-only and max length for phone input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    if (e.target.value !== cleaned) e.target.value = cleaned;
    setError('grp-phone', false);
  });
}

// Enforce letters and spaces only for Full Name input
const fullNameInput = document.getElementById('fullName');
if (fullNameInput) {
  fullNameInput.addEventListener('input', (e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    if (e.target.value !== cleaned) e.target.value = cleaned;
    setError('grp-name', false);
  });
}