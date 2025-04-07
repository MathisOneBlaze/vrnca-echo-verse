
import React, { useState } from 'react';
import ChatbotService from './ChatbotService';

interface VrncaVoiceChatProps {
  onClose: () => void;
}

const VrncaVoiceChat: React.FC<VrncaVoiceChatProps> = ({ onClose }) => {
  const [minimized, setMinimized] = useState(false);

  const handleMinimize = () => {
    setMinimized(true);
  };

  const handleMaximize = () => {
    setMinimized(false);
  };

  if (minimized) {
    return (
      <button
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-evrgrn-accent/20 flex items-center justify-center"
        onClick={handleMaximize}
        aria-label="Maximize VRNCA Assistant"
      >
        <div className="w-10 h-10 rounded-full border-2 border-evrgrn-accent flex items-center justify-center">
          <div className="w-6 h-6 bg-evrgrn-accent rounded-full"></div>
        </div>
      </button>
    );
  }

  return <ChatbotService onClose={onClose} onMinimize={handleMinimize} />;
};

export default VrncaVoiceChat;
