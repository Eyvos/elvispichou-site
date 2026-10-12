# elvispichou.fr

Site vitrine et portfolio d'**Elvis Pichou**, développeur web freelance à Toulouse.
En ligne : **[elvispichou.fr](https://elvispichou.fr)**

Le site présente deux offres (outils sur mesure, sites vitrines), des études de cas et une page technique pour les recruteurs.
Il est conçu pour être rapide, accessible et sobre : pages statiques, JavaScript uniquement là où il sert.

## Points notables

- **Performance et accessibilité contrôlées en CI** : Lighthouse CI exige performance ≥ 95, accessibilité 100, SEO 100.
- **Audit de design automatisé** (`npm run audit`) : contrastes WCAG mesurés sur les deux thèmes, absence de texte semi-transparent,
  couleurs uniquement via des tokens, navigation cohérente, etc.
- **Documentation comme source de vérité** : chaque décision de design et de contenu est datée et justifiée dans [`docs/`](docs/README.md).
- **Thème sombre par défaut**, thème clair au choix, sans flash au chargement.
- **Formulaire de contact** sans JavaScript obligatoire : validation Zod côté serveur, anti-spam (champ piège + délai minimum), envoi via Resend.
- **Le dé** : le verbe du titre est tiré au dé à 20 faces (canvas 2D, aucune dépendance).

## Stack

| Domaine | Choix |
|---|---|
| Framework | [Astro](https://astro.build) 7, TypeScript strict |
| Style | Tailwind CSS 4 et tokens CSS |
| Contenu | Content Collections (Markdown + schéma Zod) |
| Polices | Inter, Unbounded, Space Grotesk, Space Mono (auto-hébergées, `@fontsource`) |
| Hébergement | Vercel (`@astrojs/vercel`) |
| E-mail | [Resend](https://resend.com) |
| Analytics | [Umami](https://umami.is), sans cookie, optionnel |

## Démarrer

Prérequis : Node.js ≥ 22.12.

```bash
npm install
cp .env.example .env   # facultatif en local
npm run dev            # http://localhost:4321
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | `astro check` (types et contenus) puis build de production |
| `npm run preview` | Prévisualiser le build |
| `npm run audit` | Contrôle automatique des règles de design et de contenu |

## Variables d'environnement

Toutes sont facultatives en local (voir [`.env.example`](.env.example)).

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` | Envoi du formulaire de contact. Sans clé, la demande s'affiche dans la console. |
| `PUBLIC_UMAMI_WEBSITE_ID`, `PUBLIC_UMAMI_SRC` | Analytics. Sans identifiant, aucun script n'est chargé. |

## Structure

```
src/
  config/site.ts            Identité, liens, e-mail, disponibilité
  content/realisations/     Études de cas (Markdown + frontmatter validé)
  content.config.ts         Schéma Zod des études de cas
  components/               Sections de l'accueil et composants d'interface
  pages/                    Accueil, profil, études de cas, mentions légales
    api/contact.ts          Seule route serveur : formulaire de contact
  lib/                      Validation du formulaire, tirage du dé
  styles/global.css         Tokens de design (couleurs, thèmes)
docs/                       Design, structure, décisions, technique
scripts/audit.mjs           Audit automatique des règles de design
```

### Ajouter une réalisation

Copier un fichier de `src/content/realisations/` sous un nouveau nom. Le build échoue si un champ obligatoire manque.

## Documentation

Point d'entrée : [`docs/README.md`](docs/README.md).

- [Produit et positionnement](docs/01-produit-et-positionnement.md)
- [Design system](docs/02-design-system.md)
- [Structure et contenu](docs/03-structure-et-contenu.md)
- [Journal des décisions](docs/04-decisions.md)
- [Technique](docs/05-technique.md)

## Licence

Le **code** est publié sous licence [MIT](LICENSE).
Les **textes, images, logos clients, photos et la marque « Elvis Pichou »** ne sont pas couverts par cette licence :
tous droits réservés. Merci de ne pas les réutiliser sans accord.
