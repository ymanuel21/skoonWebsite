import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import {
  journey,
  mission,
  vision,
  whyUs,
  strategy,
  teamFunctions,
  teamPrivacyNote,
  partnerNotice,
} from '@/lib/content';
import { site } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Skoon Carbon Lab is an ESG consultancy and carbon accounting practice working with ' +
    'corporations, investors and government agencies. Background, mission and how the practice ' +
    'is organised.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An ESG practice built around evidence, not assertion."
        lede={
          `${site.name} advises organisations that have to report on sustainability — and be able ` +
          'to stand behind what they report. The practice combines ESG and carbon assessment with ' +
          'renewable energy delivery through a specialist partnership.'
        }
        facts={[
          { label: 'Practice', value: 'ESG advisory, sustainability reporting, carbon accounting' },
          { label: 'Operating since', value: '2022' },
          { label: 'Approach', value: 'Industry agnostic, evidence led' },
          { label: 'Energy delivery', value: 'On-grid solar PV, EPC' },
        ]}
      />

      {/* ------------------------------------------------ introduction */}
      <section className="section">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">The practice</p>
            <h2>What we are for</h2>
          </div>
          <div className={`prose reveal ${styles.intro}`}>
            <p>
              Sustainability reporting has moved from voluntary to expected, and in Indonesia
              increasingly to required. The difficulty is rarely the ambition — it is the evidence.
              An organisation needs to know what it is measuring, why that measure is the right one,
              and how the number will survive scrutiny.
            </p>
            <p>
              That is the work. {site.name} assesses a company&rsquo;s position against recognised
              frameworks, identifies the issues that genuinely matter to its stakeholders, and
              produces disclosure that is comparable rather than bespoke.
            </p>
            <p>
              Where the answer to an environmental obligation is a change in how energy is supplied,
              the practice delivers on-grid solar PV with a specialist partner, under an
              engineering, procurement and construction model.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- journey */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Our journey</p>
            <h2>How the practice took shape</h2>
          </div>

          <ol className={styles.timeline}>
            {journey.map((entry) => (
              <li key={entry.year} className={`reveal ${styles.timelineItem}`}>
                <span className={styles.timelineYear}>{entry.year}</span>
                <p className={styles.timelineText}>{entry.text}</p>
              </li>
            ))}
          </ol>

          <p className={styles.partnerNote}>{partnerNotice}</p>
        </div>
      </section>

      {/* ------------------------------------------------ mission / vision */}
      <section className="section">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">Purpose</p>
            <h2>Mission and vision</h2>
          </div>

          <div className="stack-m">
            <div className="reveal">
              <h3 className={styles.blockTitle}>Mission</h3>
              <ol className={styles.numbered}>
                {mission.map((m, i) => (
                  <li key={m.value}>
                    <span className="marker">{String(i + 1).padStart(2, '0')}</span>
                    <span>{m.value}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal">
              <h3 className={styles.blockTitle}>Vision</h3>
              <p className={styles.vision}>{vision.value}</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- why us */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Why Skoon Carbon Lab</p>
            <h2>Where the advantage comes from</h2>
          </div>

          <ul className={`grid grid--2 ${styles.whyGrid}`}>
            {whyUs.map((w) => (
              <li key={w.title} className={`reveal ${styles.whyCard}`}>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- how we're set up */}
      <section className="section">
        <div className="container two-col">
          <div className="section-head reveal">
            <p className="eyebrow">How we are organised</p>
            <h2>A small senior bench, deliberately</h2>
            <p>{teamPrivacyNote}</p>
          </div>

          <ul className={styles.teamList}>
            {teamFunctions.map((t) => (
              <li key={t.title} className={`reveal datarow ${styles.teamItem}`}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------- principles */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Working principles</p>
            <h2>Three commitments that shape every engagement</h2>
          </div>

          <ul className={`grid grid--3 ${styles.principleGrid}`}>
            {strategy.map((s, i) => (
              <li key={s.value} className={`card reveal ${styles.principleCard}`}>
                <span className="marker">{String(i + 1).padStart(2, '0')}</span>
                <p>{s.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--emerald">
        <div className="container ctaBand">
          <div>
            <h2>Want the detail behind any of this?</h2>
            <p>We are happy to walk through method, references and team on a call.</p>
          </div>
          <a href="/contact" className="btn btn--onDark">
            Start an enquiry
          </a>
        </div>
      </section>
    </>
  );
}
