import Image from 'next/image';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import {
  services,
  audienceTracks,
  renewableEnergy,
  energyHighlights,
  sectors,
  partnerNotice,
} from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'ESG and sustainability reporting, due diligence, taxonomy and GHG assessment, disclosure ' +
    'against recognised frameworks, and on-grid solar PV delivery.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Seven services, four kinds of client."
        lede={
          'The engagement you need depends on who is asking the question. Below are the tracks we ' +
          'work in, the services that sit inside them, and the renewable energy delivery that ' +
          'follows when the answer is a change of supply.'
        }
        facts={[
          { label: 'Consulting services', value: 'Seven defined service lines' },
          { label: 'Client types', value: 'Corporation · Investor · Government · Rating' },
          { label: 'Reporting basis', value: 'GRI, with SASB and MSCI considerations' },
          { label: 'Energy', value: 'On-grid solar PV — EPC' },
        ]}
      />

      {/* ------------------------------------------------------- tracks */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Engagement tracks</p>
            <h2>Where you are sitting determines the work</h2>
          </div>

          <ul className={styles.trackList}>
            {audienceTracks.map((t, i) => (
              <li key={t.id} className={`reveal datarow ${styles.trackRow}`}>
                <div className={styles.trackHead}>
                  <span className="marker">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{t.name}</h3>
                </div>
                <p className={styles.trackSummary}>{t.summary}</p>
                <p className={styles.trackDetail}>{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------- services */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Consulting services</p>
            <h2>What we actually do</h2>
            <p>
              Each of these is a discrete engagement, and most programmes combine several. Nothing
              here depends on a sector — the method is applied to the business in front of us.
            </p>
          </div>

          <ol className={`grid grid--2 ${styles.serviceGrid}`}>
            {services.map((s, i) => (
              <li key={s.id} className={`reveal ${styles.serviceCard}`}>
                <span className="marker">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------- renewable energy */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Renewable energy</p>
            <h2>On-grid solar PV, delivered</h2>
            <p>{renewableEnergy.lead}</p>
            <p>{renewableEnergy.body}</p>
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

          <div className={styles.energyGrid}>
            <div className={`reveal ${styles.energyBlock}`}>
              <h3>Delivered with</h3>
              <p>{renewableEnergy.body}</p>
            </div>
            <div className={`reveal ${styles.energyBlock}`}>
              <h3>What this does not claim</h3>
              <p>
                No installed capacity, generation yield or client saving is stated on this page.
                None is documented in the company&rsquo;s materials, and estimating one would
                misrepresent it.
              </p>
            </div>
          </div>

          <p className={styles.note}>{partnerNotice}</p>
          <p className={styles.note}>
            Photographs are of installations documented in the company&rsquo;s project materials.
            Client identities are not published. No installed capacity, yield or savings figure is
            stated, because none is documented.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- sectors */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Sectors served</p>
            <h2>Fourteen industries, one method</h2>
          </div>

          <ul className={styles.sectorGrid}>
            {sectors.map((s) => (
              <li key={s.value} className={styles.sectorItem}>
                {s.value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--emerald">
        <div className="container ctaBand">
          <div>
            <h2>Not sure which engagement you need?</h2>
            <p>Describe the obligation you are facing and we will scope it with you.</p>
          </div>
          <a href="/contact" className="btn btn--onDark">
            Discuss a project
          </a>
        </div>
      </section>
    </>
  );
}
