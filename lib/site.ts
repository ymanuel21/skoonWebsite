/**
 * Site-wide configuration: brand, navigation, metadata defaults.
 *
 * Brand values are taken from `Skoon Carbon Lab Branding Proposal.pdf` (pages 4–9).
 * Anything not specified by the proposal is marked PROVISIONAL and explains itself.
 */

export const site = {
  /** Brand name — proposal p1/p5. The wordmark reads "Sk∞n" with "CARBON LAB" as sub-brand. */
  name: 'Skoon Carbon Lab',
  /** Short form used in dense UI (footer, mobile). */
  shortName: 'Skoon',
  /** The proposition line the proposal itself supplies (Indonesian, verbatim, proposal p1). */
  positioningId: 'Identitas Visual Modern untuk Konsultan ESG & Akuntansi Karbon Presisi',
  /** English working description. Derived from proposal p2, which describes the firm as an
   *  ESG + Carbon Accounting consultancy. Carbon accounting is PROVISIONAL — audit §6.2. */
  tagline: 'ESG advisory and carbon accounting for organisations that have to report.',
  /** One-line description used in meta tags. */
  description:
    'Skoon Carbon Lab is an ESG consultancy and carbon accounting practice, advising corporations, ' +
    'investors and government agencies on sustainability reporting, disclosure and renewable energy.',
} as const;

/**
 * Primary navigation. Every route below has a corresponding page in app/.
 * `key` doubles as the active-state identifier.
 */
export const nav = [
  { key: 'about', href: '/about', label: 'About' },
  { key: 'services', href: '/services', label: 'Services' },
  { key: 'esg', href: '/esg', label: 'ESG & Sustainability' },
  { key: 'approach', href: '/approach', label: 'Approach' },
  { key: 'resources', href: '/resources', label: 'Regulations & Frameworks' },
] as const;

export const cta = {
  primary: { label: 'Start an enquiry', href: '/contact' },
  secondary: { label: 'Explore services', href: '/services' },
} as const;

/** Footer link groups. */
export const footerNav = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/approach', label: 'Our Approach' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Expertise',
    links: [
      { href: '/services', label: 'Services' },
      { href: '/esg', label: 'ESG & Sustainability' },
      { href: '/resources', label: 'Regulations & Frameworks' },
    ],
  },
] as const;

/**
 * Active locale of the site.
 *
 * The site ships in ONE language (English). This constant exists so the language is declared in a
 * single place instead of as scattered literals, and so a future language switcher has one obvious
 * extension point.
 *
 * FUTURE WORK — not implemented, and deliberately not scaffolded here:
 * a switcher would extend this object with the supported locales, read the active one from a
 * route segment (`/id/...`) or a cookie, and pass it to `layout.tsx`, which already consumes
 * `htmlLang` / `ogLocale` below. Dictionary loading and any locale routing are a separate,
 * separately-authorised piece of work; see `LOCALIZATION_READINESS.md`.
 *
 * Nothing in this project may translate database content.
 */
export const locale = {
  /** The language the site is published in today. */
  current: 'en',
  /** BCP-47 tag for the <html lang> attribute. */
  htmlLang: 'en',
  /** Open Graph locale value. */
  ogLocale: 'en',
} as const;

/**
 * Canonical origin. Falls back to localhost so local builds and metadata
 * generation never crash when the variable is unset.
 */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return 'http://localhost:3100';
  return raw.replace(/\/+$/, '');
}
