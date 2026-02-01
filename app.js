(function () {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Year
  const y = qs("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());

  // Header shadow on scroll
  const header = qs("[data-elevate]");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 4);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const burger = qs("[data-burger]");
  const mobile = qs("[data-mobile]");
  const toggleMobile = (open) => {
    if (!burger || !mobile) return;
    const next = typeof open === "boolean" ? open : mobile.hidden;
    mobile.hidden = !next;
    burger.setAttribute("aria-expanded", String(next));
  };
  if (burger) burger.addEventListener("click", () => toggleMobile());
  if (mobile) {
    qsa("a", mobile).forEach((a) => a.addEventListener("click", () => toggleMobile(false)));
  }

  // Modal
  const modal = qs("[data-modal]");
  const openers = qsa("[data-open-modal]");
  const closers = qsa("[data-close-modal]");
  const focusableSel = 'button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])';
  let lastFocus = null;

  const openModal = () => {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.documentElement.style.overflow = "hidden";

    // focus first input
    const first = qs("input,textarea,button", modal);
    if (first) first.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.documentElement.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  openers.forEach((b) => b.addEventListener("click", openModal));
  closers.forEach((b) => b.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (!modal || modal.hidden) return;
    if (e.key === "Escape") closeModal();

    // basic focus trap
    if (e.key === "Tab") {
      const items = qsa(focusableSel, modal).filter((el) => !el.hasAttribute("disabled"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Fake submit (demo)
  qsa("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const phone = String(fd.get("phone") || "").trim();
      if (!phone) return;

      // Demo feedback
      const btn = qs('button[type="submit"]', form);
      if (btn) {
        const old = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Отправлено";
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = old;
        }, 1200);
      }

      // Close modal if it was modal form
      if (form.closest("[data-modal]")) closeModal();

      // Reset
      form.reset();
    });
  });
})();
