/// <reference types="@cloudflare/workers-types" />

interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

interface ContactPayload {
  name: string;
  email: string;
  school?: string;
  message: string;
  'cf-turnstile-response': string;
}

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_SEND = 'https://api.resend.com/emails';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]!);
}

async function readPayload(request: Request): Promise<Partial<ContactPayload>> {
  const ct = request.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    return await request.json();
  }
  const form = await request.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === 'string') out[k] = v;
  }
  return out as Partial<ContactPayload>;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readPayload(request);

  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const school = (data.school ?? '').trim();
  const message = (data.message ?? '').trim();
  const token = data['cf-turnstile-response'] ?? '';

  if (!name || !email || !message) {
    return json({ ok: false, error: 'missing-fields' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'invalid-email' }, 400);
  }
  if (!token) {
    return json({ ok: false, error: 'missing-captcha' }, 400);
  }

  const verify = await fetch(TURNSTILE_VERIFY, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('cf-connecting-ip') ?? '',
    }),
  });
  const verifyJson = (await verify.json()) as { success: boolean };
  if (!verifyJson.success) {
    return json({ ok: false, error: 'captcha-failed' }, 400);
  }

  const html = `
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${school ? `<p><strong>Istituto:</strong> ${escapeHtml(school)}</p>` : ''}
    <p><strong>Messaggio:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  const send = await fetch(RESEND_SEND, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Contatto sito scuole — ${name}`,
      html,
    }),
  });

  if (!send.ok) {
    return json({ ok: false, error: 'send-failed' }, 502);
  }

  return json({ ok: true });
};
