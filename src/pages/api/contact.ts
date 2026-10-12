import type { APIRoute } from 'astro';
import { contactSchema, deliverContact, looksLikeSpam } from '../../lib/contact';

export const prerender = false;

/**
 * Reçoit le formulaire de contact.
 * - Appel JS (Accept: application/json) → réponse JSON.
 * - Envoi HTML classique (sans JS) → redirection vers /?envoi=ok|erreur#contact.
 */
export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const reply = (ok: boolean, status: number, error?: string) =>
    wantsJson
      ? Response.json(ok ? { ok } : { ok, error }, { status })
      : redirect(`/?envoi=${ok ? 'ok' : 'erreur'}#contact`, 303);

  const form = await request.formData();

  // On répond « succès » aux robots pour ne pas leur indiquer qu'ils sont détectés.
  if (looksLikeSpam(form)) return reply(true, 200);

  const parsed = contactSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return reply(false, 400, parsed.error.issues[0]?.message ?? 'Formulaire invalide.');
  }

  try {
    await deliverContact(parsed.data, {
      apiKey: import.meta.env.RESEND_API_KEY,
      from: import.meta.env.CONTACT_FROM,
      to: import.meta.env.CONTACT_TO,
    });
    return reply(true, 200);
  } catch (err) {
    console.error('[contact]', err);
    return reply(false, 502, "Le message n'a pas pu être envoyé. Écrivez-moi directement par email.");
  }
};
