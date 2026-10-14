# Skoon Carbon Lab — corporate website

A production-ready corporate website for **Skoon Carbon Lab**, an ESG advisory and carbon
accounting practice. Built from the company's own source documents and the approved brand
direction.

---

## Quick start

```bash
cd site
npm install
cp .env.example .env.local      # optional — see "Configuration"
npm run dev                     # http://localhost:3100
```

Production:

```bash
npm run build
npm run start                   # http://localhost:3100
```

Requires **Node.js >= 18.18** (developed on Node 26).

---

## What this is built from

Every factual statement on the site traces to a company source document. Nothing is invented.

| Source | Role |
| --- | --- |
| Company profile | Company background, services, sectors, regulations. Cited in code as **P<n>** (page). |
| ESG presentation | ESG content, method, frameworks. Cited as **D<n>** (slide). |
| Branding proposal | Brand name, palette, typography, logo formula. Cited as **B<n>** (page). |

Those source documents are **not** part of this repository. The citation keys above appear
throughout `lib/content.ts`, where each content item carries its own `source` field, and in the
project's content-traceability record, which is maintained privately alongside the sources.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript, `strict` |
| Styling | Hand-authored CSS — custom-property design tokens + CSS Modules |
| Fonts | `next/font` self-hosting Montserrat + Plus Jakarta Sans |
| Tests | Playwright |
| Runtime deps | `next`, `react`, `react-dom` — nothing else |

No CSS framework, no UI kit, no state library. The design system is ~200 lines of tokens in
`app/globals.css`; every component is local.

> **Why Next.js:** it matches the stack already in use on this machine, and the App Router gives
> real routing, per-route metadata, `sitemap.xml`/`robots.txt` generation and a server route for the
> enquiry form — without pulling in extra dependencies. Static pages are prerendered; only
> `/api/enquiry` runs on demand.

---

## Project structure

```
site/
├── app/
│   ├── layout.tsx              root layout: fonts, metadata, header/footer, JSON-LD
│   ├── globals.css             DESIGN TOKENS + base styles + shared components
│   ├── page.tsx                /                Home
│   ├── about/page.tsx          /about
│   ├── services/page.tsx       /services
│   ├── esg/page.tsx            /esg
│   ├── approach/page.tsx       /approach
│   ├── resources/page.tsx      /resources
│   ├── contact/page.tsx        /contact
│   ├── not-found.tsx           custom 404
│   ├── sitemap.ts              /sitemap.xml
│   ├── robots.ts               /robots.txt
│   └── api/enquiry/route.ts    enquiry endpoint (delivery optional)
├── components/
│   ├── Wordmark.tsx            the client's logo artwork (single source of truth for the logo)
│   ├── Header.tsx / Footer.tsx
│   ├── PageHero.tsx            shared inner-page masthead
│   ├── ContactForm.tsx         client-side form + validation
│   └── Reveal.tsx              progressive-enhancement scroll animation
├── lib/
│   ├── content.ts              ALL SITE CONTENT, each item carrying its source citation
│   └── site.ts                 brand, navigation, metadata defaults
├── public/
│   ├── images/                 optimised project photography
│   ├── icon.svg                favicon
│   └── og.svg                  Open Graph image
├── scripts/
│   ├── prepare-images.py       rebuilds public/images from the source PDF extraction
│   └── shots.mjs               full-page screenshots for visual review
└── tests/e2e/site.spec.ts      the QA suite
```

### Editing content

**All site copy lives in `lib/content.ts`.** Each item has a `source` field naming the page or
slide it came from. The pages read from that file, so there is exactly one place to audit and one
place to change. Section copy written specifically for the site (rather than quoted from the
documents) is marked `EDITORIAL` in the project's content-traceability record.

### The wordmark

`components/Wordmark.tsx` renders the **client's own logo artwork** — the `Sk∞n` lockup (the loop is
the **"oo"** of "Skoon", B p4) over `Carbon Lab` — from two PNG files in `public/images/`:

| File | Tone | Used on |
| --- | --- | --- |
| `skoon-logo-primary.png` | dark letters | light surfaces — the header, `rgb(255 255 255 / .92)` |
| `skoon-logo-white.png` | white letters | dark surfaces — the footer, `var(--brand-navy)` #0f172a |

The supplied file is what renders: nothing is recoloured, filtered, traced or redrawn, so the brand
colours on screen are the client's. The mark stays isolated in this one component — nothing else
references it, so a reissue means replacing those two files and nothing else.

Sizing is height-driven (33px, exactly the height the previous lockup occupied), so the swap left the
header and the page geometry untouched; a caller needing a different size passes a `className`.

Earlier revisions of this project carried a *typographic stand-in* for the logo, because the
branding proposal's "Logo Resmi" page (B p6) contains a placeholder rather than the artwork. That
stand-in has been replaced by the artwork itself.

---

## Configuration

Copy `.env.example` to `.env.local`. Everything is optional; the site runs with no configuration.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for canonical tags, OG URLs and the sitemap. Defaults to `http://localhost:3100`. |
| `ENQUIRY_TRANSPORT` | `resend` or `webhook`. Unset ⇒ delivery disabled. |
| `ENQUIRY_TO_EMAIL` | Verified recipient. Unset ⇒ delivery disabled. |
| `ENQUIRY_FROM_EMAIL` | Verified sender (Resend only). |
| `RESEND_API_KEY` | Resend API key. **Server-side only.** |
| `ENQUIRY_WEBHOOK_URL` | HTTPS endpoint for the webhook transport. |

### Contact form behaviour

**The form is functional with no configuration** — and honest about it. With no destination set,
`/api/enquiry` returns HTTP 503 with `code: "not_configured"`, and the UI tells the visitor the
message was **not** sent and names the missing variables. It never claims to have delivered
something it did not.

No email address, phone number or postal address is hard-coded anywhere in this project. The old
former identity's contact details are deliberately **not** reproduced.

No credential is exposed to the browser: nothing in `.env.example` is prefixed `NEXT_PUBLIC_`
except the site URL.

---

## Testing

The suite runs against a running server and covers every route at three viewports.

```bash
npm run start            # in one shell (or let Playwright start it — see below)
npm run test:e2e         # in another

# first run only, if Chromium is missing:
npm run test:e2e:install
```

Playwright will start its own server if one is not already running (`reuseExistingServer`). To run
the same suite against a deployed instance:

```bash
PLAYWRIGHT_BASE_URL=https://example.com npm run test:e2e
```

Projects: **desktop-1440**, **tablet-768**, **mobile-390**.

What is covered: routing and status codes, one-`h1`-per-page, metadata and canonical tags, custom
404, sitemap and robots, horizontal overflow, broken images, console/network errors, navigation,
the mobile menu (including Escape and focus return), form validation and the not-configured path,
labelled controls, heading order, visible focus, and the content-integrity rules below.

---

## Content integrity rules (enforced by tests)

These are non-negotiable, and the suite fails if any is broken:

1. **No obsolete former-brand branding** anywhere in rendered text or markup.
2. **No former personnel** appear — the names are supplied to the test run at runtime
   (`FORBIDDEN_PERSONNEL`) rather than committed here, so a public repository does not republish
   names the rebrand removed. The suite skips the assertion with a clear reason when the list is
   not supplied.
3. **No invented contact detail** — not the former address, not a plausible-looking new one.
4. **No unsupported ESG claim** — no emissions figure, reduction %, capacity, certification,
   "carbon neutral", "net zero", "industry-leading" or "trusted by N clients". The source documents
   contain **no performance data at all**, so the site displays none.
5. **No client names** — client identities documented in the source materials are withheld, and are
   supplied at runtime (`FORBIDDEN_CLIENTS`) for the same reason as rule 2. The one named partner
   may appear **only** alongside an explicit confirmation caveat, because the collaboration is
   documented in the company's own materials but has not been confirmed as current.

### Running the identifier-based checks

Rules 1, 2 and 5 assert the absence of specific strings. Those strings are **not** committed.

```bash
FORMER_BRAND="FormerBrandName" \
FORBIDDEN_PERSONNEL="Name One,Name Two" \
FORBIDDEN_CLIENTS="Client A,Client B" \
npm run test:e2e
```

Without them, the suite still runs; those three assertions report as *skipped* rather than passing
silently.

Accessibility deviation worth knowing: the proposal's `#10B981` and `#0284C7` fail WCAG AA as text
on white, so the site uses darker derivatives (`#047857`, `#0369A1`) wherever the colour carries
text, and reserves the exact proposal values for graphics and large display type.

---

## Deployment

The site is a standard Next.js app and can be deployed anywhere Node runs.

**Any Node host / container:**

```bash
npm ci
npm run build
npm run start        # binds :3100; override with `npm run start -- -p $PORT`
```

**Health check:** `GET /api/enquiry` returns `{"ok":true,"configured":<bool>}` — use it as a
readiness probe and to confirm whether form delivery is wired up.

**Checklist before going live**

1. Set `NEXT_PUBLIC_SITE_URL` to the real origin (it drives canonical tags, OG URLs and the
   sitemap — leaving it as localhost will publish wrong URLs).
2. Decide on enquiry delivery and set `ENQUIRY_TRANSPORT` + the matching credentials, **or**
   consciously accept the "not configured" state.
3. The **logo artwork** is supplied and in place (`public/images/skoon-logo-primary.png` +
   `skoon-logo-white.png`). If the client issues a revised lockup, replace those two files — nothing
   else references the mark.
4. Confirm the content items flagged as withheld or unsupported in the project's
   content-traceability record — particularly the legal entity name and the contact details,
   which are currently rendered as "pending confirmation".
5. Re-run `npm run test:e2e` against the deployed origin.

> **Not deployed by this project.** No hosting configuration, DNS or Vercel project was created or
> modified. Deployment is a deliberate, authorised step for the owner.

---

## Static assets

`scripts/prepare-images.py` regenerates `public/images/` from the audit's extraction of the source
PDF. It deliberately **excludes** the source collages that name and logo clients, and the vessel
photo carrying a third-party name. Run it only if the source extraction in `../rebrand/assets_raw/`
is present.

---

## Known limitations

Recorded honestly here and in the project's QA report:

- **The favicon and the Open Graph image do not use the supplied artwork.** `public/icon.svg` is the
  loop badge and `public/og.svg` still renders the `Sk∞n` lockup typographically, both built from the
  design tokens. Only the in-page mark uses the client's files. Rebuild those two from the artwork
  before launch if the social preview matters.
- **The registered legal entity name, address, telephone and email are unknown.** They render as
  "pending confirmation" rather than being guessed.
- **Carbon accounting** appears only in the branding proposal, which is a design document rather
  than a service record; it is flagged provisional.
- **No ESG performance data is published,** because none exists in the source. The site shows no
  KPI counters or impact charts by design.
- Search-engine metadata is complete, but `og.svg` is an SVG; some social platforms prefer PNG.
  Provide a 1200×630 PNG before launch if the preview matters.
