// Petit serveur Cloudflare devant le site statique.
// Il ne s'occupe que des adresses /api/* (voir run_worker_first dans wrangler.jsonc) ; tout le reste
// est servi tel quel depuis dist/.
//
//   POST   /api/demande        ← le formulaire de contact y enregistre chaque demande
//   GET    /api/demandes       → l'application « Mes bilans » relève les demandes (clé secrète requise)
//   DELETE /api/demandes/:id   → l'application supprime une demande une fois importée (clé secrète requise)
//   POST   /api/questionnaire  ← la fiche de renseignements (/questionnaire/) y enregistre les réponses
//   GET/DELETE /api/questionnaires[/:id] → relève par l'application, comme les demandes
//   POST   /api/invitations    → l'application crée un lien personnel (à usage unique, 60 jours) pour un client
//   GET    /api/invitation/:t  → la page de la fiche vérifie que son lien est valide
//
// Les demandes sont gardées au plus 90 jours, puis effacées automatiquement.

const KEEP_SECONDS = 60 * 60 * 24 * 90;
const MAX_BODY = 20_000;
const FIELDS = ['nom', 'email', 'tel', 'chien_nom', 'chien_age', 'chien_race', 'motif', 'offre', 'msg'];
// adresses autorisées à envoyer le formulaire (le site et le serveur de test local)
const ALLOWED_ORIGINS = [/^https:\/\/(www\.)?paulinerenard-educateurcanin\.fr$/, /^https:\/\/pauline-renard\.[\w-]+\.workers\.dev$/, /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/];
const allowedOrigin = (request) => {
  const o = request.headers.get('Origin') || '';
  return ALLOWED_ORIGINS.some((r) => r.test(o)) ? o : null;
};
// le formulaire est sur un autre domaine (Netlify) : autorisations d'envoi pour ce domaine seulement
const formCors = (origin) => ({ 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', Vary: 'Origin' });

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Max-Age': '86400',
};
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers } });

function sameText(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
function isOwner(request, env) {
  const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  return Boolean(env.DEMANDES_TOKEN) && token.length >= 24 && sameText(token, env.DEMANDES_TOKEN);
}

async function saveDemande(request, env) {
  const origin = allowedOrigin(request);
  if (!origin) return json({ success: false, message: 'Origine refusée' }, 403);
  const h = formCors(origin);
  const text = await request.text();
  if (text.length > MAX_BODY) return json({ success: false, message: 'Message trop long' }, 413, h);
  let body;
  try { body = JSON.parse(text); } catch { return json({ success: false, message: 'Format invalide' }, 400, h); }
  if (body._honey) return json({ success: true }, 200, h); // robot : on fait semblant d'accepter
  const fields = {};
  for (const k of FIELDS) {
    const v = typeof body[k] === 'string' ? body[k].trim().slice(0, 5000) : '';
    if (v) fields[k] = v;
  }
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !fields.msg) {
    return json({ success: false, message: 'E-mail et message obligatoires' }, 400, h);
  }
  const now = new Date();
  // clé triable par date + partie aléatoire
  const id = `d:${now.getTime().toString().padStart(15, '0')}:${crypto.randomUUID().slice(0, 8)}`;
  await env.DEMANDES.put(id, JSON.stringify({ id, receivedAt: now.toISOString(), fields }), { expirationTtl: KEEP_SECONDS });
  return json({ success: true }, 200, h);
}

// Fiche de renseignements (/questionnaire/) : champs autorisés = identifiants de l'application « Mes bilans »
const Q_TEXT = ['prenom', 'nom', 'email', 'tel', 'adresse', 'ville', 'adultes', 'logement', 'chien_nom', 'race', 'age', 'sexe', 'sterilise', 'poids',
  'age_adoption', 'origine', 'veto_visite', 'douleur', 'sante', 'seul_duree', 'sorties_nb', 'sorties_duree', 'demande', 'debut', 'historique', 'deja_tente', 'attentes'];
const Q_LISTS = ['enfants', 'animaux', 'materiel'];

async function saveQuestionnaire(request, env) {
  const origin = allowedOrigin(request);
  if (!origin) return json({ success: false, message: 'Origine refusée' }, 403);
  const h = formCors(origin);
  const text = await request.text();
  if (text.length > MAX_BODY) return json({ success: false, message: 'Réponses trop longues' }, 413, h);
  let body;
  try { body = JSON.parse(text); } catch { return json({ success: false, message: 'Format invalide' }, 400, h); }
  const src = body && typeof body.fields === 'object' && body.fields ? body.fields : {};
  const fields = {};
  for (const k of Q_TEXT) { const v = typeof src[k] === 'string' ? src[k].trim().slice(0, 3000) : ''; if (v) fields[k] = v; }
  for (const k of Q_LISTS) { if (Array.isArray(src[k])) { const v = src[k].filter((x) => typeof x === 'string').map((x) => x.slice(0, 80)).slice(0, 12); if (v.length) fields[k] = v; } }
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !fields.chien_nom || !fields.demande) {
    return json({ success: false, message: 'Champs obligatoires manquants' }, 400, h);
  }
  // seuls les clients invités peuvent envoyer : le lien personnel contient une invitation à usage unique
  const invit = await getInvitation(env, body.token);
  if (!invit) return json({ success: false, message: 'Lien invalide, expiré ou déjà utilisé' }, 403, h);
  const now = new Date();
  const id = `q:${now.getTime().toString().padStart(15, '0')}:${crypto.randomUUID().slice(0, 8)}`;
  await env.DEMANDES.put(id, JSON.stringify({ id, ref: invit.ref, receivedAt: now.toISOString(), fields }), { expirationTtl: KEEP_SECONDS });
  await env.DEMANDES.delete('i:' + body.token);
  return json({ success: true }, 200, h);
}

/* Invitations à remplir la fiche : créées par l'application (clé secrète), valables 60 jours, à usage unique */
const INVIT_SECONDS = 60 * 60 * 24 * 60;
const validToken = (t) => typeof t === 'string' && /^[\w-]{24,64}$/.test(t);
async function getInvitation(env, token) {
  if (!validToken(token)) return null;
  return env.DEMANDES.get('i:' + token, 'json');
}
async function createInvitation(request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ message: 'Format invalide' }, 400, CORS); }
  if (!validToken(body.token) || typeof body.ref !== 'string' || !/^[\w-]{4,40}$/.test(body.ref)) return json({ message: 'Invitation invalide' }, 400, CORS);
  await env.DEMANDES.put('i:' + body.token, JSON.stringify({ ref: body.ref, createdAt: new Date().toISOString() }), { expirationTtl: INVIT_SECONDS });
  return json({ success: true }, 200, CORS);
}

async function listDemandes(env, prefix = 'd:', name = 'demandes') {
  const keys = [];
  let cursor;
  do {
    const page = await env.DEMANDES.list({ prefix, cursor });
    keys.push(...page.keys.map((k) => k.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor && keys.length < 2000);
  const values = await Promise.all(keys.map((k) => env.DEMANDES.get(k, 'json')));
  return json({ [name]: values.filter(Boolean) }, 200, CORS);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '');    // http → https, et www.paulinerenard-educateurcanin.fr → adresse principale (une seule adresse pour Google)
    // en test local (.dev.vars : LOCAL_DEV=1), pas de redirection vers https
    const local = env.LOCAL_DEV === '1' || url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (!local && (url.protocol === 'http:' || url.hostname.startsWith('www.'))) {
      url.protocol = 'https:';
      if (url.hostname.startsWith('www.')) url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    // fichier de vérification Google Search Console : servi tel quel (sans la redirection automatique des .html)
    if (/^\/google[0-9a-f]+\.html$/.test(url.pathname)) {
      const res = await env.ASSETS.fetch(new Request(new URL(url.pathname.slice(0, -5), url), request));
      return new Response(res.body, { status: res.status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    if (path === '/api/demande') {
      if (request.method === 'OPTIONS') {
        const origin = allowedOrigin(request);
        return origin ? new Response(null, { status: 204, headers: formCors(origin) }) : new Response(null, { status: 403 });
      }
      if (request.method === 'POST') return saveDemande(request, env);
    }

    if (path === '/api/questionnaire') {
      if (request.method === 'OPTIONS') {
        const origin = allowedOrigin(request);
        return origin ? new Response(null, { status: 204, headers: formCors(origin) }) : new Response(null, { status: 403 });
      }
      if (request.method === 'POST') return saveQuestionnaire(request, env);
    }
    // la page de la fiche vérifie son lien avant d'afficher le formulaire (aucune donnée renvoyée)
    if (path.startsWith('/api/invitation/') && request.method === 'GET') {
      const ok = await getInvitation(env, decodeURIComponent(path.slice('/api/invitation/'.length)));
      return json({ valid: Boolean(ok) }, ok ? 200 : 404);
    }
    // création d'une invitation par l'application (clé secrète)
    if (path === '/api/invitations') {
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (!isOwner(request, env)) return json({ message: 'Clé secrète manquante ou incorrecte' }, 401, CORS);
      if (request.method === 'POST') return createInvitation(request, env);
    }

    // relève (application « Mes bilans », clé secrète) : /api/demandes et /api/questionnaires
    const area = path.match(/^\/api\/(demandes|questionnaires)(\/.*)?$/);
    if (area) {
      const [, name, rest] = area; const prefix = name === 'demandes' ? 'd:' : 'q:';
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (!isOwner(request, env)) return json({ message: 'Clé secrète manquante ou incorrecte' }, 401, CORS);
      if (request.method === 'GET' && !rest) return listDemandes(env, prefix, name);
      if (request.method === 'DELETE' && rest) {
        const id = decodeURIComponent(rest.slice(1));
        if (!id.startsWith(prefix)) return json({ message: 'Identifiant invalide' }, 400, CORS);
        await env.DEMANDES.delete(id);
        return json({ success: true }, 200, CORS);
      }
    }

    if (path.startsWith('/api/')) return json({ message: 'Introuvable' }, 404);
    const res = await env.ASSETS.fetch(request);
    // l'adresse de test workers.dev ne doit pas être indexée par Google
    if (url.hostname.endsWith('.workers.dev')) {
      const r = new Response(res.body, res);
      r.headers.set('X-Robots-Tag', 'noindex');
      return r;
    }
    return res;
  },
};
