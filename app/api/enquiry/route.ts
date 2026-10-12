import { NextResponse } from 'next/server';

/**
 * Enquiry endpoint.
 *
 * DELIVERY IS OPTIONAL AND DISABLED BY DEFAULT.
 *
 * No destination address is hard-coded anywhere. While `ENQUIRY_TO_EMAIL` (and a
 * transport) are unset, this route returns an explicit `not_configured` result —
 * it never pretends to have delivered a message.
 *
 * All credentials are read from server-side environment variables. None of them is
 * prefixed `NEXT_PUBLIC_`, so none can reach the browser bundle.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  name?: unknown;
  organisation?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  /** Honeypot — must stay empty. */
  website?: unknown;
};

const MAX = { name: 120, organisation: 160, email: 200, phone: 40, message: 4000 };

const INTERESTS = ['corporation', 'investor', 'government', 'rating', 'other'] as const;

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: Payload) {
  const errors: Record<string, string> = {};

  const name = str(body.name);
  const organisation = str(body.organisation);
  const email = str(body.email);
  const phone = str(body.phone);
  const interest = str(body.interest) || 'other';
  const message = str(body.message);

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > MAX.name) errors.name = 'That name is too long.';

  if (!organisation) errors.organisation = 'Please enter your organisation.';
  else if (organisation.length > MAX.organisation) errors.organisation = 'That is too long.';

  if (!email) errors.email = 'Please enter an email address.';
  else if (!EMAIL_RE.test(email) || email.length > MAX.email)
    errors.email = 'Please enter a valid email address.';

  if (phone.length > MAX.phone) errors.phone = 'That phone number is too long.';

  if (!INTERESTS.includes(interest as (typeof INTERESTS)[number]))
    errors.interest = 'Please choose an option.';

  if (!message) errors.message = 'Please tell us what you need.';
  else if (message.length < 20)
    errors.message = 'Please give us a little more detail (at least 20 characters).';
  else if (message.length > MAX.message) errors.message = 'That message is too long.';

  return {
    errors,
    data: { name, organisation, email, phone, interest, message },
  };
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'bad_request', message: 'Could not read the submitted form.' },
      { status: 400 },
    );
  }

  // Honeypot: a real user never fills this. Answer as if accepted, deliver nothing.
  if (str(body.website)) {
    return NextResponse.json({ ok: true, delivered: false, code: 'accepted' }, { status: 200 });
  }

  const { errors, data } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, code: 'validation', errors, message: 'Please correct the highlighted fields.' },
      { status: 422 },
    );
  }

  const to = process.env.ENQUIRY_TO_EMAIL?.trim();
  const transport = process.env.ENQUIRY_TRANSPORT?.trim().toLowerCase();

  // ---- not configured: say so honestly, and tell the operator what to set ----
  if (!to || !transport) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        code: 'not_configured',
        message:
          'The enquiry form is not connected to a delivery destination yet, so your message has ' +
          'not been sent. An administrator must set ENQUIRY_TO_EMAIL and ENQUIRY_TRANSPORT (see ' +
          '.env.example) before enquiries can be delivered.',
        missing: [
          ...(to ? [] : ['ENQUIRY_TO_EMAIL']),
          ...(transport ? [] : ['ENQUIRY_TRANSPORT']),
        ],
      },
      { status: 503 },
    );
  }

  const subject = `Website enquiry — ${data.organisation} (${data.interest})`;
  const text = [
    `Name:         ${data.name}`,
    `Organisation: ${data.organisation}`,
    `Email:        ${data.email}`,
    `Phone:        ${data.phone || '—'}`,
    `Interest:     ${data.interest}`,
    '',
    data.message,
    '',
    `Received: ${new Date().toISOString()}`,
  ].join('\n');

  try {
    if (transport === 'resend') {
      const key = process.env.RESEND_API_KEY?.trim();
      const from = process.env.ENQUIRY_FROM_EMAIL?.trim();
      if (!key || !from) {
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            code: 'not_configured',
            message:
              'Delivery is configured for Resend but RESEND_API_KEY or ENQUIRY_FROM_EMAIL is ' +
              'missing, so nothing was sent.',
            missing: [
              ...(key ? [] : ['RESEND_API_KEY']),
              ...(from ? [] : ['ENQUIRY_FROM_EMAIL']),
            ],
          },
          { status: 503 },
        );
      }

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        console.error('[enquiry] resend failed', res.status, detail.slice(0, 500));
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            code: 'delivery_failed',
            message: 'The message could not be delivered. Please try again later.',
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true, delivered: true, code: 'sent' }, { status: 200 });
    }

    if (transport === 'webhook') {
      const url = process.env.ENQUIRY_WEBHOOK_URL?.trim();
      if (!url || !/^https:\/\//i.test(url)) {
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            code: 'not_configured',
            message:
              'Delivery is configured for a webhook but ENQUIRY_WEBHOOK_URL is missing or is not ' +
              'an https endpoint, so nothing was sent.',
            missing: ['ENQUIRY_WEBHOOK_URL'],
          },
          { status: 503 },
        );
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, ...data, receivedAt: new Date().toISOString() }),
      });

      if (!res.ok) {
        console.error('[enquiry] webhook failed', res.status);
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            code: 'delivery_failed',
            message: 'The message could not be delivered. Please try again later.',
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true, delivered: true, code: 'sent' }, { status: 200 });
    }

    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        code: 'not_configured',
        message: `Unknown ENQUIRY_TRANSPORT "${transport}". Supported values: resend, webhook.`,
      },
      { status: 503 },
    );
  } catch (err) {
    console.error('[enquiry] unexpected error', err);
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        code: 'delivery_failed',
        message: 'Something went wrong sending the message. Please try again later.',
      },
      { status: 502 },
    );
  }
}

export async function GET() {
  const configured = Boolean(
    process.env.ENQUIRY_TO_EMAIL?.trim() && process.env.ENQUIRY_TRANSPORT?.trim(),
  );
  return NextResponse.json({ ok: true, configured }, { status: 200 });
}
