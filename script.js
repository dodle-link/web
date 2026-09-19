const form = document.querySelector('.search-form');
const input = document.querySelector('#search-input');
const clearButton = document.querySelector('.clear-button');
const themeToggle = document.querySelector('.theme-toggle');
const luckyButton = document.querySelector('.lucky-button');

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.querySelector('span').textContent = isDark ? 'Light mode' : 'Dark mode';
  localStorage.setItem('dodle-theme', isDark ? 'dark' : 'light');
}

setTheme(localStorage.getItem('dodle-theme') !== 'light');
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

function updateClearButton() {
  clearButton.classList.toggle('visible', input.value.length > 0);
}

input.addEventListener('input', updateClearButton);
clearButton.addEventListener('click', () => {
  input.value = '';
  updateClearButton();
  input.focus();
});

luckyButton.addEventListener('click', () => {
  if (!input.value) input.value = 'something interesting to learn today';
  form.requestSubmit();
});

form.addEventListener('submit', () => {
  form.target = '_blank';
});
