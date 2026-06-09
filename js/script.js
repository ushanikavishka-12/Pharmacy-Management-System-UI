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

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name  = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pass  = document.getElementById('password').value;
  const cpass = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  // Name
  if (!name) { setError('grp-name', true); valid = false; }
  else          setError('grp-name', false);

  // Email
  if (!validateEmail(email)) { setError('grp-email', true); valid = false; }
  else                          setError('grp-email', false);

  // Phone
  if (!/^[0-9]{9}$/.test(phone)) { setError('grp-phone', true); valid = false; }
  else                              setError('grp-phone', false);

  // Password
  if (pass.length < 6) { setError('grp-pass', true); valid = false; }
  else                    setError('grp-pass', false);

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