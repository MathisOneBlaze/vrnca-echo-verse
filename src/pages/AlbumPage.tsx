
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AlbumDetail from '../components/music/AlbumDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import albumData from '../data/albumData';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the album by id
  const album = albumData.find(album => album.id === id);
  
  if (!album) {
    return (
      <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-12">
            <Link to="/musique" className="text-evrgrn-accent hover:underline flex items-center mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au catalogue
            </Link>
            <div className="text-center py-12">
              <h1 className="text-3xl font-serif mb-4">Album non trouvé</h1>
              <p className="text-muted-foreground mb-8">
                L'album que vous recherchez n'existe pas ou a été déplacé.
              </p>
              <Button asChild>
                <Link to="/musique">Voir tous les albums</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <Link to="/musique" className="text-evrgrn-accent hover:underline flex items-center mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au catalogue
          </Link>
          
          <AlbumDetail {...album} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlbumPage;
