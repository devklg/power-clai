// client/src/contexts/SocketContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, token } = useAuth();
  
  useEffect(() => {
    // Only connect if the user is authenticated
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }
    
    // Determine the socket server URL based on environment
    const socketUrl = process.env.NODE_ENV === 'production'
      ? window.location.origin
      : 'http://localhost:5000';
    
    // Create socket connection with authentication
    const newSocket = io(socketUrl, {
      auth: {
        token
      }
    });
    
    // Socket event handlers
    newSocket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
      
      // Join user's room for private notifications
      if (isAuthenticated) {
        newSocket.emit('join', token);
      }
    });
    
    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      setConnected(false);
    });
    
    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });
    
    // Set the socket state
    setSocket(newSocket);
    
    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, token]);
  
  // Value to provide in the context
  const value = {
    socket,
    connected,
    // Helper function to emit events with error handling
    emit: (event, data, callback) => {
      if (!socket || !connected) {
        console.error('Socket not connected, cannot emit event:', event);
        if (callback) callback(new Error('Socket not connected'));
        return;
      }
      
      socket.emit(event, data, callback);
    }
  };
  
  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
