// File: client/src/pages/PreEnrolleeDashboard.js

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import CountdownTimer from '../components/ui/CountdownTimer';
import PowerLinePreview from '../components/powerline/PowerLinePreview';
import axios from 'axios';

const PreEnrolleeDashboard = () => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Pre-enrollee data state
  const [preEnrolleeData, setPreEnrolleeData] = useState({
    positionNumber: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    preferredPackage: 'undecided',
    enrollerIdNumber: '',
    enrollerId: '',
    status: 'active',
    decisionDeadline: null,
    createdAt: null
  });
  
  // Team stats state
  const [teamStats, setTeamStats] = useState({
    teamSize: 0,
    leftTeam: 0,
    rightTeam: 0
  });
  
  // Recent activity state
  const [activities, setActivities] = useState([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch pre-enrollee data
  useEffect(() => {
    const fetchPreEnrolleeData = async () => {
      if (!isAuthenticated || loading) return;
      
      try {
        const res = await axios.get('/api/pre-enrollees/me');
        
        // Format date for deadline
        const decisionDate = new Date(res.data.decisionDeadline);
        
        setPreEnrolleeData({
          ...res.data,
          decisionDeadline: decisionDate
        });
        
        // Simulate team stats (would come from API in production)
        setTeamStats({
          teamSize: Math.floor(Math.random() * 20) + 5,
          leftTeam: Math.floor(Math.random() * 10) + 2,
          rightTeam: Math.floor(Math.random() * 10) + 3
        });
        
        // Simulate activities (would come from API in production)
        const simulatedActivities = [
          { 
            id: 1, 
            type: 'new_member', 
            text: 'Sarah Johnson joined your team',
            detail: 'Elite Package',
            time: '5 minutes ago',
            icon: 'user-plus',
            color: 'green'
          },
          { 
            id: 2, 
            type: 'system', 
            text: 'Your position has been secured',
            detail: `Position #${res.data.positionNumber}`,
            time: '2 hours ago',
            icon: 'shield-check',
            color: 'blue'
          },
          { 
            id: 3, 
            type: 'team_growth', 
            text: 'Your team is growing',
            detail: '3 new members today',
            time: '4 hours ago',
            icon: 'users',
            color: 'yellow'
          }
        ];
        
        setActivities(simulatedActivities);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching pre-enrollee data:', err);
        setError('Failed to load your pre-enrollment data');
        setIsLoading(false);
        
        // For demo purposes, set sample data
        // In production, you would handle this differently
        setPreEnrolleeData({
          ...preEnrolleeData,
          positionNumber: 3248,
          firstName: user?.name?.split(' ')[0] || 'Demo',
          lastName: user?.name?.split(' ')[1] || 'User',
          email: user?.email || 'demo@example.com',
          decisionDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });
      }
    };
    
    fetchPreEnrolleeData();
  }, [isAuthenticated, loading, user]);
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);
  
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-8 bg-dark-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pre-Enrollee Dashboard</h1>
          <p className="text-gray-400">
            Welcome, {preEnrolleeData.firstName}! Track your team growth and learn about the opportunity.
          </p>
        </div>
        
        {/* Decision Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Your Decision Window</h2>
              
              {preEnrolleeData.decisionDeadline && (
                <CountdownTimer targetDate={preEnrolleeData.decisionDeadline.getTime()} />
              )}
              
              <div className="mt-6 text-center">
                <Link 
                  to="/packages" 
                  className="bg-gradient-to-r from-secondary-500 to-secondary-700 hover:from-secondary-400 hover:to-secondary-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:-translate-y-1"
                >
                  Join Now & Lock Your Position
                </Link>
                <p className="mt-2 text-sm text-gray-400">
                  Secure your position and keep everyone who joins after you in your downline.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Your Status</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Position:</span>
                  <span className="font-bold ml-2">#{preEnrolleeData.positionNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="font-bold ml-2 text-yellow-500">Pre-Enrolled</span>
                </div>
                <div>
                  <span className="text-gray-400">Preferred Package:</span>
                  <span className="font-bold ml-2">
                    {preEnrolleeData.preferredPackage === 'undecided' 
                      ? 'Not Selected' 
                      : `${preEnrolleeData.preferredPackage.charAt(0).toUpperCase() + preEnrolleeData.preferredPackage.slice(1)}`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Team Size:</span>
                  <span className="font-bold ml-2">{teamStats.teamSize} Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Real-Time PowerLine and Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Growing PowerLine</h2>
              <div className="text-xs bg-green-500 text-dark-900 px-2 py-1 rounded-full font-medium">
                Live
              </div>
            </div>
            <PowerLinePreview enrolleeCount={3200 + teamStats.teamSize} />
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Live Activity Feed</h2>
            <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {activities.map(activity => (
                <div key={activity.id} className="flex items-center p-3 bg-dark-700 rounded-lg">
                  <div className={`text-${activity.color}-500 mr-3`}>
                    <i className={`fas fa-${activity.icon}`}></i>
                  </div>
                  <div>
                    <p className="font-semibold">{activity.text}</p>
                    <p className="text-sm text-gray-400">{activity.detail} - {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
            <div className="text-3xl text-primary-500 mb-4">
              <i className="fas fa-video"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Business Presentation</h3>
            <p className="text-gray-400 mb-4">Watch the full opportunity presentation</p>
            <a 
              href="https://youtu.be/dCNseEHe0ro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary-400 hover:text-primary-300 inline-flex items-center"
            >
              Watch Video <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
            <div className="text-3xl text-primary-500 mb-4">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Compensation Plan</h3>
            <p className="text-gray-400 mb-4">Learn about our 5 ways to earn</p>
            <a 
              href="/docs/talk-fusion-compensation-plan.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary-400 hover:text-primary-300 inline-flex items-center"
            >
              View PDF <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          
          <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
            <div className="text-3xl text-primary-500 mb-4">
              <i className="fas fa-user"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Your Enroller</h3>
            <p className="text-gray-400 mb-4">
              Kevin Gardner<br/>
              ID: 1001
            </p>
            <a 
              href="mailto:kevin@magnwm.com" 
              className="text-primary-400 hover:text-primary-300 inline-flex items-center"
            >
              Contact <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreEnrolleeDashboard;
