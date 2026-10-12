import { test, expect, type Page } from '@playwright/test';

const ROUTES = [
  { path: '/', name: 'Home', h1: /ESG advisory and carbon accounting/i },
  { path: '/about', name: 'About', h1: /ESG practice built around evidence/i },
  { path: '/services', name: 'Services', h1: /Seven services, four kinds of client/i },
  { path: '/esg', name: 'ESG', h1: /ESG treated as a value discipline/i },
  { path: '/approach', name: 'Approach', h1: /method that can be repeated/i },
  { path: '/resources', name: 'Resources', h1: /Indonesian companies are already required/i },
  { path: '/contact', name: 'Contact', h1: /Tell us what you have to report/i },
];

/**
 * Scroll the whole document so lazy-loaded images below the fold are actually requested.
 * Uses documentElement.scrollHeight (not body) and finishes at the very bottom, otherwise
 * the final image on a long page can remain unloaded and be misreported as broken.
 */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const doc = document.documentElement;
    const step = Math.max(240, Math.round(window.innerHeight * 0.7));
    for (let y = 0; y <= doc.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, doc.scrollHeight);
    await new Promise((r) => setTimeout(r, 350));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 150));
  });
}

/* ------------------------------------------------------------------ */
/* Sensitive identifiers — supplied at RUNTIME, never committed.        */
/*                                                                      */
/* This repository is public. The former brand name, the former         */
/* personnel and the client names documented in the source materials    */
/* must not be republished here, so the assertions that check for their  */
/* absence read them from the environment. When a list is not supplied   */
/* the corresponding test SKIPS with a clear reason rather than passing  */
/* silently.                                                            */
/* ------------------------------------------------------------------ */

const splitList = (v: string | undefined): string[] =>
  (v ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

/** Former brand names that must not appear (e.g. FORMER_BRAND="OldName"). */
const FORMER_BRAND = splitList(process.env.FORMER_BRAND);

/** Former personnel who must not be presented as current (comma-separated). */
const FORBIDDEN_PERSONNEL = splitList(process.env.FORBIDDEN_PERSONNEL);

/** Client organisations that must not be published (comma-separated). */
const FORBIDDEN_CLIENTS = splitList(process.env.FORBIDDEN_CLIENTS);

/** Word-boundary-safe pattern for a literal name. */
const wordRe = (s: string) => new RegExp(`\\b${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

/* ------------------------------------------------------------------ */
/* 1. Routing, structure and metadata                                   */
/* ------------------------------------------------------------------ */

test.describe('routes and structure', () => {
  for (const r of ROUTES) {
    test(`${r.name} (${r.path}) responds and is well-formed`, async ({ page }) => {
      const res = await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      expect(res?.status(), `${r.path} status`).toBe(200);

      // exactly one h1 per page
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(r.h1);

      // metadata
      await expect(page).toHaveTitle(/Skoon Carbon Lab/);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc, `${r.path} meta description`).toBeTruthy();
      expect((desc ?? '').length).toBeGreaterThan(50);

      // canonical + OG
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, `${r.path} canonical`).toBeTruthy();
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle, `${r.path} og:title`).toBeTruthy();

      // landmarks
      await expect(page.locator('header')).toHaveCount(1);
      await expect(page.locator('main#main')).toHaveCount(1);
      await expect(page.locator('footer')).toHaveCount(1);

      // exactly one visible nav CTA / lang declared
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  }

  test('unknown route returns the custom 404, not a server error', async ({ page }) => {
    const res = await page.goto('/definitely-not-a-page-xyz', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText(/does not exist/i);
    // must not leak a stack trace
    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/stack|Error:|at \w+ \(/i);
  });

  test('sitemap and robots are served', async ({ request }) => {
    const sm = await request.get('/sitemap.xml');
    expect(sm.status()).toBe(200);
    const xml = await sm.text();
    for (const r of ROUTES) {
      expect(xml, `sitemap should list ${r.path}`).toContain(r.path === '/' ? '<loc>' : r.path);
    }

    const rb = await request.get('/robots.txt');
    expect(rb.status()).toBe(200);
    expect(await rb.text()).toMatch(/sitemap:/i);
  });
});

/* ------------------------------------------------------------------ */
/* 2. Layout integrity — no overflow, no broken assets                  */
/* ------------------------------------------------------------------ */

test.describe('layout integrity', () => {
  for (const r of ROUTES) {
    test(`${r.name}: no horizontal overflow`, async ({ page }) => {
      await page.goto(r.path, { waitUntil: 'networkidle' });
      const overflows = await page.evaluate(() => {
        const de = document.documentElement;
        const docOverflow = de.scrollWidth - de.clientWidth;
        // also find any element wider than the viewport
        const offenders: string[] = [];
        document.querySelectorAll<HTMLElement>('body *').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > de.clientWidth + 1.5 && rect.height > 0) {
            const style = getComputedStyle(el);
            if (style.position !== 'fixed') {
              offenders.push(
                `${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 40)} w=${Math.round(rect.width)}`,
              );
            }
          }
        });
        return { docOverflow, offenders: offenders.slice(0, 6) };
      });
      expect(overflows.docOverflow, `document scroll overflow on ${r.path}`).toBeLessThanOrEqual(1);
      expect(overflows.offenders, `elements wider than viewport on ${r.path}`).toEqual([]);
    });

    test(`${r.name}: all images load`, async ({ page }) => {
      const bad: string[] = [];
      page.on('response', (res) => {
        const url = res.url();
        if (/\.(png|jpe?g|svg|webp|avif)(\?|$)/i.test(url) && res.status() >= 400) {
          bad.push(`${res.status()} ${url}`);
        }
      });
      await page.goto(r.path, { waitUntil: 'networkidle' });

      // Images below the fold are lazy-loaded; scroll through so every one is requested
      // before asserting, otherwise the check would report unloaded images as broken.
      await scrollThrough(page);
      await page
        .waitForFunction(
          () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
          null,
          { timeout: 10_000 },
        )
        .catch(() => {});

      const broken = await page.evaluate(() =>
        Array.from(document.images)
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      );
      expect(broken, `broken <img> on ${r.path}`).toEqual([]);
      expect(bad, `failed image responses on ${r.path}`).toEqual([]);
    });
  }

  test('no console errors or failed requests on any route', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
    });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('response', (res) => {
      if (res.status() >= 400) errors.push(`http ${res.status()} ${res.url()}`);
    });

    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'networkidle' });
    }
    expect(errors).toEqual([]);
  });
});

/* ------------------------------------------------------------------ */
/* 3. Navigation                                                        */
/* ------------------------------------------------------------------ */

test.describe('navigation', () => {
  test('header links navigate correctly', async ({ page }) => {
    // The desktop nav is hidden below 960px by design; the mobile menu test covers that case.
    const width = page.viewportSize()?.width ?? 1440;
    test.skip(width < 960, 'desktop navigation is hidden at this viewport');

    await page.goto('/', { waitUntil: 'networkidle' });

    for (const r of ROUTES.slice(1, 6)) {
      const label = r.name === 'ESG' ? 'ESG & Sustainability' : r.name;
      const link = page.locator('header nav[aria-label="Primary"] a', { hasText: label }).first();
      if ((await link.count()) === 0) continue;
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${r.path.replace(/\//g, '\\/')}$`));
      await page.goBack();
    }
  });

  test('mobile menu opens, navigates and closes', async ({ page }) => {
    test.skip(!test.info().project.name.startsWith('mobile'), 'mobile viewport only');

    await page.goto('/', { waitUntil: 'networkidle' });

    const toggle = page.getByRole('button', { name: /open navigation menu/i });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(page.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    const panel = page.locator('#mobile-nav');
    await expect(panel).toBeVisible();

    // Escape closes it
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-nav')).toBeHidden();

    // reopening and following a link navigates
    await page.getByRole('button', { name: /open navigation menu/i }).click();
    await page.locator('#mobile-nav a', { hasText: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);
  });

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const skip = page.locator('a.skip-link');
    await skip.focus();
    await expect(skip).toBeVisible();
    await expect(skip).toHaveAttribute('href', '#main');
  });
});

/* ------------------------------------------------------------------ */
/* 4. Contact form                                                      */
/* ------------------------------------------------------------------ */

test.describe('contact form', () => {
  test('blocks submission when required fields are empty', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /send enquiry/i }).click();

    await expect(page.locator('[role="status"]')).toContainText(/correct the highlighted/i);
    await expect(page.locator('[id$="-name-error"]')).toBeVisible();
    // aria wiring
    const name = page.locator('input[name="name"]');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveAttribute('aria-describedby', /-name-error$/);
  });

  test('rejects a malformed email', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await page.fill('input[name="name"]', 'Test Person');
    await page.fill('input[name="organisation"]', 'Test Org');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.selectOption('select[name="interest"]', 'corporation');
    await page.fill('textarea[name="message"]', 'We need help with GRI sustainability reporting.');
    await page.getByRole('button', { name: /send enquiry/i }).click();

    await expect(page.locator('[id$="-email-error"]')).toContainText(/valid email/i);
  });

  test('valid submission reaches the API and reports honestly', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });
    await page.fill('input[name="name"]', 'Test Person');
    await page.fill('input[name="organisation"]', 'Test Org');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="interest"]', 'corporation');
    await page.fill(
      'textarea[name="message"]',
      'We need help with GRI sustainability reporting for our annual report.',
    );

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/enquiry')),
      page.getByRole('button', { name: /send enquiry/i }).click(),
    ]);

    // With no delivery configured the API must say so rather than claim success.
    if (!process.env.ENQUIRY_TO_EMAIL) {
      expect(response.status()).toBe(503);
      await expect(page.locator('[role="status"]')).toContainText(/not yet connected/i);
      await expect(page.locator('[role="status"]')).toContainText(/ENQUIRY_TO_EMAIL/);
    } else {
      expect(response.status()).toBe(200);
      await expect(page.locator('[role="status"]')).toContainText(/enquiry sent/i);
    }
  });

  test('api rejects a bad payload', async ({ request }) => {
    const res = await request.post('/api/enquiry', {
      data: { name: '', organisation: '', email: 'x', message: 'no' },
    });
    expect([422, 503]).toContain(res.status());
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  test('api honeypot accepts silently without delivering', async ({ request }) => {
    const res = await request.post('/api/enquiry', {
      data: {
        name: 'Bot',
        organisation: 'Bot Org',
        email: 'bot@example.com',
        interest: 'other',
        message: 'This is a sufficiently long bot message to pass validation checks.',
        website: 'http://spam.example',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.delivered).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* 5. Accessibility fundamentals                                        */
/* ------------------------------------------------------------------ */

test.describe('accessibility', () => {
  for (const r of ROUTES) {
    test(`${r.name}: form controls and links are labelled`, async ({ page }) => {
      await page.goto(r.path, { waitUntil: 'networkidle' });

      // every input/select/textarea has an accessible name
      const unlabelled = await page.evaluate(() => {
        const out: string[] = [];
        document
          .querySelectorAll<HTMLElement>('input:not([type=hidden]), select, textarea')
          .forEach((el) => {
            const id = el.getAttribute('id');
            const hasLabel = id ? !!document.querySelector(`label[for="${id}"]`) : false;
            const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
            if (!hasLabel && !aria) out.push(el.outerHTML.slice(0, 90));
          });
        return out;
      });
      expect(unlabelled, `unlabelled controls on ${r.path}`).toEqual([]);

      // no empty links or buttons
      const emptyInteractive = await page.evaluate(() => {
        const out: string[] = [];
        document.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
          const text = (el.textContent ?? '').trim();
          const aria = el.getAttribute('aria-label');
          const labelled = el.getAttribute('aria-labelledby');
          const svgTitle = el.querySelector('svg title');
          if (!text && !aria && !labelled && !svgTitle) out.push(el.outerHTML.slice(0, 90));
        });
        return out;
      });
      expect(emptyInteractive, `unnamed interactive elements on ${r.path}`).toEqual([]);
    });
  }

  test('heading order has no skipped levels', async ({ page }) => {
    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      const levels = await page.$$eval('h1,h2,h3,h4,h5,h6', (els) =>
        els.map((e) => Number(e.tagName[1])),
      );
      let prev = levels[0] ?? 1;
      for (const lvl of levels) {
        expect(lvl - prev, `heading jump ${prev}->${lvl} on ${r.path}`).toBeLessThanOrEqual(1);
        prev = lvl;
      }
    }
  });

  test('keyboard focus is visible on the primary CTA', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // The header CTA is intentionally hidden below 960px (it moves into the mobile menu),
    // so target the first *visible* primary CTA rather than assuming the header one.
    const cta = page.locator('a.btn--primary:visible, button.btn--primary:visible').first();
    await expect(cta).toBeVisible();
    await cta.focus();
    const outline = await cta.evaluate((el) => {
      const s = getComputedStyle(el);
      return { width: s.outlineWidth, style: s.outlineStyle };
    });
    expect(outline.style).not.toBe('none');
    expect(parseFloat(outline.width)).toBeGreaterThan(0);
  });

  test('the hidden header CTA is not keyboard reachable on small viewports', async ({ page }) => {
    const width = page.viewportSize()?.width ?? 1440;
    test.skip(width >= 960, 'the header CTA is visible at this viewport');

    await page.goto('/', { waitUntil: 'networkidle' });
    const headerCta = page.locator('header a.btn--primary').first();
    await expect(headerCta).toBeHidden();
    // display:none removes it from the tab order — assert it cannot receive focus
    const focused = await headerCta.evaluate((el: HTMLElement) => {
      el.focus();
      return document.activeElement === el;
    });
    expect(focused).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* 6. Content integrity — the rebrand and no-fabrication rules          */
/* ------------------------------------------------------------------ */

test.describe('content integrity', () => {
  test('no obsolete former-brand branding anywhere in rendered pages', async ({ page }) => {
    test.skip(
      FORMER_BRAND.length === 0,
      'set FORMER_BRAND (comma-separated) to assert obsolete branding is gone',
    );
    const hits: string[] = [];
    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      const html = await page.content();
      for (const brand of FORMER_BRAND) {
        if (wordRe(brand).test(text)) hits.push(`visible text on ${r.path}`);
        if (wordRe(brand).test(html)) hits.push(`markup on ${r.path}`);
      }
    }
    expect(hits).toEqual([]);
  });

  test('no former personnel are presented as current', async ({ page }) => {
    test.skip(
      FORBIDDEN_PERSONNEL.length === 0,
      'set FORBIDDEN_PERSONNEL (comma-separated) to assert former personnel are absent',
    );
    const hits: string[] = [];
    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      for (const name of FORBIDDEN_PERSONNEL) {
        // Word-boundary matching so a short given name is never a false positive inside
        // an ordinary word (e.g. a name inside "benefits" or "benchmark").
        if (wordRe(name).test(text)) hits.push(`${name} on ${r.path}`);
      }
    }
    expect(hits).toEqual([]);
  });

  test('no contact detail was invented', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    const html = await page.content();

    // Former-identity contact details must never reappear. The strings are supplied at
    // runtime (FORBIDDEN_CONTACT) so this public repository does not republish them.
    const forbiddenContact = splitList(process.env.FORBIDDEN_CONTACT);
    const lower = html.toLowerCase();
    for (const s of forbiddenContact) {
      expect(lower, `former contact detail "${s}" must not appear`).not.toContain(s.toLowerCase());
    }

    // And no plausible-looking address of our own invention.
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/pending confirmation|Being confirmed|not confirmed/i);
  });

  test('the site publishes no email address or telephone number at all', async ({ page }) => {
    // Structural guarantee that holds regardless of which identifiers are supplied:
    // the site must carry no contact data until real values are confirmed.
    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();

      expect(text, `an email address appears on ${r.path}`).not.toMatch(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
      );

      // Only flag a *contiguous* run of 10+ digits (with optional separators), which is
      // what a real phone number looks like. Shorter runs — years, "36 standards", the
      // postcode — are ordinary content and must not trip this.
      const runs = text.match(/\d[\d\s().-]*\d/g) ?? [];
      const phoneLike = runs.filter((s) => (s.match(/\d/g) ?? []).length >= 10);
      expect(phoneLike, `a telephone number appears on ${r.path}`).toEqual([]);

      // No click-to-call links either.
      await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    }
  });

  test('no unsupported ESG or performance claims are published', async ({ page }) => {
    const banned = [
      /carbon neutral/i,
      /zero emissions?/i,
      /net zero/i,
      /industry.leading/i,
      /world.class/i,
      /ISO[- ]?\d{4,5}/i,
      /\b\d+\s*(?:tCO2e|tonnes?\s+of\s+CO2)/i,
      /\b\d+\s*MW\b/i,
      /certified/i,
      /trusted by \d+/i,
      /\d+\s*%\s*(?:reduction|less)/i,
    ];
    const hits: string[] = [];
    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();
      for (const b of banned) {
        const m = text.match(b);
        if (m) hits.push(`${m[0]} on ${r.path}`);
      }
    }
    expect(hits).toEqual([]);
  });

  test('client names are not published, and any partner reference carries its caveat', async ({
    page,
  }) => {
    test.skip(
      FORBIDDEN_CLIENTS.length === 0,
      'set FORBIDDEN_CLIENTS (comma-separated) to assert client names are absent',
    );

    const clientHits: string[] = [];

    // A named partner may appear — the collaboration is documented in the company's own
    // materials — but ONLY alongside an explicit confirmation caveat.
    const partnerRe = /Agra Surya/i;
    const caveatRe = /should be confirmed|reported in the company|status.*confirm|confirm.*before/i;
    const uncaveated: string[] = [];

    for (const r of ROUTES) {
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      const text = await page.locator('body').innerText();

      for (const c of FORBIDDEN_CLIENTS) {
        if (wordRe(c).test(text)) clientHits.push(`${c} on ${r.path}`);
      }

      if (partnerRe.test(text) && !caveatRe.test(text)) {
        uncaveated.push(r.path);
      }
    }

    expect(clientHits, 'client names must not be published').toEqual([]);
    expect(
      uncaveated,
      'a named partner may only appear with an explicit confirmation caveat on the same page',
    ).toEqual([]);
  });
});
