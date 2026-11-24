'use strict';

window.initLanguageMenu = function initLanguageMenu(toggle, menu, options, onSelect) {
  const switcher = toggle.closest('.language-switcher');

  function selectedOption() {
    return options.find(option => option.getAttribute('aria-selected') === 'true') || options[0];
  }

  function close(restoreFocus = false) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  }

  function open(option = selectedOption()) {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    option.focus();
  }

  function moveFocus(event, currentIndex) {
    let nextIndex = currentIndex;
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % options.length;
    else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + options.length) % options.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = options.length - 1;
    else return false;

    event.preventDefault();
    options[nextIndex].focus();
    return true;
  }

  toggle.addEventListener('click', () => {
    if (menu.hidden) open();
    else close();
  });
  toggle.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      open();
    }
  });

  menu.addEventListener('keydown', event => {
    const currentIndex = options.indexOf(document.activeElement);
    if (moveFocus(event, currentIndex < 0 ? 0 : currentIndex)) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
    }
  });

  options.forEach(option => {
    option.tabIndex = -1;
    option.addEventListener('click', () => {
      onSelect(option.dataset.language);
      close(true);
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.language-switcher')) close();
  });

  switcher.addEventListener('focusout', event => {
    if (!switcher.contains(event.relatedTarget)) close();
  });
};