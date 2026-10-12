import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { processStages, strategy, frameworks, services } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'The three-stage method — Identify, Analyze, Impact — the principles that shape it, and the ' +
    'assurance and standards work that sits underneath.',
  alternates: { canonical: '/approach' },
};

export default function ApproachPage() {
  const assurance = services.filter((s) =>
    ['reporting-due-diligence', 'framework-disclosure', 'supply-chain'].includes(s.id),
  );

  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="A method that can be repeated, audited and defended."
        lede={
          'ESG work fails when it is assembled backwards — a report written first, evidence found ' +
          'later. The method here runs the other way: establish the position, test it, then publish.'
        }
        facts={[
          { label: 'Method', value: 'Three stages, run in sequence' },
          { label: 'Remit', value: 'Industry agnostic' },
          { label: 'Analysis', value: 'Technology based, for factual analysis' },
          { label: 'Standards', value: 'GRI · SASB · MSCI' },
        ]}
      />

      {/* --------------------------------------------------------- method */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">The method</p>
            <h2>Identify, Analyze, Impact</h2>
            <p>
              Each stage has defined activities and produces an output the next stage depends on.
              Skipping one is what produces a report that cannot be defended.
            </p>
          </div>

          <ol className={styles.stageList}>
            {processStages.map((stage) => (
              <li key={stage.id} className={`reveal ${styles.stage}`}>
                <div className={styles.stageRail}>
                  <span className={styles.stageIndex}>{stage.index}</span>
                </div>
                <div className={styles.stageBody}>
                  <h3 className={styles.stageName}>{stage.name}</h3>
                  <p className={styles.stageSummary}>{stage.summary}</p>

                  <h4 className={styles.stageSub}>Activities</h4>
                  <ul className={styles.activities}>
                    {stage.activities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>

                  <div className={styles.stageOutput}>
                    <span>Output</span>
                    <p>{stage.output}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- strategy */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Our strategy</p>
            <h2>Three commitments that shape the work</h2>
          </div>

          <ul className={`grid grid--3 ${styles.strategyGrid}`}>
            {strategy.map((s, i) => (
              <li key={s.value} className={`reveal ${styles.strategyCard}`}>
                <span className={styles.strategyIndex}>{String(i + 1).padStart(2, '0')}</span>
                <p>{s.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ assurance */}
      <section className="section">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">Assurance &amp; due diligence</p>
            <h2>Where the evidence gets tested</h2>
            <p>
              Alongside the main method, three services exist specifically to stress-test what an
              organisation is about to publish or rely on.
            </p>
          </div>

          <ul className={styles.assuranceList}>
            {assurance.map((s) => (
              <li key={s.id} className={`reveal datarow ${styles.assuranceItem}`}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ standards */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Standards we work to</p>
            <h2>Recognised frameworks, not bespoke formats</h2>
            <p>
              Disclosure is prepared against frameworks a reader already knows, so the result is
              comparable rather than self-referential.
            </p>
          </div>

          <ul className={`grid grid--3 ${styles.frameworkGrid}`}>
            {frameworks.map((f) => (
              <li key={f.id} className={`card reveal ${styles.frameworkCard}`}>
                <h3>{f.name}</h3>
                <p className={styles.frameworkScope}>{f.scope}</p>
                <p className={styles.frameworkNote}>{f.note}</p>
              </li>
            ))}
          </ul>

          <p className={styles.frameworkNoteFoot}>
            Framework counts and descriptions shown here are as stated in the company&rsquo;s own
            materials.
          </p>
        </div>
      </section>

      <section className="section section--emerald">
        <div className="container ctaBand">
          <div>
            <h2>See how this would run in your organisation.</h2>
            <p>We will walk the three stages against your actual reporting obligations.</p>
          </div>
          <a href="/contact" className="btn btn--onDark">
            Book an introductory call
          </a>
        </div>
      </section>
    </>
  );
}
