// src/components/Footer.jsx
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Explore Rwanda",
      links: ["Destinations", "Travel Guides", "Itineraries", "Cultural Experiences", "Wildlife Tours"]
    },
    {
      title: "VaryGo AI",
      links: ["About Us", "Our Story", "AI Technology", "Careers", "Press Kit"]
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Cookie Policy"]
    },
    {
      title: "Partners",
      links: ["RDB Tourism", "Hotels & Lodges", "Tour Operators", "Travel Agencies", "Become a Partner"]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-varygo-blue-dark/90 to-varygo-blue-dark border-t border-varygo-text-light/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center">
                <i className="fas fa-mountain text-varygo-blue-dark"></i>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-varygo-text-light">VaryGo</span>
                <span className="block text-xs text-varygo-gold -mt-1">AI Travel Companion</span>
              </div>
            </div>
            <p className="text-varygo-text-light/80 mb-4 max-w-md text-sm leading-relaxed">
              Transforming how travelers experience Rwanda through AI. Discover hidden gems,
              plan perfect itineraries, and create unforgettable memories with your personal AI travel guide.
            </p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram", "linkedin"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="text-varygo-text-light hover:text-varygo-gold transition duration-200 text-lg"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links - 2x2 grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="font-heading font-semibold text-varygo-text-light mb-4 text-sm sm:text-base">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-varygo-text-light/70 hover:text-varygo-gold transition duration-200 text-xs sm:text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-varygo-text-light/10 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
            <div>
              <h3 className="font-heading font-semibold text-varygo-text-light mb-1 text-sm sm:text-base">
                Stay Updated with Rwandan Travel Insights
              </h3>
              <p className="text-varygo-text-light/70 text-xs sm:text-sm">
                Get the latest travel tips, destination updates, and exclusive offers
              </p>
            </div>
            <div className="flex w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-3 rounded-l-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold text-sm"
              />
              <button className="bg-varygo-gold text-varygo-blue-dark px-4 py-3 rounded-r-xl font-semibold hover:bg-opacity-90 transition duration-200 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-varygo-text-light/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-varygo-text-light/70 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} VaryGo AI. All rights reserved. | Discover Rwanda. Experience Beauty.
          </div>
          <div className="flex space-x-6 text-xs sm:text-sm">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-varygo-text-light/70 hover:text-varygo-gold transition duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
