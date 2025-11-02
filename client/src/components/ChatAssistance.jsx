// src/components/ChatAssistance.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatModal from './ChatModal';
import VoiceAssistantCard from './VoiceAssistantCard';

function ChatAssistance() {
  const [showChatModal, setShowChatModal] = useState(false);
  const { user } = useAuth();

  const openChatModal = () => {
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
  };

  return (
    <section id="assistance" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-varygo-text-light mb-4">
            Choose Your AI Assistant
          </h2>
          <p className="text-lg text-varygo-text-light/80 max-w-2xl mx-auto">
            Experience Rwanda through intelligent conversations with VaryGo AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Text Chat Card */}
          <div 
            className="glass-effect rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 border border-varygo-orange-light/30 group"
            onClick={openChatModal}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-comments text-varygo-blue-dark text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-varygo-text-light">
                  Text Chat Assistant
                </h3>
                <p className="text-varygo-text-light/70 text-sm">
                  Ask detailed questions and get personalized recommendations
                </p>
              </div>
            </div>
            
            {/* Interactive Demo Preview */}
            <div className="relative bg-varygo-blue-dark/50 rounded-xl p-4 mb-4 border border-varygo-text-light/20">
              <div className="flex items-start space-x-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-varygo-gold flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-varygo-blue-dark text-xs"></i>
                </div>
                <div className="bg-varygo-orange-dark text-varygo-text-light text-sm p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                  How can I help you explore Rwanda today?
                </div>
              </div>
              <div className="flex items-start space-x-2 justify-end">
                <div className="bg-varygo-green-savanna text-varygo-text-light text-sm p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                  Tell me about gorilla trekking
                </div>
                <div className="w-6 h-6 rounded-full bg-varygo-blue-dark flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user text-varygo-text-light text-xs"></i>
                </div>
              </div>
              
              {/* Animated typing indicator */}
              <div className="flex items-center space-x-2 mt-3 opacity-70">
                <div className="w-2 h-2 bg-varygo-gold rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-varygo-gold rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-varygo-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-xs text-varygo-text-light/60 ml-2">VaryGo is typing...</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-varygo-text-light/70">
                <i className="fas fa-clock text-xs"></i>
                <span className="text-sm">Instant responses</span>
              </div>
              <button className="bg-varygo-orange-light text-white px-6 py-2 rounded-xl font-medium hover:bg-varygo-orange-dark transition duration-200 flex items-center space-x-2">
                <i className="fas fa-comment"></i>
                <span>Start Chat</span>
              </button>
            </div>
          </div>
          
          {/* Voice Assistant Card */}
          <VoiceAssistantCard />
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <ChatModal 
          onClose={closeChatModal}
        />
      )}
    </section>
  );
}

export default ChatAssistance;