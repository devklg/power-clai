// client/src/components/powerline/PowerLineVisualization.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../../contexts/AuthContext';
import CountdownTimer from './CountdownTimer';
import './PowerLineVisualization.css';

const PowerLineVisualization = () => {
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  
  const { socket } = useSocket();
  const { user } = useAuth();
  
  // Fetch initial PowerLine data
  useEffect(() => {
    const fetchPowerLineData = async () => {
      try {
        setLoading(true);
        
        // Fetch recent pre-enrollees
        const recentRes = await fetch('/api/pre-enrollees/recent?limit=20');
        
        if (!recentRes.ok) {
          throw new Error('Failed to fetch recent pre-enrollees');
        }
        
        const recentData = await recentRes.json();
        
        // Fetch total count
        const countRes = await fetch('/api/pre-enrollees/count');
        
        if (!countRes.ok) {
          throw new Error('Failed to fetch pre-enrollee count');
        }
        
        const countData = await countRes.json();
        
        setMembers(recentData);
        setTotalMembers(countData.count);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching PowerLine data:', err);
        setError('Failed to load PowerLine data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPowerLineData();
  }, []);
  
  // Listen for real-time updates
  useEffect(() => {
    if (!socket) return;
    
    const handlePowerLineUpdate = (data) => {
      console.log('PowerLine update received:', data);
      
      if (data.type === 'new_pre_enrollee') {
        // Add new pre-enrollee to the list
        const newMember = {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          preferredPackage: data.data.preferredPackage || 'undecided',
          createdAt: data.data.timestamp,
          isNew: true // Flag for animation
        };
        
        setMembers(prevMembers => [newMember, ...prevMembers.slice(0, 19)]);
        setTotalMembers(prev => prev + 1);
        
        // Remove the 'new' flag after animation completes
        setTimeout(() => {
          setMembers(prevMembers => 
            prevMembers.map((member, index) => 
              index === 0 ? { ...member, isNew: false } : member
            )
          );
        }, 3000);
      } else if (data.type === 'conversion') {
        // Update member status or remove from list
        const convertedPosition = data.data.position;
        setMembers(prevMembers => 
          prevMembers.filter(member => 
            member.positionNumber !== convertedPosition
          )
        );
      }
    };
    
    socket.on('powerline_update', handlePowerLineUpdate);
    
    return () => {
      socket.off('powerline_update', handlePowerLineUpdate);
    };
  }, [socket]);
  
  // Scroll to top when new members are added
  useEffect(() => {
    if (containerRef.current && members.length > 0 && members[0].isNew) {
      containerRef.current.scrollTop = 0;
    }
  }, [members]);
  
  if (loading) {
    return (
      <div className="powerline-loading">
        <div className="spinner"></div>
        <p>Loading PowerLine data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="powerline-error">
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="powerline-container">
      <div className="powerline-header">
        <h2>PowerLine Visualization</h2>
        <div className="powerline-stats">
          <div className="stat-item">
            <span className="stat-value">{totalMembers}</span>
            <span className="stat-label">Total Pre-Enrollees</span>
          </div>
          {user && user.preEnrollee && (
            <div className="stat-item">
              <span className="stat-value">#{user.preEnrollee.positionNumber}</span>
              <span className="stat-label">Your Position</span>
            </div>
          )}
          {user && user.preEnrollee && (
            <div className="stat-item">
              <CountdownTimer 
                deadline={new Date(user.preEnrollee.decisionDeadline)} 
                onExpire={() => console.log('Decision window expired')}
              />
              <span className="stat-label">Decision Window</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="powerline-visualization">
        {user && user.preEnrollee && (
          <div className="your-position">
            <div className="position-node you">
              <span className="position-label">YOU</span>
            </div>
            <div className="connection-line"></div>
          </div>
        )}
        
        <div className="powerline-members" ref={containerRef}>
          {members.map((member, index) => (
            <div 
              key={index}
              className={`member-node ${member.isNew ? 'new-member' : ''}`}
            >
              <div className="member-avatar">
                {member.firstName.charAt(0)}{member.lastName.charAt(0)}
              </div>
              <div className="member-info">
                <div className="member-name">
                  {member.firstName} {member.lastName}
                </div>
                <div className="member-details">
                  <span className="member-package">
                    {member.preferredPackage !== 'undecided' 
                      ? `${member.preferredPackage.charAt(0).toUpperCase()}${member.preferredPackage.slice(1)} Package` 
                      : 'Package: Undecided'}
                  </span>
                  <span className="member-time">
                    {new Date(member.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="connection-line"></div>
            </div>
          ))}
          
          {members.length === 0 && (
            <div className="no-members">
              <p>No pre-enrollees in the PowerLine yet.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="powerline-footer">
        <p className="powerline-info">
          The PowerLine shows new pre-enrollees in real-time. Your position is locked in when you join, and everyone who joins after you will be placed below your position.
        </p>
        {!user && (
          <button className="cta-button">Join the PowerLine</button>
        )}
        {user && user.preEnrollee && user.preEnrollee.status === 'active' && (
          <button className="cta-button">Secure Your Position Now</button>
        )}
      </div>
    </div>
  );
};

export default PowerLineVisualization;

