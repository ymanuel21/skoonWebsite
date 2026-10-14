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
  esgDefinition,
  esgPillars,
  whyEsg,
  frameworks,
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

/**
 * Home page.
 *
 * Two reference-led halves, with the boundary the client specified:
 *
 *   PART A  hero → the "clients" band   — Reference A visual direction
 *   PART B  ESG reporting run           — Reference B visual direction
 *
 * All copy is verbatim from the project's sourced content module
 * (`lib/content.ts`); nothing here invents a metric, a client, a certification
 * or a capability. See the header comment in page.module.css for the styling
 * split. The header and every other route are untouched.
 */
export default function HomePage() {
  return (
    <>
      {/* ============================================================== A1 */}
      {/* Hero — Reference A: full-bleed photograph, statement left, support
          copy and restrained CTAs right, no rounded corners. */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/images/installation-array-open.jpg"
            alt="Ground-mounted solar array on an open site"
            fill
            sizes="100vw"
            priority
            className={styles.heroImg}
          />
          <span className={styles.heroScrim} aria-hidden="true" />
        </div>

        <div className={`container ${styles.heroGrid}`}>
          <h1 className={styles.h1}>
            ESG advisory and carbon accounting for organisations that have to report.
          </h1>

          <div className={styles.heroCopy}>
            <p className="eyebrow" style={{ color: '#fff' }}>
              ESG · Carbon accounting · Renewable energy
            </p>
            <p className={styles.heroLede}>
              {site.name} helps corporations, investors and government agencies turn sustainability
              obligations into decisions that hold up — assessed, evidenced and disclosed.
            </p>
            <div className="btn-row">
              <a href="/contact" className="btn btn--primary">
                Start an enquiry
              </a>
              <a href="/services" className="btn btn--onDark">
                Explore services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== A2 */}
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

          <ul className={styles.audienceGrid}>
            {audienceTracks.map((t) => (
              <li key={t.id} className={`reveal ${styles.audienceItem}`}>
                <h3 className={styles.audienceName}>{t.name}</h3>
                <p className={styles.audienceSummary}>{t.summary}</p>
                <p className={styles.audienceDetail}>{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================== A3 */}
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

      {/* ============================================================== A4 */}
      <section className="section section--surface">
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
            <a href="/approach" className="btn btn--secondary">
              Read the approach in detail
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== A5 */}
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

      {/* ============================================================== A6 */}
      {/* END OF THE REFERENCE-A RANGE.
          Reference A closes this range with a client social-proof band. Client
          identities and marks are not authorised for publication (project
          audit §10.2) and must not be invented, so the same band geometry
          carries the sourced sectors. Authorised client marks would drop into
          .trustPanel unchanged. */}
      <section className={`${styles.trustBand} reveal`}>
        <div className="container">
          <div className={styles.trustBandInner}>
            <div>
              <h2 className={styles.trustLabelH2}>Sectors</h2>
              <p className={styles.trustLabelSub}>Who we work with</p>
            </div>

            <ul className={styles.trustGrid}>
              {sectors.map((s) => (
                <li key={s.value} className={styles.trustItem}>
                  {s.value}
                </li>
              ))}
            </ul>

            <p className={styles.trustNote}>
              Industry agnostic by design — these are the sectors the practice has been built to
              serve. Client names and marks are not published. {partnerNotice}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ B */}
      {/* START OF THE REFERENCE-B RANGE — ESG reporting, on the reference's
          warm base, 12-column blocks alternating sides, terse checklists and
          pill CTAs, in Skoon's own palette. */}
      <div className={styles.esgRun}>
        <div className="container">
          <div className={`${styles.esgIntro} reveal`}>
            <p className="eyebrow">ESG reporting</p>
            <h2 className={styles.esgH2}>ESG reporting with {site.shortName}</h2>
          </div>
        </div>

        {/* B1 — overview block, text left / figure right. */}
        <section className={`container ${styles.esgBlock} ${styles.textLeft}`}>
          <div className={styles.esgText}>
            <p className={styles.esgBody}>{esgDefinition.text}</p>
            <blockquote className={styles.esgBody}>&ldquo;{esgThesis.text}&rdquo;</blockquote>
            <p className={styles.esgBody}>
              A report is the visible end of that work. What it rests on is an assessed position —
              evidenced, traceable and defensible when someone asks how a figure was reached.
            </p>
            <div className={styles.esgCtaActions}>
              <a href="/services" className={styles.pill}>
                Explore the services behind a report
              </a>
            </div>
          </div>

          <div className={styles.esgFigure}>
            <div className={styles.figurePanel}>
              <p className={styles.figurePanelLabel}>Assess → evidence → disclose</p>
              <p className={styles.figurePanelText}>
                The spine of every engagement, from first assessment to published report.
              </p>
            </div>
          </div>
        </section>

        <span className={styles.connector} aria-hidden="true" />

        {/* B2 — figure left / text right, with a terse checklist. */}
        <section className={`container ${styles.esgBlock} ${styles.textRight}`}>
          <div className={styles.esgFigure}>
            <Image
              src="/images/installation-works.jpg"
              alt="Solar installation under construction, documented in the company's own materials"
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.figureImg}
            />
          </div>

          <div className={styles.esgText}>
            <h2 className={styles.esgH2}>Building the sustainability narrative</h2>
            <p className={styles.esgBody}>
              The narrative has to survive scrutiny. It is built from the company&rsquo;s own
              position — not from a template — and it is why the practice treats ESG as a
              value-creation discipline rather than a compliance exercise.
            </p>
            <ul className={styles.checklist}>
              {whyEsg.slice(0, 3).map((w) => (
                <li key={w.value}>{w.value}</li>
              ))}
            </ul>
            <a href="/approach" className={styles.pillOutline}>
              Explore the implementation approach
            </a>
          </div>
        </section>

        <span className={styles.connector} aria-hidden="true" />

        {/* B3 — text left / figure right, checklist with lead-ins. */}
        <section className={`container ${styles.esgBlock} ${styles.textLeft}`}>
          <div className={styles.esgText}>
            <h2 className={styles.esgH2}>Incorporating ESG performance metrics</h2>
            <p className={styles.esgBody}>
              Metrics only mean something once the position they measure is established. These are
              the three dimensions the assessment is organised around.
            </p>
            <ul className={styles.checklist}>
              {esgPillars.map((p) => (
                <li key={p.key}>
                  <strong>{p.name}</strong> — {p.strapline}
                </li>
              ))}
            </ul>
            <a href="/resources" className={styles.pill}>
              The frameworks we report against
            </a>
          </div>

          <div className={styles.esgFigure}>
            <div className={styles.figurePanel}>
              <p className={styles.figurePanelLabel}>E · S · G</p>
              <p className={styles.figurePanelText}>
                Environmental, social and governance performance, assessed together.
              </p>
            </div>
          </div>
        </section>

        <span className={styles.connector} aria-hidden="true" />

        {/* B4 — figure left / text right; the reference adds a small
            sub-heading above its checklist. A paragraph is used here rather
            than an h6, so no heading level is skipped. */}
        <section className={`container ${styles.esgBlock} ${styles.textRight}`}>
          <div className={styles.esgFigure}>
            <div className={styles.figurePanel}>
              <p className={styles.figurePanelLabel}>Identify · Analyze · Impact</p>
              <p className={styles.figurePanelText}>
                One method, run the same way every time — so results are comparable.
              </p>
            </div>
          </div>

          <div className={styles.esgText}>
            <h2 className={styles.esgH2}>A seamless collect &amp; report workflow</h2>
            <p className={styles.esgBody}>Working with {site.shortName}, the engagement runs:</p>
            <ul className={styles.checklist}>
              {processStages.map((stage) => (
                <li key={stage.id}>
                  <strong>
                    {stage.index} {stage.name}
                  </strong>{' '}
                  — {stage.summary}
                </li>
              ))}
            </ul>
            <a href="/approach" className={styles.textLink}>
              Read the approach in detail
            </a>
          </div>
        </section>

        <span className={styles.connector} aria-hidden="true" />

        {/* B5 — text left / figure right. Advisory alignment only: the practice
            does not claim automated compliance checking or software. */}
        <section className={`container ${styles.esgBlock} ${styles.textLeft}`}>
          <div className={styles.esgText}>
            <h2 className={styles.esgH2}>Framework and regulatory alignment</h2>
            <p className={styles.esgBody}>
              Disclosure is judged against instruments and frameworks that are already in force.
              The work is aligning to them — read, interpreted and applied to your position.
            </p>
            <ul className={styles.checklist}>
              {frameworks.slice(0, 3).map((f) => (
                <li key={f.id}>
                  <strong>{f.name}</strong> — {f.scope}
                </li>
              ))}
            </ul>
            <a href="/resources" className={styles.textLink}>
              Regulations &amp; frameworks
            </a>
          </div>

          <div className={styles.esgFigure}>
            <div className={styles.figurePanel}>
              <p className={styles.figurePanelLabel}>In force today</p>
              <p className={styles.figurePanelText}>
                Disclosure instruments and frameworks the assessment is aligned to.
              </p>
            </div>
          </div>
        </section>

        <span className={styles.connector} aria-hidden="true" />

        {/* B6 — END OF THE REFERENCE-B RANGE: the reference closes this range
            with the section carrying the "Explore the complete Demo Library"
            call to action. Skoon publishes no software demo library, so the
            control the client asked for points at an existing published
            destination and says plainly where it goes. */}
        <section className={`${styles.esgCta} reveal`}>
          <div className={`container ${styles.esgCtaInner}`}>
            <h2 className={styles.esgH2}>Start with the position you are actually in.</h2>
            <p className={styles.esgBody}>
              Tell us what you have to report, to whom, and by when. We will tell you what the
              assessment would involve.
            </p>
            <div className={styles.esgCtaActions}>
              <a href="/resources" className={styles.pill}>
                Explore the complete Demo Library
              </a>
              <a href="/contact" className={styles.pillOutline}>
                Start an enquiry
              </a>
            </div>
            <p className={styles.pillNote}>
              &ldquo;Explore the complete Demo Library&rdquo; is the label supplied with the design
              reference. {site.shortName} does not publish a software demo library, so the control
              opens the published Regulations &amp; Frameworks library.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
