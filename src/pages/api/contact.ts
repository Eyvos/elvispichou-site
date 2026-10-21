import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { contactSchema, deliverContact, looksLikeSpam, parseLocale } from '../../lib/contact';
import { allow } from '../../lib/rate-limit';
import { getDict, localePath } from '../../i18n';

export const prerender = false;

/**
 * Reçoit le formulaire de contact.
 * - Appel JS (Accept: application/json) → réponse JSON.
 * - Envoi HTML classique (sans JS) → redirection vers /?envoi=ok|erreur#contact (ou /en/… selon la langue du formulaire).
 */
export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  // Un message de 5000 caractères pèse bien moins de 32 Ko : au-delà, ce n'est pas un visiteur.
  if (Number(request.headers.get('content-length') ?? 0) > 32_768) return new Response(null, { status: 413 });
  const form = await request.formData();
  const lang = parseLocale(form.get('lang'));
  const e = getDict(lang).contact.server;
  const reply = (ok: boolean, status: number, error?: string) =>
    wantsJson
      ? Response.json(ok ? { ok } : { ok, error }, { status })
      : redirect(localePath(lang, `/?envoi=${ok ? 'ok' : 'erreur'}#contact`), 303);

  // On répond « succès » aux robots pour ne pas leur indiquer qu'ils sont détectés.
  if (looksLikeSpam(form)) return reply(true, 200);

  const parsed = contactSchema(lang).safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return reply(false, 400, parsed.error.issues[0]?.message ?? e.invalid);
  }

  // Limites : 5 envois / 10 min par IP, 2 / heure par adresse (l'accusé de réception ne doit pas servir à harceler un tiers).
  const ip = request.headers.get('cf-connecting-ip') ?? clientAddress ?? 'inconnue';
  if (!allow(`ip:${ip}`, 5, 600_000) || !allow(`mail:${parsed.data.email.toLowerCase()}`, 2, 3_600_000)) {
    return reply(false, 429, e.tooMany);
  }

  try {
    await deliverContact(parsed.data, lang, {
      apiKey: env.RESEND_API_KEY,
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
    });
    return reply(true, 200);
  } catch (err) {
    console.error('[contact]', err);
    return reply(false, 502, e.sendFailed);
  }
};
