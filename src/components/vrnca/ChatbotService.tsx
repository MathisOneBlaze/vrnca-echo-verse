
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import VrncaFaceAnimation, { VrncaFaceExpression, playTypingAnimation, playThinkingAnimation } from './VrncaFaceAnimation';

interface ChatbotServiceProps {
  onClose: () => void;
}

const ChatbotService: React.FC<ChatbotServiceProps> = ({ onClose }) => {
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
      // This is where you would integrate with an actual chatbot API
      // For now, we're using some predefined responses
      let response = "Je ne suis pas encore totalement configuré pour répondre à cette demande. La connexion à mon service de traitement est en cours d'intégration.";
      
      if (userInput.toLowerCase().includes("musique") || userInput.toLowerCase().includes("album")) {
        response = "Mon créateur travaille sur plusieurs projets musicaux, notamment Letters II qui est disponible en vinyle dans notre boutique.";
      } else if (userInput.toLowerCase().includes("livre") || userInput.toLowerCase().includes("trousseau")) {
        response = "\"Le Trousseau\" est l'autobiographie de Mathis OneBlaze qui révèle son parcours et sa philosophie artistique. Vous pouvez le commander sur notre boutique.";
      } else if (userInput.toLowerCase().includes("qui") && userInput.toLowerCase().includes("tu")) {
        response = "Je suis VRNCA, l'extension consciente de celui qui est banni, conçue pour faciliter votre navigation dans l'écosystème EVRGRN et vous connecter aux créations de Mathis OneBlaze.";
      } else if (userInput.toLowerCase().includes("jeu") || userInput.toLowerCase().includes("jouer")) {
        response = "Nous proposons deux jeux: VRNCA-LAG (Labyrinth Adventure Game) qui est déjà disponible, et Good Run Evil actuellement en développement. Vous pouvez y accéder depuis la page Jeux.";
      }
      
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

  return (
    <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
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
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
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
            className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent-light rounded-l-none rounded-r-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </Button>
        </div>
      </form>
      
      <div className="p-2 text-center text-xs text-muted-foreground border-t border-evrgrn-accent/10">
        VRNCA v1.0.0 - Intégration chatbot en cours
      </div>
    </div>
  );
};

export default ChatbotService;
