
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface PressArticle {
  id: string;
  media: string;
  title: string;
  url: string;
  date?: string;
  excerpt?: string;
  image?: string;
}

const pressArticles: PressArticle[] = [
  {
    id: "1",
    media: "La Nouvelle Sam",
    title: "OneBlaze en #8 questions",
    url: "https://www.lanouvellesam.com/2017/10/03/8-oneblaze-musique-cest-lunivers-dun-jeune-monte-business-croit-reves/",
    date: "03/10/2017",
    excerpt: "La musique, c'est l'univers d'un jeune qui monte en business et qui croit en ses rêves."
  },
  {
    id: "2",
    media: "Le Parisien",
    title: "OneBlaze & White Line en concert",
    url: "https://www.leparisien.fr/val-de-marne-94/val-de-marne-coup-de-projecteur-sur-les-musiques-actuelles-18-03-2018-7615086.php",
    date: "18/03/2018",
    excerpt: "Coup de projecteur sur les musiques actuelles dans le Val-de-Marne"
  },
  {
    id: "3",
    media: "NRJ",
    title: "OneBlaze – Lannwit",
    url: "https://nrjantilles.com/oneblaze-lannwit/",
    date: "2017",
    excerpt: "OneBlaze nous présente son nouveau single 'Lannwit'"
  },
  {
    id: "4",
    media: "NRJ",
    title: "OneBlaze – MUSE",
    url: "https://nrjantilles.com/oneblaze-muse/",
    date: "2018",
    excerpt: "Découvrez 'MUSE', le nouveau titre d'OneBlaze"
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
    id: "comprendre-flow-rap",
    title: "Comprendre le flow en rap - Théorie et application",
    type: "article",
    date: "2021",
    description: "Une analyse technique et pratique du flow en rap, avec des exercices et des exemples concrets.",
    image: "/placeholder.svg"
  },
  {
    id: "production-minimaliste",
    title: "Production musicale: l'approche minimaliste",
    type: "video",
    date: "2022",
    description: "Tutoriel vidéo sur l'art de créer un impact maximal avec un minimum d'éléments dans la production musicale.",
    image: "/placeholder.svg",
    url: "https://youtube.com/example"
  },
  {
    id: "top-50-france-2023",
    title: "#1 Single du TOP 50 France - 2023",
    type: "article",
    date: "2023",
    description: "Analyse des singles ayant atteint la première place du TOP 50 en France en 2023.",
    image: "/placeholder.svg",
    url: "/top-50-france-2023"
  },
  {
    id: "top-50-france-2024",
    title: "#1 Single du TOP 50 France - 2024",
    type: "article",
    date: "2024",
    description: "Analyse des singles ayant atteint la première place du TOP 50 en France en 2024.",
    image: "/placeholder.svg",
    url: "/top-50-france-2024"
  }
];

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
}

const youtubeVideos: YouTubeVideo[] = [
  {
    id: "4sCd4DrxTTc",
    title: "Mathis OneBlaze - AK47 (Prod by Mathis Oneblaze)",
    description: "Clip officiel du titre AK47, produit par Mathis OneBlaze.",
    thumbnail: "https://img.youtube.com/vi/4sCd4DrxTTc/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=4sCd4DrxTTc",
    date: "2022"
  },
  {
    id: "dZeE5Dh0mVk",
    title: "Mathis Oneblaze - STBB 762 (How deep is your funk)",
    description: "Participation au Smokers Text Beat Battle (STBB) 762.",
    thumbnail: "https://img.youtube.com/vi/dZeE5Dh0mVk/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=dZeE5Dh0mVk",
    date: "2022"
  },
  {
    id: "O2Vba1EwxzU",
    title: "LES ALÉAS DU COSMOS - Mathis OneBlaze - Divertimento pour voix & piano",
    description: "Performance vocale et pianistique sur le thème des aléas du cosmos.",
    thumbnail: "https://img.youtube.com/vi/O2Vba1EwxzU/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=O2Vba1EwxzU",
    date: "2022"
  },
  {
    id: "h0ELPmCKV0U",
    title: "Comment j'ai créé White Line ?",
    description: "Découvrez l'histoire derrière la création du projet White Line.",
    thumbnail: "https://img.youtube.com/vi/h0ELPmCKV0U/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=h0ELPmCKV0U",
    date: "2020"
  },
  {
    id: "i7YP8l6-2rE",
    title: "ONEBLAZE - PSYCHORAMA / CLAP BACK (LIVE)",
    description: "Performance live des titres PSYCHORAMA et CLAP BACK.",
    thumbnail: "https://img.youtube.com/vi/i7YP8l6-2rE/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=i7YP8l6-2rE",
    date: "2020"
  },
  {
    id: "HiFo0QRUkjA",
    title: "ONEBLAZE - MUSE (CLIP OFFICIEL)",
    description: "Clip officiel du titre MUSE de OneBlaze.",
    thumbnail: "https://img.youtube.com/vi/HiFo0QRUkjA/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=HiFo0QRUkjA",
    date: "2018"
  }
];

const Publications = () => {
  const [activeTab, setActiveTab] = useState("presse");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if URL has a tab parameter and set active tab accordingly
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ["presse", "livres", "articles", "videos"].includes(tabParam)) {
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
              <TabsTrigger value="presse">Presse</TabsTrigger>
              <TabsTrigger value="livres">Livres</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="presse" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressArticles.map(article => (
                  <PressCard key={article.id} article={article} />
                ))}
              </div>
            </TabsContent>
            
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
            
            <TabsContent value="videos" className="mt-8">
              <div>
                <h2 className="text-2xl font-serif mb-6">Chaîne YouTube</h2>
                
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
                  {youtubeVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
                
                {/* Link to full channel */}
                <div className="mt-8 text-center">
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-evrgrn-accent/50 hover:bg-evrgrn-accent hover:text-black"
                  >
                    <a 
                      href="https://www.youtube.com/playlist?list=PLFDJzERePP0FhZolqb1dBHflCxifjD7s9" 
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
      className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex-1">
        <div className="text-sm text-evrgrn-accent mb-2">{article.media}</div>
        <h3 className="font-medium text-lg mb-3">{article.title}</h3>
        
        {article.excerpt && (
          <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
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
  return (
    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300">
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
