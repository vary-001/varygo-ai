// src/components/ChatModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Muraho! I'm VaryGo, your AI guide to Rwanda's wonders! I can help you plan your trekking adventures, explore cultural sites, find wildlife encounters, and discover the best accommodations.", 
      sender: 'varygo',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch('https://varygo-ai.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling AI API:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const newUserMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAPI(inputText);
      
      const newAiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'varygo',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: 'varygo',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "Tell me about gorilla trekking in Rwanda",
    "What's the best time to visit Volcanoes National Park?",
    "Recommend luxury lodges near Nyungwe Forest",
    "What are the visa requirements for Rwanda?",
    "Tell me about Akagera National Park wildlife",
    "What cultural experiences can I have in Kigali?"
  ];

  const handleQuickQuestion = (question) => {
    setInputText(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop with blur effect */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className="relative glass-effect-heavy rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-fade-in border border-varygo-gold/30">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-varygo-text-light/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center">
                <i className="fas fa-robot text-varygo-blue-dark"></i>
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-varygo-text-light">VaryGo AI Assistant</h2>
                <p className="text-sm text-varygo-text-light/70">Your personal guide to Rwanda</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-varygo-text-light hover:text-varygo-gold transition duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-b border-varygo-text-light/10 bg-varygo-blue-dark/30">
            <p className="text-sm text-varygo-text-light/80 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="bg-varygo-blue-dark/60 text-varygo-text-light text-xs px-3 py-2 rounded-full hover:bg-varygo-purple transition duration-200 whitespace-nowrap"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow flex flex-col space-y-4 p-6 overflow-y-auto custom-scrollbar">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
              >
                <div 
                  className={`max-w-[80%] relative group ${
                    message.sender === 'user' 
                      ? 'bg-varygo-green-savanna text-varygo-text-light rounded-2xl rounded-tr-none' 
                      : 'bg-varygo-orange-dark text-varygo-text-light rounded-2xl rounded-tl-none'
                  }`}
                >
                  <div className="p-4">
                    <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'varygo' ? 'bg-varygo-gold' : 'bg-varygo-blue-dark'
                      }`}>
                        <i className={`text-sm ${
                          message.sender === 'varygo' 
                            ? 'fas fa-robot text-varygo-blue-dark' 
                            : 'fas fa-user text-varygo-text-light'
                        }`}></i>
                      </div>
                      <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <p className="text-sm leading-relaxed break-words">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(message.text, message.id)}
                    className={`absolute top-2 ${
                      message.sender === 'user' ? 'left-2' : 'right-2'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-varygo-text-light/70 hover:text-varygo-gold p-1`}
                    title="Copy message"
                  >
                    <i className={`fas ${copiedMessageId === message.id ? 'fa-check' : 'fa-copy'} text-xs`}></i>
                  </button>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start message-animation">
                <div className="bg-varygo-orange-dark text-varygo-text-light p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-varygo-gold flex items-center justify-center">
                      <i className="fas fa-robot text-varygo-blue-dark text-sm"></i>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-varygo-text-light rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-varygo-text-light rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-varygo-text-light rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-varygo-text-light/10">
            {!user && (
              <div className="mb-4 p-3 bg-varygo-blue-dark/50 rounded-xl text-center">
                <p className="text-sm text-varygo-text-light/80">
                  Please <button onClick={() => setShowAuthModal(true)} className="text-varygo-gold hover:underline font-medium">login or register</button> to start chatting with VaryGo AI
                </p>
              </div>
            )}
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={user ? "Ask me about Rwanda tourism..." : "Please login to chat..."}
                disabled={!user}
                className="flex-grow p-4 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isLoading || inputText.trim() === '' || !user}
                className="bg-varygo-gold text-varygo-blue-dark p-4 rounded-xl hover:bg-opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          mode="login"
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

export default ChatModal;