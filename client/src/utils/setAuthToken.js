// File: client/src/utils/setAuthToken.js

import axios from 'axios';

/**
 * Set or remove the authorization token in axios headers
 * @param {string|null} token - JWT token to set, or null to remove
 */
const setAuthToken = token => {
  if (token) {
    // Set token to Auth header
    axios.defaults.headers.common['x-auth-token'] = token;
    // Also store in localStorage
    localStorage.setItem('token', token);
  } else {
    // Remove token from Auth header
    delete axios.defaults.headers.common['x-auth-token'];
    // Also remove from localStorage
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
