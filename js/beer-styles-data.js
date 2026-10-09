/* ==========================================================================
   beer-styles-data.js
   Toutes les données "métier" du compositeur : options pédagogiques et
   définition des styles de bière réels utilisés pour le résultat final.
   Aucune dépendance à Three.js ni au DOM : ce fichier peut être testé seul.
   ========================================================================== */

/* ---- Types de fermentation ---- */
var FERMENTATION_TYPES = [
  {
    id: 'any',
    label: 'Je ne sais pas',
    short: 'Sans préférence',
    text: "Si vous ne connaissez pas la méthode de fermentation, aucun style ne sera pénalisé sur ce critère. Le résultat privilégiera vos goûts : acidité, texture, arômes et amertume."
  },
  {
    id: 'haute',
    label: 'Haute (ale)',
    short: 'Rapide, chaude, fruitée',
    text: "Fermente entre 15 et 24°C avec une levure Saccharomyces cerevisiae qui remonte à la surface en fin de travail. C'est rapide (quelques jours) et ça produit des arômes fruités et épicés naturels (esters). C'est la méthode des ales, des IPA, des stouts et de la plupart des bières belges."
  },
  {
    id: 'basse',
    label: 'Basse (lager)',
    short: 'Lente, fraîche, nette',
    text: "Fermente au frais, entre 7 et 13°C, avec une levure Saccharomyces pastorianus qui se dépose au fond de la cuve. Le travail est plus lent et donne une bière plus nette et plus ronde, avec peu d'arômes de fermentation : c'est la méthode des lagers, des pils et des bocks."
  },
  {
    id: 'spontanee',
    label: 'Spontanée (lambic)',
    short: 'Sauvage, acidulée, unique',
    text: "Aucune levure n'est ajoutée : le moût refroidit à l'air libre et se fait ensemencer par les levures et bactéries sauvages de l'air ambiant. Le résultat est acidulé, complexe et jamais tout à fait identique d'une cuve à l'autre : c'est la méthode des lambics belges."
  }
];

/* ---- Malts de base ---- */
/* darkness : 0 (très pâle) à 4 (quasi noir), sert à la couleur du liquide */
var MALT_TYPES = [
  {
    id: 'pale',
    label: 'Pâle',
    darkness: 0.2,
    color: '#f3cf5c',
    text: "Le malt pâle (malt pilsner) est séché à basse température : il garde un maximum d'enzymes et de sucres fermentescibles, et donne une couleur dorée avec des notes de céréale, de pain frais et de miel."
  },
  {
    id: 'wheat',
    label: 'Blé',
    darkness: 0.5,
    color: '#f2df9a',
    text: "Le malt de blé remplace une partie de l'orge : il apporte du corps, une mousse plus dense et durable, et une texture soyeuse. C'est la base des bières blanches (witbier, weizen)."
  },
  {
    id: 'amber',
    label: 'Ambré',
    darkness: 1.5,
    color: '#d98e2b',
    text: "Le malt ambré (type Vienne ou Munich) est légèrement plus torréfié : il apporte une couleur cuivrée et des notes de pain grillé, de caramel léger et de noisette."
  },
  {
    id: 'brown',
    label: 'Brun',
    darkness: 2.6,
    color: '#7a4420',
    text: "Le malt brun est chauffé plus longtemps que le malt ambré : il colore la bière en brun profond et apporte des arômes de pain grillé, de caramel foncé, de noix et de fruits secs."
  },
  {
    id: 'roasted',
    label: 'Torréfié',
    darkness: 4,
    color: '#231209',
    text: "Le malt torréfié (malt noir) est chauffé presque jusqu'à la carbonisation, comme un café très torréfié : il donne une couleur noire opaque et des arômes de café, de cacao amer et de fumé."
  }
];

/* ---- Profils de houblon (le "type") ---- */
var HOP_PROFILES = [
  {
    id: 'noble',
    label: 'Noble & floral',
    text: "Les houblons nobles (type Saaz, Hallertau) sont peu amers mais très aromatiques : ils apportent des notes florales, herbacées et légèrement épicées. On les trouve dans les lagers, les blondes classiques et les bocks."
  },
  {
    id: 'agrumes',
    label: 'Agrumes & tropical',
    text: "Les houblons américains (type Citra, Cascade, Mosaic) sont riches en huiles essentielles d'agrumes et de fruits tropicaux : ce sont eux qui dominent le nez des IPA modernes."
  },
  {
    id: 'terreux',
    label: 'Terreux & épicé',
    text: "Les houblons terreux et épicés (type Fuggle, Styrian Golding) donnent des notes de terre, de bois, de poivre et d'herbe séchée. On les retrouve dans les ales anglaises et les saisons."
  }
];

/* ---- Arômes complémentaires (choix multiple) ---- */
var FLAVOR_TAGS = [
  {
    id: 'fruits',
    label: 'Fruits',
    text: "Les fruits (framboise, cerise, pêche...) sont ajoutés en fermentation ou en macération : ils apportent sucrosité, acidité et couleur, comme dans les fruit lambics."
  },
  {
    id: 'epices',
    label: 'Épices',
    text: "Coriandre, curaçao, poivre... les épices sont une signature des bières belges (witbier, saison) : elles ajoutent de la complexité sans dominer le malt."
  },
  {
    id: 'cafe',
    label: 'Café',
    text: "Le café torréfié prolonge naturellement les notes déjà présentes dans les malts très torréfiés : c'est un classique des stouts et porters modernes."
  },
  {
    id: 'chocolat',
    label: 'Chocolat',
    text: "Le cacao renforce les notes déjà présentes dans les malts torréfiés, pour un profil dessert typique des stouts et des porters."
  },
  {
    id: 'agrumes_zeste',
    label: 'Agrumes (zestes)',
    text: "Écorces d'orange, zestes de citron... les agrumes ajoutés à cru apportent une fraîcheur acidulée, très présente dans les witbiers et certaines IPA."
  }
];

/* ---- Origine / tradition brassicole ---- */
var ORIGINS = [
  {
    id: 'belge',
    label: 'Belge',
    text: "La tradition belge se distingue par des levures très aromatiques (esters fruités, épices) et une grande liberté créative : bières fortes, acidulées ou épicées y sont monnaie courante depuis des siècles d'abbayes brassicoles."
  },
  {
    id: 'iles-britanniques',
    label: 'Îles britanniques',
    text: "La tradition d'Angleterre et d'Irlande privilégie l'équilibre malté, une amertume mesurée et une fermentation haute peu marquée en esters : c'est le berceau historique des ales, porters et stouts."
  },
  {
    id: 'europe-centrale',
    label: 'Allemande / Europe centrale',
    text: "L'Allemagne et la Bohême ont perfectionné la fermentation basse (lager) au XIXe siècle grâce au froid des caves alpines, donnant des bières nettes, précises, où le moindre défaut se voit immédiatement."
  },
  {
    id: 'americaine',
    label: 'Américaine',
    text: "La scène brassicole artisanale américaine, née dans les années 1980, a réinventé les styles européens en poussant le houblon (souvent aux arômes d'agrumes et de résine) et l'intensité bien plus loin que les traditions d'origine."
  },
  {
    id: 'francaise',
    label: 'Française',
    text: "De la Bière de Garde du nord aux créations artisanales modernes, les traditions françaises rassemblent des familles variées. Choisir cette origine aide à distinguer notamment les bières de garde."
  },
  {
    id: 'peu-importe',
    label: 'Peu importe',
    text: "Aucune préférence de tradition brassicole : votre recette sera comparée à tous les styles, sans favoriser une origine plutôt qu'une autre."
  }
];

/* ---- Textes pédagogiques pour les curseurs ---- */
var SLIDER_TEXTS = {
  hopAmount: "Plus on ajoute de houblon tôt dans l'ébullition, plus on extrait d'acides alpha isomérisés responsables de l'amertume, mesurée en IBU (International Bitterness Units).",
  sweetness: "Le sucre restant après fermentation (sucres non fermentescibles, dextrines) donne du corps et de la rondeur. Une bière « sèche » a été fermentée à fond ; une bière plus sucrée a gardé davantage de sucres résiduels.",
  abv: "Le degré d'alcool dépend de la quantité de sucres fermentescibles présents dans le moût : plus il y a de malt, plus la levure dispose de sucre à transformer en alcool.",
  carbonation: "Le gaz carbonique dissous vient soit de la fermentation elle-même (carbonatation naturelle), soit d'un ajout de CO2 avant la mise en bouteille. Il influence la texture en bouche autant que le visuel : une bière très carbonatée pique et paraît plus légère, une bière peu carbonatée semble plus ronde et plus dense."
};

var FILTRATION_TEXTS = {
  trouble: "Une bière non filtrée garde en suspension des protéines, des levures ou des particules de blé : elle est trouble, mais souvent plus ronde en bouche (weizen, NEIPA, bières artisanales).",
  limpide: "La filtration retire les particules en suspension pour une bière brillante et stable : c'est le cas de la plupart des lagers industrielles et de nombreuses ales commerciales."
};

/* ==========================================================================
   Styles de bière réels, utilisés pour trouver la correspondance la plus
   proche de la recette composée par l'utilisateur.
   Chaque valeur cible est sur une échelle 0-10 sauf mention contraire.

   - hopProfiles : profils de houblon traditionnellement associés à ce style
     (tableau vide = pas de préférence marquée, pas de pénalité appliquée)
   - flavors     : arômes complémentaires traditionnellement associés à ce
     style (utilisés pour départager des styles très proches par ailleurs,
     comme la weizen et la witbier)
   - examples    : vraies bières commerciales représentatives de ce style,
     pour ancrer le résultat dans des références concrètes et vérifiables
   ========================================================================== */
var BEER_STYLES = [
  {
    id: 'pils',
    name: 'Pilsner / Lager blonde',
    fermentation: 'basse',
    darkness: 0.3,
    hop: 3.5,
    sweetness: 2,
    abv: [4.2, 5.5],
    filtration: 'limpide',
    hopProfiles: ['noble'],
    origin: ['europe-centrale'],
    carbonation: 6,
    flavors: [],
    description: "Née à Plzeň (Bohême) en 1842, la pilsner est la lager blonde de référence : robe dorée limpide, mousse blanche et fine, amertume nette apportée par des houblons nobles, sans arômes de fermentation marqués grâce au travail à froid.",
    examples: [
      { name: 'Pilsner Urquell', origin: 'Tchéquie', note: "La toute première pilsner au monde (1842), encore brassée selon une recette proche de l'originale." },
      { name: 'Bitburger', origin: 'Allemagne', note: "Une pils allemande sèche et très nettement houblonnée, typique du style « premium » germanique." },
      { name: 'Peroni Nastro Azzurro', origin: 'Italie', note: "Une lager légère et désaltérante, plus douce que ses cousines tchèque et allemande." }
    ]
  },
  {
    id: 'pale-ale',
    name: 'Pale Ale',
    fermentation: 'haute',
    darkness: 1.1,
    hop: 5,
    sweetness: 3,
    abv: [4.5, 6],
    filtration: 'limpide',
    hopProfiles: ['terreux', 'agrumes'],
    origin: ['iles-britanniques', 'americaine'],
    carbonation: 4.5,
    flavors: [],
    description: "La pale ale est une ale ambrée-dorée, équilibrée entre le moelleux du malt et l'amertume du houblon, avec des notes fruitées apportées par la fermentation haute. C'est l'archétype de l'ale britannique et américaine moderne.",
    examples: [
      { name: 'Sierra Nevada Pale Ale', origin: 'États-Unis', note: "La pale ale américaine de référence, popularisée dès 1980 grâce au houblon Cascade et ses notes de pamplemousse." },
      { name: "Fuller's London Pride", origin: 'Angleterre', note: "Une pale ale anglaise ronde et maltée, avec un houblonnage terreux plus discret que sa cousine américaine." },
      { name: 'Bass Pale Ale', origin: 'Angleterre', note: "Une des plus anciennes pale ales industrielles, exportée dans le monde entier dès le XIXe siècle." }
    ]
  },
  {
    id: 'ipa',
    name: 'IPA (India Pale Ale)',
    fermentation: 'haute',
    darkness: 1,
    hop: 8.5,
    sweetness: 2.5,
    abv: [6, 7.5],
    filtration: 'trouble',
    hopProfiles: ['agrumes'],
    origin: ['iles-britanniques', 'americaine'],
    carbonation: 5,
    flavors: ['agrumes_zeste', 'fruits'],
    description: "Historiquement liée aux pale ales anglaises exportées au XIXe siècle, l'IPA est aujourd'hui une famille très variée : certaines versions sont sèches et fortement amères, d'autres troubles, fruitées et plus douces en bouche.",
    examples: [
      { name: 'Lagunitas IPA', origin: 'États-Unis', note: "Une IPA californienne généreusement houblonnée, aux arômes résineux et d'agrumes très marqués." },
      { name: 'BrewDog Punk IPA', origin: 'Écosse', note: "L'IPA qui a lancé la scène craft écossaise, fruitée et volontairement provocatrice sur l'amertume." },
      { name: 'Sierra Nevada Torpedo Extra IPA', origin: 'États-Unis', note: "Une IPA plus corsée, houblonnée à cru (« dry-hopping ») pour un nez explosif d'agrumes." }
    ]
  },
  {
    id: 'stout',
    name: 'Stout',
    fermentation: 'haute',
    darkness: 4,
    hop: 3,
    sweetness: 5,
    abv: [4.5, 7],
    filtration: 'trouble',
    hopProfiles: ['terreux', 'noble'],
    origin: ['iles-britanniques'],
    carbonation: 3,
    flavors: ['cafe', 'chocolat'],
    description: "La famille des stouts se reconnaît à ses céréales très torréfiées et aux notes de café ou de cacao. Un Irish Stout est souvent sec et amer, tandis qu'un Milk Stout est plus doux et un Imperial Stout beaucoup plus puissant.",
    examples: [
      { name: 'Guinness Draught', origin: 'Irlande', note: "Le stout sec le plus connu au monde : mousse crémeuse obtenue grâce à l'azote, amertume torréfiée nette." },
      { name: "Murphy's Irish Stout", origin: 'Irlande', note: "Un peu plus doux et rond que la Guinness, avec des notes de café au lait." },
      { name: 'Beamish Irish Stout', origin: 'Irlande', note: "Le troisième grand stout irlandais historique, réputé pour sa rondeur légèrement sucrée." }
    ]
  },
  {
    id: 'porter',
    name: 'Porter',
    fermentation: 'haute',
    darkness: 2.8,
    hop: 3,
    sweetness: 4.5,
    abv: [4, 6.5],
    filtration: 'trouble',
    hopProfiles: ['terreux', 'noble'],
    origin: ['iles-britanniques'],
    carbonation: 3.5,
    flavors: ['chocolat', 'cafe'],
    description: "Le porter est une ale brune historiquement britannique, aux arômes de chocolat, de pain grillé et parfois de café. La fumée n'est pas obligatoire : les versions fumées constituent une variation spécifique.",
    examples: [
      { name: 'Fuller\'s London Porter', origin: 'Angleterre', note: "Un porter anglais classique, tout en caramel et en chocolat noir, moins torréfié qu'un stout." },
      { name: 'Anchor Porter', origin: 'États-Unis', note: "Un porter américain robuste, souvent cité comme ayant relancé le style dans les années 1970." },
      { name: "Samuel Smith's Taddy Porter", origin: 'Angleterre', note: "Un porter du Yorkshire fermenté en cuve de pierre, à la texture soyeuse caractéristique." }
    ]
  },
  {
    id: 'weizen',
    name: 'Weizen (bière de blé)',
    fermentation: 'haute',
    darkness: 0.5,
    hop: 2,
    sweetness: 4,
    abv: [4.5, 5.5],
    filtration: 'trouble',
    hopProfiles: ['noble'],
    origin: ['europe-centrale'],
    carbonation: 7.5,
    flavors: [],
    description: "Brassée avec une forte proportion de malt de blé, la weizen (ou hefeweizen) est trouble, à la mousse abondante et durable, avec des arômes caractéristiques de banane et de clou de girofle produits par sa levure spécifique — sans aucun arôme ajouté.",
    examples: [
      { name: 'Paulaner Hefe-Weißbier', origin: 'Allemagne', note: "L'une des weizens bavaroises les plus exportées, très marquée banane et clou de girofle." },
      { name: 'Weihenstephaner Hefeweissbier', origin: 'Allemagne', note: "Brassée par la plus ancienne brasserie du monde encore en activité, souvent citée en référence du style." },
      { name: 'Erdinger Weißbier', origin: 'Allemagne', note: "Une weizen légère et très douce, parmi les plus consensuelles du style." }
    ]
  },
  {
    id: 'witbier',
    name: 'Witbier (bière blanche belge)',
    fermentation: 'haute',
    darkness: 0.5,
    hop: 2,
    sweetness: 3,
    abv: [4.5, 5.5],
    filtration: 'trouble',
    hopProfiles: ['noble'],
    origin: ['belge'],
    carbonation: 6.5,
    flavors: ['epices', 'agrumes_zeste'],
    description: "Proche cousine belge de la weizen allemande, la witbier utilise aussi le malt de blé, mais tire son caractère d'épices ajoutées (coriandre) et de zestes d'agrumes plutôt que de sa levure : c'est la différence clé entre les deux styles.",
    examples: [
      { name: 'Hoegaarden', origin: 'Belgique', note: "La witbier de référence, qui a relancé le style dans les années 1960 avec coriandre et curaçao." },
      { name: 'Blue Moon Belgian White', origin: 'États-Unis', note: "Une witbier américaine grand public, notes d'agrumes bien marquées, souvent servie avec une rondelle d'orange." },
      { name: 'Allagash White', origin: 'États-Unis', note: "Une witbier artisanale américaine plus épicée et plus sèche que la moyenne du style." }
    ]
  },
  {
    id: 'saison',
    name: 'Saison',
    fermentation: 'haute',
    darkness: 1,
    hop: 5,
    sweetness: 1.5,
    abv: [5, 7],
    filtration: 'limpide',
    hopProfiles: ['terreux', 'noble'],
    origin: ['belge'],
    carbonation: 8,
    flavors: ['epices', 'agrumes_zeste'],
    description: "Bière de ferme wallonne à l'origine désaltérante pour les saisonniers, la saison est sèche, poivrée et légèrement épicée, avec une carbonatation vive et une amertume discrète.",
    examples: [
      { name: 'Saison Dupont', origin: 'Belgique', note: "La référence absolue du style depuis des décennies, très sèche et poivrée." },
      { name: 'Fantôme Saison', origin: 'Belgique', note: "Une saison plus sauvage et imprévisible, souvent citée pour son caractère rustique." },
      { name: 'Saison de Pipaix', origin: 'Belgique', note: "Brassée à la Brasserie à Vapeur, l'une des dernières brasseries fonctionnant encore à la vapeur." }
    ]
  },
  {
    id: 'lambic',
    name: 'Lambic',
    fermentation: 'spontanee',
    darkness: 0.6,
    hop: 1,
    sweetness: 2,
    abv: [5, 7],
    filtration: 'trouble',
    hopProfiles: [],
    origin: ['belge'],
    carbonation: 2,
    flavors: [],
    description: "Tradition du Pajottenland et de Bruxelles : le lambic non assemblé est une bière de fermentation spontanée, souvent peu pétillante, sèche, acide et complexe. Une gueuze est un assemblage de lambics généralement refermenté en bouteille et plus effervescent.",
    examples: [
      { name: 'Cantillon Gueuze', origin: 'Belgique', note: "Brassée par l'une des dernières brasseries-lambic historiques de Bruxelles, très acidulée et sauvage." },
      { name: 'Boon Oude Geuze', origin: 'Belgique', note: "Un assemblage de lambics d'âges différents, référence classique de la gueuze traditionnelle." },
      { name: 'Timmermans Lambic', origin: 'Belgique', note: "L'une des plus anciennes brasseries de lambic encore en activité, fondée au XVIIe siècle." }
    ]
  },
  {
    id: 'bock',
    name: 'Bock',
    fermentation: 'basse',
    darkness: 2,
    hop: 2.5,
    sweetness: 6,
    abv: [6, 9],
    filtration: 'limpide',
    hopProfiles: ['noble'],
    origin: ['europe-centrale'],
    carbonation: 4,
    flavors: [],
    description: "Contrairement à la pilsner, la bock mise tout sur le malt : fermentation basse mais bière ambrée à brune, ronde, sucrée et nettement plus alcoolisée, avec un houblonnage discret qui ne fait que soutenir la richesse maltée.",
    examples: [
      { name: 'Ayinger Celebrator Doppelbock', origin: 'Allemagne', note: "Une doppelbock (bock double) puissante et maltée, souvent citée comme référence du style." },
      { name: 'Einbecker Ur-Bock', origin: 'Allemagne', note: "Brassée dans la ville d'Einbeck, berceau historique du style bock." },
      { name: 'Spaten Optimator', origin: 'Allemagne', note: "Une doppelbock munichoise ronde et sombre, avec des notes de pain grillé et de raisin sec." }
    ]
  },
  {
    id: 'blonde-ale',
    name: 'Blonde Ale',
    fermentation: 'haute',
    darkness: 0.3,
    hop: 3,
    sweetness: 3,
    abv: [4, 5.5],
    filtration: 'limpide',
    hopProfiles: ['noble', 'terreux'],
    origin: ['belge', 'americaine'],
    carbonation: 5,
    flavors: [],
    description: "La blonde ale est l'ale légère et facile à boire par excellence : dorée, peu amère, peu aromatique, elle mise sur l'équilibre plutôt que sur un trait dominant. C'est souvent la porte d'entrée vers les ales artisanales.",
    examples: [
      { name: 'Leffe Blonde', origin: 'Belgique', note: "Une blonde d'abbaye ronde et légèrement fruitée, l'une des plus connues au monde." },
      { name: 'Affligem Blonde', origin: 'Belgique', note: "Une blonde d'abbaye plus sèche que la Leffe, avec une amertume discrète en finale." },
      { name: 'SweetWater Blonde Ale', origin: 'États-Unis', note: "Une blonde ale américaine conçue pour être désaltérante et peu marquée en houblon." }
    ]
  },
  {
    id: 'amber-ale',
    name: 'Amber Ale (ale rousse)',
    fermentation: 'haute',
    darkness: 1.5,
    hop: 4,
    sweetness: 4,
    abv: [4.5, 6],
    filtration: 'limpide',
    hopProfiles: ['terreux', 'agrumes'],
    origin: ['iles-britanniques', 'americaine'],
    carbonation: 4.5,
    flavors: [],
    description: "Plus maltée et plus caramélisée que la pale ale, l'amber ale (ou ale rousse) tire sa couleur cuivrée d'un malt plus torréfié, avec un houblonnage qui reste secondaire par rapport à la douceur du malt.",
    examples: [
      { name: 'New Belgium Fat Tire', origin: 'États-Unis', note: "L'amber ale américaine la plus emblématique, avec des notes de caramel léger et de biscuit." },
      { name: "Killian's Irish Red", origin: 'États-Unis', note: "Inspirée des red ales irlandaises, ronde et peu amère, à la robe cuivrée caractéristique." },
      { name: 'Alaskan Amber', origin: 'États-Unis', note: "Basée sur une recette d'époque de la ruée vers l'or, maltée et légèrement fumée." }
    ]
  },
  {
    id: 'brown-ale',
    name: 'Brown Ale (ale brune)',
    fermentation: 'haute',
    darkness: 2.6,
    hop: 3,
    sweetness: 5,
    abv: [4, 5.5],
    filtration: 'limpide',
    hopProfiles: ['terreux'],
    origin: ['iles-britanniques'],
    carbonation: 3.5,
    flavors: [],
    description: "Moins torréfiée qu'un porter, la brown ale mise sur des notes de noix, de caramel et de pain grillé apportées par le malt brun, pour une bière ronde et peu amère, typique de l'Angleterre du Nord.",
    examples: [
      { name: 'Newcastle Brown Ale', origin: 'Angleterre', note: "La brown ale anglaise la plus exportée au monde, douce et légèrement noisette." },
      { name: "Samuel Smith's Nut Brown Ale", origin: 'Angleterre', note: "Une brown ale plus ronde et plus maltée, souvent citée comme référence du style." },
      { name: 'Moose Drool Brown Ale', origin: 'États-Unis', note: "Une brown ale américaine crémeuse, aux notes de caramel et de vanille légère." }
    ]
  },
  {
    id: 'black-ipa',
    name: 'Black IPA (IPA noire)',
    fermentation: 'haute',
    darkness: 3,
    hop: 8,
    sweetness: 3,
    abv: [6, 7.5],
    filtration: 'trouble',
    hopProfiles: ['agrumes'],
    origin: ['americaine'],
    carbonation: 5,
    flavors: ['agrumes_zeste'],
    description: "Née aux États-Unis dans les années 2000, la Black IPA superpose l'amertume et les arômes d'agrumes d'une IPA à la couleur noire d'un malt torréfié utilisé en petite quantité, sans en prendre l'amertume de café.",
    examples: [
      { name: 'Stone Sublimely Self-Righteous', origin: 'États-Unis', note: "L'une des Black IPA les plus réputées, à la fois résineuse et légèrement torréfiée." },
      { name: 'Deschutes Hop in the Dark', origin: 'États-Unis', note: "Un équilibre étudié entre malt torréfié discret et houblonnage franc d'agrumes." },
      { name: 'Widmer Brothers Pitch Black IPA', origin: 'États-Unis', note: "Une des premières Black IPA largement distribuées, qui a fait connaître le style." }
    ]
  },
  {
    id: 'tripel',
    name: 'Tripel belge',
    fermentation: 'haute',
    darkness: 0.5,
    hop: 4,
    sweetness: 5,
    abv: [7.5, 9.5],
    filtration: 'limpide',
    hopProfiles: ['noble'],
    origin: ['belge'],
    carbonation: 7.5,
    flavors: ['epices'],
    description: "Malgré sa robe dorée pâle, la tripel est une bière forte et complexe : sa levure belge très active produit des arômes fruités et épicés (poivre, clou de girofle), le tout porté par un degré d'alcool élevé bien masqué par une carbonatation vive.",
    examples: [
      { name: 'Westmalle Tripel', origin: 'Belgique', note: "La tripel de référence, créée par les moines trappistes de Westmalle en 1934." },
      { name: 'La Fin du Monde', origin: 'Canada', note: "Une tripel québécoise puissante, primée à plusieurs reprises à l'international." },
      { name: 'Chimay Cinq Cents (Blanche)', origin: 'Belgique', note: "La tripel de l'abbaye de Chimay, épicée et sèche en finale." }
    ]
  },
  {
    id: 'barleywine',
    name: 'Barleywine',
    fermentation: 'haute',
    darkness: 2,
    hop: 6,
    sweetness: 8,
    abv: [9, 12],
    filtration: 'limpide',
    hopProfiles: ['terreux'],
    origin: ['iles-britanniques', 'americaine'],
    carbonation: 3,
    flavors: [],
    description: "Le Barleywine est une ale très forte, riche et chaleureuse. Les versions anglaises mettent souvent l'accent sur le malt et les fruits secs ; les versions américaines peuvent présenter une amertume et un houblonnage très marqués.",
    examples: [
      { name: 'Sierra Nevada Bigfoot', origin: 'États-Unis', note: "Le barleywine américain de référence, dense et généreusement houblonné." },
      { name: 'Anchor Old Foghorn', origin: 'États-Unis', note: "L'un des tout premiers barleywines américains, sirupeux et intense." },
      { name: "Fuller's Golden Pride", origin: 'Angleterre', note: "Un barleywine anglais plus doré que brun, rond et chaleureux en bouche." }
    ]
  },
  {
    id: 'gose',
    name: 'Gose',
    fermentation: 'haute',
    darkness: 0.4,
    hop: 1,
    sweetness: 2,
    abv: [4, 4.8],
    filtration: 'limpide',
    hopProfiles: ['noble'],
    origin: ['europe-centrale'],
    carbonation: 6,
    flavors: ['epices', 'agrumes_zeste'],
    description: "Originaire de Goslar en Allemagne, la gose est une bière de blé légèrement acidulée (grâce à des bactéries lactiques) et salée, traditionnellement relevée de coriandre : un profil totalement à part, très peu houblonné.",
    examples: [
      { name: 'Westbrook Gose', origin: 'États-Unis', note: "L'une des gose artisanales qui a relancé le style aux États-Unis, acidulée et saline." },
      { name: 'Ritterguts Gose', origin: 'Allemagne', note: "Brassée selon la tradition de Goslar, référence historique du style." },
      { name: 'Anderson Valley Blood Orange Gose', origin: 'États-Unis', note: "Une gose fruitée à l'orange sanguine, très populaire dans le renouveau du style." }
    ]
  }
];

/**
 * Calcule le style de bière réel le plus proche d'un état de recette donné.
 * @param {Object} state - voir ui.js pour la forme exacte de l'état
 * @returns {Object} { style, score, percent, reasons }
 */
function computeBestMatch(state) {
  var maltInfo = getMaltById(state.malt);
  var darkness = maltInfo ? maltInfo.darkness : 0.2;

  // Amplitude réelle de chaque critère continu sur l'ensemble des styles /
  // curseurs. Avant, les écarts bruts étaient comparés entre des échelles
  // très différentes (darkness : 0-4, houblon/sucre/carbonatation : 0-10,
  // ABV : ~2,5-12) et les facteurs de pondération ne compensaient pas
  // vraiment ces amplitudes. Résultat : deux critères avec le même poids
  // "affiché" pesaient en réalité très différemment dans le score final,
  // ce qui rendait certains matches peu précis. On ramène donc chaque
  // écart sur une échelle 0-1 avant de le pondérer, pour que le poids
  // choisi corresponde à l'importance réelle du critère.
  var RANGE = {
    darkness: 4,
    hop: 10,
    sweetness: 10,
    carbonation: 10,
    abv: 9.5 // amplitude du curseur ABV (2,5% à 12%)
  };

  var candidates = [];

  for (var i = 0; i < BEER_STYLES.length; i++) {
    var s = BEER_STYLES[i];

    // La fermentation reste le critère le plus structurant : c'est la
    // méthode de brassage elle-même, pas un simple réglage de goût.
    var fermentationPenalty = (s.fermentation === state.fermentation) ? 0 : 3.2;

    var darknessDiff = Math.abs(s.darkness - darkness) / RANGE.darkness;
    var hopDiff = Math.abs(s.hop - state.hopAmount) / RANGE.hop;
    var sweetDiff = Math.abs(s.sweetness - state.sweetness) / RANGE.sweetness;

    var abvMid = (s.abv[0] + s.abv[1]) / 2;
    var abvDiff;
    // Pénalité nulle si l'ABV choisi tombe dans la fourchette du style
    if (state.abv >= s.abv[0] && state.abv <= s.abv[1]) {
      abvDiff = 0;
    } else {
      abvDiff = Math.abs(abvMid - state.abv) / RANGE.abv;
    }

    var filtrationPenalty = (s.filtration === state.filtration) ? 0 : 0.9;

    // Profil de houblon : pénalité si le style a une préférence marquée
    // et que le profil choisi n'en fait pas partie.
    var hopProfilePenalty = 0;
    if (s.hopProfiles && s.hopProfiles.length && s.hopProfiles.indexOf(state.hopProfile) === -1) {
      hopProfilePenalty = 1.0;
    }

    // Origine / tradition brassicole : pénalité si l'utilisateur a une
    // préférence marquée et qu'elle ne correspond pas à ce style.
    // "peu-importe" ne pénalise jamais aucun style.
    var originPenalty = 0;
    if (state.origin && state.origin !== 'peu-importe' && s.origin && s.origin.length &&
        s.origin.indexOf(state.origin) === -1) {
      originPenalty = 1.0;
    }

    // Carbonatation : écart normalisé comme les autres curseurs.
    var carbonationDiff = (typeof s.carbonation === 'number' && typeof state.carbonation === 'number')
      ? Math.abs(s.carbonation - state.carbonation) / RANGE.carbonation
      : 0;

    // Arômes complémentaires : c'est le critère qui départage le mieux des
    // styles très proches par ailleurs (ex. weizen / witbier, porter /
    // stout), donc son effet est volontairement plus tranchant que celui
    // des autres critères. Une correspondance rapproche fortement le
    // style ; un choix hors tradition pénalise peu si le style n'a pas
    // d'identité aromatique propre (flavors vide), et davantage s'il en a
    // une que le choix contredit.
    var flavorAdjust = 0;
    if (state.flavors && state.flavors.length) {
      var styleHasOwnFlavors = !!(s.flavors && s.flavors.length);
      state.flavors.forEach(function (fid) {
        if (s.flavors && s.flavors.indexOf(fid) >= 0) {
          flavorAdjust -= 0.9;
        } else if (styleHasOwnFlavors) {
          flavorAdjust += 0.45;
        } else {
          flavorAdjust += 0.15;
        }
      });
    }

    var score = fermentationPenalty +
                darknessDiff * 1.6 +
                hopDiff * 1.3 +
                sweetDiff * 1.1 +
                abvDiff * 1.0 +
                filtrationPenalty +
                hopProfilePenalty +
                originPenalty +
                carbonationDiff * 0.9 +
                flavorAdjust;

    candidates.push({ style: s, score: score });
  }

  candidates.sort(function (a, b) { return a.score - b.score; });

  var best = candidates[0];
  var runnerUp = candidates[1];
  // Écart entre le 1er et le 2e choix : plus il est petit, plus le match
  // est "serré" entre deux styles voisins. On l'expose pour pouvoir en
  // informer l'utilisateur plutôt que de masquer l'ambiguïté.
  var margin = runnerUp ? (runnerUp.score - best.score) : null;
  var isCloseCall = margin !== null && margin < 0.6;

  return {
    style: best.style,
    score: best.score,
    percent: scoreToPercent(best.score),
    runnerUp: runnerUp ? runnerUp.style : null,
    runnerUpPercent: runnerUp ? scoreToPercent(runnerUp.score) : null,
    isCloseCall: isCloseCall,
    reasons: buildReasons(state, best.style, maltInfo, runnerUp ? runnerUp.style : null, isCloseCall)
  };
}

/* Convertit un score d'écart (0 = correspondance parfaite) en un indice de
   proximité en pourcentage, plus parlant pour l'utilisateur. C'est une
   heuristique de lisibilité, pas une mesure statistique rigoureuse.
   Le score étant désormais construit à partir de critères normalisés
   (0-1 par critère avant pondération), son amplitude typique est plus
   petite qu'avant : l'échelle de conversion a été recalibrée en
   conséquence (voir js/beer-styles-data.js pour un exemple de calcul). */
function scoreToPercent(score) {
  var pct = 99 - score * 6.2;
  return Math.max(35, Math.min(99, Math.round(pct)));
}

function labelsForFlavors(ids) {
  return ids.map(function (id) {
    var t = FLAVOR_TAGS.filter(function (f) { return f.id === id; })[0];
    return t ? t.label.toLowerCase() : id;
  }).join(' et ');
}

function buildReasons(state, style, maltInfo, runnerUp, isCloseCall) {
  var reasons = [];
  var ferm = getFermentationById(state.fermentation);
  var hopProf = getHopProfileById(state.hopProfile);

  // 0. Signaler un résultat serré : plutôt que de trancher en silence
  // entre deux styles très voisins, on l'indique explicitement.
  if (isCloseCall && runnerUp) {
    reasons.push(
      "Match serré : votre recette est presque aussi proche du " + runnerUp.name +
      " — c'est " + style.name + " qui l'emporte de justesse sur l'ensemble des critères."
    );
  }

  // 1. Fermentation
  reasons.push(
    style.fermentation === state.fermentation
      ? "Fermentation : vous avez choisi une fermentation " + (ferm ? ferm.label.toLowerCase() : state.fermentation) + ", exactement la méthode traditionnelle de ce style."
      : "Fermentation : vous avez choisi une fermentation " + (ferm ? ferm.label.toLowerCase() : state.fermentation) + ", qui diffère de la méthode d'origine de ce style — mais l'ensemble de votre recette s'en rapproche malgré tout le plus."
  );

  // 2. Origine / tradition brassicole
  if (state.origin && state.origin !== 'peu-importe') {
    var originInfo = getOriginById(state.origin);
    var originFits = style.origin && style.origin.indexOf(state.origin) >= 0;
    reasons.push(
      "Origine : la tradition " + (originInfo ? originInfo.label.toLowerCase() : state.origin) +
      (originFits ? " est justement celle dont est issu ce style." : " diffère de celle d'origine de ce style, mais le reste de votre recette y correspond davantage.")
    );
  } else {
    reasons.push("Origine : vous n'avez pas privilégié de tradition brassicole en particulier, la comparaison s'est donc faite sur tous les styles.");
  }

  // 3. Malt / couleur
  if (maltInfo) {
    reasons.push("Malt : le " + maltInfo.label.toLowerCase() + " donne une teinte proche de la robe caractéristique du " + style.name + ".");
  }

  // 3. Houblon (profil + quantité)
  var hopFitProfile = !style.hopProfiles || style.hopProfiles.length === 0 || style.hopProfiles.indexOf(state.hopProfile) >= 0;
  var hopAmountText = state.hopAmount >= 6.5
    ? "avec un dosage généreux qui rejoint son amertume marquée."
    : state.hopAmount <= 2.5
      ? "avec un dosage discret qui laisse le malt s'exprimer, comme ici."
      : "avec un dosage modéré qui équilibre malt et amertume.";
  reasons.push(
    "Houblon : un profil " + (hopProf ? hopProf.label.toLowerCase() : state.hopProfile) +
    (hopFitProfile ? ", cohérent avec ce style, " : ", plutôt inhabituel pour ce style, mais ") +
    hopAmountText
  );

  // 4. Arômes complémentaires
  if (state.flavors.length) {
    var matched = state.flavors.filter(function (f) { return style.flavors && style.flavors.indexOf(f) >= 0; });
    if (matched.length) {
      reasons.push("Arômes : votre choix de " + labelsForFlavors(matched) + " est justement une association classique de ce style.");
    } else {
      reasons.push("Arômes : votre choix de " + labelsForFlavors(state.flavors) + " est plus original pour ce style, traditionnellement peu aromatisé.");
    }
  } else {
    reasons.push(
      style.flavors && style.flavors.length
        ? "Arômes : vous n'avez rien ajouté, alors que ce style s'accorde souvent avec " + labelsForFlavors(style.flavors) + "."
        : "Arômes : vous n'avez rien ajouté, fidèle à la sobriété traditionnelle de ce style."
    );
  }

  // 5. Sucrosité
  var sweetClose = Math.abs(state.sweetness - style.sweetness) <= 1.5;
  reasons.push(
    "Sucrosité : votre niveau (" + state.sweetness.toFixed(1).replace('.', ',') + "/10) est " +
    (sweetClose ? "proche de celui typique de ce style." : "un peu éloigné du profil habituel de ce style, sans empêcher la correspondance globale.")
  );

  // 6. Carbonatation
  if (typeof style.carbonation === 'number' && typeof state.carbonation === 'number') {
    var carbClose = Math.abs(state.carbonation - style.carbonation) <= 1.5;
    reasons.push(
      "Carbonatation : votre choix (" + state.carbonation.toFixed(1).replace('.', ',') + "/10) est " +
      (carbClose ? "cohérent avec la vivacité habituelle de ce style." : "assez éloigné du niveau typique de ce style, sans empêcher la correspondance globale.")
    );
  }

  // 6. Alcool
  var abvInRange = state.abv >= style.abv[0] && state.abv <= style.abv[1];
  reasons.push(
    "Alcool : vos " + state.abv.toFixed(1).replace('.', ',') + "% ABV " +
    (abvInRange ? "entrent bien dans la fourchette habituelle (" : "sortent de la fourchette habituelle (") +
    style.abv[0] + "-" + style.abv[1] + "% ABV) de ce style."
  );

  // 7. Filtration
  reasons.push(
    "Filtration : votre choix « " + (state.filtration === 'trouble' ? 'trouble' : 'limpide') + " » " +
    (state.filtration === style.filtration
      ? "colle à l'aspect traditionnel de ce style."
      : "diffère de l'aspect le plus courant de ce style, même si des versions modernes existent dans les deux aspects.")
  );

  return reasons;
}

function getMaltById(id) {
  for (var i = 0; i < MALT_TYPES.length; i++) {
    if (MALT_TYPES[i].id === id) return MALT_TYPES[i];
  }
  return null;
}

function getFermentationById(id) {
  for (var i = 0; i < FERMENTATION_TYPES.length; i++) {
    if (FERMENTATION_TYPES[i].id === id) return FERMENTATION_TYPES[i];
  }
  return null;
}

function getOriginById(id) {
  for (var i = 0; i < ORIGINS.length; i++) {
    if (ORIGINS[i].id === id) return ORIGINS[i];
  }
  return null;
}

function getHopProfileById(id) {
  for (var i = 0; i < HOP_PROFILES.length; i++) {
    if (HOP_PROFILES[i].id === id) return HOP_PROFILES[i];
  }
  return null;
}

// Export pour les tests Node (ignoré silencieusement dans le navigateur)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FERMENTATION_TYPES: FERMENTATION_TYPES,
    MALT_TYPES: MALT_TYPES,
    HOP_PROFILES: HOP_PROFILES,
    FLAVOR_TAGS: FLAVOR_TAGS,
    ORIGINS: ORIGINS,
    BEER_STYLES: BEER_STYLES,
    computeBestMatch: computeBestMatch,
    getMaltById: getMaltById,
    getFermentationById: getFermentationById,
    getHopProfileById: getHopProfileById,
    getOriginById: getOriginById
  };
}
