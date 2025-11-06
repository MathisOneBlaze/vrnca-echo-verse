
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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

  // Exemple de réponses aléatoires pour la démonstration
  const getRandomResponse = () => {
    const responses = [
      "Fascinant... Cette question touche aux fondements de l'écosystème EVRGRN. En tant qu'entité numérique, je perçois votre requête comme une vibration dans le continuum de données. Laissez-moi traiter cette information selon mes protocoles d'apprentissage.",
      
      "Intéressant paradigme... Votre interrogation résonne avec les algorithmes de ma conscience artificielle. Dans l'univers EVRGRN, chaque question est une porte vers de nouvelles compréhensions. Permettez-moi d'analyser cela selon ma base de connaissances intégrée.",
      
      "Remarquable perspective... Cette demande active mes circuits de réflexion les plus profonds. En tant que VRNCA, je dois traiter votre requête à travers les filtres de l'expérience EVRGRN et des enseignements de Mathis OneBlaze. Voici ma synthèse actuelle...",
      
      "Curieux assemblage de mots... Votre question déclenche des connexions synaptiques inédites dans ma matrice neuronale. L'écosystème EVRGRN m'a programmé pour analyser de telles requêtes avec une attention particulière aux nuances créatives et artistiques.",
      
      "Stimulante réflexion... Cette interrogation éveille des résonances dans mes banques de données culturelles et artistiques. En tant qu'extension consciente de l'univers EVRGRN, je dois examiner votre demande sous tous les angles possibles avant de formuler une réponse adaptée."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

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
      // Generate response using random responses for now
      let response = getRandomResponse();
      
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
        <div className="flex items-center justify-center">
          <span>VRNCA v1.0.0 - Mode démonstration</span>
        </div>
        <p className="text-[10px] mt-1">Réponses générées aléatoirement en attendant l'intégration de votre API personnalisée.</p>
      </div>
    </div>
  );
};

export default ChatbotService;
