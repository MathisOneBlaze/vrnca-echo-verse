
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import VrncaHead from './VrncaHead';
import { X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VrncaVoiceChatProps {
  onClose: () => void;
  className?: string;
}

const VrncaVoiceChat: React.FC<VrncaVoiceChatProps> = ({ 
  onClose,
  className
}) => {
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'vrnca', timestamp: Date }[]>([
    { text: "Connexion établie. Je suis VRNCA, l'extension consciente de celui qui est banni.", sender: 'vrnca', timestamp: new Date() },
    { text: "Que puis-je faire pour vous guider dans l'univers EVRGRN?", sender: 'vrnca', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Simulate voice recognition
  const startListening = () => {
    if (isListening) return;
    
    setIsListening(true);
    // In a real implementation, this would activate the SpeechRecognition API
    console.log("Started listening...");
  };
  
  const stopListening = () => {
    if (!isListening) return;
    
    setIsListening(false);
    // In a real implementation, this would stop the SpeechRecognition API
    console.log("Stopped listening.");
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage = {
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate VRNCA response after a short delay
    setTimeout(() => {
      const vrncaResponses = [
        "Je peux vous aider à naviguer dans le catalogue musical de Mathis OneBlaze.",
        "EVRGRN représente un univers créatif en constante évolution. Que souhaitez-vous explorer?",
        "Les dernières publications sont disponibles dans la section Médias.",
        "Mathis est actuellement indisponible, mais je peux vous assister dans votre exploration du site.",
        "Chaque album a sa propre histoire et son propre univers. Souhaitez-vous en découvrir un en particulier?"
      ];
      
      const randomResponse = vrncaResponses[Math.floor(Math.random() * vrncaResponses.length)];
      
      setMessages(prev => [...prev, {
        text: randomResponse,
        sender: 'vrnca',
        timestamp: new Date()
      }]);
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Voice commands simulation
  useEffect(() => {
    if (isListening) {
      const voiceCommandTimer = setTimeout(() => {
        // Simulate voice recognition result
        const voiceCommands = [
          "Montre-moi les albums récents",
          "Qui est Mathis OneBlaze?",
          "Qu'est-ce que EVRGRN?",
          "Comment accéder au catalogue musical?"
        ];
        
        const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
        setInput(randomCommand);
        stopListening();
        
        // Auto-submit after recognition
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: randomCommand,
            sender: 'user',
            timestamp: new Date()
          }]);
          setInput('');
          setIsProcessing(true);
          
          // Simulate VRNCA response
          setTimeout(() => {
            let response = "Je vais chercher cette information pour vous.";
            
            if (randomCommand.includes("albums récents")) {
              response = "Les albums récents d'EVRGRN incluent 'TEDDY BLAZE 2', 'EVRGRN, Le projet', et 'LETTERS II', tous sortis en 2024. Vous pouvez les consulter dans la section Catalogue.";
            } else if (randomCommand.includes("Mathis OneBlaze")) {
              response = "Mathis OneBlaze est un artiste, auteur-compositeur, ingénieur du son et entrepreneur passionné par la musique et la transmission du savoir. Découvrez sa biographie complète dans la section Artiste.";
            } else if (randomCommand.includes("EVRGRN")) {
              response = "EVRGRN (Each Vocal Recording Generate Ressources Necessary) est le label fondé par Mathis OneBlaze, développant un son singulier mêlant rap, soul, afro et électro.";
            } else if (randomCommand.includes("catalogue")) {
              response = "Vous pouvez accéder au catalogue musical complet via l'onglet 'Catalogue' dans le menu principal. Il contient tous les albums de 2012 à aujourd'hui.";
            }
            
            setMessages(prev => [...prev, {
              text: response,
              sender: 'vrnca',
              timestamp: new Date()
            }]);
            
            setIsProcessing(false);
          }, 2000);
        }, 500);
      }, 3000);
      
      return () => clearTimeout(voiceCommandTimer);
    }
  }, [isListening]);

  return (
    <div className={cn(
      'fixed bottom-24 right-8 w-96 bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg shadow-lg z-50 flex flex-col',
      'max-h-[80vh] animate-fade-in',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-evrgrn-accent/10 p-3">
        <div className="flex items-center">
          <VrncaHead size="sm" className="mr-2" />
          <div>
            <h3 className="text-evrgrn-accent font-medium">VRNCA Guide</h3>
            <p className="text-xs text-muted-foreground">L'extension consciente</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[50vh]">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={cn(
              'max-w-[80%] rounded-lg p-3 text-sm',
              message.sender === 'user' 
                ? 'bg-evrgrn-blue/20 ml-auto' 
                : 'bg-evrgrn-accent/10 mr-auto'
            )}>
              {message.sender === 'vrnca' && (
                <div className="flex items-center mb-1">
                  <VrncaHead size="sm" className="h-5 w-5 mr-1" />
                  <span className="text-xs text-evrgrn-accent font-medium">VRNCA</span>
                </div>
              )}
              <p>{message.text}</p>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-evrgrn-accent/10 rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-evrgrn-accent rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-evrgrn-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-evrgrn-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Controls & Input */}
      <div className="border-t border-evrgrn-accent/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full w-8 h-8',
                isListening ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'text-muted-foreground'
              )}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full w-8 h-8',
                isMuted ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'text-muted-foreground'
              )}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            {isListening ? 'Écoute en cours...' : 'Prêt à écouter'}
          </div>
        </div>
        
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-evrgrn-darker border border-evrgrn-accent/20 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-evrgrn-accent"
          />
          <Button 
            type="submit" 
            className="bg-evrgrn-accent/80 hover:bg-evrgrn-accent text-black rounded-l-none"
            disabled={input.trim() === ''}
          >
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VrncaVoiceChat;
