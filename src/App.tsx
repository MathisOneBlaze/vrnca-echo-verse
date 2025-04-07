
import React, { useState } from 'react';
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
import { CartProvider } from './context/CartContext';
import { Toaster } from 'sonner';
import VrncaVoiceChat from './components/vrnca/VrncaVoiceChat';
import VrncaHead from './components/vrnca/VrncaHead';

function App() {
  const [showChat, setShowChat] = useState(false);
  
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
          <Route path="/game" element={<Game />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="/good-run-evil" element={<GoodRunEvil />} />
          <Route path="/vrnca-head" element={<VrncaHead3D />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* VRNCA Floating Chat Button */}
        {!showChat && (
          <button
            className="fixed bottom-5 right-5 z-40"
            onClick={() => setShowChat(true)}
            aria-label="Open VRNCA Assistant"
          >
            <VrncaHead 
              size="sm" 
              fixed
              position="bottom-right"
            />
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
