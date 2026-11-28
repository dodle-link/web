'use strict';

try {
  document.documentElement.classList.toggle('dark', localStorage.getItem('dodle-theme') !== 'light');
} catch {
  document.documentElement.classList.add('dark');
}
