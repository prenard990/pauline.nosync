// Témoignages affichés sur /temoignages/.
// ⚠️ Les avis marqués `exemple: true` sont des textes INVENTÉS, qui montrent seulement le ton visé.
// Ne jamais les publier comme de vrais avis : remplacez-les par de vrais témoignages
// (avec l'accord écrit des familles), puis supprimez `exemple: true`.
export interface Temoignage {
  prenom: string;      // prénom du ou de la propriétaire
  chien: string;       // nom du chien
  race: string;        // race ou « croisé »
  motif: string;       // ce pour quoi la famille est venue
  texte: string;
  exemple?: boolean;
  source?: string;     // provenance de l’avis, ex. « Google »
}

export const temoignages: Temoignage[] = [
  {
    prenom: 'Sylvie',
    chien: 'Lucky',
    race: 'Jack Russell adopté',
    motif: 'Protection de ressources',
    source: 'Google',
    texte: 'Superbe expérience avec Pauline, une éducatrice canin au top ! Elle nous a aidés à gérer la protection de ressources de Lucky, un Jack Russell adopté qui manquait cruellement de repères et de confiance. Ses méthodes ont transformé notre quotidien. Un grand professionnalisme, je la recommande vivement pour tous les problèmes de comportement de chien à Lyon !',
  },
  {
    prenom: 'Marie',
    chien: 'Nala',
    race: 'Adoptée à La Réunion',
    motif: 'Réactivité en balade',
    source: 'Google',
    texte: 'Pauline nous a aidés à comprendre et à gérer la réactivité de notre chienne Nala, adoptée à la réunion. Au début, les balades étaient quasi impossible, elle déclenchait sur toutes les personnes qu’elle croisait, sur les vélos, les enfants... Les exercices demandent pas mal de rigueur au quotidien, mais grâce aux conseils de Pauline, on commence enfin à voir des améliorations en balade. Une professionnelle sérieuse que je ne regrette pas d’avoir contactée.',
  },
  {
    prenom: 'Florian',
    chien: 'Nix',
    race: 'Samoyède',
    motif: 'Énergie et rappel',
    source: 'Google',
    texte: 'Accompagnement très utile avec Pauline pour gérer l’énergie débordante de Nix, mon Samoyède. Il avait du mal avec le rappel et manquait de cadre. Les séances m’ont permis d’avoir des bases plus solides pour le canaliser au quotidien et l’emmener partout avec moi ! Un bon suivi professionnel.',
  },
  {
    prenom: 'Prénom',
    chien: 'Nom du chien',
    race: 'Berger australien',
    motif: 'Réactivité en balade',
    texte: 'Exemple de ton : Les balades étaient devenues tendues dès qu’un chien apparaissait. On a surtout appris à repérer les signaux avant qu’il ne réagisse et à garder de la distance. Ce n’est pas parfait tous les jours, mais avec de la régularité, les sorties sont redevenues agréables.',
    exemple: true,
  },
  {
    prenom: 'Prénom',
    chien: 'Nom du chien',
    race: 'Golden retriever',
    motif: 'Chiot',
    texte: 'Exemple de ton : On voulait partir sur de bonnes bases avec notre chiot. Les conseils étaient simples à appliquer au quotidien : un rythme clair, des temps de repos, des petites sorties pour découvrir le monde. Quelques semaines plus tard, tout le monde a trouvé ses repères.',
    exemple: true,
  },
  {
    prenom: 'Prénom',
    chien: 'Nom du chien',
    race: 'Croisé',
    motif: 'Anxiété de séparation',
    texte: 'Exemple de ton : Notre chienne avait du mal à rester seule. On a avancé par petites étapes, sans brûler les étapes justement. Il a fallu de la patience, mais aujourd’hui elle se pose tranquillement quand on part, et nous partons l’esprit plus léger.',
    exemple: true,
  },
  {
    prenom: 'Prénom',
    chien: 'Nom du chien',
    race: 'Jack Russell',
    motif: 'Balades collectives',
    texte: 'Exemple de ton : Les balades collectives nous permettent de mettre en pratique ce qu’on travaille à la maison, dans un cadre rassurant. Notre chien croise d’autres chiens à son rythme, et on repart à chaque fois avec un conseil concret.',
    exemple: true,
  },
  {
    prenom: 'Prénom',
    chien: 'Nom du chien',
    race: 'Border collie',
    motif: 'Rappel',
    texte: 'Exemple de ton : Le rappel était notre point faible. On a repris les bases avec une longe et beaucoup de récompenses. En quelques semaines d’entraînement régulier, il revient beaucoup plus facilement, et on profite enfin des balades en liberté.',
    exemple: true,
  },
  {
    prenom: 'Prénom',
    chien: 'Nom du chien',
    race: 'Labrador',
    motif: 'Éducation de base',
    texte: 'Exemple de ton : On cherchait surtout à mieux se comprendre. Les séances nous ont donné des repères clairs, sans rapport de force. Quelques minutes d’exercices par jour ont suffi pour que la marche en laisse et la vie à la maison deviennent plus fluides.',
    exemple: true,
  },
];
