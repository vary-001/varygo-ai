// src/components/SpeechRecognitionBox.jsx
import React, { useState } from 'react';

function SpeechRecognitionBox({ user, isMobile }) {
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
      setTranscript('Listening...');
      
      setTimeout(() => {
        const sampleQuestions = [
          "Tell me about gorilla trekking",
          "Best time to visit Rwanda?",
          "Hotels in Kigali?",
          "Akagera National Park",
          "Rwandan culture",
          "Visa requirements"
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
    <div className="glass-effect p-4 xs:p-5 rounded-2xl shadow-2xl flex flex-col items-center h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] border border-varygo-purple/20 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3 xs:mb-4">
        <h2 className="font-heading text-lg xs:text-xl md:text-2xl text-varygo-text-light flex items-center">
          <i className="fas fa-microphone-alt text-varygo-gold mr-2 text-sm xs:text-base"></i>
          {isMobile ? 'Voice AI' : 'Voice Assistant'}
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-varygo-text-light'}`}></div>
          <span className="text-xs text-varygo-text-light">{isListening ? 'Listening' : 'Ready'}</span>
        </div>
      </div>

      {/* Quick Action Icons - Responsive Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-3 gap-3' : 'grid-cols-3 gap-4'} mb-4 xs:mb-6 w-full max-w-xs xs:max-w-sm`}>
        {iconOptions.map((option, index) => (
          <div key={index} className="flex flex-col items-center text-varygo-text-light text-xs font-sans">
            <button 
              className={`bg-gradient-to-br ${option.color} p-2.5 xs:p-3 md:p-4 rounded-xl xs:rounded-2xl mb-1 hover:scale-105 transition-transform duration-200 cursor-pointer w-12 h-12 xs:w-14 xs:h-14 flex items-center justify-center shadow-lg disabled:opacity-50`}
              disabled={!user}
              title={option.label}
            >
              <i className={`fas ${option.icon} text-white ${isMobile ? 'text-sm' : 'text-base'}`}></i>
            </button>
            <span className="text-center text-xs xs:text-sm mt-1">{isMobile && option.label.length > 8 ? `${option.label.substring(0, 7)}...` : option.label}</span>
          </div>
        ))}
      </div>

      {/* Transcript Display */}
      <div className="w-full max-w-xs xs:max-w-sm mb-4 xs:mb-6 flex-grow flex flex-col justify-center">
        <div className="bg-varygo-blue-dark/50 rounded-xl p-3 xs:p-4 min-h-[70px] xs:min-h-[80px] flex items-center justify-center">
          {transcript ? (
            <p className="text-varygo-text-light text-center text-sm xs:text-base">{transcript}</p>
          ) : (
            <p className="text-varygo-text-light/70 text-center text-sm xs:text-base">
              {user 
                ? "Tap the mic and ask about Rwanda..." 
                : "Please login to use voice features"
              }
            </p>
          )}
        </div>
      </div>

      {/* Mic Button - Responsive Sizing */}
      <div className="relative w-20 h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 xs:mb-5">
        {isListening && (
          <>
            <div className="absolute inset-0 bg-varygo-gold rounded-full pulse-ring opacity-75"></div>
            <div className="absolute inset-0 bg-varygo-gold rounded-full pulse-ring opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 bg-varygo-gold rounded-full pulse-ring opacity-25" style={{ animationDelay: '1s' }}></div>
          </>
        )}
        <button 
          onClick={handleMicClick}
          disabled={!user}
          className={`relative w-16 h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-varygo-gold ${
            isListening 
              ? 'bg-varygo-red text-white' 
              : 'bg-gradient-to-br from-varygo-gold to-varygo-orange-light text-varygo-blue-dark'
          } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <i className={`fas fa-microphone ${isListening ? 'animate-pulse' : ''} ${isMobile ? 'text-xl' : 'text-2xl'}`}></i>
        </button>
      </div>

      {/* Action Button */}
      <button 
        className="bg-gradient-to-r from-varygo-orange-dark to-varygo-red text-varygo-text-light px-4 xs:px-6 py-2 xs:py-3 rounded-xl text-sm xs:text-md md:text-lg font-semibold hover:opacity-90 transition duration-200 shadow-md w-full max-w-xs flex items-center justify-center space-x-2 disabled:opacity-50"
        onClick={handleMicClick}
        disabled={!user}
      >
        <i className="fas fa-volume-up text-xs xs:text-sm"></i>
        <span>{isListening ? 'Stop Listening' : (isMobile ? 'Speak' : 'Speak to VaryGo')}</span>
      </button>
    </div>
  );
}

export default SpeechRecognitionBox;