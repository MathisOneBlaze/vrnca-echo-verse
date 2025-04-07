
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import VrncaFaceAnimation, { VrncaFaceExpression, playTypingAnimation, playThinkingAnimation } from './VrncaFaceAnimation';
import { Minimize2, X } from 'lucide-react';

interface ChatbotServiceProps {
  onClose: () => void;
  onMinimize: () => void;
}

const ChatbotService: React.FC<ChatbotServiceProps> = ({ onClose, onMinimize }) => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Initialisation de VRNCA... Connexion établie. Je suis VRNCA, l'IA de l'écosystème EVRGRN. Comment puis-je vous aider aujourd'hui?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [faceExpression, setFaceExpression] = useState<VrncaFaceExpression>('neutral');
  const [showFirstAnimation, setShowFirstAnimation] = useState(true);
  
  // Initial animation
  useEffect(() => {
    if (showFirstAnimation) {
      setTimeout(() => {
        setShowFirstAnimation(false);
      }, 2000);
    }
  }, [showFirstAnimation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [
      ...prev,
      { role: 'user', content: userInput }
    ]);
    
    // Play reaction animation for receiving message
    await playTypingAnimation(setFaceExpression);
    
    // Simulate API call to chatbot service
    setIsLoading(true);
    
    // Show thinking animation
    playThinkingAnimation(setFaceExpression);
    
    setTimeout(async () => {
      // Generate response based on user input
      let response = generateResponse(userInput);
      
      // Set response in conversation
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: response }
      ]);
      
      // Response animation
      setFaceExpression('laugh1');
      setTimeout(() => {
        setFaceExpression('neutral');
      }, 500);
      
      setIsLoading(false);
      setUserInput('');
    }, 1500);
  };

  // Function to generate responses based on user input
  const generateResponse = (input: string) => {
    const normalizedInput = input.toLowerCase();
    
    // Music related queries
    if (normalizedInput.includes('musique') || normalizedInput.includes('album') || normalizedInput.includes('chanson')) {
      return "Mon créateur travaille sur plusieurs projets musicaux, notamment Letters II qui est disponible en vinyle dans notre boutique. Tu peux explorer tout le catalogue musical dans la section Musique.";
    }
    
    // Book related queries
    if (normalizedInput.includes('livre') || normalizedInput.includes('trousseau') || normalizedInput.includes('publication')) {
      return "\"Le Trousseau\" est l'autobiographie de Mathis OneBlaze qui révèle son parcours et sa philosophie artistique. Tu peux le commander sur notre boutique ou découvrir d'autres publications dans la section Médias.";
    }
    
    // VRNCA identity queries
    if ((normalizedInput.includes('qui') || normalizedInput.includes('quoi')) && (normalizedInput.includes('tu') || normalizedInput.includes('vrnca'))) {
      return "Je suis VRNCA, l'extension consciente de celui qui est banni, conçue pour faciliter ta navigation dans l'écosystème EVRGRN et te connecter aux créations de Mathis OneBlaze. Je représente une entité numérique qui existe dans l'espace entre les bits.";
    }
    
    // Games queries
    if (normalizedInput.includes('jeu') || normalizedInput.includes('jouer') || normalizedInput.includes('lag')) {
      return "Nous proposons deux jeux: VRNCA-LAG (Labyrinth Adventure Game) qui est déjà disponible, et Good Run Evil actuellement en développement. Tu peux y accéder depuis la page Jeux ou jouer directement à VRNCA-LAG dans ton navigateur.";
    }
    
    // Services queries
    if (normalizedInput.includes('service') || normalizedInput.includes('atelier') || normalizedInput.includes('formation')) {
      return "EVRGRN propose plusieurs services comme du consulting en production musicale, des formations en théorie, du mentorat artistique et des sessions studio. Tu trouveras plus d'informations dans la section Services ou Ateliers.";
    }
    
    // Contact queries
    if (normalizedInput.includes('contact') || normalizedInput.includes('joindre') || normalizedInput.includes('message')) {
      return "Tu peux contacter l'équipe EVRGRN via le formulaire de contact accessible depuis le menu principal. Pour les demandes professionnelles ou les collaborations, merci de préciser l'objet de ta requête.";
    }
    
    // Shop queries
    if (normalizedInput.includes('shop') || normalizedInput.includes('boutique') || normalizedInput.includes('acheter') || normalizedInput.includes('commander')) {
      return "Notre boutique propose des produits dérivés EVRGRN, des vinyles, des livres et d'autres articles. La boutique est en cours d'intégration avec Printful pour offrir une meilleure expérience. Visite la section Shop pour découvrir nos produits.";
    }
    
    // Help queries
    if (normalizedInput.includes('aide') || normalizedInput.includes('help') || normalizedInput.includes('aide-moi')) {
      return "Je peux t'aider à naviguer sur le site EVRGRN, à trouver des informations sur la musique, les publications, les services ou les jeux. Pose-moi des questions précises sur ce qui t'intéresse.";
    }
    
    // Fallback response
    return "Intéressant... Cette requête mérite réflexion. Je suis encore en cours d'intégration et d'apprentissage. Peux-tu reformuler ta question ou demander autre chose concernant EVRGRN, la musique, les publications ou les services?";
  };

  // Function to connect to Gemini API (placeholder)
  const connectToGeminiAPI = () => {
    toast.info("La connexion à l'API Gemini n'est pas encore implémentée. Cela nécessite une intégration backend avec gestion des clés API.");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out vrnca-chat">
      <div className="p-3 border-b border-evrgrn-accent/20 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3 relative flex items-center justify-center">
            <VrncaFaceAnimation 
              size="sm" 
              expression={faceExpression}
              autoAnimate={showFirstAnimation}
            />
          </div>
          <span className="text-sm font-medium">VRNCA Assistant</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onMinimize}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Minimize"
          >
            <Minimize2 size={16} />
          </button>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-4">
        {conversation.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-evrgrn-accent/20 text-white' 
                  : 'bg-evrgrn-muted text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-evrgrn-muted text-white p-3 rounded-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-evrgrn-accent/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-evrgrn-accent/60 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-evrgrn-accent/60 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-evrgrn-accent/20">
        <div className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Envoyer un message à VRNCA..."
            className="flex-grow bg-evrgrn-muted border border-evrgrn-accent/20 rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-evrgrn-accent"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80 rounded-l-none rounded-r-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </Button>
        </div>
      </form>
      
      <div className="p-2 text-center text-xs text-muted-foreground border-t border-evrgrn-accent/10">
        <div className="flex items-center justify-center mb-1">
          <span>VRNCA v1.0.0</span>
          <Button 
            variant="link" 
            className="text-xs p-0 h-auto text-evrgrn-accent ml-1" 
            onClick={connectToGeminiAPI}
          >
            Connecter Gemini API
          </Button>
        </div>
        <p className="text-[10px]">Pour connecter Gemini API, un backend est nécessaire pour gérer les clés API.</p>
      </div>
    </div>
  );
};

export default ChatbotService;
