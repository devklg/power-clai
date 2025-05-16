// File: client/src/pages/Register.js

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const Register = () => {
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const { email, password, confirmPassword } = formData;
  
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
      setRegisterError(error);
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
    setRegisterError('');
    
    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }
    
    if (!agreeTerms) {
      setRegisterError('You must agree to the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Register user
      await register({
        email,
        password,
        role: 'pre-enrollee' // Default role
      });
      
      // Navigation will happen via useEffect when isAuthenticated changes
    } catch (err) {
      // Error is handled by the auth context and the useEffect above
      console.error('Registration error:', err);
    }
  };
  
  return (
    <section className="py-16 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          {/* Logo/Branding */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Create an Account</span>
            </h1>
            <p className="text-gray-400">
              Join the PowerLine and start building your team
            </p>
          </div>
          
          {/* Registration Form */}
          <div className="bg-dark-800 rounded-lg shadow-lg p-8">
            {registerError && (
              <div className="bg-red-900 bg-opacity-25 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
                {registerError}
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
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
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
                <p className="text-xs text-gray-400 mt-1">
                  Must be at least 6 characters
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="mt-1 mr-2 h-4 w-4"
                  required
                />
                <label htmlFor="agreeTerms" className="text-gray-300 text-sm">
                  I agree to the <Link to="/terms" className="text-primary-400 hover:text-primary-300">Terms and Conditions</Link> and <Link to="/privacy" className="text-primary-400 hover:text-primary-300">Privacy Policy</Link>
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
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <div className="text-gray-400">
                <p>Already have an account?</p>
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                  Log In
                </Link>
              </div>
              
              <div className="mt-4 text-gray-400">
                <p>Not pre-enrolled yet?</p>
                <Link to="/pre-enroll" className="text-secondary-400 hover:text-secondary-300 font-medium">
                  Pre-Enroll First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
