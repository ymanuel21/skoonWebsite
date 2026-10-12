import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Send an enquiry to Skoon Carbon Lab about ESG advisory, sustainability reporting, carbon ' +
    'accounting or solar PV delivery.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you have to report."
        lede={
          'The more precisely you can describe the obligation — the framework, the audience, the ' +
          'deadline — the more useful our first response will be.'
        }
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={`reveal ${styles.formCol}`}>
            <h2 className={styles.colTitle}>Enquiry form</h2>
            <ContactForm />
          </div>

          <aside className={`reveal ${styles.side}`}>
            <div className={styles.sideBlock}>
              <h2 className={styles.colTitle}>What happens next</h2>
              <ol className={styles.steps}>
                <li>We read the enquiry and establish which of the four engagement tracks applies.</li>
                <li>
                  We reply to arrange an introductory call, and tell you what information would make
                  it productive.
                </li>
                <li>
                  If it is a fit, we scope the work — assessment, reporting, disclosure or energy
                  delivery.
                </li>
              </ol>
            </div>

            <div className={styles.sideBlock}>
              <h2 className={styles.colTitle}>Direct contact details</h2>
              <div className={`notice ${styles.pendingNotice}`}>
                <div>
                  <strong>Being confirmed.</strong>
                  <p>
                    Telephone, email and postal details are not published here yet. The contact
                    details carried by the company&rsquo;s previous materials belong to its former
                    identity and have not been confirmed as valid for the new one, so they are not
                    reproduced. Nothing on this site invents a working address.
                  </p>
                  <p className={styles.pendingAction}>
                    Until they are confirmed, the enquiry form above is the channel.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.sideBlock}>
              <h2 className={styles.colTitle}>Company details</h2>
              <dl className={styles.details}>
                <div>
                  <dt>Operating as</dt>
                  <dd>Skoon Carbon Lab</dd>
                </div>
                <div>
                  <dt>Registered entity</dt>
                  <dd className={styles.tbd}>Pending confirmation</dd>
                </div>
                <div>
                  <dt>Registered office</dt>
                  <dd className={styles.tbd}>Pending confirmation</dd>
                </div>
                <div>
                  <dt>Practice</dt>
                  <dd>ESG advisory, sustainability reporting, carbon accounting</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
