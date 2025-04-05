
export interface Album {
  id: string;
  title: string;
  year: string;
  month?: string;
  collaborators?: string;
  collection?: string;
  isUnreleased?: boolean;
  image?: string;
  spotifyLink?: string;
  format?: string;
  description?: string;
  credits?: string;
  visualConcept?: string;
  musicCharacteristics?: {
    calmDancing: number; // 0 = calm, 100 = dancing
    engagedSilly: number; // 0 = engaged, 100 = silly
    realityFiction: number; // 0 = reality, 100 = fiction
  };
}

const albumData: Album[] = [
  {
    id: "vrnca-patch-1-2-exe",
    title: "VRNCA Patch 1.2.exe",
    year: "2024",
    image: "/lovable-uploads/ab3f2594-f0b8-44d7-a839-d3a957a32f1b.png",
    spotifyLink: "https://open.spotify.com/album/vrnca-patch-1.2-exe",
    format: "18 titres – 42 min 31 s",
    description: "Cette mise à jour tant attendue du programme VRNCA complète l'album VRNCA.exe de 2022. Cette version dévoile la totalité du code et permet de comprendre pleinement le message de lutte contre la censure et le shadow ban, évoquant avec force la captivité et la libération symbolique que représente cette œuvre.",
    credits: "Principalement composé par Sedjro Wesker. Interventions et mixage par Mathis OneBlaze. Collaborations avec Kaix, M'Rick, Oni'Boi, Shun, Sedjro Wesker (aussi au micro), Swan21Corazon (co-production et rap sur « FRMNG Simulator 2023 »), Realsam et Run JA Boss K.A.",
    visualConcept: "Le programme VRNCA est personnifié avec un visage humain conçu à partir de la propre image de Mathis et retravaillé par intelligence artificielle pour donner une identité visuelle vivante et expressive à cette entité numérique.",
    musicCharacteristics: {
      calmDancing: 65,
      engagedSilly: 30,
      realityFiction: 80
    }
  },
  {
    id: "evil-blazy-vilain-teddy",
    title: "Evil Blazy Vilain Teddy",
    year: "2022",
    month: "10",
    collaborators: "SEDJRO WESKER & USLE BELMONDO",
    image: "/lovable-uploads/11a5dd84-152b-4cfb-bbeb-d8ebfc14afc3.png",
    spotifyLink: "https://open.spotify.com/album/evil-blazy-vilain-teddy",
    format: "10 titres",
    description: "Cet album s'inscrit dans le Teddy Verse et explore la dualité fascinante du personnage 'Teddy Blaze' se transformant en 'Vilain Teddy'. L'atmosphère sombre et introspective de ce projet illustre la symbolique de la libération intérieure et la confrontation avec ses propres démons.",
    credits: "Productions signées par Sedjro Wesker et Usle Belmondo, offrant une toile sonore parfaite pour cette métamorphose narrative.",
    visualConcept: "L'aspect narratif et visuel accompagne la transformation de l'alter ego dans un univers trap conceptuel, où chaque morceau révèle une nouvelle facette de cette dualité.",
    musicCharacteristics: {
      calmDancing: 75,
      engagedSilly: 45,
      realityFiction: 70
    }
  },
  {
    id: "vrnca-exe",
    title: "VRNCA.exe",
    year: "2022",
    month: "05",
    collaborators: "SEDJRO WESKER",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/vrnca-exe",
    format: "8 titres",
    description: "Cet album fondateur a été créé pour combattre la censure et le shadow ban qui affectent de nombreux artistes indépendants. VRNCA y agit comme un guide numérique et un ange gardien, illustrant la première incursion dans cet univers narratif où technologie et humanité s'entremêlent.",
    credits: "Collaboration majeure avec le beatmaker Sedjro Wesker, dont l'approche novatrice a permis de donner vie à cette entité numérique à travers des sonorités avant-gardistes.",
    visualConcept: "VRNCA incarne l'idée de franchir les barrières technologiques et d'instaurer un dialogue profond entre l'émotion humaine et la froideur algorithmique, créant ainsi un pont entre deux mondes apparemment opposés.",
    musicCharacteristics: {
      calmDancing: 60,
      engagedSilly: 40,
      realityFiction: 85
    }
  },
  {
    id: "trap-teddy-2",
    title: "Trap Teddy 2",
    year: "2021",
    month: "07",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/trap-teddy-2",
    format: "10 titres",
    description: "Ce second opus poursuit l'aventure de l'alter ego 'Teddy' dans un univers trap aux influences caribéennes distinctives. L'album affine considérablement le style et la production par rapport à son prédécesseur, marquant une évolution significative dans la maîtrise artistique.",
    credits: "Continuité créative avec les producteurs et collaborateurs du premier Trap Teddy, enrichie par de nouvelles approches sonores et techniques.",
    visualConcept: "L'évolution stylistique présentée dans cet album ouvre la voie au Teddy Verse, posant les jalons narratifs qui seront explorés dans les projets ultérieurs de cette série conceptuelle.",
    musicCharacteristics: {
      calmDancing: 85,
      engagedSilly: 60,
      realityFiction: 50
    }
  },
  {
    id: "trap-teddy",
    title: "Trap Teddy",
    year: "2020",
    month: "07",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/trap-teddy",
    format: "10 titres",
    description: "Cet album introduit le personnage de 'Teddy' et pose les fondations de l'univers musical qui deviendra plus tard le Teddy Verse. Une fusion unique entre influences caribéennes authentiques et sonorités trap contemporaines y crée un langage musical distinctif.",
    credits: "Les premiers collaborateurs qui ont contribué à façonner cet univers naissant, accompagnés du soutien visuel apporté par les visualizers sur certains titres emblématiques.",
    visualConcept: "L'impact visuel et l'esprit innovant de ce projet ont permis de définir l'identité musicale distinctive de Trap Teddy, mêlant tradition et modernité dans une expression artistique sincère.",
    musicCharacteristics: {
      calmDancing: 80,
      engagedSilly: 55,
      realityFiction: 45
    }
  },
  {
    id: "teddyblaze",
    title: "#TeddyBlaze",
    year: "2018",
    month: "06",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/teddyblaze",
    format: "8 titres",
    description: "Aux origines du concept 'Teddy' qui sera développé dans les projets futurs, cet album introductif esquisse les premières lignes d'un univers narratif riche. Chaque morceau constitue une exploration brute et authentique des thématiques qui deviendront centrales dans l'œuvre artistique.",
    credits: "Premier pas créatif ayant établi les bases d'une direction artistique singulière, avec des compositions et arrangements qui ont marqué le début d'une aventure musicale unique.",
    visualConcept: "La nature précurseure et l'authenticité brute de ce projet révèlent déjà la vision artistique distinctive qui caractérisera l'ensemble de l'univers Teddy dans les années suivantes.",
    musicCharacteristics: {
      calmDancing: 70,
      engagedSilly: 50,
      realityFiction: 40
    }
  },
  {
    id: "l-avenue",
    title: "L'Avenue",
    year: "2018",
    month: "05",
    collaborators: "itsFkingTrack**",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/l-avenue",
    format: "8 titres",
    description: "Cette collaboration marquante avec itsFkingTrack** explore des territoires sonores inédits tout en apportant une ambiance unique à l'univers musical. Chaque morceau dévoile une facette différente du talent des artistes réunis dans ce projet commun.",
    credits: "En collaboration étroite avec itsFkingTrack**, dont l'apport créatif a permis d'élargir les horizons musicaux et d'enrichir la palette expressive.",
    visualConcept: "La direction artistique distincte de cet album joue un rôle déterminant dans l'évolution musicale, apportant une nouvelle dimension à l'expression créative et ouvrant de nouvelles perspectives.",
    musicCharacteristics: {
      calmDancing: 65,
      engagedSilly: 45,
      realityFiction: 55
    }
  },
  {
    id: "letters-on-fallen-fall-leaves",
    title: "Letters on Fallen Fall Leaves",
    year: "2016",
    month: "11",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/letters-on-fallen-fall-leaves",
    format: "11 titres",
    description: "Un voyage introspectif aux tonalités poétiques, où chaque morceau évoque la fragilité et la beauté des émotions humaines, tel un courrier intime écrit sur des feuilles d'automne tombées. L'album invite à contempler le cycle naturel des sentiments et des saisons intérieures.",
    credits: "Une approche personnelle et sensible caractérise cet album, dont la production et la composition reflètent la démarche méditative et contemplative qui a guidé sa création.",
    visualConcept: "La métaphore visuelle des feuilles tombées et l'atmosphère intimiste de l'œuvre traduisent parfaitement le processus de lâcher-prise et de transformation qui se déploie tout au long de ce voyage musical automnal.",
    musicCharacteristics: {
      calmDancing: 30,
      engagedSilly: 75,
      realityFiction: 60
    }
  },
  {
    id: "magnum-2",
    title: "Magnum 2 (Œuvre au Blanc)",
    year: "2016",
    month: "04",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/magnum-2",
    format: "15 titres",
    description: "Deuxième volet d'une trilogie alchimique, symbolisant la phase de purification (l'œuvre au blanc) après les ténèbres. Ces 15 morceaux explorent la transformation personnelle et spirituelle, incarnant la recherche de clarté et de lumière après l'obscurité du premier opus.",
    credits: "Une constellation de collaborateurs a contribué à façonner cette œuvre conceptuelle, chacun apportant sa pierre à l'édifice alchimique en construction.",
    visualConcept: "La dimension alchimique et la quête de lumière après l'obscurité illustrent parfaitement le cheminement artistique entrepris, où chaque note participe à la transmutation de l'être et de l'expression créative.",
    musicCharacteristics: {
      calmDancing: 40,
      engagedSilly: 70,
      realityFiction: 65
    }
  },
  {
    id: "magnum-oeuvre-au-noir",
    title: "MAGNUM (Œuvre au Noir)",
    year: "2015",
    month: "09",
    image: "/placeholder.svg",
    spotifyLink: "https://open.spotify.com/album/magnum-oeuvre-au-noir",
    format: "Album",
    description: "Premier volet de la trilogie alchimique, marqué par la décomposition et la confrontation aux ténèbres (nigredo). Cet album fondateur établit les bases du concept de transformation artistique et personnelle qui traversera l'ensemble de l'œuvre à venir.",
    credits: "Les premières influences et collaborations qui ont fait de cet album une pierre angulaire de l'univers musical, posant les jalons d'un parcours créatif unique.",
    visualConcept: "Le symbolisme de l'œuvre au noir comme étape essentielle avant toute renaissance transparaît dans chaque aspect de ce projet, illustrant la nécessité de traverser l'obscurité pour atteindre la lumière.",
    musicCharacteristics: {
      calmDancing: 35,
      engagedSilly: 80,
      realityFiction: 70
    }
  },
  {
    id: "4",
    title: "Maëlstrom",
    year: "2024",
    collaborators: "LeTrom Beats",
    isUnreleased: true,
    image: "/placeholder.svg",
    musicCharacteristics: {
      calmDancing: 60,
      engagedSilly: 35,
      realityFiction: 75
    }
  }
];

export default albumData;
