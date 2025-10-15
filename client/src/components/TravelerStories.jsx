// src/components/TravelerStories.jsx
import React, { useRef, useEffect, useState } from "react";

function TravelerStories() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "VaryGo transformed my Rwanda trip! The AI suggested hidden gems I'd never have found. The gorilla trekking guidance was spot-on!",
      rating: 5,
      mockup: {
        type: "chat",
        messages: [
          { sender: "user", text: "Best time for gorilla trekking?" },
          {
            sender: "ai",
            text: "June to September offers the best conditions with less rain and clearer trails in Volcanoes National Park.",
          },
          { sender: "user", text: "Permit costs?" },
          {
            sender: "ai",
            text: "Gorilla permits are $1,500 per person. I recommend booking 6-12 months in advance through RDB.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "David Chen",
      role: "Photography Enthusiast",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "As a photographer, VaryGo helped me capture Rwanda's beauty at perfect times and locations. Unforgettable shots!",
      rating: 5,
      mockup: {
        type: "voice",
        interaction: "David: 'Best sunrise spots in Kigali?'",
        response:
          "VaryGo: 'Mount Kigali offers stunning city views at sunrise. Arrive by 5:30 AM for golden hour photography.'",
      },
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Cultural Explorer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "The cultural insights and local experiences recommended by VaryGo made my journey deeply meaningful and authentic.",
      rating: 5,
      mockup: {
        type: "itinerary",
        plan: [
          "9:00 AM - Visit Kimironko Market",
          "11:00 AM - Kandt House Museum",
          "2:00 PM - Traditional lunch at Repub Lounge",
          "4:00 PM - Inema Arts Center tour",
        ],
      },
    },
  ];

  const activeStoryData = stories[activeStory];

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="py-16 md:py-24 bg-varygo-blue-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-varygo-gold mb-4">
            Real Traveler Experiences
          </h2>
          <p className="text-lg sm:text-xl text-varygo-text-light/80 max-w-3xl mx-auto">
            See how VaryGo AI has transformed Rwandan adventures for travelers
            worldwide
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
          {/* Interactive Mockup */}
          <div
            className={`flex-shrink-0 transition-all duration-700 w-full lg:w-1/2 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="glass-effect rounded-3xl p-6 border border-varygo-gold/20 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-varygo-gold mb-6 text-center">
                {activeStoryData.name}'s VaryGo Experience
              </h3>

              {/* Phone Mockup */}
              <div className="relative mx-auto w-64 sm:w-72 md:w-80 h-[500px] md:h-[550px] rounded-[40px] border-8 border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-gray-800 rounded-b-lg z-20"></div>

                {/* Screen */}
                <div className="absolute top-5 left-1 w-[calc(100%-8px)] h-[calc(100%-40px)] rounded-[32px] overflow-hidden bg-gradient-to-br from-varygo-blue to-varygo-purple p-4 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center">
                        <i className="fas fa-mountain text-varygo-blue-dark text-sm"></i>
                      </div>
                      <span className="text-white font-bold text-sm sm:text-base">
                        VaryGo
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-white/70">
                      {activeStoryData.role}
                    </div>
                  </div>

                  {/* Mockup Content */}
                  <div className="flex-grow overflow-y-auto">
                    {activeStoryData.mockup.type === "chat" && (
                      <div className="space-y-3">
                        {activeStoryData.mockup.messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${
                              msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] p-2 rounded-lg text-xs sm:text-sm ${
                                msg.sender === "user"
                                  ? "bg-varygo-green-savanna text-white rounded-br-none"
                                  : "bg-varygo-orange-dark text-white rounded-bl-none"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeStoryData.mockup.type === "voice" && (
                      <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center">
                          <i className="fas fa-microphone text-varygo-blue-dark text-lg sm:text-xl"></i>
                        </div>
                        <p className="text-white text-xs sm:text-sm">
                          {activeStoryData.mockup.interaction}
                        </p>
                        <p className="text-varygo-gold text-xs sm:text-sm">
                          {activeStoryData.mockup.response}
                        </p>
                      </div>
                    )}

                    {activeStoryData.mockup.type === "itinerary" && (
                      <div className="space-y-2">
                        <h4 className="text-varygo-gold text-sm sm:text-base font-semibold">
                          Daily Itinerary
                        </h4>
                        <ul className="space-y-1">
                          {activeStoryData.mockup.plan.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center space-x-2 text-white text-xs sm:text-sm"
                            >
                              <span className="w-2 h-2 bg-varygo-gold rounded-full flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-white/20 text-xs sm:text-sm text-white/60 flex justify-between">
                    <span>VaryGo AI</span>
                    <span>24/7 Active</span>
                  </div>
                </div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full"></div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-4 mt-6 text-white">
                <button
                  onClick={() =>
                    setActiveStory(
                      (activeStory - 1 + stories.length) % stories.length
                    )
                  }
                  className="hover:text-varygo-gold transition"
                >
                  <i className="fas fa-chevron-left text-lg sm:text-xl"></i>
                </button>

                <div className="flex space-x-2">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStory(idx)}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition ${
                        idx === activeStory ? "bg-varygo-gold" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveStory((activeStory + 1) % stories.length)}
                  className="hover:text-varygo-gold transition"
                >
                  <i className="fas fa-chevron-right text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Updated Story Circles List */}
          <div
            className={`flex flex-row lg:flex-col gap-4 lg:gap-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {stories.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(idx)}
                className={`flex flex-col items-center p-2 lg:p-4 rounded-xl glass-effect border cursor-pointer transition-transform duration-300 ${
                  idx === activeStory
                    ? "border-varygo-gold scale-110"
                    : "border-varygo-text-light/20 hover:border-varygo-gold/50"
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-varygo-gold/50 mb-2">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-xs sm:text-sm font-semibold text-center">
                  {story.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelerStories;
