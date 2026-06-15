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

// ── Form validation ──
const form = document.getElementById('loginForm');

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

  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value;

  // Email
  if (!validateEmail(email)) {
    setError('grp-email', true, 'Please enter a valid email address.');
    valid = false;
  } else {
    setError('grp-email', false);
  }

  // Password
  if (pass.length < 8) {
    setError('grp-pass', true, 'Password must be at least 8 characters.');
    valid = false;
  } else {
    setError('grp-pass', false);
  }

  if (!valid) return;

  // Success feedback
  const btn = document.getElementById('loginBtn');
  btn.textContent = '✓ Logging in...';
  btn.style.background = '#145f49';
  btn.disabled = true;
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
});

// Live clear errors
['email', 'password'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    const map = { email: 'grp-email', password: 'grp-pass' };
    setError(map[id], false);
  });
});