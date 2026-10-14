'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Wordmark from './Wordmark';
import { nav, cta } from '@/lib/site';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes; body scroll is locked while the panel is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Wordmark asLink priority className={styles.brand} />

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className={isActive(item.href) ? styles.active : undefined}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={cta.primary.href} className={`btn btn--primary ${styles.cta}`}>
            {cta.primary.label}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">
              {open ? 'Close navigation menu' : 'Open navigation menu'}
            </span>
            <span className={styles.burger} data-open={open} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        className={styles.panel}
        data-open={open}
        hidden={!open}
      >
        <nav aria-label="Primary mobile">
          <ul className={styles.panelList}>
            {nav.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={isActive(item.href) ? styles.panelActive : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/contact" className={styles.panelActive}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <a href={cta.primary.href} className={`btn btn--primary ${styles.panelCta}`}>
          {cta.primary.label}
        </a>
      </div>
    </header>
  );
}
