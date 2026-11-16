// Questionnaire « Mon chien est croisé / je ne sais pas » de l'école d'Oslo.
// Chaque comportement rapporte des points aux typologies auxquelles il correspond :
// 2 points pour la typologie la plus caractéristique, 1 point pour une typologie proche.
// Le visiteur choisit les 5 comportements qui ressemblent le plus à son chien,
// puis il est redirigé vers la fiche de la typologie qui totalise le plus de points.
export interface Behaviour {
  id: string;
  text: string;
  scores: Record<string, number>; // slug de typologie → points
}

export const behaviours: Behaviour[] = [
  { id: 'poursuit', text: 'Il poursuit ce qui bouge : vélos, joggeurs, enfants qui courent', scores: { 'bergers-bouviers': 2, levriers: 1 } },
  { id: 'creuse', text: 'Il creuse dans le jardin ou dans le canapé', scores: { terriers: 2, 'primitifs-nordiques': 1 } },
  { id: 'truffe', text: 'Il a toujours la truffe au sol en balade', scores: { 'chiens-courants': 2, 'chiens-d-arret': 1 } },
  { id: 'surveille', text: 'Il surveille la maison et prévient quand quelqu’un approche', scores: { 'molosses-gardiens': 2, 'bergers-bouviers': 1 } },
  { id: 'porte', text: 'Il porte tout dans sa gueule et vient vous l’apporter', scores: { 'rapporteurs-chiens-d-eau': 2 } },
  { id: 'independant', text: 'Il est plutôt indépendant et peu démonstratif', scores: { 'primitifs-nordiques': 2, levriers: 1 } },
  { id: 'calins', text: 'Il recherche le contact et les câlins en permanence', scores: { compagnie: 2, 'rapporteurs-chiens-d-eau': 1 } },
  { id: 'fige', text: 'Il se fige et fixe les oiseaux ou le gibier', scores: { 'chiens-d-arret': 2 } },
  { id: 'sprints', text: 'Il pique des sprints fulgurants… puis dort des heures', scores: { levriers: 2 } },
  { id: 'suit', text: 'Il vous suit partout et a du mal à se poser', scores: { 'bergers-bouviers': 2, compagnie: 1 } },
  { id: 'petites-betes', text: 'Il chasse les petites bêtes : souris, chats, oiseaux', scores: { terriers: 2, levriers: 1 } },
  { id: 'mefiant', text: 'Il se méfie des inconnus', scores: { 'molosses-gardiens': 2, 'primitifs-nordiques': 1 } },
  { id: 'eau', text: 'Il adore l’eau et saute dans chaque flaque', scores: { 'rapporteurs-chiens-d-eau': 2, 'chiens-d-arret': 1 } },
  { id: 'fugue', text: 'Il part loin ou fugue dès qu’il est détaché', scores: { 'primitifs-nordiques': 2, 'chiens-courants': 1 } },
  { id: 'piste', text: 'Sur une piste, il n’entend plus rien autour de lui', scores: { 'chiens-courants': 2 } },
  { id: 'apprend', text: 'Il apprend vite et adore travailler avec vous', scores: { 'bergers-bouviers': 2, 'rapporteurs-chiens-d-eau': 1 } },
  { id: 'energie', text: 'Il a énormément d’énergie et a besoin de courir longtemps', scores: { 'chiens-d-arret': 2, 'bergers-bouviers': 1 } },
  { id: 'tenace', text: 'Il est tenace : quand il a une idée en tête, il ne lâche rien', scores: { terriers: 2, 'primitifs-nordiques': 1 } },
  { id: 'protecteur', text: 'Il est calme et posé, mais très protecteur avec sa famille', scores: { 'molosses-gardiens': 2 } },
  { id: 'hurle', text: 'Il hurle ou « chante » plus qu’il n’aboie', scores: { 'primitifs-nordiques': 2, 'chiens-courants': 1 } },
  { id: 'froid', text: 'Il est frileux et adore le confort du canapé', scores: { levriers: 2, compagnie: 1 } },
  { id: 'appartement', text: 'Il vit très bien en appartement et suit votre rythme', scores: { compagnie: 2 } },
];

export const QUIZ_PICKS = 5;

/** Classe les typologies selon les comportements choisis (meilleure en premier). */
export function rankGroups(ids: string[]): { slug: string; score: number; strong: number }[] {
  const totals = new Map<string, { score: number; strong: number }>();
  for (const id of ids) {
    const b = behaviours.find((x) => x.id === id);
    if (!b) continue;
    for (const [slug, pts] of Object.entries(b.scores)) {
      const t = totals.get(slug) ?? { score: 0, strong: 0 };
      t.score += pts;
      if (pts === 2) t.strong += 1;
      totals.set(slug, t);
    }
  }
  // à égalité de points, on privilégie la typologie avec le plus de comportements très caractéristiques
  return [...totals.entries()]
    .map(([slug, t]) => ({ slug, ...t }))
    .sort((a, b) => b.score - a.score || b.strong - a.strong);
}
