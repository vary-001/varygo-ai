// src/components/VoiceAssistantCard.jsx
import React, { useState } from 'react';

function VoiceAssistantCard({ user }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const iconOptions = [
    { icon: 'fa-map-marked-alt', label: 'Maps', color: 'from-varygo-orange-light to-varygo-red' },
    { icon: 'fa-landmark', label: 'Culture', color: 'from-varygo-purple to-varygo-blue-dark' },
    { icon: 'fa-hiking', label: 'Trekking', color: 'from-varygo-green-savanna to-varygo-gold' },
    { icon: 'fa-paw', label: 'Wildlife', color: 'from-varygo-gold to-varygo-orange-light' },
    { icon: 'fa-hotel', label: 'Hotels', color: 'from-varygo-blue-dark to-varygo-purple' },
    { icon: 'fa-utensils', label: 'Food', color: 'from-varygo-red to-varygo-orange-dark' },
  ];

  const handleMicClick = () => {
    if (!user) return;
    
    if (!isListening) {
      setIsListening(true);
      setTranscript('Listening for your question about Rwanda...');
      
      setTimeout(() => {
        const sampleQuestions = [
          "Tell me about gorilla trekking in Volcanoes National Park",
          "What's the best time to visit Akagera National Park?",
          "Where can I experience traditional Rwandan culture?",
          "Recommend some luxury lodges near Nyungwe Forest",
          "How do I get a permit for golden monkey tracking?"
        ];
        
        const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
        setTranscript(randomQuestion);
        
        setTimeout(() => {
          setIsListening(false);
        }, 2000);
      }, 3000);
    } else {
      setIsListening(false);
      setTranscript('');
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 border border-varygo-purple/30 group">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-varygo-purple to-varygo-blue-dark flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
          <i className="fas fa-microphone-alt text-white text-xl"></i>
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold text-varygo-text-light">
            Voice Assistant
          </h3>
          <p className="text-varygo-text-light/70 text-sm">
            Hands-free guidance while exploring Rwanda
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {iconOptions.map((option, index) => (
          <div key={index} className="flex flex-col items-center text-varygo-text-light text-xs">
            <button 
              className={`bg-gradient-to-br ${option.color} p-3 rounded-2xl mb-1 hover:scale-105 transition-transform duration-200 cursor-pointer w-12 h-12 flex items-center justify-center shadow-lg`}
              disabled={!user}
              title={option.label}
            >
              <i className={`fas ${option.icon} text-white text-sm`}></i>
            </button>
            <span className="text-center">{option.label}</span>
          </div>
        ))}
      </div>

      {/* Voice Interaction Area */}
      <div className="bg-varygo-blue-dark/50 rounded-xl p-4 mb-4 border border-varygo-text-light/20">
        <div className="min-h-[60px] flex items-center justify-center">
          {transcript ? (
            <p className="text-varygo-text-light text-center text-sm">{transcript}</p>
          ) : (
            <p className="text-varygo-text-light/70 text-center text-sm">
              {user ? "Tap the mic to ask about Rwanda..." : "Login to use voice features"}
            </p>
          )}
        </div>
      </div>

      {/* Mic Button */}
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          {isListening && (
            <>
              <div className="absolute inset-0 bg-varygo-gold rounded-full pulse-ring opacity-75"></div>
              <div className="absolute inset-0 bg-varygo-gold rounded-full pulse-ring opacity-50" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
          <button 
            onClick={handleMicClick}
            disabled={!user}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 ${
              isListening 
                ? 'bg-varygo-red text-white' 
                : 'bg-gradient-to-br from-varygo-gold to-varygo-orange-light text-varygo-blue-dark'
            } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <i className={`fas fa-microphone ${isListening ? 'animate-pulse' : ''} text-xl`}></i>
          </button>
        </div>

        <button 
          className="bg-gradient-to-r from-varygo-orange-dark to-varygo-red text-varygo-text-light px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200 shadow-md w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          onClick={handleMicClick}
          disabled={!user}
        >
          <i className="fas fa-volume-up"></i>
          <span>{isListening ? 'Stop Listening' : 'Speak to VaryGo'}</span>
        </button>
      </div>
    </div>
  );
}

export default VoiceAssistantCard;