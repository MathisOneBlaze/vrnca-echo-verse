
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Biography from './pages/Biography';
import AlbumPage from './pages/AlbumPage';
import Music from './pages/Music';
import Shop from './pages/Shop';
import Ateliers from './pages/Ateliers';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Events from './pages/Events';
import Publications from './pages/Publications';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Jeux from './pages/Jeux';
import GoodRunEvil from './pages/GoodRunEvil';
import VrncaHead3D from './pages/VrncaHead3D';
import LeTrousseau from './pages/LeTrousseau';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'sonner';
import VrncaVoiceChat from './components/vrnca/VrncaVoiceChat';
import VrncaHead from './components/vrnca/VrncaHead';

function App() {
  const [showChat, setShowChat] = useState(false);
  
  // Effet pour gérer le redimensionnement de la fenêtre et s'assurer que le chat est visible
  useEffect(() => {
    const handleResize = () => {
      // Assurez-vous que le chat est toujours visible sur mobile
      if (window.innerWidth < 768 && showChat) {
        // Limiter la taille du chat sur mobile
        const chatElement = document.querySelector('.vrnca-chat');
        if (chatElement) {
          chatElement.classList.add('mobile-chat');
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showChat]);
  
  return (
    <CartProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/biographie" element={<Biography />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/musique" element={<Music />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ateliers" element={<Ateliers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/VRNCA-Lag" element={<Game />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="/good-run-evil" element={<GoodRunEvil />} />
          <Route path="/vrnca-head" element={<VrncaHead3D />} />
          <Route path="/le-trousseau" element={<LeTrousseau />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* VRNCA Floating Chat Button (always visible when chat is closed) */}
        {!showChat && (
          <button
            className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-evrgrn-accent/20 flex items-center justify-center"
            onClick={() => setShowChat(true)}
            aria-label="Open VRNCA Assistant"
          >
            <div className="w-10 h-10 rounded-full border-2 border-evrgrn-accent flex items-center justify-center">
              <div className="w-6 h-6 bg-evrgrn-accent rounded-full animate-pulse"></div>
            </div>
          </button>
        )}
        
        {/* VRNCA Chat Interface */}
        {showChat && <VrncaVoiceChat onClose={() => setShowChat(false)} />}
        
        <Toaster position="top-right" />
      </div>
    </CartProvider>
  );
}

export default App;
