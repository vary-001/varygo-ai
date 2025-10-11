// src/App.jsx
import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBot';
import SpeechRecognitionBox from './components/SpeechRecognitionBox';
import AuthModal from './components/AuthModal';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start xs:justify-center p-3 xs:p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-varygo-blue-dark/80 via-varygo-purple/60 to-varygo-blue-dark/90"></div>

      {/* Header with Auth Buttons */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex justify-between items-center p-3 xs:p-4 md:p-6 mt-2 xs:mt-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center shadow-lg">
            <i className="fas fa-mountain text-varygo-blue-dark text-sm xs:text-lg"></i>
          </div>
          <span className="font-heading text-lg xs:text-xl font-semibold text-varygo-text-light">VaryGo</span>
        </div>
        
        <div className="flex space-x-2 xs:space-x-3">
          {user ? (
            <div className="flex items-center space-x-2 xs:space-x-3">
              <span className="text-varygo-text-light text-sm xs:text-base hidden xs:block">Welcome, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-varygo-orange-dark text-varygo-text-light px-3 xs:px-4 py-1.5 xs:py-2 rounded-xl text-xs xs:text-sm font-medium hover:bg-varygo-red transition duration-200 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="bg-varygo-blue-dark/70 text-varygo-text-light px-3 xs:px-4 py-1.5 xs:py-2 rounded-xl text-xs xs:text-sm font-medium hover:bg-varygo-purple transition duration-200 shadow-md glass-effect"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
                className="bg-varygo-gold text-varygo-blue-dark px-3 xs:px-4 py-1.5 xs:py-2 rounded-xl text-xs xs:text-sm font-medium hover:bg-opacity-90 transition duration-200 shadow-md"
              >
                Register
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center p-3 xs:p-4 space-y-6 xs:space-y-8 md:space-y-12 lg:space-y-16 mt-2 xs:mt-4">
        {/* Enhanced VaryGo Title */}
        <div className="text-center w-full px-2 xs:px-4">
          <h1 className="font-heading text-4xl xs:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-clip-text
                         bg-gradient-to-r from-varygo-gold via-varygo-orange-light to-varygo-red drop-shadow-lg animate-float leading-tight">
            VARYGO AI
          </h1>
          <p className="mt-3 xs:mt-4 text-sm xs:text-base md:text-lg lg:text-xl text-varygo-text-light max-w-2xl mx-auto font-light px-2">
            Your intelligent guide to exploring Rwanda's breathtaking landscapes, rich culture, and unforgettable adventures
          </p>
        </div>

        {/* Chat and Speech Boxes - Responsive Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 md:gap-6 lg:gap-8 xl:gap-10 px-2 xs:px-4">
          <ChatBox user={user} isMobile={isMobile} />
          <SpeechRecognitionBox user={user} isMobile={isMobile} />
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-20 w-full py-3 xs:py-4 text-varygo-text-light text-center px-3 xs:px-4 mt-6 xs:mt-8">
        <div className="max-w-7xl mx-auto flex flex-col xs:flex-row justify-between items-center space-y-2 xs:space-y-0">
          <p className="text-xs xs:text-sm font-sans">
            Discover Rwanda. Experience Beauty. VaryGo.
          </p>
          <div className="flex space-x-3 xs:space-x-4">
            <a href="#" className="text-varygo-text-light hover:text-varygo-gold transition duration-200 text-sm xs:text-base">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-varygo-text-light hover:text-varygo-gold transition duration-200 text-sm xs:text-base">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-varygo-text-light hover:text-varygo-gold transition duration-200 text-sm xs:text-base">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)} 
          onAuthSuccess={handleAuthSuccess}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

export default App;