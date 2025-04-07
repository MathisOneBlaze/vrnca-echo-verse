
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, ArrowUpRight } from 'lucide-react';
import albumData, { Album } from '../data/albumData';

const Music = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [filteredAlbums, setFilteredAlbums] = useState(albumData);
  const [activeTab, setActiveTab] = useState("all");

  // Filter albums based on search query and active tab
  const handleFilterAlbums = () => {
    let filtered = albumData.filter(album => 
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (album.collaborators && album.collaborators.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    if (activeTab === "EP") {
      filtered = filtered.filter(album => album.title.includes("EP"));
    } else if (activeTab === "teddy") {
      filtered = filtered.filter(album => album.title.toLowerCase().includes("teddy"));
    } else if (activeTab === "vrnca") {
      filtered = filtered.filter(album => album.title.toLowerCase().includes("vrnca"));
    } else if (activeTab === "collab") {
      filtered = filtered.filter(album => album.collaborators);
    } else if (activeTab === "magnum") {
      filtered = filtered.filter(album => album.title.toLowerCase().includes("magnum"));
    } else if (activeTab === "letters") {
      filtered = filtered.filter(album => album.title.toLowerCase().includes("letters"));
    }
    
    // Sort albums
    filtered.sort((a, b) => {
      if (sortOption === "date-desc") {
        return parseInt(b.year) - parseInt(a.year);
      } else if (sortOption === "date-asc") {
        return parseInt(a.year) - parseInt(b.year);
      } else if (sortOption === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
    
    setFilteredAlbums(filtered);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Effect to filter albums when search or sort options change
  useEffect(() => {
    handleFilterAlbums();
  }, [searchQuery, sortOption, activeTab]);

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Catalogue Musical</h1>
              <p className="text-lg mb-6 text-muted-foreground">
                Explorez l'ensemble des œuvres musicales d'EVRGRN Lab.
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-16 mb-4 md:mb-0"
            />
          </div>
          
          <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher un album ou artiste..."
                  className="w-full pl-10 pr-4 py-2 bg-evrgrn-dark border border-evrgrn-accent/20 rounded-md focus:outline-none focus:border-evrgrn-accent/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-40">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Plus récent</SelectItem>
                    <SelectItem value="date-asc">Plus ancien</SelectItem>
                    <SelectItem value="title-asc">A-Z</SelectItem>
                    <SelectItem value="title-desc">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="bg-evrgrn-muted border border-evrgrn-accent/10 w-full flex justify-start overflow-x-auto">
              <TabsTrigger value="all">Tous les projets</TabsTrigger>
              <TabsTrigger value="teddy">Teddy Blaze</TabsTrigger>
              <TabsTrigger value="vrnca">VRNCA</TabsTrigger>
              <TabsTrigger value="magnum">Magnum</TabsTrigger>
              <TabsTrigger value="letters">Letters</TabsTrigger>
              <TabsTrigger value="collab">Collaborations</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAlbums.map(album => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
              
              {filteredAlbums.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">Aucun album trouvé</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link to={`/album/${album.id}`} className="block">
      <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300 group h-full">
        <div className="relative aspect-square bg-evrgrn-darker">
          {album.image ? (
            <img
              src={album.image}
              alt={album.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Black rectangle placeholder instead of default placeholder
            <div className="w-full h-full bg-black flex items-center justify-center">
              <span className="text-evrgrn-accent/30 text-xs">Album art</span>
            </div>
          )}
          
          {album.isUnreleased && (
            <div className="absolute top-0 left-0 w-full bg-evrgrn-darker/80 text-xs font-medium text-evrgrn-accent py-1 text-center">
              À venir
            </div>
          )}
          
          {album.collaborators && (
            <div className="absolute bottom-0 left-0 w-full bg-evrgrn-darker/80 text-xs font-medium text-foreground py-1 px-2">
              avec {album.collaborators}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-foreground mb-1">{album.title}</h3>
              <p className="text-sm text-evrgrn-accent">
                {album.year}{album.month && `.${album.month}`}
              </p>
            </div>
          </div>
          
          {album.format && (
            <p className="text-xs text-muted-foreground mb-3">{album.format}</p>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline" 
              size="sm"
              className="w-full border-evrgrn-accent/30 text-evrgrn-accent hover:bg-evrgrn-accent/10 group-hover:bg-evrgrn-accent/20"
            >
              Voir l'album
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Music;
