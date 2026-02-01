(() => {
  const modal = document.querySelector('[data-modal]');
  if (!modal) return;

  const openers = document.querySelectorAll('[data-open-modal]');

  function openModal() {
    modal.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    // фокус внутрь (не обязательно, но удобно)
    const focusable = modal.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.documentElement.style.overflow = '';
  }

  openers.forEach((btn) => btn.addEventListener('click', openModal));

  document.addEventListener('click', (e) => {
    // закрыть по клику на крестик или оверлей (любой элемент с data-close-modal)
    if (e.target && e.target.closest('[data-close-modal]')) {
      e.preventDefault();
      closeModal();
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // Опционально: закрывать при клике вне окна (если кликнули по самому контейнеру .modal)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
})();
