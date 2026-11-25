export const site = {
  name: 'Pauline Renard',
  role: 'Éducateur & comportementaliste canin',
  city: 'Lyon',
  area: 'Lyon et alentours',
  // zone d'intervention : même formulation partout (pied de page, contact, prestations, accueil, FAQ)
  location: 'Lyon et alentours : Villeurbanne, Caluire-et-Cuire, Tassin-la-Demi-Lune, Meyzieu, Est et Ouest lyonnais',
  // agenda en ligne pour réserver l'appel découverte gratuit (bouton principal du site)
  bookingUrl: 'https://cal.com/pauline-renard',
  instagram: 'https://www.instagram.com/pauline_educ_oslo/',
  // lien « Laisser un avis » de la fiche Google Business Profile
  reviewUrl: 'https://g.page/r/CfsPYsFRwWhVECE/review',
  email: 'pauline-rnd@hotmail.fr',
  // Clé publique Web3Forms (https://web3forms.com) : une fois renseignée, le formulaire de contact
  // l'utilise à la place de FormSubmit. Cette clé est faite pour être visible dans le site.
  web3formsKey: '4b7da27c-4422-4523-8705-5aad2cececf9',
  // Serveur Cloudflare qui enregistre chaque demande pour l'application « Mes bilans » (worker/index.js).
  // Adresse fixe : fonctionne que le site soit hébergé sur Netlify ou sur Cloudflare.
  demandesApi: 'https://pauline-renard.pauline-renard.workers.dev/api/demande',
  description:
    "Pauline Renard, éducateur canin et comportementaliste à Lyon : éducation de base, chiots, anxiété de séparation, réactivité. Méthodes bienveillantes, déplacements dans Lyon et alentours.",
};

// Communes desservies (zone d'intervention, affichée sur l'accueil et utilisée pour le SEO local).
export const zones = ['Lyon', 'Villeurbanne', 'Caluire-et-Cuire', 'Tassin-la-Demi-Lune', 'Meyzieu', 'Est lyonnais', 'Ouest lyonnais'];

// Les 3 piliers de l'approche (accueil + page Mon approche).
export const pillars = [
  { icon: 'handheart', title: '100 % bienveillant', text: 'Zéro violence, zéro outil coercitif (pas de collier étrangleur ni d’intimidation).' },
  { icon: 'sparkles', title: 'Sur-mesure', text: 'Pas de recette toute faite : je m’adapte au tempérament de votre chien et à votre mode de vie.' },
  { icon: 'key', title: 'Autonomie', text: 'Mon but n’est pas de dresser votre chien à votre place, mais de vous donner les clés pour le guider toute sa vie.' },
];

// Version développée des 3 piliers, avec les titres d'origine (page Mon approche).
export const approachPillars = [
  { icon: 'handheart', title: 'Bienveillance', text: 'Zéro violence, zéro outil coercitif (pas de collier étrangleur ni d’intimidation). Respect total des émotions du chien.' },
  { icon: 'ear', title: 'Écoute', text: 'Pas de recette toute faite : je m’adapte au tempérament unique de votre chien, à vos besoins et à votre mode de vie.' },
  { icon: 'list', title: 'Concret', text: 'Des clés de compréhension et des exercices pratiques de terrain pour vous rendre durablement autonomes au quotidien.' },
];

export const nav: { href: string; label: string; also?: string[] }[] = [
  { href: '/prestations/', label: 'Prestations et tarifs' },
  { href: '/mon-approche/', label: 'Mon approche' },
  // Page Témoignages mise de côté (src/pages/_temoignages.astro) : à remettre quand il y aura assez d’avis.
  // { href: '/temoignages/', label: 'Témoignages' },
  { href: '/ecole-oslo/', label: 'L’école d’Oslo', also: ['/races/', '/conseils/'] },
];

// Appel découverte gratuit : 30 min par téléphone, réservé dans l'agenda en ligne (site.bookingUrl). Pauline rappelle le client.
export const freeCall = {
  name: 'Appel découverte gratuit',
  duration: '30 min',
  where: 'par téléphone',
  pitch: 'Vous hésitez encore ? Commencez par un appel découverte gratuit.',
  // libellé du bouton principal
  cta: 'Réserver mon appel découverte gratuit (30 min)',
  // libellé court, quand le bloc parle déjà de l'appel découverte gratuit (évite les répétitions)
  ctaShort: 'Réserver mon appel',
  features: [
    'Vous m’exposez la situation et ce qui vous gêne au quotidien',
    'Je vous donne mon regard de professionnelle sur la situation',
    'Je vous indique les points que nous aurions à travailler ensemble',
    'Je vous propose un échéancier de séances adapté',
  ],
  note: 'Sans engagement : vous décidez ensuite, tranquillement, si vous souhaitez aller plus loin.',
};

// Pourquoi le bilan complet reste indispensable, même après l’appel découverte.
export const bilanWhy = 'En 30 minutes, on fait le point sur l’essentiel. Mais pour construire un travail sérieux, j’ai besoin de connaître votre chien en profondeur : son histoire, sa santé, son quotidien, son environnement, et de l’observer chez vous. C’est le rôle du bilan complet, indispensable avant de commencer les séances.';

export const prices = [
  {
    name: 'Bilan complet',
    price: 40,
    unit: 'la séance · 1h30 à 2h chez vous',
    pitch: 'Indispensable avant de commencer le travail.',
    features: [
      'Observation de votre chien dans son environnement',
      'Histoire, santé, quotidien : tout ce qui compte pour comprendre',
      'Analyse de l’origine des comportements gênants',
      'Plan de travail détaillé et personnalisé',
    ],
    featured: false,
  },
  {
    name: 'Séance individuelle',
    price: 45,
    unit: 'la séance · environ 1h',
    pitch: 'Une séance ciblée sur un objectif précis.',
    features: [
      'Travail à domicile ou en extérieur',
      'Exercices adaptés à votre chien',
      'Récapitulatif des exercices après la séance',
      'Idéal pour un point d’étape',
    ],
    featured: false,
  },
  {
    name: 'Forfait 3 séances',
    price: 160,
    unit: 'bilan complet + 3 séances d’éducation d’environ 1h',
    pitch: 'Pour poser des bases solides.',
    features: [
      'Progression construite séance après séance',
      'Idéal pour l’éducation de base ou un chiot',
      'Suivi de vos avancées entre les séances',
      'Soit 15 € d’économie',
    ],
    featured: true,
  },
  {
    name: 'Forfait 5 séances',
    price: 230,
    unit: 'bilan complet + 5 séances d’éducation d’environ 1h',
    pitch: 'Pour les problématiques de comportement.',
    features: [
      'Accompagnement dans la durée',
      'Réactivité, anxiété, protection de ressources…',
      'Généralisation dans différents lieux',
      'Soit 35 € d’économie',
    ],
    featured: false,
  },
];

export const formats = [
  {
    icon: 'home',
    title: 'À domicile',
    text: 'Je viens chez vous pour travailler là où les difficultés se présentent : arrivées, départs, visites, routines du quotidien.',
  },
  {
    icon: 'tree',
    title: 'En extérieur',
    text: 'Parcs, quais, rues animées : on travaille la marche en laisse, le rappel et la gestion des croisements en situation réelle.',
  },
  {
    icon: 'paw',
    title: 'Avec Oslo',
    text: 'Pour les chiens qui ont besoin d’apprendre les bons codes, Oslo, mon chien régulateur, peut participer à certaines séances.',
  },
  {
    icon: 'chat',
    title: 'Suivi entre les séances',
    text: 'Une question, un doute, une petite victoire ? Vous pouvez me donner des nouvelles entre deux rendez-vous.',
  },
];

export const programs = [
  {
    slug: 'education',
    emoji: '🎾',
    title: 'Éducation de base',
    lead: 'Des bases claires pour un quotidien fluide et un chien qui comprend ce qu’on attend de lui.',
    items: [
      'Rappel',
      'Assis, couché, pas bouger',
      'Marche en laisse',
      'Bonnes habitudes au quotidien',
      'Port de la muselière',
      'Apprentissage des autocontrôles',
    ],
    suggested: 'Forfait 3 séances',
    oslo: 'Astuce de pro : un exercice réussi trois fois de suite ? On arrête et on joue ! Mieux vaut finir sur une victoire.',
  },
  {
    slug: 'chiot',
    emoji: '🐶',
    title: 'Chiot & nouvel arrivant',
    lead: 'Les premiers mois sont décisifs. On construit ensemble de bonnes habitudes dès l’arrivée à la maison.',
    items: [
      'Propreté et rythme de la journée',
      'Socialisation en douceur',
      'Apprendre la solitude progressivement',
      'Mordillements et jeux',
      'Manipulations et soins',
      'Chien adopté adulte ou en refuge',
    ],
    suggested: 'Forfait 3 séances',
    oslo: 'Les chiots, je les adore ! Je leur apprends les bonnes manières entre chiens, en douceur. Et n’oubliez pas : un chiot a besoin de dormir énormément.',
  },
  {
    slug: 'comportement',
    emoji: '💛',
    title: 'Comportements problématiques',
    lead: 'Comprendre l’origine du comportement pour agir durablement, sans brusquer votre chien.',
    items: [
      'Anxiété de séparation',
      'Réactivité envers les humains',
      'Réactivité envers les congénères',
      'Gestion de la protection de ressources',
      'Fugues',
      'Aboiements, destructions',
    ],
    suggested: 'Forfait 5 séances',
    oslo: 'Pour les chiens qui ont peur de leurs congénères, je peux venir en séance. Je reste calme, je regarde ailleurs… et petit à petit, la confiance revient.',
  },
  {
    slug: 'changements',
    emoji: '🏡',
    title: 'Changements de vie',
    lead: 'Déménagement, arrivée d’un bébé, d’un autre animal : on prépare votre chien en amont.',
    items: [
      'Préparation à l’arrivée d’un bébé',
      'Cohabitation avec un autre animal',
      'Déménagement et nouvel environnement',
      'Évolution du rythme de vie',
    ],
    suggested: 'Bilan complet + séances individuelles',
    oslo: 'Un bébé arrive ? Préparez votre chien quelques semaines avant : nouveaux bruits, nouvelles odeurs, nouvelles pièces interdites. Les surprises, on n’aime pas trop.',
  },
];

export const steps = [
  { n: '01', title: 'On fait connaissance', text: 'Lors du bilan complet, j’observe votre chien et j’écoute votre quotidien, vos difficultés et vos envies.' },
  { n: '02', title: 'On comprend', text: 'Ensemble, on identifie les causes des comportements gênants : émotion, besoin, environnement, apprentissage.' },
  { n: '03', title: 'On avance pas à pas', text: 'Je vous transmets des outils simples et concrets, adaptés à votre chien et à votre rythme.' },
  { n: '04', title: 'On ancre durablement', text: 'On généralise les acquis dans différents lieux pour un changement qui tient dans le temps.' },
];

// Conditions pratiques (page Prestations + FAQ). Textes validés par Pauline.
export const conditions = {
  deplacement: 'Frais de déplacement compris dans les prix affichés',
  paiement: 'Par virement au plus tard la veille de la séance, ou en espèces le jour même. Les forfaits peuvent être réglés en 3 fois : la totalité doit être payée au plus tard la veille de la dernière séance (ou le jour même en espèces).',
  annulation: 'Vous pouvez annuler une séance jusqu’à 1 heure avant : elle est alors reportée. Moins d’une heure avant, elle est déduite du forfait, ou facturée s’il s’agit d’une séance individuelle, sauf cas de force majeure (un accident, par exemple).',
};

// FAQ courte (7 questions) : page Prestations (avec balisage FAQPage) et page Contact.
export const faq = [
  {
    q: 'Où intervenez-vous ? Y a-t-il des frais de déplacement ?',
    a: `Je me déplace à ${site.location}. Les frais de déplacement sont compris dans les prix affichés. Selon l’objectif, on travaille à votre domicile ou en extérieur (parc, quais, rue).`,
  },
  {
    q: 'Combien de temps dure une séance ?',
    a: 'Une séance d’éducation dure environ 1 heure, qu’elle soit à l’unité ou comprise dans un forfait. Le bilan complet dure de 1h30 à 2h, chez vous. Les balades collectives durent entre 1h et 2h.',
  },
  {
    q: 'Vous accompagnez les chiots ou les chiens adultes ?',
    a: 'Les deux. Il n’y a pas d’âge minimum : on peut commencer dès l’arrivée du chiot à la maison. Et un chien adulte apprend à tout âge : les habitudes installées demandent parfois un peu plus de patience, mais les progrès sont tout à fait possibles.',
  },
  {
    q: 'Combien de séances faut-il prévoir ?',
    a: 'Cela dépend de votre chien et de votre objectif. Pour l’éducation de base, 3 séances suffisent souvent à poser des bases solides. Pour un trouble du comportement, un accompagnement de 5 séances est généralement plus adapté.',
  },
  {
    q: 'Comment se passe l’appel découverte gratuit ?',
    a: 'Vous réservez un créneau de 30 minutes dans mon agenda en ligne, et je vous appelle à l’heure choisie. Vous m’exposez la situation, je vous donne mon regard de professionnelle, je vous indique les points à travailler et je vous propose un échéancier de séances. Sans engagement. Pour commencer le travail, le bilan complet (40 €, 1h30 à 2h chez vous) reste ensuite indispensable.',
  },
  {
    q: 'Comment régler les séances ?',
    a: conditions.paiement,
  },
  {
    q: 'Et si je dois annuler une séance ?',
    a: conditions.annulation,
  },
];
