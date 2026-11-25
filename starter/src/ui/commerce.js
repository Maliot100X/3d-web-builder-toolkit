import { gsap } from 'gsap';

/** Bag counter micro-interaction + waitlist form (front-end only; wire to your backend). */
export function initCommerce({ reduced }) {
  const counts = document.querySelectorAll('[data-bag-count]');
  let n = 0;
  document.querySelectorAll('[data-add]').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', () => {
      n += 1;
      counts.forEach((c) => {
        c.textContent = String(n);
        if (!reduced) gsap.fromTo(c, { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
      });
      btn.textContent = 'Added';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = label; btn.disabled = false; }, 1400);
    });
  });
  const form = document.querySelector('[data-form]');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
    form.querySelector('[data-form-done]')?.classList.remove('hidden');
    form.querySelector('input')?.setAttribute('disabled', '');
    form.querySelector('button')?.setAttribute('disabled', '');
  });
  document.querySelectorAll('[data-year]').forEach((y) => (y.textContent = String(new Date().getFullYear())));
}
