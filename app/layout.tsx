import type { Metadata, Viewport } from 'next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { site, siteUrl, locale } from '@/lib/site';
import './globals.css';

/* Typefaces from the branding proposal p8:
   Montserrat = headline + wordmark, Plus Jakarta Sans = body. */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} — ESG advisory & carbon accounting`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'ESG consultancy',
    'carbon accounting',
    'sustainability reporting',
    'GRI reporting',
    'ESG disclosure Indonesia',
    'solar PV Indonesia',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ESG advisory & carbon accounting`,
    description: site.description,
    url: siteUrl(),
    locale: locale.ogLocale,
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ESG advisory & carbon accounting`,
    description: site.description,
    images: ['/og.svg'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
};

/** Organisation schema. Deliberately limited to facts we can source: name + description.
 *  No address, telephone or email is emitted — those are unverified (audit §7.3). */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  description: site.description,
  url: siteUrl(),
  slogan: 'ESG advisory and carbon accounting',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale.htmlLang} className={`${montserrat.variable} ${jakarta.variable}`}>
      <body>
        {/* Zero-JS fallback. `.reveal` is hidden by CSS inside
            `@media (prefers-reduced-motion: no-preference)` and shown by the Reveal
            observer. If JavaScript never runs, that observer never fires and most of
            the page would stay at opacity 0. With scripting enabled this element's
            content is never parsed as markup, so the animated path is unaffected. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<style>.reveal{opacity:1 !important;transform:none !important}</style>',
          }}
        />
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
