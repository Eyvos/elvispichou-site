import { site } from '../config/site';
import { getDict, fmt, localePath, type Locale } from '../i18n';

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
  lang: Locale;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

const host = site.url.replace('https://', '');

export function receiptSubject(lang: Locale): string {
  return fmt(getDict(lang).email.subject, { name: site.name });
}

export function receiptText({ name, message, lang }: ReceiptData): string {
  const t = getDict(lang);
  const e = t.email;
  return `${fmt(e.textHello, { name })}

${e.textBody}

${e.textRecap}
${message}

${e.textBye}
${site.name}
${t.site.role}
${site.url}`;
}

export function receiptHtml({ name, message, projectLabel, budget, lang }: ReceiptData): string {
  const t = getDict(lang);
  const e = t.email;
  const steps = e.steps.map(([title, text], i) => [String(i + 1), title, text] as const);
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
    [e.recapProject, projectLabel],
    ...(budget ? [[e.recapBudget, budget]] : []),
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:0 16px 6px 0;font:14px/21px ${font};color:${c.muted}" valign="top">${k}</td><td style="padding:0 0 6px 0;font:600 14px/21px ${font};color:${c.ink}" valign="top">${escape(v!)}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>${escape(receiptSubject(lang))}</title>
</head>
<body style="margin:0;padding:0;background-color:${c.bg}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escape(fmt(e.preheader, { name }))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.bg}" style="background-color:${c.bg}">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px">

<tr><td style="padding:0 4px 20px 4px;font-family:${font};font-size:16px;font-weight:700;letter-spacing:-0.2px;color:${c.ink}">${site.name}<span style="color:${c.accentFg}">.</span></td></tr>

<tr><td bgcolor="${c.surface}" style="background-color:${c.surface};border:1px solid ${c.line};border-radius:16px;padding:0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td height="4" style="height:4px;line-height:4px;font-size:0;background-color:${c.accent};border-radius:16px 16px 0 0">&nbsp;</td></tr>
<tr><td style="padding:32px 32px 8px 32px;font-family:${font}">
<div style="font-size:24px;line-height:30px;font-weight:700;letter-spacing:-0.4px;color:${c.ink}">${escape(fmt(e.title, { name }))}</div>
<p style="margin:14px 0 0 0;font-size:15px;line-height:24px;color:${c.muted}">${e.leadBefore}<strong style="color:${c.ink}">${e.leadStrong}</strong>${e.leadAfter}</p>
</td></tr>

<tr><td style="padding:24px 32px 6px 32px">
<div style="font:600 13px/20px ${font};color:${c.accentFg};padding-bottom:14px">${e.next}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}</table>
</td></tr>

<tr><td style="padding:8px 32px 32px 32px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.surface2}" style="background-color:${c.surface2};border:1px solid ${c.line};border-radius:12px">
<tr><td style="padding:18px 20px">
<div style="font:600 13px/20px ${font};color:${c.accentFg};padding-bottom:10px">${e.recapTitle}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0">${recap}</table>
<div style="margin-top:10px;padding-top:12px;border-top:1px solid ${c.line};font:14px/22px ${font};color:${c.ink};white-space:pre-wrap">${escape(message)}</div>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:0 32px 32px 32px;font-family:${font}">
<p style="margin:0 0 16px 0;font-size:15px;line-height:24px;color:${c.muted}">${e.reply}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${c.accent}" style="background-color:${c.accent};border-radius:10px"><a href="${new URL(localePath(lang, '/'), site.url).href}" style="display:inline-block;padding:12px 22px;font:600 14px/20px ${font};color:${c.accentInk};text-decoration:none">${e.backToSite}</a></td></tr></table>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:24px 4px 0 4px;font-family:${font};font-size:13px;line-height:20px;color:${c.muted}">
<strong style="color:${c.ink}">${site.name}</strong> · ${t.site.role}<br>
<a href="${site.url}" style="color:${c.accentFg};text-decoration:underline">${host}</a> · ${t.site.location}
<br><br>${fmt(e.footer, { host })}
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
