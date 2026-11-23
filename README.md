# Pauline Renard – Éducation canine à Lyon

Site statique construit avec [Astro](https://astro.build), déployé sur Cloudflare Workers (assets statiques).

## Commandes

```sh
npm install        # installer les dépendances
npm run dev        # serveur local sur http://localhost:4321
npm run build      # générer le site dans dist/
npm run deploy     # build + déploiement Cloudflare
```

## Demandes du formulaire → application « Mes bilans »

Le formulaire de contact envoie l'e-mail (Web3Forms) **et** enregistre la demande sur le serveur Cloudflare
`https://pauline-renard.pauline-renard.workers.dev` (`worker/index.js`, stockage KV, 90 jours max).
L'application « Mes bilans » les relève avec une clé secrète puis les efface du serveur.

Déjà en place : stockage KV `DEMANDES`, secret `DEMANDES_TOKEN`, adresse workers.dev. Mise à jour : `npm run deploy`.
Sous Windows, si `npx` est bloqué, utiliser `npx.cmd` ; si Cloudflare refuse le certificat, lancer d'abord
`$env:NODE_OPTIONS = '--use-system-ca'` (antivirus qui inspecte le HTTPS).

Hébergement : tout est sur Cloudflare (domaine géré par Cloudflare, nom de domaine acheté chez WordPress.com).
`npm run deploy` met en ligne le site et le serveur. Netlify n'est plus utilisé.

Fiche de renseignements (`/questionnaire/`) : réservée aux clients invités. L'application crée un lien personnel
(`/questionnaire/?t=…`, usage unique, 60 jours) ; sans lien valide, le formulaire reste caché et le serveur refuse l'envoi.

En local : `.dev.vars` (non versionné) avec `DEMANDES_TOKEN=...` et `LOCAL_DEV=1`, puis
`npx wrangler dev -c wrangler.local.jsonc` (copie de la configuration sans le domaine, non versionnée).

## Modifier le contenu

- **Tarifs, formats, accompagnements, FAQ, coordonnées** : `src/data/site.ts`
- **Articles de conseils** : un fichier Markdown par article dans `src/content/conseils/`
- **Photos** : `src/assets/photos/` (optimisées automatiquement en WebP au build)
