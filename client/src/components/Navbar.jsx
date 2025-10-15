// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

function Navbar({ user, onAuthSuccess, onLogout }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSuccess = (userData) => {
    onAuthSuccess(userData);
    setShowAuthModal(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect-heavy border-b border-varygo-text-light/10 py-3' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center shadow-lg">
                <i className="fas fa-mountain text-varygo-blue-dark text-lg"></i>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-varygo-text-light">VaryGo</span>
                <span className="block text-xs text-varygo-gold -mt-1">AI Travel Companion</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#assistance" className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium">
                AI Assistants
              </a>
              <a href="#features" className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium">
                Features
              </a>
              <a href="#stories" className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium">
                Stories
              </a>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-varygo-text-light text-sm">Welcome, {user.name}</span>
                  <button 
                    onClick={onLogout}
                    className="bg-varygo-orange-dark text-varygo-text-light px-4 py-2 rounded-xl text-sm font-medium hover:bg-varygo-red transition duration-200 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }}
                    className="bg-varygo-gold text-varygo-blue-dark px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90 transition duration-200 shadow-md"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-varygo-text-light hover:text-varygo-gold transition duration-200 p-2"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-varygo-text-light/10 animate-fade-in glass-effect-heavy rounded-lg mt-2">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#assistance" 
                  className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Assistants
                </a>
                <a 
                  href="#features" 
                  className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#stories" 
                  className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Stories
                </a>
                
                {user ? (
                  <>
                    <div className="text-varygo-text-light py-2 text-sm">
                      Welcome, {user.name}
                    </div>
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-varygo-orange-dark text-varygo-text-light px-4 py-2 rounded-xl text-sm font-medium hover:bg-varygo-red transition duration-200 shadow-md text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setAuthMode('login');
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-varygo-text-light hover:text-varygo-gold transition duration-200 font-medium text-left py-2"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        setAuthMode('register');
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-varygo-gold text-varygo-blue-dark px-4 py-2 rounded-xl text-sm font-medium hover:bg-opacity-90 transition duration-200 shadow-md text-left"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)} 
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}

export default Navbar;