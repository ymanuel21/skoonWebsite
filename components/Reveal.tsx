'use client';

import { useEffect } from 'react';

/**
 * Progressive enhancement for the `.reveal` class.
 *
 * Content is fully visible without JavaScript: the CSS only hides `.reveal`
 * inside `@media (prefers-reduced-motion: no-preference)`, and this component is
 * what makes it appear. If the observer never runs, nothing is hidden that
 * matters — and reduced-motion users never see the animation at all.
 */
export default function Reveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));

    // Catch anything added later (route transitions) without a full reload.
    const mo = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
        .forEach((n) => io.observe(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
