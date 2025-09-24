// -------------------------
//  Part 1: Basics
// -------------------------

// Variables and conditionals
const age = 18;
console.log(age >= 18 ? "You are an adult." : "You are underage.");

// -------------------------
//  Part 2: Functions
// -------------------------

// Function to calculate total price
function calculateTotal(price, quantity) {
  return price * quantity;
}
console.log("Total:", calculateTotal(100, 3));

// Function to format a string
function formatString(str) {
  return str.trim().toUpperCase();
}
console.log(formatString("   hello world   "));

// -------------------------
//  Part 3: Loops
// -------------------------

// For loop example: print array values
const fruits = ["Apple", "Banana", "Cherry"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// -------------------------
//  Part 4: DOM Manipulation
// -------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Change text dynamically
  const title = document.getElementById('pageTitle');
  if (title) title.textContent = 'Welcome to JS Mastery!';

  // Greet form
  const greetForm = document.getElementById('greetForm');
  const nameInput = document.getElementById('userName');
  const greeting = document.getElementById('greeting');
  if (greetForm && nameInput && greeting) {
    greetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      greeting.textContent = name ? `Hello, ${name}!` : 'Please enter a name.';
      if (name) greeting.focus();
    });
  }

  // Countdown
  const countdownBtn = document.getElementById('countdownBtn');
  const list = document.getElementById('countdownList');
  if (countdownBtn && list) {
    countdownBtn.addEventListener('click', () => {
      list.innerHTML = '';
      for (let n = 5; n > 0; n--) {
        const li = document.createElement('li');
        li.textContent = n;
        list.appendChild(li);
      }
    });
  }

  // Part 2: Functions → Wire up forms
  const totalForm = document.getElementById('totalForm');
  const priceInput = document.getElementById('price');
  const quantityInput = document.getElementById('quantity');
  const totalResult = document.getElementById('totalResult');
  if (totalForm && priceInput && quantityInput && totalResult) {
    totalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const price = Number(priceInput.value);
      const quantity = Number(quantityInput.value);
      if (Number.isFinite(price) && Number.isFinite(quantity)) {
        const total = calculateTotal(price, quantity);
        totalResult.textContent = `Total: ${total.toFixed(2)}`;
      } else {
        totalResult.textContent = 'Please enter valid numbers.';
      }
    });
  }

  const formatForm = document.getElementById('formatForm');
  const rawText = document.getElementById('rawText');
  const formatResult = document.getElementById('formatResult');
  if (formatForm && rawText && formatResult) {
    formatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formatted = formatString(String(rawText.value));
      formatResult.textContent = formatted || '(empty)';
    });
  }

  // Toggle visibility of a box
  const toggleBtn = document.getElementById('toggleBtn');
  const box = document.getElementById('toggleBox');
  if (toggleBtn && box) {
    toggleBtn.addEventListener('click', () => {
      const hidden = box.classList.toggle('hidden');
      toggleBtn.setAttribute('aria-expanded', String(!hidden));
      if (!hidden) box.focus();
    });
  }

  // Listen for a click event dynamically
  document.body.addEventListener('click', () => {
    console.log('You clicked somewhere on the page!');
  });
});
