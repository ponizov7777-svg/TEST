(() => {
  const modal = document.querySelector('[data-modal]');
  if (!modal) return;

  const openers = document.querySelectorAll('[data-open-modal]');

  function openModal() {
    modal.hidden = false;
    document.documentElement.style.overflow = 'hidden';

    const focusable = modal.querySelector(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.documentElement.style.overflow = '';
  }

  openers.forEach((btn) => btn.addEventListener('click', openModal));

  document.addEventListener('click', (e) => {
    const closeTarget = e.target.closest('[data-close-modal]');
    if (!closeTarget) return;

    e.preventDefault();
    closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
})();
