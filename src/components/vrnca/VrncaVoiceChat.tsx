
import React from 'react';
import ChatbotService from './ChatbotService';

interface VrncaVoiceChatProps {
  onClose: () => void;
}

const VrncaVoiceChat: React.FC<VrncaVoiceChatProps> = ({ onClose }) => {
  return <ChatbotService onClose={onClose} />;
};

export default VrncaVoiceChat;
