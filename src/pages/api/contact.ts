import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { contactSchema, deliverContact, looksLikeSpam, parseLocale } from '../../lib/contact';
import { getDict, localePath } from '../../i18n';

export const prerender = false;

/**
 * Reçoit le formulaire de contact.
 * - Appel JS (Accept: application/json) → réponse JSON.
 * - Envoi HTML classique (sans JS) → redirection vers /?envoi=ok|erreur#contact (ou /en/… selon la langue du formulaire).
 */
export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
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
