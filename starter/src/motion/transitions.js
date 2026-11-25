import { gsap } from 'gsap';

/**
 * Page transitions. Browsers with cross-document View Transitions (CSS
 * `@view-transition { navigation: auto }`) morph the shared piece image natively —
 * we stay out of the way. Others get an ink curtain that wipes up, navigates, and
 * lifts on the next page.
 */
const nativeVT = () => 'onpagereveal' in window && CSS.supports?.('view-transition-name: a');

export function initTransitions({ reduced }) {
  const curtain = document.querySelector('.curtain');
  if (!curtain) return;
  if (sessionStorage.getItem('halcyon:curtain')) {
    sessionStorage.removeItem('halcyon:curtain');
    gsap.fromTo(curtain, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut', delay: 0.05 });
  }
  if (reduced || nativeVT()) return;
  document.querySelectorAll('a[data-transition]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      sessionStorage.setItem('halcyon:curtain', '1');
      gsap.fromTo(curtain, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'expo.inOut',
        onComplete: () => { window.location.href = a.href; },
      });
    });
  });
}
