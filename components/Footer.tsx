import Wordmark from './Wordmark';
import { footerNav } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <Wordmark variant="full" tone="onDark" />
          <p className={styles.blurb}>
            ESG advisory, sustainability reporting and carbon accounting — with renewable energy
            delivery through a specialist partnership.
          </p>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} className={styles.col} aria-label={group.title}>
            <h2 className={styles.colTitle}>{group.title}</h2>
            <ul>
              {group.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Enquiries</h2>
          <p className={styles.pending}>
            Direct contact details are being confirmed for the new company identity. In the
            meantime, please use the enquiry form.
          </p>
          <a href="/contact" className={`btn btn--onDark ${styles.footerCta}`}>
            Contact us
          </a>
        </div>
      </div>

      <div className={`container ${styles.baseline}`}>
        <p>
          © {year} {''}
          <span>Skoon Carbon Lab</span>. All rights reserved.
        </p>
        <p className={styles.legalPending}>
          Registered entity name and company details pending confirmation.
        </p>
      </div>
    </footer>
  );
}
