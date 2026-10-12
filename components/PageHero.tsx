import styles from './PageHero.module.css';

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Optional short list rendered as a definition strip under the lede. */
  facts?: { label: string; value: string }[];
};

/** Standard inner-page masthead: eyebrow, single h1, lede, optional fact strip. */
export default function PageHero({ eyebrow, title, lede, facts }: Props) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}

        {facts && facts.length > 0 && (
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
