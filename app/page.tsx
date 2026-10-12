import Image from 'next/image';
import type { Metadata } from 'next';
import {
  audienceTracks,
  processStages,
  services,
  sectors,
  renewableEnergy,
  energyHighlights,
  esgThesis,
  partnerNotice,
} from '@/lib/content';
import { site } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  // The layout's title.template does NOT apply to the page in the same route segment,
  // so the root title is set absolutely, with the brand included.
  title: {
    absolute: `${site.name} — ESG advisory & carbon accounting`,
  },
  description: site.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">ESG · Carbon accounting · Renewable energy</p>
            <h1 className={styles.h1}>
              ESG advisory and carbon accounting for organisations that have to report.
            </h1>
            <p className={styles.heroLede}>
              {site.name} helps corporations, investors and government agencies turn sustainability
              obligations into decisions that hold up — assessed, evidenced and disclosed.
            </p>
            <div className="btn-row">
              <a href="/contact" className="btn btn--primary">
                Start an enquiry
              </a>
              <a href="/services" className="btn btn--secondary">
                Explore services
              </a>
            </div>
          </div>

          <aside className={styles.thesis} aria-label="Our position">
            <p className={styles.thesisLabel}>Our position</p>
            <blockquote className={styles.thesisQuote}>“{esgThesis.text}”</blockquote>
            <p className={styles.thesisMeta}>
              From the company&rsquo;s own materials, setting out why ESG is treated here as a
              value-creation discipline rather than a compliance exercise.
            </p>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------- positioning by audience */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Who we work with</p>
            <h2>Four audiences, four different questions</h2>
            <p>
              The same body of ESG work looks different depending on where you sit. These are the
              four conversations we are set up to have.
            </p>
          </div>

          <ul className={`grid grid--4 ${styles.trackGrid}`}>
            {audienceTracks.map((t) => (
              <li key={t.id} className={`card reveal ${styles.trackCard}`}>
                <h3 className={styles.trackName}>{t.name}</h3>
                <p className={styles.trackSummary}>{t.summary}</p>
                <p className={styles.trackDetail}>{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- what we do */}
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div className="section-head reveal">
              <p className="eyebrow">What we do</p>
              <h2>From first assessment to published report</h2>
              <p>
                Engagement runs from taxonomies and emissions assessment through stakeholder
                materiality to disclosure against recognised frameworks — and, where the answer is
                energy, to solar PV delivered on site.
              </p>
              <div className="btn-row">
                <a href="/services" className="btn btn--secondary">
                  All services
                </a>
              </div>
            </div>

            <ul className={styles.serviceList}>
              {services.slice(0, 6).map((s, i) => (
                <li key={s.id} className={`datarow reveal ${styles.serviceRow}`}>
                  <span className="marker">{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.serviceTitle}>{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- method */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How we work</p>
            <h2>A three-stage method</h2>
            <p>
              Every engagement follows the same spine: establish the position, test it, then publish
              and embed the result.
            </p>
          </div>

          <ol className={styles.processGrid}>
            {processStages.map((stage) => (
              <li key={stage.id} className={`reveal ${styles.processCard}`}>
                <span className={styles.processIndex}>{stage.index}</span>
                <h3 className={styles.processName}>{stage.name}</h3>
                <p className={styles.processSummary}>{stage.summary}</p>
                <p className={styles.processOutput}>
                  <span>Output</span> {stage.output}
                </p>
              </li>
            ))}
          </ol>

          <div className="btn-row" style={{ marginTop: 'var(--space-l)' }}>
            <a href="/approach" className="btn btn--ghostDark">
              Read the approach in detail
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- renewable energy */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Renewable energy</p>
            <h2>Solar PV, engineered and delivered</h2>
            <p>{renewableEnergy.lead}</p>
          </div>

          <ul className={styles.installGrid}>
            {energyHighlights.map((t) => (
              <li key={t.id} className={`reveal ${styles.installCard}`}>
                <div className={styles.installMedia}>
                  <Image
                    src={t.image}
                    alt={t.alt}
                    width={800}
                    height={534}
                    sizes="(max-width: 700px) 100vw, 33vw"
                    className={styles.installImg}
                  />
                </div>
                <h3>{t.title}</h3>
                <p className="muted small">{t.body}</p>
              </li>
            ))}
          </ul>

          <p className={styles.photoNote}>
            Photographs are from PV installations documented in the company&rsquo;s own project
            materials. Client identities are not published here.
          </p>
          <p className={styles.photoNote}>{partnerNotice}</p>
        </div>
      </section>

      {/* --------------------------------------------------------- sectors */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Sectors</p>
            <h2>Industry agnostic by design</h2>
            <p>
              The assessment method is not tied to a sector. These are the industries the practice
              has been built to serve.
            </p>
          </div>

          <ul className={styles.sectorGrid}>
            {sectors.map((s) => (
              <li key={s.value} className={`reveal ${styles.sectorItem}`}>
                {s.value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section className="section section--emerald">
        <div className={`container ${styles.ctaBand}`}>
          <div>
            <h2>Start with the position you are actually in.</h2>
            <p>
              Tell us what you have to report, to whom, and by when. We will tell you what the
              assessment would involve.
            </p>
          </div>
          <a href="/contact" className="btn btn--onDark">
            Start an enquiry
          </a>
        </div>
      </section>
    </>
  );
}
