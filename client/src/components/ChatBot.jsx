// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';

function ChatBox({ user, isMobile }) {
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
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // API call
  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch('https://varygo-ai.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling AI API:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  };

  // Send user message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setTyping(true);

    try {
      const aiResponse = await sendMessageToAPI(inputText);
      const aiMessage = { id: Date.now() + 1, text: aiResponse, sender: 'varygo', timestamp: new Date() };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, text: "Sorry, I'm having trouble responding right now.", sender: 'varygo', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  const quickQuestions = [
    "Gorilla trekking", "Best time to visit", "Kigali hotels",
    "Akagera Park", "Culture experiences", "Visa requirements"
  ];

  const handleQuickQuestion = async (question) => {
    if (!inputText.trim()) {
      setInputText(question);
    } else {
      const userMessage = { id: Date.now(), text: question, sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setTyping(true);

      try {
        const aiResponse = await sendMessageToAPI(question);
        const aiMessage = { id: Date.now() + 1, text: aiResponse, sender: 'varygo', timestamp: new Date() };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        const errorMessage = { id: Date.now() + 1, text: "Sorry, I'm having trouble responding right now.", sender: 'varygo', timestamp: new Date() };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setTyping(false);
      }
    }
  };

  return (
    <div className="glass-effect p-4 xs:p-5 rounded-2xl shadow-2xl flex flex-col h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] border border-varygo-orange-light/20 w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 xs:mb-4">
        <h2 className="font-heading text-lg xs:text-xl md:text-2xl text-varygo-text-light flex items-center">
          <i className="fas fa-comments text-varygo-gold mr-2 text-sm xs:text-base"></i>
          {isMobile ? 'AI Chat' : 'VaryGo AI Chat'}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-varygo-text-light">AI Online</span>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleQuickQuestion(q)}
            className="bg-varygo-blue-dark/60 text-varygo-text-light text-xs px-2.5 xs:px-3 py-1.5 rounded-full hover:bg-varygo-purple transition duration-200 whitespace-nowrap flex-shrink-0"
          >
            {isMobile && q.length > 12 ? `${q.substring(0, 10)}...` : q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-grow flex flex-col space-y-2 xs:space-y-3 overflow-y-auto custom-scrollbar pr-1 xs:pr-2">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender==='user'?'justify-end':'justify-start'} message-animation`}>
            <div className={`max-w-[90%] xs:max-w-[85%] p-2.5 xs:p-3 rounded-2xl shadow-md ${m.sender==='user'?'bg-varygo-green-savanna text-varygo-text-light rounded-tr-none':'bg-varygo-orange-dark text-varygo-text-light rounded-tl-none'}`}>
              <div className={`flex items-start space-x-2 ${m.sender==='user'?'flex-row-reverse space-x-reverse':''}`}>
                <div className={`w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${m.sender==='varygo'?'bg-varygo-gold':'bg-varygo-blue-dark'}`}>
                  <i className={`text-xs xs:text-sm ${m.sender==='varygo'?'fas fa-robot text-varygo-blue-dark':'fas fa-user text-varygo-text-light'}`}></i>
                </div>
                <div className={`${m.sender==='user'?'text-right':'text-left'} flex-1`}>
                  <p className="text-xs xs:text-sm leading-relaxed break-words">{m.text}</p>
                  <p className="text-xs opacity-70 mt-1">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex justify-start message-animation">
            <div className="bg-varygo-orange-dark text-varygo-text-light p-2.5 xs:p-3 rounded-2xl rounded-tl-none shadow-md max-w-[85%] flex items-center">
              <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-varygo-gold flex items-center justify-center mr-2">
                <i className="fas fa-robot text-varygo-blue-dark text-xs xs:text-sm"></i>
              </div>
              <div className="flex space-x-1">
                <span className="dot animate-bounce"></span>
                <span className="dot animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="dot animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
{/* Input */}
<form onSubmit={handleSendMessage} className="flex mt-3 xs:mt-4">
  <input
    type="text"
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    placeholder="Ask about Rwanda tourism..."
    className="flex-grow p-2.5 xs:p-3 rounded-l-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold text-sm xs:text-base"
  />
  <button 
    type="submit"
    disabled={isLoading || inputText.trim() === ''}
    className="bg-varygo-gold text-varygo-blue-dark p-2.5 xs:p-3 rounded-r-xl hover:bg-opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px] xs:min-w-[50px]"
  >
    {isLoading ? (
      <i className="fas fa-spinner fa-spin text-sm xs:text-base"></i>
    ) : (
      <i className="fas fa-paper-plane text-sm xs:text-base"></i>
    )}
  </button>
</form>

      <style jsx>{`
        .dot {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background-color: #f0e68c;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

export default ChatBox;
