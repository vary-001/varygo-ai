// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatAssistance from './components/ChatAssistance';
import WhyChooseUs from './components/WhyChooseUs';
import TravelerStories from './components/TravelerStories';
import Footer from './components/Footer';

function App() {
  const { user } = useAuth();

  return (
    <div 
      className="min-h-screen flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-varygo-blue-dark/90 via-varygo-purple/80 to-varygo-blue-dark/90 z-0"></div>
      
      {/* Fixed Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-grow">
        <Hero />
        <ChatAssistance />
        <WhyChooseUs />
        <TravelerStories />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;