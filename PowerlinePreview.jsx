import React, { useState, useEffect } from 'react';

const PowerLinePreview = ({ enrolleeCount = 3247 }) => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState(null);
  
  // Names and packages for simulation
  const names = [
    'Michael J.', 'Sarah K.', 'David L.', 'Jennifer M.', 'Robert P.',
    'Emily R.', 'Thomas W.', 'Elizabeth B.', 'Christopher G.', 'Jessica H.',
    'Daniel N.', 'Amanda T.', 'James S.', 'Ashley V.', 'John D.'
  ];
  
  const packages = ['Starter', 'Elite', 'Pro'];
  
  // Simulate adding a new member every 15 seconds
  useEffect(() => {
    // Add initial members
    setMembers([
      { id: 1, name: 'Sarah K.', package: 'Elite', time: '2 mins ago' },
      { id: 2, name: 'David L.', package: 'Starter', time: '5 mins ago' },
      { id: 3, name: 'Emily R.', package: 'Pro', time: '8 mins ago' }
    ]);
    
    // Set up interval to add new members
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPackage = packages[Math.floor(Math.random() * packages.length)];
      
      const newMemberObj = {
        id: Date.now(),
        name: randomName,
        package: randomPackage,
        time: 'Just now',
        isNew: true
      };
      
      // Set as the new member to trigger animation
      setNewMember(newMemberObj);
      
      // Add to members list and update times
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
          
          // Add new member and limit to 10 members
          return [newMemberObj, ...updatedMembers].slice(0, 10);
        });
        
        // Clear new member after adding
        setNewMember(null);
      }, 2000);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
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
              <p className="text-xs text-gray-400">{member.package} Package - {member.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-lg font-semibold text-secondary-400">{enrolleeCount.toLocaleString()} Pre-Enrollees and Growing!</p>
        <p className="text-gray-400 mt-2">Join now to secure your position above future enrollees</p>
      </div>
    </div>
  );
};

export default PowerLinePreview;
