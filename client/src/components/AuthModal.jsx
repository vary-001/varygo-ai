// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AuthModal({ mode, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup, login, signInWithGoogle } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password should be at least 6 characters');
        }
        await signup(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="glass-effect-heavy rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative border border-varygo-gold/30 animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-varygo-text-light hover:text-varygo-gold transition duration-200"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-mountain text-varygo-blue-dark text-2xl"></i>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-varygo-text-light">
            {mode === 'login' ? 'Welcome Back' : 'Join VaryGo'}
          </h2>
          <p className="text-varygo-text-light/80 mt-2">
            {mode === 'login' 
              ? 'Sign in to continue your Rwandan adventure' 
              : 'Create an account to explore Rwanda with AI'
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-varygo-red/20 border border-varygo-red text-varygo-text-light p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}
        
        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 shadow-md flex items-center justify-center space-x-3 mb-4 disabled:opacity-50"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-varygo-text-light/20"></div>
          <span className="mx-4 text-varygo-text-light/60 text-sm">or</span>
          <div className="flex-grow border-t border-varygo-text-light/20"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-varygo-text-light mb-2 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={mode === 'register'}
                className="w-full p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold"
                placeholder="Enter your name"
              />
            </div>
          )}
          
          <div>
            <label className="block text-varygo-text-light mb-2 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-varygo-text-light mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold"
              placeholder="Enter your password"
            />
          </div>
          
          {mode === 'register' && (
            <div>
              <label className="block text-varygo-text-light mb-2 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={mode === 'register'}
                className="w-full p-3 rounded-xl bg-white bg-opacity-90 text-varygo-text-dark border-none focus:outline-none focus:ring-2 focus:ring-varygo-gold"
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light text-varygo-blue-dark py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200 shadow-md disabled:opacity-70 flex items-center justify-center"
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
        
        <div className="mt-6 text-center">
          <p className="text-varygo-text-light/80 text-sm">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              className="text-varygo-gold hover:underline font-medium"
              onClick={() => window.location.reload()} // In a real app, this would toggle mode
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-varygo-text-light/20">
          <p className="text-varygo-text-light/60 text-xs text-center">
            By continuing, you agree to VaryGo's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;