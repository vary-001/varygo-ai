// src/components/AuthModal.jsx
import React, { useState } from 'react';

function AuthModal({ mode, onClose, onAuthSuccess, isMobile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const userData = {
        id: 1,
        name: mode === 'register' ? formData.name : 'Demo User',
        email: formData.email
      };
      onAuthSuccess(userData);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-3 xs:p-4">
      <div className={`glass-effect rounded-2xl shadow-2xl w-full max-w-md ${isMobile ? 'p-5' : 'p-6 md:p-8'} relative border border-varygo-gold/30`}>
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 xs:top-4 xs:right-4 text-varygo-text-light hover:text-varygo-gold transition duration-200"
        >
          <i className="fas fa-times text-lg xs:text-xl"></i>
        </button>
        
        <div className="text-center mb-4 xs:mb-6">
          <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-lg`}>
            <i className="fas fa-mountain text-varygo-blue-dark text-xl xs:text-2xl"></i>
          </div>
          <h2 className={`font-heading ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} text-varygo-text-light`}>
            {mode === 'login' ? 'Welcome Back' : 'Join VaryGo'}
          </h2>
          <p className="text-varygo-text-light/80 mt-1 xs:mt-2 text-sm xs:text-base">
            {mode === 'login' 
              ? 'Sign in to continue your Rwandan adventure' 
              : 'Create an account to explore Rwanda with AI'
            }
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-varygo-text-light mb-1 xs:mb-2 text-xs xs:text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={mode === 'register'}
                className="w-full p-2.5 xs:p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold text-sm xs:text-base"
                placeholder="Enter your name"
              />
            </div>
          )}
          
          <div>
            <label className="block text-varygo-text-light mb-1 xs:mb-2 text-xs xs:text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 xs:p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold text-sm xs:text-base"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-varygo-text-light mb-1 xs:mb-2 text-xs xs:text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2.5 xs:p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold text-sm xs:text-base"
              placeholder="Enter your password"
            />
          </div>
          
          {mode === 'register' && (
            <div>
              <label className="block text-varygo-text-light mb-1 xs:mb-2 text-xs xs:text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={mode === 'register'}
                className="w-full p-2.5 xs:p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold text-sm xs:text-base"
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light text-varygo-blue-dark py-2.5 xs:py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200 shadow-md disabled:opacity-70 flex items-center justify-center text-sm xs:text-base"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
        
        <div className="mt-4 xs:mt-6 text-center">
          <p className="text-varygo-text-light/80 text-xs xs:text-sm">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              className="text-varygo-gold hover:underline font-medium"
              onClick={() => window.location.reload()}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        
        <div className="mt-4 xs:mt-6 pt-3 xs:pt-4 border-t border-varygo-text-light/20">
          <p className="text-varygo-text-light/60 text-xs text-center">
            By continuing, you agree to VaryGo's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;