// File: client/src/components/layout/Alert.js

import React, { useState, useEffect } from 'react';

const Alert = () => {
  // Alert state
  const [alerts, setAlerts] = useState([]);
  
  // For demonstration purposes, this is a simple alert system
  // In a real app, you would use a context or Redux for global alerts
  
  // Function to add an alert
  const addAlert = (msg, type = 'info', timeout = 5000) => {
    const id = Date.now();
    const newAlert = { id, msg, type };
    
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    
    // Auto remove after timeout
    setTimeout(() => {
      removeAlert(id);
    }, timeout);
    
    return id;
  };
  
  // Function to remove an alert
  const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };
  
  // Add to window for global access (for demo only)
  // In a real app, you would use a context provider
  useEffect(() => {
    window.showAlert = addAlert;
    
    return () => {
      delete window.showAlert;
    };
  }, []);
  
  // If no alerts, don't render
  if (alerts.length === 0) return null;
  
  return (
    <div className="fixed top-20 right-4 z-50 w-80 space-y-2">
      {alerts.map(alert => {
        // Determine style based on type
        const bgColor = 
          alert.type === 'success' ? 'bg-green-600' :
          alert.type === 'error' ? 'bg-red-600' :
          alert.type === 'warning' ? 'bg-yellow-600' :
          'bg-blue-600';
          
        return (
          <div 
            key={alert.id} 
            className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex justify-between items-start animate-fade-in`}
          >
            <div>{alert.msg}</div>
            <button 
              onClick={() => removeAlert(alert.id)}
              className="ml-3 text-white text-lg leading-none"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Alert;
