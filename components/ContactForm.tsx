'use client';

import { useId, useRef, useState } from 'react';
import styles from './ContactForm.module.css';

type Errors = Partial<Record<'name' | 'organisation' | 'email' | 'phone' | 'interest' | 'message', string>>;

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'not_configured'; message: string; missing?: string[] }
  | { kind: 'error'; message: string; errors?: Errors };

const INTERESTS = [
  { value: 'corporation', label: 'Corporation — ESG implementation' },
  { value: 'investor', label: 'Investor — ESG disclosure' },
  { value: 'government', label: 'Government — disclosure & implementation' },
  { value: 'rating', label: 'Rating — review & framework' },
  { value: 'other', label: 'Something else' },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Errors>({});

  const id = (field: string) => `${uid}-${field}`;
  const errId = (field: string) => `${uid}-${field}-error`;

  function clientValidate(data: FormData): Errors {
    const e: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const organisation = String(data.get('organisation') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const interest = String(data.get('interest') ?? '').trim();

    if (!name) e.name = 'Please enter your name.';
    if (!organisation) e.organisation = 'Please enter your organisation.';
    if (!email) e.email = 'Please enter an email address.';
    else if (!EMAIL_RE.test(email)) e.email = 'Please enter a valid email address.';
    if (phone && phone.replace(/\D/g, '').length < 6)
      e.phone = 'That does not look like a phone number.';
    if (!interest) e.interest = 'Please choose an option.';
    if (!message) e.message = 'Please tell us what you need.';
    else if (message.length < 20) e.message = 'Please give us a little more detail.';

    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const clientErrors = clientValidate(data);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus({ kind: 'error', message: 'Please correct the highlighted fields.' });
      const firstKey = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus({ kind: 'submitting' });

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
        errors?: Errors;
        missing?: string[];
      };

      if (res.ok && payload.ok) {
        setStatus({ kind: 'sent' });
        form.reset();
        return;
      }

      if (payload.code === 'not_configured') {
        setStatus({
          kind: 'not_configured',
          message:
            payload.message ??
            'The enquiry form is not connected to a delivery destination yet.',
          missing: payload.missing,
        });
        return;
      }

      if (payload.code === 'validation' && payload.errors) {
        setErrors(payload.errors);
        setStatus({ kind: 'error', message: 'Please correct the highlighted fields.' });
        return;
      }

      setStatus({
        kind: 'error',
        message: payload.message ?? 'The message could not be sent. Please try again.',
      });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Could not reach the server. Please check your connection and try again.',
      });
    }
  }

  const invalid = (f: keyof Errors) => (errors[f] ? 'true' : undefined);
  const describedBy = (f: keyof Errors) =>
    errors[f] ? `${errId(f)}` : undefined;

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={id('name')}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={invalid('name')}
            aria-describedby={describedBy('name')}
            className={errors.name ? styles.inputError : undefined}
          />
          {errors.name && (
            <p className={styles.error} id={errId('name')}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={id('organisation')}>
            Organisation <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('organisation')}
            name="organisation"
            type="text"
            autoComplete="organization"
            required
            aria-required="true"
            aria-invalid={invalid('organisation')}
            aria-describedby={describedBy('organisation')}
            className={errors.organisation ? styles.inputError : undefined}
          />
          {errors.organisation && (
            <p className={styles.error} id={errId('organisation')}>
              {errors.organisation}
            </p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={id('email')}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={invalid('email')}
            aria-describedby={describedBy('email')}
            className={errors.email ? styles.inputError : undefined}
          />
          {errors.email && (
            <p className={styles.error} id={errId('email')}>
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={id('phone')}>Phone (optional)</label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={invalid('phone')}
            aria-describedby={describedBy('phone')}
            className={errors.phone ? styles.inputError : undefined}
          />
          {errors.phone && (
            <p className={styles.error} id={errId('phone')}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={id('interest')}>
          What is this about? <span aria-hidden="true">*</span>
        </label>
        <select
          id={id('interest')}
          name="interest"
          required
          aria-required="true"
          aria-invalid={invalid('interest')}
          aria-describedby={describedBy('interest')}
          defaultValue=""
          className={errors.interest ? styles.inputError : undefined}
        >
          <option value="" disabled>
            Select an option…
          </option>
          {INTERESTS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p className={styles.error} id={errId('interest')}>
            {errors.interest}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={id('message')}>
          Your requirement <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={7}
          required
          aria-required="true"
          aria-invalid={invalid('message')}
          aria-describedby={describedBy('message')}
          className={errors.message ? styles.inputError : undefined}
          placeholder="What do you have to report, to whom, and by when?"
        />
        {errors.message && (
          <p className={styles.error} id={errId('message')}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from users and assistive tech; bots tend to fill it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status.kind === 'submitting'}
          aria-busy={status.kind === 'submitting'}
        >
          {status.kind === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className={styles.hint}>
          Fields marked <span aria-hidden="true">*</span> are required.
        </p>
      </div>

      {/* Live region: every outcome is announced. */}
      <div role="status" aria-live="polite" className={styles.statusWrap}>
        {status.kind === 'sent' && (
          <div className={`${styles.status} ${styles.statusOk}`}>
            <strong>Enquiry sent.</strong>
            <p>Thank you — your message has been delivered. We will respond in due course.</p>
          </div>
        )}

        {status.kind === 'not_configured' && (
          <div className={`${styles.status} ${styles.statusWarn}`}>
            <strong>This form is not yet connected.</strong>
            <p>{status.message}</p>
            {status.missing && status.missing.length > 0 && (
              <p className={styles.missing}>
                Missing configuration: <code>{status.missing.join(', ')}</code>
              </p>
            )}
          </div>
        )}

        {status.kind === 'error' && (
          <div className={`${styles.status} ${styles.statusErr}`}>
            <strong>Not sent.</strong>
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
