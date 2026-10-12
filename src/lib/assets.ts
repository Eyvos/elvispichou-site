import type { ImageMetadata } from 'astro';

/**
 * Images « par convention » : on dépose un fichier au bon nom, il apparaît sur le site.
 *   src/assets/elvis.(jpg|png|webp)          → photo de profil
 *   src/assets/realisations/<slug>.(png|jpg) → capture d'écran d'une réalisation
 *   src/assets/logos/<id>.(svg|png)          → logo d'un client (id : voir config/site.ts)
 */
type Img = ImageMetadata;
const pick = (files: Record<string, Img>) => (name: string) =>
  Object.entries(files).find(([path]) => path.split('/').pop()!.replace(/\.[^.]+$/, '') === name)?.[1];

const photos = import.meta.glob<Img>('/src/assets/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
const screenshots = import.meta.glob<Img>('/src/assets/realisations/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
const logos = import.meta.glob<Img>('/src/assets/logos/*.{svg,png,jpg,webp}', { eager: true, import: 'default' });

export const getPhoto = () => pick(photos)('elvis');
export const getScreenshot = pick(screenshots);
export const getLogo = pick(logos);
