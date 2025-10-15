// src/components/Hero.jsx
import React from 'react';

function Hero() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24">
      {/* Reduced opacity overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl xs:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extrabold text-transparent bg-clip-text
                         bg-gradient-to-r from-varygo-gold via-varygo-orange-light to-varygo-red drop-shadow-lg mb-6 leading-tight">
            VARYGO AI
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-varygo-text-light font-light mb-6 max-w-4xl mx-auto leading-relaxed">
            Your Intelligent Guide to Rwanda's Breathtaking Landscapes
          </p>
        </div>
        
        {/* Description */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-lg md:text-xl text-varygo-text-light/95 mb-4 leading-relaxed font-medium">
            Discover the land of a thousand hills with our AI-powered travel companion. 
          </p>
          <p className="text-lg md:text-xl text-varygo-text-light/90 leading-relaxed">
            VaryGo helps you explore Rwanda's rich culture, majestic wildlife, and stunning 
            landscapes with personalized guidance and real-time assistance.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a 
            href="#assistance"
            className="bg-gradient-to-r from-varygo-gold to-varygo-orange-light text-varygo-blue-dark px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 group"
          >
            <i className="fas fa-robot text-xl group-hover:scale-110 transition-transform duration-300"></i>
            <span>Start Exploring with AI</span>
          </a>
          
          <a 
            href="#features"
            className="glass-effect border border-varygo-text-light/30 text-varygo-text-light px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 group"
          >
            <i className="fas fa-star text-xl group-hover:scale-110 transition-transform duration-300"></i>
            <span>Discover Features</span>
          </a>
        </div>
        
        {/* Trust Indicators */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-2xl p-6 border border-varygo-gold/20">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-varygo-text-light/90">
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-varygo-gold"></i>
                <span className="text-sm font-medium">Trusted by Travelers</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-varygo-gold"></i>
                <span className="text-sm font-medium">24/7 AI Assistance</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-varygo-gold"></i>
                <span className="text-sm font-medium">Rwanda Experts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#assistance" className="text-varygo-gold hover:text-varygo-orange-light transition duration-300">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
}

export default Hero;