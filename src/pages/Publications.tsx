
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export interface PressArticle {
  id: string;
  media: string;
  title: string;
  url: string;
  date?: string;
  excerpt?: string;
  image?: string;
}

export const pressArticles: PressArticle[] = [
  {
    id: "1",
    media: "La Nouvelle Sam",
    title: "OneBlaze en #8 questions",
    url: "https://www.lanouvellesam.com/2017/10/03/8-oneblaze-musique-cest-lunivers-dun-jeune-monte-business-croit-reves/",
    date: "03/10/2017",
    excerpt: "La musique, c'est l'univers d'un jeune qui monte en business et qui croit en ses rêves. À 23 ans, Mathis OneBlaze fait partie de la génération musicale qui innove dans le style et les sonorités. Héritier du gwoka, OneBlaze allie les rythmes et propose une musique authentique et expérimentale.",
    image: "https://www.lanouvellesam.com/wp-content/uploads/2017/10/OneBlaze-La-Nouvelle-Sam.jpg"
  },
  {
    id: "2",
    media: "Le Parisien",
    title: "OneBlaze & White Line en concert",
    url: "https://www.leparisien.fr/val-de-marne-94/val-de-marne-coup-de-projecteur-sur-les-musiques-actuelles-18-03-2018-7615086.php",
    date: "18/03/2018",
    excerpt: "Coup de projecteur sur les musiques actuelles dans le Val-de-Marne. Le festival « On monte le son » se tient toute la semaine dans les conservatoires du territoire Grand Paris Sud-Est Avenir.",
    image: "https://www.leparisien.fr/resizer/Yh_qSKAKW8kW8Rl8JYdQJ0J3Dj0=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/XJQZJ6ICWFAQFAQFAFQAFQAFQA.jpg"
  },
  {
    id: "3",
    media: "NRJ Antilles",
    title: "OneBlaze – Lannwit",
    url: "https://nrjantilles.com/oneblaze-lannwit/",
    date: "2017",
    excerpt: "OneBlaze nous présente son nouveau single 'Lannwit'. Prod : CiD On The Track. Recorded at : OneBomb Records.",
    image: "/Cover Art/MAGNUM 2/Magnum-2-Cover.jpg"
  },
  {
    id: "4",
    media: "NRJ Antilles",
    title: "OneBlaze – MUSE",
    url: "https://nrjantilles.com/oneblaze-muse/",
    date: "2018",
    excerpt: "Découvrez 'MUSE', le nouveau titre d'OneBlaze, un morceau qui explore les thématiques de l'inspiration et de la création artistique.",
    image: "/Cover Art/MAGNUM 2/Magnum-2-Photo-1.jpeg"
  },
  {
    id: "5",
    media: "Ville de Créteil",
    title: "Concert Créteil en scène, White Line / One Blaze",
    url: "https://www.ville-creteil.fr/concert-creteil-en-scene-white-line-one-blaze",
    date: "2018",
    excerpt: "La scène locale à l'honneur avec White Line et One Blaze"
  },
  {
    id: "6",
    media: "Ville de Créteil",
    title: "Concert Créteil en scène : Macobo Trio / Watchers",
    url: "https://www.ville-creteil.fr/concert-creteil-en-scene-macobo-trio-jazz-watchers-rock",
    date: "2017",
    excerpt: "Macobo Trio et Watchers se produisent à Créteil"
  },
  {
    id: "7",
    media: "Citoyens.com",
    title: "Macobo Trio et OneBlaze en concert",
    url: "https://94.citoyens.com/evenement/macobo-trio-oneblaze-concert-a-creteil",
    date: "2017",
    excerpt: "Un concert qui mêle jazz et hip-hop avec Macobo Trio et OneBlaze"
  },
  {
    id: "8",
    media: "ByNight.com",
    title: "Le Bando Chic",
    url: "https://by-night.fr/paris/soiree/le-bando-chic-zwap-the-world-premiere--484149",
    date: "2017",
    excerpt: "Soirée Le Bando Chic - ZWAP THE WORLD Première"
  },
  {
    id: "9",
    media: "WeezEvent.com",
    title: "HEY BONY, ONEBLAZE MATHIS, THELOVE PRÉSENTENT ZWAP THE WORLD",
    url: "https://www.weezevent.com/hey-bony-oneblaze-mathis-thelove-presentent-zwap-the-world-2",
    date: "2017",
    excerpt: "Un événement qui réunit plusieurs artistes autour du concept ZWAP THE WORLD"
  }
];

interface PublicationItem {
  id: string;
  title: string;
  type: 'livre' | 'article' | 'video';
  date: string;
  description: string;
  image?: string;
  url?: string;
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
    image: "/Cover Art/Teddy Blaze/00-Cover-TEDDYBLAZE-1200x1200.jpg"
  }
];

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
  category?: 'clip' | 'trousseau';
}

// Clips officiels - À compléter avec les vrais clips musicaux
const youtubeVideos: YouTubeVideo[] = [
  {
    id: "X8WA2vuBvFM",
    title: "Le Trousseau - Introduction au concept",
    description: "Présentation du concept derrière le livre Le Trousseau et de la philosophie qui l'anime.",
    thumbnail: "https://img.youtube.com/vi/X8WA2vuBvFM/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=X8WA2vuBvFM",
    date: "2023",
    category: 'trousseau'
  },
  {
    id: "kLW3jNXQ2yQ",
    title: "Le Trousseau - Chapitre 1: Les clés du savoir",
    description: "Exploration du premier chapitre du Trousseau sur l'importance de l'apprentissage autodidacte.",
    thumbnail: "https://img.youtube.com/vi/kLW3jNXQ2yQ/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=kLW3jNXQ2yQ",
    date: "2023",
    category: 'trousseau'
  },
  {
    id: "RzF5Mxjd7LM",
    title: "Le Trousseau - Chapitre 2: La clé de la persévérance",
    description: "Discussion autour du deuxième chapitre du Trousseau sur la constance dans l'effort créatif.",
    thumbnail: "https://img.youtube.com/vi/RzF5Mxjd7LM/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=RzF5Mxjd7LM",
    date: "2023",
    category: 'trousseau'
  }
];

const Publications = () => {
  const [activeTab, setActiveTab] = useState("livres");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if URL has a tab parameter and set active tab accordingly
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ["livres", "articles", "clips", "letrousseau"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/publications?tab=${value}`, { replace: true });
  };
  
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Médias</h1>
              <p className="text-lg mb-4 text-muted-foreground">
                Publications, articles de presse et contenu éducatif
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-16 mb-4 md:mb-0"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="bg-evrgrn-muted border border-evrgrn-accent/10 w-full flex justify-start overflow-x-auto">
              <TabsTrigger value="livres">Livres</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="clips">Clips</TabsTrigger>
              <TabsTrigger value="letrousseau">Le Trousseau</TabsTrigger>
            </TabsList>
            
            <TabsContent value="livres" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publications
                  .filter(pub => pub.type === 'livre')
                  .map(publication => (
                    <PublicationCard key={publication.id} publication={publication} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="articles" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publications
                  .filter(pub => pub.type === 'article')
                  .map(publication => (
                    <PublicationCard key={publication.id} publication={publication} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="clips" className="mt-8">
              <div>
                <h2 className="text-2xl font-serif mb-6">Clips vidéo</h2>
                
                {/* Featured video section */}
                <div className="mb-8">
                  <div className="bg-evrgrn-muted rounded-lg overflow-hidden">
                    <div className="aspect-video w-full">
                      <iframe 
                        src="https://www.youtube.com/embed/4sCd4DrxTTc" 
                        title="YouTube Video Player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>
                
                {/* Video grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {youtubeVideos
                    .filter(video => video.category === 'clip')
                    .map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))
                  }
                </div>
                
                {/* Link to full channel */}
                <div className="mt-8 text-center">
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-evrgrn-accent/50 hover:bg-evrgrn-accent hover:text-black"
                  >
                    <a 
                      href="https://www.youtube.com/channel/UCbKQr2lFR9C5jdf7gUDLfhQ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Voir toutes les vidéos
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="letrousseau" className="mt-8">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h2 className="text-2xl font-serif mb-4">Le Trousseau</h2>
                    <p className="text-muted-foreground mb-4">
                      "Le Trousseau" est un livre qui rassemble les réflexions et l'expérience de Mathis OneBlaze sur l'indépendance artistique, l'authenticité créative et le développement d'un univers propre.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Conçu comme un recueil de clés pour les artistes indépendants, cet ouvrage partage des principes et méthodes éprouvés pour naviguer dans le monde de la création sans compromis.
                    </p>
                    <Button asChild className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                      <Link to="/publications?tab=livres">Découvrir le livre</Link>
                    </Button>
                  </div>
                  <div>
                    <img 
                      src="/livres/LE TROUSSEAU cover.jpg" 
                      alt="Le Trousseau" 
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mb-6">Vidéos sur le concept</h3>
                
                {/* Video grid for Trousseau videos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {youtubeVideos
                    .filter(video => video.category === 'trousseau')
                    .map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))
                  }
                </div>
                
                <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-medium mb-4">À propos de la série</h3>
                  <p className="text-muted-foreground">
                    Cette série de vidéos explore en profondeur les concepts présentés dans "Le Trousseau". Chaque vidéo se concentre sur un chapitre ou un aspect particulier du livre, offrant des explications complémentaires, des exemples concrets et des applications pratiques des principes discutés. L'objectif est d'enrichir l'expérience de lecture et d'offrir un format audiovisuel qui permet d'approfondir les idées introduites dans l'ouvrage.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface PressCardProps {
  article: PressArticle;
}

const PressCard: React.FC<PressCardProps> = ({ article }) => {
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300 flex flex-col group"
    >
      {article.image && (
        <div className="relative aspect-video bg-evrgrn-darker overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-sm text-evrgrn-accent mb-2">{article.media}</div>
        <h3 className="font-medium text-lg mb-3">{article.title}</h3>
        
        {article.excerpt && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
        )}
        
        <div className="mt-auto flex justify-between items-center">
          <div className="text-xs text-muted-foreground">{article.date}</div>
          <ArrowUpRight className="w-4 h-4 text-evrgrn-accent" />
        </div>
      </div>
    </a>
  );
};

interface PublicationCardProps {
  publication: PublicationItem;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (publication.type === "article" || publication.type === "livre") {
      navigate(`/publication/${publication.id}`);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-video bg-evrgrn-darker">
        <img
          src={publication.image || "/placeholder.svg"}
          alt={publication.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-2 right-2 bg-evrgrn-darker px-2 py-1 text-xs font-medium rounded-md text-evrgrn-accent">
          {publication.type === 'livre' && 'Livre'}
          {publication.type === 'article' && 'Article'}
          {publication.type === 'video' && 'Vidéo'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-sm text-evrgrn-accent mb-1">{publication.date}</div>
        <h3 className="font-medium text-lg mb-3">{publication.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{publication.description}</p>
        
        {publication.url ? (
          <Button 
            className="w-full bg-evrgrn-darker hover:bg-evrgrn-accent hover:text-black transition-colors"
            onClick={() => window.open(publication.url, '_blank')}
          >
            Consulter
          </Button>
        ) : (
          <Button 
            className="w-full bg-evrgrn-darker hover:bg-evrgrn-accent hover:text-black transition-colors"
            asChild
          >
            <Link to={`/publication/${publication.id}`}>En savoir plus</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: YouTubeVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300">
      <a 
        href={video.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block relative aspect-video"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-evrgrn-accent/80 flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path d="M8 5.14v14l11-7-11-7z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </a>
      
      <div className="p-6">
        <div className="text-sm text-evrgrn-accent mb-1">{video.date}</div>
        <h3 className="font-medium text-lg mb-3">{video.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{video.description}</p>
        
        <Button 
          asChild
          className="w-full bg-evrgrn-darker hover:bg-evrgrn-accent hover:text-black transition-colors"
        >
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            Regarder
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Publications;
