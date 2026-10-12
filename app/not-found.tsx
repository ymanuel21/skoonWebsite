import type { Metadata } from 'next';
import { nav } from '@/lib/site';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className={`container ${styles.wrap}`}>
        <p className="eyebrow">404</p>
        <h1 className={styles.title}>That page does not exist.</h1>
        <p className={styles.lede}>
          The link may be out of date, or the address may have been mistyped. These are the sections
          of the site that do exist.
        </p>

        <ul className={styles.links}>
          <li>
            <a href="/">Home</a>
          </li>
          {nav.map((n) => (
            <li key={n.key}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>

        <a href="/" className="btn btn--primary">
          Back to home
        </a>
      </div>
    </section>
  );
}
