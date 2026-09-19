window.noeWebPixel = true;
document.documentElement.classList.toggle('dark', localStorage.getItem('dodle-theme') !== 'light');

function init() {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('#search-input');
  const clearButton = document.querySelector('.clear-button');
  const themeToggle = document.querySelector('.theme-toggle');
  const luckyButton = document.querySelector('.lucky-button');

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
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
    input.value = curiousWords[Math.floor(Math.random() * curiousWords.length)];
    form.requestSubmit();
  });

  form.addEventListener('submit', () => {
    input.value = interpretQuery(input.value);
    form.target = '_blank';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function interpretQuery(value) {
  let query = value.trim();
  if (!query) return query;

  // drop conversational wrappers so the rest of the operators can match cleanly
  query = query.replace(/^(?:please\s+)?(?:can you\s+)?(?:search for|look up|find me|find|show me|tell me about)\s+/gi, '');

  query = query.replace(/\b(?:on|from|at)\s+([\w-]+(?:\.[\w-]+)+)\b/gi, 'site:$1');
  query = query.replace(/\b(pdf|docx?|xlsx?|pptx?|csv|txt)\b/gi, (_, extension) => `filetype:${extension.toLowerCase()}`);

  // support both bare years and full dates for after/before
  query = query.replace(/\bafter\s+(\d{4}-\d{2}-\d{2})\b/gi, 'after:$1');
  query = query.replace(/\bbefore\s+(\d{4}-\d{2}-\d{2})\b/gi, 'before:$1');
  query = query.replace(/\bafter\s+(\d{4})\b/gi, 'after:$1-01-01');
  query = query.replace(/\bbefore\s+(\d{4})\b/gi, 'before:$1-01-01');

  query = query.replace(/\b(?:without|excluding|except)\s+([\w-]+)\b/gi, '-$1');
  query = query.replace(/\bdefine\s+([\w\s]+)$/gi, 'define:$1');
  query = query.replace(/\s+or\s+/gi, ' OR ');
  query = query.replace(/\babout\s+/gi, '');

  return query.replace(/\s+/g, ' ').trim();
}

