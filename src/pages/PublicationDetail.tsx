import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { marked } from "marked";

interface PublicationItem {
  id: string;
  title: string;
  type: "livre" | "article" | "video";
  date: string;
  description: string;
  image?: string;
  fullContent?: string;
}

const publications: PublicationItem[] = [
  {
    id: "le-trousseau",
    title: "Le Trousseau",
    type: "livre",
    date: "2023",
    description: "Un recueil de réflexions sur l'indépendance artistique et les clés pour développer son propre univers créatif.",
    image: "/livres/LE TROUSSEAU cover.jpg"
  },
  {
    id: "manifesto",
    title: "mănĭfesto",
    type: "livre",
    date: "2022",
    description: "Un manifeste pour une nouvelle approche de la création musicale indépendante.",
    image: "/livres/mănĭfesto.png"
  },
  {
    id: "teddyverse",
    title: "Le Teddyverse : Un univers narratif en expansion",
    type: "article",
    date: "2024",
    description: "Plongée dans l'univers Teddy, une saga musicale qui débute avec #TeddyBlaze en 2018 et se développe à travers Trap Teddy et Trap Teddy 2. Cette série conceptuelle fusionne influences caribéennes authentiques et sonorités trap contemporaines, créant un langage musical distinctif. De l'introduction brute du concept jusqu'à l'affinage stylistique du second opus, le Teddyverse pose les jalons narratifs d'un univers riche qui sera exploré dans les projets ultérieurs, notamment Evil Blazy Vilain Teddy qui révèle la dualité fascinante du personnage.",
    image: "/Cover Art/Teddy Blaze/00-Cover-TEDDYBLAZE-1200x1200.jpg",
    fullContent: `
# Le Teddyverse : Un univers narratif en expansion

## Genèse d'un univers

Le Teddyverse naît en 2018 avec **#TeddyBlaze**, projet fondateur qui esquisse les premières lignes d'un univers narratif complexe et riche. Cet album introductif pose les bases d'une exploration musicale qui mêle authenticité caribéenne et modernité urbaine.

## L'évolution sonore

### Trap Teddy (2020)
Premier chapitre de l'expansion de l'univers Teddy, **Trap Teddy** introduit le personnage de 'Teddy' et crée une fusion unique entre influences caribéennes authentiques et sonorités trap contemporaines. Ce projet marque l'émergence d'un langage musical distinctif, où tradition et modernité se rencontrent dans une expression artistique sincère.

Les productions de cet album établissent un équilibre entre chaleur caribéenne et froideur trap, créant une atmosphère particulière qui deviendra la signature de l'univers Teddy.

### Trap Teddy 2 (2021)
Le second opus poursuit l'aventure dans un univers trap aux influences caribéennes distinctives. **Trap Teddy 2** affine considérablement le style et la production par rapport à son prédécesseur, marquant une évolution significative dans la maîtrise artistique.

Ce projet ouvre la voie au développement narratif ultérieur, posant les jalons qui seront explorés dans les chapitres suivants de cette série conceptuelle.

## La dualité révélée

### Evil Blazy Vilain Teddy (2022)
Ce projet explore la **dualité fascinante** du personnage 'Teddy Blaze' se transformant en 'Vilain Teddy'. L'atmosphère sombre et introspective illustre la symbolique de la libération intérieure et la confrontation avec ses propres démons.

Les productions signées par **Sedjro Wesker** et **Usle Belmondo** offrent une toile sonore parfaite pour cette métamorphose narrative, où chaque morceau révèle une nouvelle facette de cette dualité.

## Un langage musical distinctif

Le Teddyverse se caractérise par :

- **Fusion culturelle** : Rencontre entre traditions caribéennes (Guadeloupe, Martinique) et modernité trap
- **Narration conceptuelle** : Chaque projet développe une facette de l'univers et du personnage
- **Évolution stylistique** : Du brut au raffiné, une progression constante dans la maîtrise artistique
- **Authenticité** : Une expression sincère qui refuse les compromis commerciaux

## L'héritage et le futur

Le Teddyverse continue d'évoluer, chaque nouveau projet ajoutant une couche supplémentaire à cet univers narratif. Cette saga musicale représente une exploration continue de l'identité, de la dualité humaine et du métissage culturel à travers le prisme de la musique urbaine contemporaine.

Les racines caribéennes de l'artiste irriguent chaque production, créant un son immédiatement reconnaissable qui transcende les frontières géographiques et stylistiques.

---

*Le Teddyverse est plus qu'une série d'albums : c'est un univers vivant, en constante expansion, où chaque projet musical contribue à une narration plus large sur l'identité, la culture et l'authenticité artistique.*
    `
  }
];

const PublicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const publication = publications.find(p => p.id === id);
  
  if (!publication) {
    return (
      <div className="min-h-screen bg-evrgrn-darker text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Publication non trouvée</h1>
          <Button onClick={() => navigate('/publications')}>
            Retour aux publications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-evrgrn-darker text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/publications')}
          className="mb-8 hover:bg-evrgrn-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux publications
        </Button>
        
        <article className="max-w-4xl mx-auto">
          {publication.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={publication.image} 
                alt={publication.title}
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-evrgrn-accent text-sm uppercase tracking-wide">
                {publication.type}
              </span>
              <span className="text-muted-foreground text-sm">{publication.date}</span>
            </div>
            <h1 className="text-4xl font-serif mb-4">{publication.title}</h1>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-serif prose-h1:mb-6 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-evrgrn-accent prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-evrgrn-accent prose-strong:font-semibold prose-ul:text-muted-foreground prose-li:mb-2">
            {publication.fullContent ? (
              <div dangerouslySetInnerHTML={{ __html: marked(publication.fullContent) }} />
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                {publication.description}
              </p>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicationDetail;
