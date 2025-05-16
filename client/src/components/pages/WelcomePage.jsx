// File: client/src/pages/WelcomePage.js

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const WelcomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  
  // State for position data
  const [positionData, setPositionData] = useState({
    positionNumber: 0,
    firstName: '',
    email: '',
    decisionDeadline: ''
  });
  
  // State for account creation
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Check if we have position data from the location state
    if (location.state && location.state.positionNumber) {
      const { positionNumber, firstName, email } = location.state;
      
      // Calculate decision deadline (7 days from now)
      const decisionDate = new Date();
      decisionDate.setDate(decisionDate.getDate() + 7);
      const formattedDeadline = decisionDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      setPositionData({
        positionNumber,
        firstName: firstName || 'there',
        email: email || '',
        decisionDeadline: formattedDeadline
      });
    } else {
      // If no position data, redirect to pre-enrollment
      navigate('/pre-enroll');
    }
  }, [location.state, navigate]);
  
  // Handle account creation
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setIsSubmitting(true);
    
    try {
      // Register the user
      await register({
        email: positionData.email,
        password,
        role: 'pre-enrollee'
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl text-green-500 mb-4">
              <i className="fas fa-check-circle"></i>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to the Team!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Congratulations{positionData.firstName ? `, ${positionData.firstName}` : ''}! You've secured your position in our PowerLine.
            </p>
          </div>
          
          {/* Pre-Enrollment Details */}
          <div className="bg-dark-800 rounded-lg p-8 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-secondary-400">Your Pre-Enrollment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div>
                <span className="text-gray-400">Position Number:</span>
                <span className="font-bold ml-2">#{positionData.positionNumber}</span>
              </div>
              <div>
                <span className="text-gray-400">Enroller:</span>
                <span className="font-bold ml-2">Kevin Gardner</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className="font-bold ml-2 text-green-500">Pre-Enrolled</span>
              </div>
              <div>
                <span className="text-gray-400">Decision Deadline:</span>
                <span className="font-bold ml-2">{positionData.decisionDeadline}</span>
              </div>
            </div>
          </div>
          
          {!showCreateAccount ? (
            <div className="space-y-4">
              <button 
                onClick={() => setShowCreateAccount(true)} 
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:-translate-y-1"
              >
                Create Account to Access Dashboard
              </button>
              <p className="text-gray-400">
                Create an account to track your team growth in real-time and access exclusive resources.
              </p>
            </div>
          ) : (
            <div className="bg-dark-800 rounded-lg p-8 shadow-lg max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Create Your Account</h2>
              
              {error && (
                <div className="bg-red-900 bg-opacity-25 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div className="text-left">
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input 
                    type="email"
                    value={positionData.email}
                    disabled
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg text-gray-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">This is the email you pre-enrolled with</p>
                </div>
                
                <div className="text-left">
                  <label className="block text-gray-300 mb-1">Password</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-gray-300 mb-1">Confirm Password</label>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-3 bg-dark-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-primary-600 to-primary-800 text-white font-bold py-3 px-8 rounded-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-primary-500 hover:to-primary-700 transform hover:-translate-y-1'} transition duration-300`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </span>
                    ) : 'Create Account & Go to Dashboard'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowCreateAccount(false)}
                    className="mt-3 text-gray-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="mt-8 text-sm text-gray-400">
            <p>We've also sent your pre-enrollment details to {positionData.email}</p>
            <p className="mt-2">
              Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
