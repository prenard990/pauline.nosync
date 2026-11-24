// What Oslo says in the floating bubble, by page (longest matching prefix wins).
export const osloLines: Record<string, string> = {
  '/': 'Wouf ! Je suis Oslo, le binôme de ma maîtresse, Pauline. Présentez-moi votre chien et je vous donne des pistes pour mieux comprendre ses besoins !',
  '/prestations/': 'Pas sûr·e de la formule ? Commencez par le bilan gratuit de 30 min : ma maîtresse vous conseillera la suite.',
  '/ecole-oslo/': 'Bienvenue à mon école ! Présentez-moi votre chien, ou piochez dans les conseils de ma maîtresse.',
  '/temoignages/': 'Tous ces chiens, je les ai croisés ! Certains sont même devenus mes copains de balade.',
  '/conseils/': 'Mon conseil préféré ? Laissez votre chien renifler en balade. 10 minutes de flair, c’est une vraie séance de détente !',
  '/races/': 'Chaque chien est unique, même si chaque typologie a ses tendances. Moi, je suis un bouvier : j’aime travailler avec ma maîtresse… et faire la sieste.',
  '/mon-approche/': 'Oui, c’est moi sur les photos ! 8 ans, calme et bien codé… c’est ma maîtresse qui le dit.',
  '/contact/': 'Racontez tout à ma maîtresse : âge, habitudes, ce qui coince… Plus elle en sait, mieux elle pourra vous aider !',
};

// Expression d'Oslo (bulle flottante) selon la page.
export const osloMoods: Record<string, 'heureux' | 'joyeux' | 'clin-oeil' | 'bravo' | 'surpris' | 'curieux' | 'triste' | 'chiot' | 'fier'> = {
  '/': 'heureux',
  '/prestations/': 'bravo',
  '/mon-approche/': 'fier',
  '/temoignages/': 'joyeux',
  '/ecole-oslo/': 'curieux',
  '/conseils/': 'clin-oeil',
  '/races/': 'curieux',
  '/contact/': 'joyeux',
};
