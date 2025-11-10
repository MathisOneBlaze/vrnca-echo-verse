
export interface Album {
  id: string;
  title: string;
  year: string;
  month?: string;
  collaborators?: string;
  collection?: string;
  isUnreleased?: boolean;
  image?: string;
  additionalImages?: string[];
  spotifyLink?: string;
  format?: string;
  description?: string;
  credits?: string;
  visualConcept?: string;
  visualCredits?: string; // Crédits graphiques (design, photo, artwork)
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
    image: "/Cover Art/VRNCA-PATCH 1.2.exe ;/COVER-VRNCA-1.2.exe3-1200x1200.jpeg",
    additionalImages: [],
    spotifyLink: "https://open.spotify.com/album/vrnca-patch-1.2-exe",
    format: "18 titres – 42 min 31 s",
    description: "Cette mise à jour tant attendue du programme VRNCA complète l'album VRNCA.exe de 2022. Cette version dévoile la totalité du code et permet de comprendre pleinement le message de lutte contre la censure et le shadow ban, évoquant avec force la captivité et la libération symbolique que représente cette œuvre.",
    credits: "Principalement composé par Sedjro Wesker. Interventions et mixage par Mathis OneBlaze. Collaborations avec Kaix, M'Rick, Oni'Boi, Shun, Sedjro Wesker (aussi au micro), Swan21Corazon (co-production et rap sur « FRMNG Simulator 2023 »), Realsam et Run JA Boss K.A.",
    visualConcept: "Le programme VRNCA est personnifié avec un visage humain conçu à partir de la propre image de Mathis et retravaillé par intelligence artificielle pour donner une identité visuelle vivante et expressive à cette entité numérique.",
    visualCredits: "Artwork généré par intelligence artificielle (VRNCA)",
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
    image: "/Cover Art/Evil Blazy Vilain Teddy/Evil-Blazy-Vilain-Teddy-Cover.jpg",
    additionalImages: [
      "/Cover Art/Evil Blazy Vilain Teddy/Evil-Blazy-Tracklist.jpg",
      "/Cover Art/Evil Blazy Vilain Teddy/Evil-Blazy-Comic.jpeg",
      "/Cover Art/Evil Blazy Vilain Teddy/Evil-Blazy-Alt-Cover.jpeg"
    ],
    spotifyLink: "https://open.spotify.com/album/evil-blazy-vilain-teddy",
    format: "10 titres",
    description: "Cet album s'inscrit dans le Teddy Verse et explore la dualité fascinante du personnage 'Teddy Blaze' se transformant en 'Vilain Teddy'. L'atmosphère sombre et introspective de ce projet illustre la symbolique de la libération intérieure et la confrontation avec ses propres démons. Ce chapitre narratif approfondit la psychologie du personnage, révélant les zones d'ombre et les contradictions qui habitent l'artiste. Les productions trap infusées de sonorités caraïbéennes créent un paysage sonore unique qui sert parfaitement cette exploration de la dualité humaine. Entre lumière et obscurité, entre Blazy et Vilain Teddy, l'album cartographie les différentes facettes d'une identité multiple et complexe.",
    credits: "Productions signées par Sedjro Wesker et Usle Belmondo, offrant une toile sonore parfaite pour cette métamorphose narrative. Ces producteurs apportent une dimension cinématographique et immersive qui amplifie la profondeur émotionnelle de chaque titre.",
    visualConcept: "L'aspect narratif et visuel accompagne la transformation de l'alter ego dans un univers trap conceptuel, où chaque morceau révèle une nouvelle facette de cette dualité. Les visuels de type comic book ajoutent une dimension graphique et narrative, transformant l'album en une véritable bande dessinée sonore. Les tracklists et covers alternatives enrichissent l'univers visuel du projet.",
    visualCredits: "Artwork et design par Mathis OneBlaze",
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
    image: "/Cover Art/VRNCA-exe-cover.jpg",
    additionalImages: [],
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
    image: "/Cover Art/TRAP TEDDY 2/00-COVER-Trap-Teddy-2-1200x1200.jpg",
    additionalImages: [
      "/Cover Art/TRAP TEDDY 2/Battle-Royal-BD-Comic.jpg",
      "/Cover Art/TRAP TEDDY 2/Bol-Toloman-BD-Comic.jpg"
    ],
    spotifyLink: "https://open.spotify.com/album/trap-teddy-2",
    format: "10 titres",
    description: "Ce second opus poursuit l'aventure de l'alter ego 'Teddy' dans un univers trap aux influences caraïbéennes distinctives. L'album affine considérablement le style et la production par rapport à son prédécesseur, marquant une évolution significative dans la maîtrise artistique. De LPLG à Macouba, 24h, 8h10 AM, Pas La, Metro Studio Bingo, Flex, Lésé Yo, The Way jusqu'à Ziyanm é Maniok ki rann nou bandé kon nou yé, les productions sont plus léchées, les mélodies plus recherchées, et la narration plus aboutie. Ce projet confirme la vision artistique unique du Teddy Verse, mêlant avec maestria les codes de la trap contemporaine et l'authenticité des sonorités antillaises, avec des featuring stratégiques qui enrichissent l'univers narratif.",
    credits: "Production: Mathis OneBlaze (LPLG avec Sedjro Wesker, Macouba, 8h10 AM, Pas La, Flex, Lésé Yo, The Way, Ziyanm é Maniok avec Neville Pelletier), JoBlowYourMind (24h avec OneBlaze), Hey Bony (Metro Studio Bingo avec OneBlaze, musiciens: Hey Bony & Neville Pelletier pour Ziyanm). Featuring: Neville Pelletier. Les productions bénéficient d'un travail de mixage et de mastering sophistiqué reflétant la maturation artistique du projet.",
    visualConcept: "L'évolution stylistique présentée dans cet album ouvre la voie au Teddy Verse, posant les jalons narratifs qui seront explorés dans les projets ultérieurs de cette série conceptuelle. Les visuels de type BD comics 'Battle Royal' et 'Bol Toloman' ajoutent une dimension graphique unique, transformant l'expérience musicale en aventure visuelle immersive.",
    visualCredits: "Artwork et design par YONN. Collaboration avec Laure A",
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
    image: "/Cover Art/TRAP TEDDY 1/01-MERCI-mp3-image-1200x1200.jpg",
    additionalImages: [
      "/Cover Art/TRAP TEDDY 1/Metro-Studio-Bingo-BD-Comic.jpg"
    ],
    spotifyLink: "https://open.spotify.com/album/trap-teddy",
    format: "10 titres",
    description: "Cet album introduit le personnage de 'Teddy' et pose les fondations de l'univers musical qui deviendra plus tard le Teddy Verse. Une fusion unique entre influences caraïbéennes authentiques et sonorités trap contemporaines y crée un langage musical distinctif. C'est le point de départ d'une saga qui s'étendra sur plusieurs projets, introduisant les thèmes, les sonorités et l'esthétique qui caractériseront tout l'univers Teddy. L'album capture l'énergie brute et l'authenticité d'un artiste qui refuse les compromis, osant mélanger gwoka, zouk et trap dans une alchimie sonore inédite. Des basses lourdes de la trap aux percussions caribbennes, chaque production témoigne d'un métissage culturel assumé et revendiqué.",
    credits: "Les premiers collaborateurs qui ont contribué à façonner cet univers naissant, accompagnés du soutien visuel apporté par les visualizers sur certains titres emblématiques. Productions variées capturant l'essence de cette fusion musicale innovante entre Caraïbes et Atlanta.",
    visualConcept: "L'impact visuel et l'esprit innovant de ce projet ont permis de définir l'identité musicale distinctive de Trap Teddy, mêlant tradition et modernité dans une expression artistique sincère. Le BD comic 'Metro Studio Bingo' ajoute une dimension narrative et graphique, ancrant le projet dans une esthétique visuelle forte et reconnaissable.",
    visualCredits: "Artwork et design par YONN",
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
    image: "/Cover Art/Teddy Blaze/00-Cover-TEDDYBLAZE-1200x1200.jpg",
    additionalImages: [
      "/Cover Art/Teddy Blaze/Avatar-Nounours.jpg"
    ],
    spotifyLink: "https://open.spotify.com/album/teddyblaze",
    format: "24 titres",
    description: "Aux origines du concept 'Teddy' qui sera développé dans les projets futurs, cet album introductif de 24 titres esquisse les premières lignes d'un univers narratif riche. De Shock It à Come F.W.I, Spend Some Time With You, Don't Talk, Et Si, Jetlag, Friends With Benefit, Aïe aïe aïe, Baw, Maky, An Avè-w, Trap (Bloqué), Peluche, Mouvement, Les Millis, Bijoux Young Kawaii, YK Tour Life, Vrai, J'ai la foi, 9h09 PM, Never Forget You, Nuit Blanche, Roue Libre jusqu'à F*ck Birthday, chaque morceau constitue une exploration brute et authentique des thématiques qui deviendront centrales dans l'œuvre artistique.",
    credits: "Production: Hey Bony (Shock It), Buzzy B (Come F.W.I, Maky), B-MAC (Spend Some Time With You), Cyril D'Alexis (Don't Talk, Et Si, Jetlag, Friends With Benefit), Mathis OneBlaze (Aïe aïe aïe avec Mystère & Jeremy Nanette), STA2F (Baw), Spacedtime (Trap, Peluche, Mouvement, YK Tour Life, Vrai, J'ai la foi, 9h09 PM), ThatBoySlim97 (Les Millis, Bijoux Young Kawaii), RayDaPrince (Never Forget You, Roue Libre), JoBlowYourMind (Nuit Blanche), HsvQue (F*ck Birthday).",
    visualConcept: "La nature précurseure et l'authenticité brute de ce projet révèlent déjà la vision artistique distinctive qui caractérisera l'ensemble de l'univers Teddy dans les années suivantes.",
    visualCredits: "Artwork et design par YONN",
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
    additionalImages: [],
    spotifyLink: "https://open.spotify.com/album/l-avenue",
    format: "6 titres",
    description: "Cette collaboration marquante avec itsFkingTrack** explore des territoires sonores inédits tout en apportant une ambiance unique à l'univers musical. Dream ouvre l'album avec des progressions harmoniques complexes, suivi d'Ours Polaire qui navigue entre mélancolie et espoir. Everyday poursuit avec des ambiances atmosphériques, tandis que Ma Rue ancre le projet dans une réalité urbaine. Cruisin' apporte une touche de légèreté avant que J'y Vais ne conclue ce voyage sonore. Chaque morceau dévoile une facette différente du talent des artistes réunis.",
    credits: "Production: itsFkingTrack (tous les titres). Featuring: Kizzy (choeurs sur Ours Polaire), Carbone (ad-libs sur Ma Rue). En collaboration étroite avec itsFkingTrack dont l'apport créatif a permis d'élargir les horizons musicaux et d'enrichir la palette expressive.",
    visualConcept: "La direction artistique distincte de cet album joue un rôle déterminant dans l'évolution musicale, apportant une nouvelle dimension à l'expression créative et ouvrant de nouvelles perspectives.",
    visualCredits: "Artwork et design par Mathis OneBlaze",
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
    image: "/Cover Art/LETTERS ON FALLEN FALL LEAVES/02-D-T-R-m4a-image-1200x1200.jpg",
    additionalImages: [],
    spotifyLink: "https://open.spotify.com/album/letters-on-fallen-fall-leaves",
    format: "11 titres",
    description: "Un voyage introspectif aux tonalités poétiques, où chaque morceau évoque la fragilité et la beauté des émotions humaines. De Letter On Fallen Fall Leaf à D.T.R, A2, TTC, Birds, She Calling, D.A.M.N, Come, Trojan, Après et Crooked Love, l'album constitue un courrier intime écrit sur des feuilles d'automne tombées, invitant à contempler le cycle naturel des sentiments et des saisons intérieures.",
    credits: "Production: Mathis OneBlaze avec RayDaPrince & Passi Fresh (Letter On Fallen Fall Leaf), Reevside (D.T.R, TTC, D.A.M.N), RayDaPrince (A2, Birds), Tommy On The Track (She Calling), Mathis OneBlaze (Come), itsFuckingTrack (Trojan), EMS (Crooked Love). Une approche personnelle et sensible reflétant la démarche méditative et contemplative de l'album.",
    visualConcept: "La métaphore visuelle des feuilles tombées et l'atmosphère intimiste de l'œuvre traduisent parfaitement le processus de lâcher-prise et de transformation qui se déploie tout au long de ce voyage musical automnal.",
    visualCredits: "Photographie par RZM. Direction artistique par Mathis OneBlaze",
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
    image: "/Cover Art/MAGNUM 2/Magnum-2-Cover.jpg",
    additionalImages: [
      "/Cover Art/MAGNUM 2/Magnum-2-Tracklist.jpg",
      "/Cover Art/MAGNUM 2/Magnum-2-Photo-1.jpeg"
    ],
    spotifyLink: "https://open.spotify.com/album/magnum-2",
    format: "15 titres",
    description: "Deuxième volet d'une trilogie alchimique, symbolisant la phase de purification (l'œuvre au blanc) après les ténèbres. Ces 15 morceaux explorent la transformation personnelle et spirituelle, incarnant la recherche de clarté et de lumière après l'obscurité du premier opus. L'album commence avec une intro d'Oliv'yah qui pose l'ambiance, puis traverse des territoires variés : d'Atlas qui cartographie l'âme, à Galère qui documente les luttes, de $€£ine qui questionne les valeurs matérielles à Mauvais Rêve qui explore les tourments nocturnes. Des morceaux comme Enfant des bois et Météorite apportent une dimension cosmique et terrestre, tandis que Douce France et Kréol ancrent l'œuvre dans une réalité culturelle et identitaire. Dreadloks, MUSE, Lannwit, Elle et Avant complètent ce voyage introspectif avant le Chapitre 2 qui conclut l'Œuvre au Blanc.",
    credits: "Production: TheBeatPlug & TazTaylor (Atlas), LeTrom Beats (Galère, Elle), itsFuckingTrack ($€£ine), CiD On The Track (Mauvais Rêve, Douce France, Kréol avec JoBlowYourMind), AlienBeats (Météorite), RayDaPrince & Tommy Beats (Enfant des Bois), Sadix Music (Dreadloks), Mathis OneBlaze (MUSE, Lannwit, Chapitre 2, co-prod Douce France), Darknown (Avant). Featuring: Oliv'yah (intro), CiD (Galère), Jao Kynx ($€£ine), DNGZ (Kréol). Enregistré à OneBomb Records.",
    visualConcept: "La dimension alchimique et la quête de lumière après l'obscurité illustrent parfaitement le cheminement artistique entrepris. Les visuels alternent entre séances photos intimistes et artwork conceptuel, chaque élément visuel participant à la transmutation de l'être et de l'expression créative.",
    visualCredits: "Artwork et design par Mathis OneBlaze",
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
    image: "/Cover Art/MAGNUM 1/01-Chapitre-1-_-OEuvre-au-Noir-mp3-image-1200x1200.jpg",
    additionalImages: [
      "/Cover Art/MAGNUM 1/Magnum-1-Photo.jpeg"
    ],
    spotifyLink: "https://open.spotify.com/album/magnum-oeuvre-au-noir",
    format: "15 titres",
    description: "Premier volet de la trilogie alchimique, marqué par la décomposition et la confrontation aux ténèbres (nigredo). Cet album fondateur établit les bases du concept de transformation artistique et personnelle qui traversera l'ensemble de l'œuvre à venir. De l'ouverture du Chapitre 1 à Schoolday, en passant par Bouteilles prt.2, Bien High, Ride, L'Envol, Flef, Los Santos, Wanderlust, l'Interlude Ka, Drivé, Dame, Jordaan Story, FUCK THAT jusqu'au final Magnum 5213, chaque titre représente une facette de cette descente nécessaire dans les ténèbres intérieures. Les collaborations avec Dirty One, Nemesis, CiD, Raizen, Ti-Raizen, Oliv'yah, NDX, JKay et Ema enrichissent cette fresque sonore qui explore les profondeurs de l'âme humaine.",
    credits: "Production: Mathis OneBlaze (Chapitre 1, Bouteilles prt.2, Bien High, Los Santos, Interlude Ka, Drivé, Magnum 5213), Sadix Music (Schoolday), CiD On The Track (Ride, Flef avec OneBlaze, Dame), LeTrom Beats (L'Envol), Chapo (Wanderlust), Timbaland & Swizz Beats (Jordaan Story). Featuring: Ema (Bouteilles prt.2, Ride, L'Envol, Interlude Ka), Dirty-One & Nemesis (Bien High), Raizen (Flef), Ti-Raizen (Los Santos), Oliv'yah & NDX (Wanderlust), JKay (Interlude Ka), CiD (Dame).",
    visualConcept: "Le symbolisme de l'œuvre au noir comme étape essentielle avant toute renaissance transparaît dans chaque aspect de ce projet. Les séances photos en studio capturent l'intensité et la gravité de cette phase de décomposition, illustrant la nécessité de traverser l'obscurité pour atteindre la lumière.",
    visualCredits: "Artwork et design par Mathis OneBlaze",
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
    image: "/Cover Art/MAELSTROM/Maelstrom-Cover.jpeg",
    additionalImages: [
      "/Cover Art/MAELSTROM/Maelstrom-Tracklist.jpeg"
    ],
    visualCredits: "Artwork et design par Mathis OneBlaze",
    musicCharacteristics: {
      calmDancing: 60,
      engagedSilly: 35,
      realityFiction: 75
    }
  }
];

export default albumData;
