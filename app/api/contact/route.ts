import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { copy } from '@/data/content';

/**
 * Contact endpoint: server-side validation, honeypot, simple in-memory rate
 * limiting and delivery through Resend. API keys are only read from .env.local.
 */

const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;

interface RateEntry {
  count: number;
  resetAt: number;
}

type RateStore = Map<string, RateEntry>;

const globalWithRateStore = globalThis as typeof globalThis & {
  __portfolioContactRateStore?: RateStore;
};

const rateStore: RateStore =
  globalWithRateStore.__portfolioContactRateStore ?? new Map<string, RateEntry>();
globalWithRateStore.__portfolioContactRateStore = rateStore;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character,
  );
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(input: Record<string, unknown>): {
  values: { name: string; email: string; message: string };
  errors: FieldErrors;
} {
  const text = (key: string) =>
    typeof input[key] === 'string' ? (input[key] as string).trim() : '';

  const values = {
    name: text('name'),
    email: text('email'),
    message: text('message'),
  };

  const errors: FieldErrors = {};
  if (values.name.length < 2 || values.name.length > 80) {
    errors.name = copy.form.nameError;
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    values.email.length > 254
  ) {
    errors.email = copy.form.emailError;
  }
  if (values.message.length < 10 || values.message.length > 2000) {
    errors.message = copy.form.messageError;
  }

  return { values, errors };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: copy.form.serverError },
      { status: 400 },
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, error: copy.form.serverError },
      { status: 400 },
    );
  }

  const input = body as Record<string, unknown>;

  // Honeypot: pretend bots succeeded so they do not retry.
  const honeypot = typeof input.company === 'string' ? input.company.trim() : '';
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = validate(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: copy.form.invalidForm, fields: errors },
      { status: 400 },
    );
  }

  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp =
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { ok: false, error: copy.form.serverError },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !contactEmail) {
    return NextResponse.json(
      {
        ok: false,
        error: copy.form.serverError,
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: values.email,
      subject: `[Portfolio] Message from ${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        '',
        values.message,
      ].join('\n'),
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <hr />
        <p>${escapeHtml(values.message).replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: copy.form.serverError },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { ok: false, error: copy.form.serverError },
      { status: 500 },
    );
  }
}
