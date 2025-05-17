// client/src/components/powerline/PowerLinePreview.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { AuthContext } from '../../context/auth/AuthContext';

const PowerLinePreview = ({ enrolleeCount = 0, maxMembers = 10 }) => {
  const { user } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(enrolleeCount);
  
  // Connect to Socket.IO for real-time updates
  useEffect(() => {
    // Connect to the server
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    
    // Join user's room if authenticated
    if (user && user._id) {
      socket.emit('join', user._id);
    }
    
    // Listen for powerline updates
    socket.on('powerline_update', (data) => {
      if (data.type === 'new_member') {
        // Handle new member notification
        setNewMember({
          id: data.member._id,
          name: `${data.member.firstName} ${data.member.lastName.charAt(0)}.`,
          package: data.member.preferredPackage,
          time: 'Just now',
          isNew: true
        });
        
        // Update total count
        setTotalCount(prev => prev + 1);
        
        // After animation, add to members list
        setTimeout(() => {
          setMembers(prev => {
            // Update existing member times
            const updatedMembers = prev.map(member => ({
              ...member,
              time: member.time === 'Just now' ? '1 min ago' :
                   member.time === '1 min ago' ? '2 mins ago' :
                   member.time === '2 mins ago' ? '5 mins ago' :
                   member.time === '5 mins ago' ? '8 mins ago' : member.time,
              isNew: false
            }));
            
            // Add new member and limit to maxMembers
            return [
              {
                id: data.member._id,
                name: `${data.member.firstName} ${data.member.lastName.charAt(0)}.`,
                package: data.member.preferredPackage,
                time: 'Just now',
                isNew: false
              }, 
              ...updatedMembers
            ].slice(0, maxMembers);
          });
          
          // Clear new member after adding
          setNewMember(null);
        }, 2000);
      }
    });
    
    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, [user]);
  
  // Fetch initial member data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        
        // Fetch recent pre-enrollees
        const res = await axios.get('/api/pre-enrollees/recent', {
          params: { limit: maxMembers }
        });
        
        // Fetch total count if not provided
        if (!enrolleeCount) {
          const countRes = await axios.get('/api/pre-enrollees/count');
          setTotalCount(countRes.data.count);
        }
        
        // Format member data
        const memberData = res.data.map(member => ({
          id: member._id,
          name: `${member.firstName} ${member.lastName.charAt(0)}.`,
          package: member.preferredPackage,
          time: formatTime(member.createdAt),
          isNew: false
        }));
        
        setMembers(memberData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching PowerLine data:', err);
        setError('Failed to load PowerLine data');
        setLoading(false);
        
        // Fallback to simulation data for demo purposes
        simulatePowerlineData();
      }
    };
    
    fetchMembers();
  }, [enrolleeCount, maxMembers]);
  
  // Helper function to format time
  const formatTime = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInMinutes = Math.floor((now - createdAt) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 2) return '1 min ago';
    if (diffInMinutes < 5) return '2 mins ago';
    if (diffInMinutes < 10) return '5 mins ago';
    if (diffInMinutes < 30) return '10 mins ago';
    if (diffInMinutes < 60) return '30 mins ago';
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 2) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    // For older entries, show the actual date
    return createdAt.toLocaleDateString();
  };
  
  // Fallback function to simulate data for demo/development
  const simulatePowerlineData = () => {
    // Names and packages for simulation
    const names = [
      'Michael J.', 'Sarah K.', 'David L.', 'Jennifer M.', 'Robert P.',
      'Emily R.', 'Thomas W.', 'Elizabeth B.', 'Christopher G.', 'Jessica H.'
    ];
    
    const packages = ['Starter', 'Elite', 'Pro'];
    const times = ['Just now', '1 min ago', '2 mins ago', '5 mins ago', '10 mins ago'];
    
    // Generate simulated members
    const simulatedMembers = Array(maxMembers).fill().map((_, index) => ({
      id: index + 1,
      name: names[Math.floor(Math.random() * names.length)],
      package: packages[Math.floor(Math.random() * packages.length)],
      time: times[Math.min(index, times.length - 1)],
      isNew: false
    }));
    
    setMembers(simulatedMembers);
    setLoading(false);
  };
  
  // If still loading, show skeleton loader
  if (loading) {
    return (
      <div className="bg-dark-800 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="text-center mb-8">
            <div className="h-14 w-14 bg-dark-700 rounded-full mx-auto"></div>
            <div className="h-12 w-0.5 bg-dark-700 mx-auto my-2"></div>
          </div>
          
          {Array(3).fill().map((_, i) => (
            <div key={i} className="flex items-center bg-dark-700 p-3 rounded-lg mb-2">
              <div className="h-10 w-10 bg-dark-600 rounded-full mr-3"></div>
              <div className="flex-grow">
                <div className="h-4 bg-dark-600 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-dark-600 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="bg-dark-800 rounded-lg p-6">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2"><i className="fas fa-exclamation-circle"></i></div>
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => simulatePowerlineData()} 
            className="mt-4 text-primary-400 hover:text-primary-300"
          >
            Show Demo Data
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-800 rounded-lg p-6">
      <div className="text-center mb-8">
        <div className="h-14 w-14 bg-secondary-400 text-dark-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto">YOU</div>
        <div className="h-12 w-0.5 bg-gray-600 mx-auto my-2"></div>
      </div>
      
      {/* New Member Animation */}
      {newMember && (
        <div className="text-center mb-4 animate-pulse">
          <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center text-sm font-medium text-white mx-auto">NEW</div>
          <p className="text-sm text-gray-400 mt-1">{newMember.name} - {newMember.package}</p>
        </div>
      )}
      
      {/* Member List */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {members.map(member => (
          <div 
            key={member.id} 
            className={`flex items-center bg-dark-900 p-3 rounded-lg ${member.isNew ? 'animate-pulse' : ''}`}
          >
            <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-xs font-medium text-white mr-3">
              {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
            </div>
            <div className="flex-grow">
              <p className="font-medium">{member.name}</p>
              <p className="text-xs text-gray-400">
                {member.package === 'undecided' ? 'Undecided' : `${member.package} Package`} - {member.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-lg font-semibold text-secondary-400">{totalCount.toLocaleString()} Pre-Enrollees and Growing!</p>
        <p className="text-gray-400 mt-2">Join now to secure your position above future enrollees</p>
      </div>
    </div>
  );
};

export default PowerLinePreview;