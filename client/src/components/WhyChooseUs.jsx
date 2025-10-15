// src/components/WhyChooseUs.jsx
import React, { useRef, useEffect, useState } from 'react';

function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: 'fa-map-marked-alt',
      title: 'Smart Itinerary Planning',
      description: 'AI-powered travel planning that adapts to your preferences and creates perfect Rwandan adventures.',
      gradient: 'from-varygo-orange-light to-varygo-red'
    },
    {
      icon: 'fa-mountain',
      title: 'Gorilla Trekking Expertise',
      description: 'Complete guidance on permits, seasons, and preparation for unforgettable mountain gorilla encounters.',
      gradient: 'from-varygo-purple to-varygo-blue-dark'
    },
    {
      icon: 'fa-landmark',
      title: 'Cultural Immersion',
      description: 'Deep insights into Rwanda\'s rich history, traditions, and authentic cultural experiences.',
      gradient: 'from-varygo-green-savanna to-varygo-gold'
    },
    {
      icon: 'fa-hotel',
      title: 'Accommodation Intelligence',
      description: 'Find and book the perfect lodges, from luxury resorts to eco-friendly stays across Rwanda.',
      gradient: 'from-varygo-gold to-varygo-orange-light'
    },
    {
      icon: 'fa-utensils',
      title: 'Local Cuisine Guide',
      description: 'Discover authentic Rwandan dishes and the best places to experience local flavors.',
      gradient: 'from-varygo-blue-dark to-varygo-purple'
    },
    {
      icon: 'fa-hiking',
      title: 'Adventure Planning',
      description: 'From canopy walks to safari tours, find the best adventure activities tailored for you.',
      gradient: 'from-varygo-red to-varygo-orange-dark'
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-varygo-text-light mb-4">
            Why Choose VaryGo AI?
          </h2>
          <p className="text-lg text-varygo-text-light/80 max-w-2xl mx-auto">
            Transform your Rwandan journey with intelligent assistance that understands your travel dreams
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-500 border border-varygo-text-light/10 hover:border-varygo-gold/30 group ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <i className={`fas ${feature.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-heading font-semibold text-varygo-text-light mb-3">
                {feature.title}
              </h3>
              <p className="text-varygo-text-light/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;