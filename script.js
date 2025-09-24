// Interactive Web Pages with JavaScript
// Each section demonstrates events, DOM updates, and validation.

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------
  // Part 1: Event Handling
  // -------------------------
  const log = (msg) => {
    const logBox = document.getElementById('eventLog');
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    const p = document.createElement('p');
    p.textContent = `[${time}] ${msg}`;
    logBox.prepend(p);
  };

  const clickMeBtn = document.getElementById('clickMeBtn');
  const dblClickBtn = document.getElementById('dblClickBtn');
  const mouseOverBtn = document.getElementById('mouseOverBtn');
  const keyInput = document.getElementById('keyInput');

  if (clickMeBtn) clickMeBtn.addEventListener('click', () => log('Click button pressed'));
  if (dblClickBtn) dblClickBtn.addEventListener('dblclick', () => log('Double-click detected'));
  if (mouseOverBtn) {
    mouseOverBtn.addEventListener('mouseenter', () => log('Mouse entered button'));
    mouseOverBtn.addEventListener('mouseleave', () => log('Mouse left button'));
  }
  if (keyInput) keyInput.addEventListener('input', (e) => log(`Typed: ${e.target.value}`));

  // -------------------------
  // Part 2: Interactive Elements
  // -------------------------
  // Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      themeToggle.setAttribute('aria-pressed', String(isDark));
      log(`Theme toggled: ${isDark ? 'Dark' : 'Light'}`);
    });
  }

  // Counter
  let counter = 0;
  const counterValue = document.getElementById('counterValue');
  const inc = document.getElementById('incrementBtn');
  const dec = document.getElementById('decrementBtn');
  const reset = document.getElementById('resetCounter');
  const renderCounter = () => { if (counterValue) counterValue.textContent = String(counter); };
  renderCounter();
  if (inc) inc.addEventListener('click', () => { counter++; renderCounter(); });
  if (dec) dec.addEventListener('click', () => { counter--; renderCounter(); });
  if (reset) reset.addEventListener('click', () => { counter = 0; renderCounter(); });

  // FAQ accordion
  document.querySelectorAll('.accordion-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = expanded;
    });
    // initialize hidden state
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) panel.hidden = true;
  });

  // -------------------------
  // Part 3: Custom Form Validation
  // -------------------------
  const form = document.getElementById('signupForm');
  if (form) {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const success = document.getElementById('formSuccess');

    const validators = {
      name: (v) => v.trim().length >= 2 || 'Name must be at least 2 characters.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
      password: (v) => /^(?=.*\d).{8,}$/.test(v) || 'Password must be 8+ chars and include a number.',
      confirm: (v) => v === password.value || 'Passwords do not match.'
    };

    const setError = (el, msg) => { el.textContent = msg || ''; };
    const clearSuccess = () => { if (success) success.textContent = ''; };

    // Live validation
    [[name, nameError, 'name'], [email, emailError, 'email'], [password, passwordError, 'password'], [confirm, confirmError, 'confirm']]
      .forEach(([input, errorBox, key]) => {
        if (!input) return;
        input.addEventListener('input', () => {
          clearSuccess();
          const res = validators[key](input.value);
          setError(errorBox, res === true ? '' : res);
        });
      });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearSuccess();
      let valid = true;
      const entries = [
        [name, nameError, 'name'],
        [email, emailError, 'email'],
        [password, passwordError, 'password'],
        [confirm, confirmError, 'confirm']
      ];
      entries.forEach(([input, errorBox, key]) => {
        const res = validators[key](input.value);
        const ok = res === true;
        if (!ok) valid = false;
        setError(errorBox, ok ? '' : res);
      });
      if (valid) {
        if (success) success.textContent = '✅ Form is valid! Submitting...';
        log('Form submitted successfully');
        form.reset();
      }
    });
  }
});

