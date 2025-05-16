// File: client/src/components/layout/Navbar.js

import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Determine if on dashboard pages
  const isDashboardPage = location.pathname.includes('/dashboard') || 
                          location.pathname.includes('/promoter') || 
                          location.pathname.includes('/admin');
  
  return (
    <nav className="bg-dark-900 py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="flex items-center">
            <span className="gradient-text">Magnificent Worldwide</span>
          </Link>
          <span className="text-sm text-gray-400">Marketing & Sales Group - Team 25000</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-primary-400 transition">Home</Link>
          <Link to="/#opportunity" className="text-gray-300 hover:text-primary-400 transition">Opportunity</Link>
          <Link to="/#compensation" className="text-gray-300 hover:text-primary-400 transition">Compensation</Link>
          
          {isAuthenticated && (
            <>
              {/* User type specific links */}
              {user && user.role === 'admin' && (
                <Link to="/admin" className="text-gray-300 hover:text-primary-400 transition">Admin</Link>
              )}
              
              {/* Dashboard link changes based on user status */}
              {user && user.role === 'promoter' ? (
                <Link to="/promoter" className="text-gray-300 hover:text-primary-400 transition">Promoter Dashboard</Link>
              ) : (
                <Link to="/dashboard" className="text-gray-300 hover:text-primary-400 transition">Dashboard</Link>
              )}
            </>
          )}
          
          <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition">Contact</Link>
        </div>
        
        {/* Call to Action Button */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md transition">
                <span className="mr-2">My Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-md shadow-lg overflow-hidden z-50 hidden group-hover:block">
                <div className="py-2">
                  {isDashboardPage ? (
                    <Link to="/" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700">
                      Home Page
                    </Link>
                  ) : (
                    <Link to={user && user.role === 'promoter' ? '/promoter' : '/dashboard'} className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700">
                      Dashboard
                    </Link>
                  )}
                  
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700">
                    Profile Settings
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-dark-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="text-primary-400 hover:text-primary-300 px-4 py-2 rounded-md transition">
                Login
              </Link>
              <Link to="/pre-enroll" className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white px-4 py-2 rounded-md transition">
                Pre-Enroll Now
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="ml-4 md:hidden text-gray-300 hover:text-white"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-dark-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <Link to="/" className="text-gray-300 hover:text-primary-400 py-2 transition">Home</Link>
            <Link to="/#opportunity" className="text-gray-300 hover:text-primary-400 py-2 transition">Opportunity</Link>
            <Link to="/#compensation" className="text-gray-300 hover:text-primary-400 py-2 transition">Compensation</Link>
            
            {isAuthenticated && (
              <>
                {/* User type specific links */}
                {user && user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-300 hover:text-primary-400 py-2 transition">Admin</Link>
                )}
                
                {/* Dashboard link changes based on user status */}
                {user && user.role === 'promoter' ? (
                  <Link to="/promoter" className="text-gray-300 hover:text-primary-400 py-2 transition">Promoter Dashboard</Link>
                ) : (
                  <Link to="/dashboard" className="text-gray-300 hover:text-primary-400 py-2 transition">Dashboard</Link>
                )}
                
                <Link to="/profile" className="text-gray-300 hover:text-primary-400 py-2 transition">Profile Settings</Link>
                
                <button
                  onClick={logout}
                  className="text-left text-gray-300 hover:text-primary-400 py-2 transition"
                >
                  Logout
                </button>
              </>
            )}
            
            <Link to="/contact" className="text-gray-300 hover:text-primary-400 py-2 transition">Contact</Link>
            
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-primary-400 hover:text-primary-300 py-2 transition">
                  Login
                </Link>
                <Link to="/pre-enroll" className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white py-2 px-4 rounded-md transition">
                  Pre-Enroll Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
