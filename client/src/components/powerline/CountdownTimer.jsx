// client/src/components/powerline/CountdownTimer.jsx

import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ deadline, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Make sure deadline is a Date object
    const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = deadlineDate - now;
      
      if (difference <= 0) {
        setIsExpired(true);
        if (onExpire) {
          onExpire();
        }
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return {
        days,
        hours,
        minutes,
        seconds
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [deadline, onExpire]);
  
  // Add leading zeros
  const formatTimeUnit = (unit) => {
    return unit.toString().padStart(2, '0');
  };
  
  return (
    <div className={`countdown-timer ${isExpired ? 'expired' : ''}`}>
      {isExpired ? (
        <div className="expired-message">
          Decision window expired
        </div>
      ) : (
        <div className="countdown-units">
          <div className="countdown-unit">
            <span className="unit-value">{formatTimeUnit(timeLeft.days)}</span>
            <span className="unit-label">days</span>
          </div>
          <div className="countdown-unit">
            <span className="unit-value">{formatTimeUnit(timeLeft.hours)}</span>
            <span className="unit-label">hrs</span>
          </div>
          <div className="countdown-unit">
            <span className="unit-value">{formatTimeUnit(timeLeft.minutes)}</span>
            <span className="unit-label">min</span>
          </div>
          <div className="countdown-unit">
            <span className="unit-value">{formatTimeUnit(timeLeft.seconds)}</span>
            <span className="unit-label">sec</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
