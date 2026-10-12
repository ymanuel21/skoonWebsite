import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { regulations, frameworks } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Regulations & Frameworks',
  description:
    'The Indonesian regulatory instruments that create ESG and sustainability reporting ' +
    'obligations, and the international frameworks used to meet them.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Regulations & Frameworks"
        title="What Indonesian companies are already required to report."
        lede={
          'Sustainability reporting in Indonesia is largely a matter of existing statute rather ' +
          'than voluntary practice. These are the instruments the company works with, set out with ' +
          'their stated requirement.'
        }
        facts={[
          { label: 'Instruments', value: 'Six Indonesian regulations' },
          { label: 'Frameworks', value: 'GRI · SASB · MSCI' },
          { label: 'Subject', value: 'Reporting, disclosure, MRV' },
          { label: 'Status', value: 'Reference — not legal advice' },
        ]}
      />

      {/* --------------------------------------------------- regulations */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Indonesian regulatory landscape</p>
            <h2>Six instruments, and what each one asks for</h2>
            <p>
              Requirements are quoted as the company states them in its own materials. Where the
              original wording is in Indonesian, a plain-language reading is given alongside.
            </p>
          </div>

          <ol className={styles.regList}>
            {regulations.map((r) => (
              <li key={r.id} className={`reveal ${styles.regItem}`}>
                <div className={styles.regHead}>
                  <span className={styles.regShort}>{r.short}</span>
                  <span className={styles.regInstrument}>{r.instrument}</span>
                </div>
                <p className={styles.regRequirement}>{r.requirement}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------- frameworks */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">International reporting standards</p>
            <h2>Frameworks used to structure the disclosure</h2>
            <p>
              Indonesian law establishes the obligation; these frameworks establish the form. Each
              is built for a different reader.
            </p>
          </div>

          <ul className={styles.fwList}>
            {frameworks.map((f) => (
              <li key={f.id} className={`reveal ${styles.fwItem}`}>
                <div>
                  <h3 className={styles.fwName}>{f.name}</h3>
                  <p className={styles.fwScope}>{f.scope}</p>
                </div>
                <p className={styles.fwNote}>{f.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- mapping */}
      <section className="section">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">From obligation to delivery</p>
            <h2>How this maps onto the work</h2>
          </div>

          <div className={`reveal ${styles.mapping}`}>
            <ul className={styles.mapList}>
              <li>
                <strong>Unsure whether you are in scope?</strong>
                <span>
                  A taxonomy and GHG emission assessment establishes the factual baseline for any
                  environmental claim.
                </span>
              </li>
              <li>
                <strong>Know you must report, but not what matters?</strong>
                <span>
                  Stakeholder engagement and a materiality assessment define which issues genuinely
                  belong in the report.
                </span>
              </li>
              <li>
                <strong>Reporting already, but it does not read as comparable?</strong>
                <span>
                  Disclosure is prepared against recognised frameworks so a reader can place it
                  beside peers.
                </span>
              </li>
              <li>
                <strong>Need the report itself?</strong>
                <span>
                  Sustainability reporting is produced on a GRI basis, showing the ESG action plan
                  and its implementation.
                </span>
              </li>
            </ul>

            <div className="btn-row">
              <a href="/services" className="btn btn--secondary">
                See all services
              </a>
              <a href="/contact" className="btn btn--primary">
                Get help with compliance
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ disclaimer */}
      <section className="section section--tight section--surface">
        <div className="container">
          <p className={styles.disclaimer}>
            <strong>Note.</strong> This page is informational. It summarises the instruments and
            frameworks as they appear in the company&rsquo;s own published materials and is not
            legal advice. Regulation changes; confirm current requirements before relying on any
            statement here.
          </p>
        </div>
      </section>
    </>
  );
}
