import { site } from '../config/site';

/**
 * Accusé de réception envoyé au prospect.
 * Les clients mail ignorent les variables CSS : on reprend ici les valeurs du thème sombre
 * de `src/styles/global.css` (--c-bg, --c-surface, --c-ink, --c-muted, --c-line, --c-accent, --c-accent-fg).
 * Mise en page en tableaux et styles en ligne pour la compatibilité (Gmail, Outlook, Apple Mail).
 */
const c = {
  bg: '#0f1016',
  surface: '#161821',
  surface2: '#23242e',
  ink: '#f3f0e8',
  muted: '#adadb6',
  line: '#2c2e3a',
  accent: '#3f54f5',
  accentInk: '#ffffff',
  accentFg: '#94a1ff',
  accentSoft: '#1c2247',
} as const;

const font = "Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";

export interface ReceiptData {
  name: string;
  message: string;
  projectLabel: string;
  budget: string;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

const steps = [
  ['1', 'Je lis votre demande', 'Je prends le temps de bien comprendre votre besoin.'],
  ['2', 'Je vous réponds sous 24 h ouvrées', 'Avec des premières pistes concrètes.'],
  ['3', 'On en parle', 'Un échange pour valider la meilleure approche, sans engagement.'],
] as const;

export function receiptSubject(): string {
  return `Confirmation : votre demande est bien reçue — ${site.name}`;
}

export function receiptText({ name, message }: ReceiptData): string {
  return `Bonjour ${name},

Merci pour votre message, je l'ai bien reçu. Je reviens vers vous sous 24 h ouvrées avec des premières pistes.

Pour rappel, votre demande :
${message}

À très vite,
${site.name}
${site.role}
${site.url}`;
}

export function receiptHtml({ name, message, projectLabel, budget }: ReceiptData): string {
  const stepRows = steps
    .map(
      ([n, title, text]) => `<tr>
<td width="40" valign="top" style="padding:0 0 18px 0">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" width="28" height="28" style="width:28px;height:28px;background-color:${c.accentSoft};border-radius:14px;color:${c.accentFg};font:600 13px/28px ${font}">${n}</td></tr></table>
</td>
<td valign="top" style="padding:0 0 18px 0;font-family:${font}">
<div style="font-size:15px;line-height:22px;font-weight:600;color:${c.ink}">${title}</div>
<div style="font-size:14px;line-height:21px;color:${c.muted}">${text}</div>
</td>
</tr>`,
    )
    .join('');

  const recap = [
    ['Projet', projectLabel],
    ...(budget ? [['Budget indicatif', budget]] : []),
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:0 16px 6px 0;font:14px/21px ${font};color:${c.muted}" valign="top">${k}</td><td style="padding:0 0 6px 0;font:600 14px/21px ${font};color:${c.ink}" valign="top">${escape(v!)}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>${escape(receiptSubject())}</title>
</head>
<body style="margin:0;padding:0;background-color:${c.bg}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Merci ${escape(name)}, j'ai bien reçu votre message et je reviens vers vous sous 24 h ouvrées.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.bg}" style="background-color:${c.bg}">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px">

<tr><td style="padding:0 4px 20px 4px;font-family:${font};font-size:16px;font-weight:700;letter-spacing:-0.2px;color:${c.ink}">${site.name}<span style="color:${c.accentFg}">.</span></td></tr>

<tr><td bgcolor="${c.surface}" style="background-color:${c.surface};border:1px solid ${c.line};border-radius:16px;padding:0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td height="4" style="height:4px;line-height:4px;font-size:0;background-color:${c.accent};border-radius:16px 16px 0 0">&nbsp;</td></tr>
<tr><td style="padding:32px 32px 8px 32px;font-family:${font}">
<div style="font-size:24px;line-height:30px;font-weight:700;letter-spacing:-0.4px;color:${c.ink}">Merci ${escape(name)}, j'ai bien reçu votre demande.</div>
<p style="margin:14px 0 0 0;font-size:15px;line-height:24px;color:${c.muted}">Je lis votre message avec attention et je reviens vers vous <strong style="color:${c.ink}">sous 24 h ouvrées</strong> avec des premières pistes.</p>
</td></tr>

<tr><td style="padding:24px 32px 6px 32px">
<div style="font:600 13px/20px ${font};color:${c.accentFg};padding-bottom:14px">La suite</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}</table>
</td></tr>

<tr><td style="padding:8px 32px 32px 32px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.surface2}" style="background-color:${c.surface2};border:1px solid ${c.line};border-radius:12px">
<tr><td style="padding:18px 20px">
<div style="font:600 13px/20px ${font};color:${c.accentFg};padding-bottom:10px">Pour rappel, votre demande</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0">${recap}</table>
<div style="margin-top:10px;padding-top:12px;border-top:1px solid ${c.line};font:14px/22px ${font};color:${c.ink};white-space:pre-wrap">${escape(message)}</div>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:0 32px 32px 32px;font-family:${font}">
<p style="margin:0 0 16px 0;font-size:15px;line-height:24px;color:${c.muted}">Une précision à ajouter ? Répondez simplement à ce mail, il me parvient directement.</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${c.accent}" style="background-color:${c.accent};border-radius:10px"><a href="${site.url}" style="display:inline-block;padding:12px 22px;font:600 14px/20px ${font};color:${c.accentInk};text-decoration:none">Retour au site</a></td></tr></table>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:24px 4px 0 4px;font-family:${font};font-size:13px;line-height:20px;color:${c.muted}">
<strong style="color:${c.ink}">${site.name}</strong> · ${site.role}<br>
<a href="${site.url}" style="color:${c.accentFg};text-decoration:underline">${site.url.replace('https://', '')}</a> · ${site.location}
<br><br>Vous recevez ce message car vous avez rempli le formulaire de contact de ${site.url.replace('https://', '')}. Aucune autre communication ne vous sera envoyée.
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
