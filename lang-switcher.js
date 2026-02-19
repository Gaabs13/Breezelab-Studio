document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-switcher').forEach((switcher) => {
    const langButtons = Array.from(switcher.querySelectorAll('button[data-lang]'));
    if (!langButtons.length || switcher.querySelector('.lang-toggle')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'lang-toggle';
    toggle.setAttribute('aria-label', 'Abrir seleção de idioma');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '&#9776;';

    const options = document.createElement('div');
    options.className = 'lang-options';

    langButtons.forEach((btn) => options.appendChild(btn));

    switcher.append(toggle, options);

    toggle.addEventListener('click', () => {
      const isOpen = switcher.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    langButtons.forEach((button) => {
      button.addEventListener('click', () => {
        switcher.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) {
        switcher.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
