import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

// Initial State
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null
};

// Create Context
export const AuthContext = createContext(initialState);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/register', formData, config);
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg || 'Registration failed'
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg || 'Invalid credentials'
      });
    }
  };

  // Pre-Enroll (No Authentication Required)
  const preEnroll = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/pre-enrollees', formData, config);
      
      return res.data;
    } catch (err) {
      dispatch({
        type: 'PRE_ENROLL_FAIL',
        payload: err.response.data.msg || 'Pre-enrollment failed'
      });
      throw err;
    }
  };

  // Convert Pre-Enrollee to Promoter
  const convertToPromoter = async (preEnrolleeId, packageData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/pre-enrollees/${preEnrolleeId}/convert`, packageData, config);
      
      dispatch({
        type: 'CONVERT_SUCCESS',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'CONVERT_FAIL',
        payload: err.response.data.msg || 'Conversion failed'
      });
      throw err;
    }
  };

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  // Load user on initial load if token exists
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        preEnroll,
        convertToPromoter,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
