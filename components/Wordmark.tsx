import Link from 'next/link';
import styles from './Wordmark.module.css';

/**
 * The Skoon Carbon Lab wordmark.
 *
 * The proposal (p5) defines the lockup formula explicitly:
 *     "Skoon" (clean typography)  +  infinity symbol / 'oo'  +  "CARBON LAB" (sub-brand)
 * and (p4) states the loop represents the 'oo' of "Skoon" — a continuous, circular,
 * carbon-neutral cycle. So the mark renders  Sk  +  ∞  +  n  over  CARBON LAB.
 *
 * PROVISIONAL: the proposal's own "Logo Resmi" page (p6) contains a placeholder rather
 * than the supplied artwork, so no official asset file exists. This is a faithful
 * typographic implementation of the stated formula — NOT a redrawn logo. It is isolated
 * in this one component so the official asset can be dropped in without touching layouts.
 */

type Props = {
  /** Render as a link to the home page (header) or as a plain element (footer). */
  asLink?: boolean;
  /** Invert for dark backgrounds. */
  tone?: 'default' | 'onDark';
  /** Compact drops the "CARBON LAB" sub-line. */
  variant?: 'full' | 'compact';
  className?: string;
};

function InfinityMark() {
  return (
    <svg
      className={styles.loop}
      viewBox="0 0 100 56"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M50 28 C42 18, 26 18, 26 28 C26 38, 42 38, 50 28 C58 18, 74 18, 74 28 C74 38, 58 38, 50 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Wordmark({
  asLink = false,
  tone = 'default',
  variant = 'full',
  className = '',
}: Props) {
  const root = [
    styles.mark,
    tone === 'onDark' ? styles.onDark : '',
    variant === 'compact' ? styles.compact : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className={styles.main}>
        <span>Sk</span>
        <InfinityMark />
        <span>n</span>
      </span>
      {variant === 'full' && <span className={styles.sub}>Carbon Lab</span>}
    </>
  );

  if (asLink) {
    return (
      <Link href="/" className={root} aria-label="Skoon Carbon Lab — home">
        {inner}
      </Link>
    );
  }

  return (
    <span className={root} aria-label="Skoon Carbon Lab">
      {inner}
    </span>
  );
}
