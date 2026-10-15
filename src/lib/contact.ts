import { z } from 'astro/zod';
import { receiptHtml, receiptSubject, receiptText } from './email-template';
import { getDict, locales, defaultLocale, type Locale } from '../i18n';

/** Langue envoyée par le formulaire (champ caché `lang`) ; français si absente ou inconnue. */
export const parseLocale = (v: unknown): Locale => (locales.find((l) => l === v) ?? defaultLocale);

/** Codes de budget envoyés par le formulaire → libellé (le libellé français part dans ma boîte, le libellé de la langue du visiteur dans l'accusé). */
const budgetCodes = ['lt2k', '2to5k', '5to15k', 'gt15k'] as const;

/** Schéma de validation : les messages d'erreur sont dans la langue du visiteur. */
export function contactSchema(lang: Locale) {
  const e = getDict(lang).contact.server;
  return z.object({
    projectType: z.enum(['site', 'outil', 'autre']).default('autre'),
    name: z.string().trim().min(2, e.name).max(100),
    email: z.string().trim().pipe(z.email(e.email).max(200)),
    company: z.string().trim().max(120).optional().default(''),
    budget: z.enum(budgetCodes).or(z.literal('')).optional().default(''),
    message: z.string().trim().min(20, e.message).max(5000),
  });
}

export type ContactRequest = z.infer<ReturnType<typeof contactSchema>>;

/** Détecte les robots : champ piège rempli, ou formulaire soumis en moins de 3 secondes. */
export function looksLikeSpam(form: FormData): boolean {
  if (String(form.get('website') ?? '').length > 0) return true;
  const startedAt = Number(form.get('startedAt'));
  return Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 3000;
}

// La notification arrive dans ma boîte : elle reste en français, quelle que soit la langue du visiteur.
const typeLabel = { site: 'Site vitrine', outil: 'Outil sur mesure', autre: 'Autre' } as const;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/**
 * Envoie la demande (à moi, bloquant) et un accusé de réception (au prospect, non bloquant) via l'API Resend.
 * Sans clé API (développement local), la demande est simplement affichée dans la console.
 */
export async function deliverContact(req: ContactRequest, lang: Locale, env: { apiKey?: string; from?: string; to?: string }) {
  if (!env.apiKey || !env.from || !env.to) {
    console.info('[contact] RESEND_API_KEY absente, demande non envoyée :', req);
    return;
  }

  const rows = [
    ['Type', typeLabel[req.projectType]],
    ['Nom', req.name],
    ['Email', req.email],
    ['Entreprise', req.company || '—'],
    ['Budget', req.budget ? getDict('fr').contact.budgets[req.budget] : '—'],
    ['Langue', lang === 'fr' ? 'Français' : 'English'],
  ];

  await sendEmail(env.apiKey, {
    from: env.from,
    to: env.to,
    reply_to: req.email,
    subject: `[${typeLabel[req.projectType]}] Nouvelle demande de ${req.name}`,
    html: `<table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v)}</td></tr>`).join('')}</table>
<p style="white-space:pre-wrap">${escape(req.message)}</p>`,
  });

  // L'accusé de réception est un plus : s'il échoue (adresse refusée, domaine non vérifié), la demande reste reçue.
  const t = getDict(lang);
  const receipt = {
    name: req.name,
    message: req.message,
    projectLabel: t.contact.projectTypes[req.projectType],
    budget: req.budget ? t.contact.budgets[req.budget] : '',
    lang,
  };
  try {
    await sendEmail(env.apiKey, {
      from: env.from,
      to: req.email,
      reply_to: env.to,
      subject: receiptSubject(lang),
      html: receiptHtml(receipt),
      text: receiptText(receipt),
    });
  } catch (err) {
    console.error('[contact] accusé de réception non envoyé :', err);
  }
}
