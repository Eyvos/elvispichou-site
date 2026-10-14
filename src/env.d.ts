/// <reference types="astro/client" />

// Secrets du Worker Cloudflare (Settings → Variables and Secrets, ou .dev.vars en local).
declare module 'cloudflare:workers' {
  export const env: { RESEND_API_KEY?: string; CONTACT_FROM?: string; CONTACT_TO?: string };
}
