// File: client/src/components/layout/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          {/* Company Info */}
          <div className="w-full md:w-1/3 mb-8">
            <h3 className="text-xl font-bold mb-4 gradient-text">Magnificent Worldwide</h3>
            <p className="text-gray-400">
              Marketing & Sales Group - Team 25000<br/>
              Led by Kevin Gardner<br/>
              Building success through integrity, professionalism, and treating others as we want to be treated.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-8">
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition">Home</Link></li>
              <li><Link to="/#opportunity" className="text-gray-400 hover:text-primary-400 transition">Opportunity</Link></li>
              <li><Link to="/#compensation" className="text-gray-400 hover:text-primary-400 transition">Compensation</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-primary-400 transition">Login</Link></li>
              <li><Link to="/pre-enroll" className="text-gray-400 hover:text-primary-400 transition">Pre-Enroll Now</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="w-full md:w-1/3 mb-8">
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 mt-1"><i className="fas fa-envelope"></i></span>
                <span className="text-gray-400">kevin@magnwm.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 mt-1"><i className="fas fa-user"></i></span>
                <span className="text-gray-400">Sponsor: Kevin Gardner - ID: 1001</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3 mt-1"><i className="fas fa-globe"></i></span>
                <span className="text-gray-400">Serving clients worldwide</span>
              </li>
              <li className="flex items-start mt-4">
                <span className="text-gray-400">
                  <a href="https://www.facebook.com/magnificentworldwide" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 mr-4 text-lg">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com/magnificentworldwide" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 mr-4 text-lg">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/kevingardnermwm" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 mr-4 text-lg">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.youtube.com/channel/magnificentworldwide" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 text-lg">
                    <i className="fab fa-youtube"></i>
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Magnificent Worldwide Marketing & Sales Group. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Talk Fusion is a registered trademark of Talk Fusion, Inc. This is an independent promoter tool.
          </p>
          <div className="mt-4 text-xs text-gray-600 flex justify-center space-x-4">
            <Link to="/terms" className="hover:text-gray-400 transition">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-gray-400 transition">Income Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
