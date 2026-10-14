import Image from 'next/image';
import Link from 'next/link';
import styles from './Wordmark.module.css';

/**
 * The Skoon Carbon Lab logo — the client's own artwork.
 *
 * Two PNG lockups are supplied, identical in composition ("Sk∞n", the loop standing in for the "oo"
 * of Skoon, over "Carbon Lab"): a primary tone with dark letters and a white tone for dark surfaces.
 * The file itself is what renders — no recolouring, filtering, tracing or redrawing, so the brand
 * colours on screen are exactly the client's.
 *
 * Which file to use is decided by the SURFACE the mark sits on, never by the page:
 *   - `default` (primary artwork) → light surfaces. The header is rgb(255 255 255 / .92).
 *   - `onDark`  (white artwork)   → dark surfaces. The footer is var(--brand-navy) #0f172a.
 *
 * This component used to carry a typographic stand-in for the logo, because the branding proposal's
 * "Logo Resmi" page shipped a placeholder and no asset file existed. That stand-in is gone: the
 * supplied artwork replaced it, and the mark still lives in this one component, so a future reissue
 * means swapping the two files in `public/images/`.
 */

export const LOGO_ARTWORK = {
  default: '/images/skoon-logo-primary.png',
  onDark: '/images/skoon-logo-white.png',
} as const;

/** Intrinsic size of both supplied lockups (they are identical, 602x309). */
export const LOGO_SIZE = { width: 602, height: 309 } as const;

type Props = {
  /** Render as a link to the home page (header) or as a plain element (footer). */
  asLink?: boolean;
  /** Which tone of the artwork to use — chosen by the surface behind the mark. */
  tone?: keyof typeof LOGO_ARTWORK;
  /** Load eagerly. Use for the above-the-fold header mark; the footer mark can stay lazy. */
  priority?: boolean;
  /** Size overrides (the component is height-driven — see Wordmark.module.css). */
  className?: string;
};

export default function Wordmark({
  asLink = false,
  tone = 'default',
  priority = false,
  className = '',
}: Props) {
  const root = [styles.mark, className].filter(Boolean).join(' ');

  const art = (
    <Image
      src={LOGO_ARTWORK[tone]}
      alt="Skoon Carbon Lab"
      width={LOGO_SIZE.width}
      height={LOGO_SIZE.height}
      priority={priority}
      className={styles.art}
    />
  );

  if (asLink) {
    return (
      <Link href="/" className={root} aria-label="Skoon Carbon Lab — home">
        {art}
      </Link>
    );
  }

  return <span className={root}>{art}</span>;
}
