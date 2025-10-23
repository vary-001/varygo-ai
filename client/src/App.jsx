// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatAssistance from './components/ChatAssistance';
import WhyChooseUs from './components/WhyChooseUs';
import TravelerStories from './components/TravelerStories';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <>
      {isLoading ? (
        <Loader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div 
          className="min-h-screen flex flex-col animate-fade-in"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed'
          }}
        >
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-varygo-blue-dark/70 via-varygo-purple/60 to-varygo-blue-dark/70 z-0"></div>

          {/* Navbar */}
          <div className="relative z-50">
            <Navbar 
              user={user} 
              onAuthSuccess={handleAuthSuccess}
              onLogout={handleLogout}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-grow">
            <Hero />
            <ChatAssistance user={user} onAuthSuccess={handleAuthSuccess} />
            <WhyChooseUs />
            <TravelerStories />
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
