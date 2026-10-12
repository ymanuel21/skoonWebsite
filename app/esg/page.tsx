import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import {
  esgDefinition,
  esgThesis,
  esgPillars,
  whyEsg,
  processStages,
  audienceTracks,
  services,
} from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ESG & Sustainability',
  description:
    'What ESG is, the three pillars, why it matters to long-term value, how it is integrated, and ' +
    'how sustainability reporting is produced against recognised frameworks.',
  alternates: { canonical: '/esg' },
};

export default function EsgPage() {
  return (
    <>
      <PageHero
        eyebrow="ESG & Sustainability"
        title="ESG treated as a value discipline, not a compliance ritual."
        lede={
          'Environmental, social and governance factors are increasingly how investors, regulators ' +
          'and counterparties read a business. This page sets out how we define the subject, what ' +
          'it changes, and how it is put to work inside an organisation.'
        }
        facts={[
          { label: 'Frameworks', value: 'GRI · SASB · MSCI' },
          { label: 'Regulatory context', value: 'Six Indonesian instruments' },
          { label: 'Method', value: 'Identify → Analyze → Impact' },
          { label: 'Output', value: 'A published sustainability report' },
        ]}
      />

      {/* ------------------------------------------------------ definition */}
      <section className="section">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">What it is</p>
            <h2>Definition</h2>
          </div>

          <div className="reveal">
            <figure className={styles.quote}>
              <blockquote>
                <p>{esgDefinition.text}</p>
              </blockquote>
              <figcaption>
                <cite>{esgDefinition.attribution}</cite>
              </figcaption>
            </figure>

            <p className={styles.thesis}>{esgThesis.text}</p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- pillars */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">The three pillars</p>
            <h2>Environmental, Social, Governance</h2>
            <p>
              Each pillar asks a different question about the same organisation. A credible report
              has to answer all three.
            </p>
          </div>

          <ul className={`grid grid--3 ${styles.pillarGrid}`}>
            {esgPillars.map((p) => (
              <li key={p.key} className={`reveal ${styles.pillarCard}`}>
                <span className={styles.pillarLetter} aria-hidden="true">
                  {p.key}
                </span>
                <h3>{p.name}</h3>
                <p className={styles.pillarStrap}>{p.strapline}</p>
                <p className={styles.pillarBody}>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ why it matters */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Why it matters</p>
            <h2>What good ESG practice actually changes</h2>
          </div>

          <ul className={styles.benefitList}>
            {whyEsg.map((b, i) => (
              <li key={b.value} className={`reveal ${styles.benefitItem}`}>
                <span className="marker">{String(i + 1).padStart(2, '0')}</span>
                <span>{b.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ integration */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Integration</p>
            <h2>How it goes into a company</h2>
            <p>Three stages, run in order. Each produces something the next depends on.</p>
          </div>

          <ol className={styles.integrationGrid}>
            {processStages.map((stage) => (
              <li key={stage.id} className={`reveal ${styles.integrationCard}`}>
                <span className={styles.integrationIndex}>{stage.index}</span>
                <h3>{stage.name}</h3>
                <ul className={styles.activityList}>
                  {stage.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className={styles.integrationOutput}>
                  <span>Output</span>
                  {stage.output}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- solutions */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Our ESG solutions</p>
            <h2>The same subject, addressed four ways</h2>
          </div>

          <ul className={`grid grid--4 ${styles.solutionGrid}`}>
            {audienceTracks.map((t) => (
              <li key={t.id} className={`card reveal ${styles.solutionCard}`}>
                <h3>{t.name}</h3>
                <p>{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- reporting */}
      <section className="section section--surface">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">Sustainability reporting</p>
            <h2>The deliverable most clients come for</h2>
          </div>

          <div className={`reveal ${styles.reportingBlock}`}>
            {(() => {
              const gri = services.find((s) => s.id === 'gri-reporting');
              return gri ? <p className={styles.reportingLead}>{gri.body}</p> : null;
            })()}
            <p className={styles.noMetrics}>
              This site deliberately displays no emissions, reduction, intensity or performance
              figures. The company&rsquo;s published materials do not contain any, and calculating
              them from incomplete information would be misleading. Reporting outputs are produced
              per engagement, from the client&rsquo;s own measured data.
            </p>
            <div className="btn-row">
              <a href="/resources" className="btn btn--secondary">
                Regulations &amp; frameworks
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--emerald">
        <div className="container ctaBand">
          <div>
            <h2>Find out where you actually stand.</h2>
            <p>An assessment starts with what you already measure — and what you do not.</p>
          </div>
          <a href="/contact" className="btn btn--onDark">
            Start an enquiry
          </a>
        </div>
      </section>
    </>
  );
}
