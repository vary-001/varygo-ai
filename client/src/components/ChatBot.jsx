// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';

function ChatBox({ user, isMobile, onChatClick }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Muraho! I'm VaryGo, your AI guide to Rwanda's wonders! Click the chat area or use quick questions to start exploring.", 
      sender: 'varygo',
      timestamp: new Date()
    }
  ]);

  const quickQuestions = [
    "Gorilla trekking",
    "Best time to visit",
    "Kigali hotels",
    "Akagera Park",
    "Culture experiences",
    "Visa requirements"
  ];

  return (
    <div 
      className="glass-effect p-4 xs:p-5 rounded-2xl shadow-2xl flex flex-col h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] border border-varygo-orange-light/20 w-full cursor-pointer hover:border-varygo-gold/50 hover:transform hover:scale-[1.01] transition-all duration-300"
      onClick={onChatClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 xs:mb-4">
        <h2 className="font-heading text-lg xs:text-xl md:text-2xl text-varygo-text-light flex items-center">
          <i className="fas fa-comments text-varygo-gold mr-2 text-sm xs:text-base"></i>
          {isMobile ? 'AI Chat' : 'Text Chat with AI'}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-varygo-text-light">Click to Chat</span>
        </div>
      </div>
      
      {/* Quick Questions */}
      <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onChatClick();
            }}
            className="bg-varygo-blue-dark/60 text-varygo-text-light text-xs px-2.5 xs:px-3 py-1.5 rounded-full hover:bg-varygo-purple transition duration-200 whitespace-nowrap flex-shrink-0 border border-varygo-text-light/20"
          >
            {isMobile && question.length > 12 ? `${question.substring(0, 10)}...` : question}
          </button>
        ))}
      </div>

      {/* Messages Preview Area */}
      <div className="flex-grow flex flex-col space-y-2 xs:space-y-3 overflow-y-auto custom-scrollbar pr-1 xs:pr-2">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
          >
            <div 
              className={`max-w-[90%] xs:max-w-[85%] p-2.5 xs:p-3 rounded-2xl shadow-md ${
                message.sender === 'user' 
                  ? 'bg-varygo-green-savanna text-varygo-text-light rounded-tr-none' 
                  : 'bg-varygo-orange-dark text-varygo-text-light rounded-tl-none'
              }`}
            >
              <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  message.sender === 'varygo' ? 'bg-varygo-gold' : 'bg-varygo-blue-dark'
                }`}>
                  <i className={`text-xs xs:text-sm ${
                    message.sender === 'varygo' 
                      ? 'fas fa-robot text-varygo-blue-dark' 
                      : 'fas fa-user text-varygo-text-light'
                  }`}></i>
                </div>
                <div className={`${message.sender === 'user' ? 'text-right' : 'text-left'} flex-1`}>
                  <p className="text-xs xs:text-sm leading-relaxed break-words">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* CTA Message */}
        <div className="flex justify-center items-center h-full flex-col space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center">
            <i className="fas fa-comment-dots text-varygo-blue-dark text-2xl"></i>
          </div>
          <div>
            <p className="text-varygo-text-light font-semibold text-lg">Start a Conversation</p>
            <p className="text-varygo-text-light/70 text-sm mt-1">
              Click anywhere to open chat and explore Rwanda with AI
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-varygo-text-light/10">
        <p className="text-varygo-text-light/60 text-xs text-center">
          💬 Click to start chatting with VaryGo AI
        </p>
      </div>
    </div>
  );
}

export default ChatBox;