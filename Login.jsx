// File: client/src/pages/Login.js

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const Login = () => {
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { email, password } = formData;
  
  // Clear form errors when component mounts
  useEffect(() => {
    clearErrors();
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, clearErrors]);
  
  // Watch for auth errors
  useEffect(() => {
    if (error) {
      setLoginError(error);
      setIsSubmitting(false);
    }
  }, [error]);
  
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    
    // Clear previous errors
    setLoginError('');
    
    // Validate inputs
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Attempt to login
      await login({
        email,
        password
      });
      
      // Save email in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Navigate based on user role (will happen automatically via useEffect when isAuthenticated changes)
    } catch (err) {
      // Error is handled by the auth context and the useEffect above
      console.error('Login error:', err);
    }
  };
  
  // Check for remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail
      }));
      setRememberMe(true);
    }
  }, []);
  
  return (
    <section className="py-16 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          {/* Logo/Branding */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Login to PowerLine</span>
            </h1>
            <p className="text-gray-400">
              Access your dashboard to track your team growth
            </p>
          </div>
          
          {/* Login Form */}
          <div className="bg-dark-800 rounded-lg shadow-lg p-8">
            {loginError && (
              <div className="bg-red-900 bg-opacity-25 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-gray-300">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-primary-400 hover:text-primary-300 text-sm">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="rememberMe" className="text-gray-300 text-sm">
                  Remember my email
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white font-bold py-3 rounded-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-primary-500 hover:to-primary-700 transform hover:-translate-y-1'} transition duration-300`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : 'Log In'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-gray-400">
              <p>Don't have an account?</p>
              <div className="mt-2">
                <Link to="/pre-enroll" className="text-secondary-400 hover:text-secondary-300 font-medium">
                  Pre-Enroll Now
                </Link>
                <span className="mx-2">•</span>
                <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
