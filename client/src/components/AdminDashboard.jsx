// PowerLine Management Component
const PowerLineManagement = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  const powerlineStats = {
    totalMembers: 5472,
    activePreEnrollees: 156,
    conversionRate: '32%',
    averageDecisionTime: '4.3 days',
    growthRate: '+124 this week'
  };
  
  // Sample data for visualization
  const recentPowerlineActivity = [
    { id: 1, name: 'John Smith', position: 3242, date: '2025-05-15 14:23:05', sponsor: 'Direct' },
    { id: 2, name: 'Maria Rodriguez', position: 3243, date: '2025-05-15 15:47:12', sponsor: 'Kevin Gardner' },
    { id: 3, name: 'James Johnson', position: 3244, date: '2025-05-15 16:30:22', sponsor: 'Lisa Martinez' },
    { id: 4, name: 'Sarah Williams', position: 3245, date: '2025-05-16 09:12:18', sponsor: 'Direct' },
    { id: 5, name: 'Robert Brown', position: 3246, date: '2025-05-16 10:45:03', sponsor: 'David Wilson' },
    { id: 6, name: 'Jennifer Garcia', position: 3247, date: '2025-05-16 14:12:47', sponsor: 'Kevin Gardner' },
    { id: 7, name: 'Michael Miller', position: 3248, date: '2025-05-17 08:34:16', sponsor: 'Lisa Martinez' },
    { id: 8, name: 'Elena Ramirez', position: 3249, date: '2025-05-17 11:22:39', sponsor: 'Direct' },
    { id: 9, name: 'William Taylor', position: 3250, date: '2025-05-17 16:05:53', sponsor: 'Kevin Gardner' },
    { id: 10, name: 'Jessica Lee', position: 3251, date: '2025-05-18 09:48:27', sponsor: 'Thomas Brown' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">PowerLine Management</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`${showSettings ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-lg text-sm`}
          >
            <i className="fas fa-cog mr-2"></i>Settings
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm">
            <i className="fas fa-sync-alt mr-2"></i>Process PowerLine
          </button>
        </div>
      </div>
      
      {/* PowerLine Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Members</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">{powerlineStats.totalMembers}</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Active Pre-Enrollees</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">{powerlineStats.activePreEnrollees}</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Conversion Rate</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">{powerlineStats.conversionRate}</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Avg Decision Time</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">{powerlineStats.averageDecisionTime}</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Growth Rate</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">{powerlineStats.growthRate}</p>
          </div>
        </div>
      </div>
      
      {/* PowerLine Settings (conditionally rendered) */}
      {showSettings && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">PowerLine Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-semibold mb-3">Processing Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    <span className="ml-2 text-gray-300">Automatic Processing (Daily)</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    <span className="ml-2 text-gray-300">Place by Registration Time</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    <span className="ml-2 text-gray-300">Auto-qualify with Purchase</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                    <span className="ml-2 text-gray-300">Require Sponsor Approval</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-3">Binary Placement Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Default Placement</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3">
                    <option value="auto">Auto-balance</option>
                    <option value="left">Left Leg Preferred</option>
                    <option value="right">Right Leg Preferred</option>
                    <option value="sponsor">Sponsor Preference</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Team Balance Threshold</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3">
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    <span className="ml-2 text-gray-300">Force Balance</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    <span className="ml-2 text-gray-300">Enable Spillover</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Save Settings
            </button>
          </div>
        </div>
      )}
      
      {/* PowerLine Visualization */}
      <div className="bg-gray-800 rounded-lg shadow-lg mb-6 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-bold">PowerLine Visualization</h3>
        </div>
        <div className="p-4 flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mb-2">
                  ROOT
                </div>
                <div className="w-1 h-8 bg-gray-700"></div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                      L1
                    </div>
                    <div className="w-1 h-6 bg-gray-700"></div>
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                      L2
                    </div>
                    <div className="w-1 h-6 bg-gray-700"></div>
                    <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center font-bold text-sm">
                      L3
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center font-bold">
                      R1
                    </div>
                    <div className="w-1 h-6 bg-gray-700"></div>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-sm">
                      R2
                    </div>
                    <div className="w-1 h-6 bg-gray-700"></div>
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center font-bold text-sm">
                      R3
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 text-gray-400 text-sm">
                Simplified visualization. <a href="#" className="text-blue-400 hover:underline">Click to view full interactive tree</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent PowerLine Activity */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-bold">Recent PowerLine Activity</h3>
          <div className="text-sm text-gray-400">Last 10 entries</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Position</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Sponsor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPowerlineActivity.map((item) => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-4">#{item.position}</td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">{item.sponsor}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-400 hover:text-import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Admin Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Check for authentication on component mount
  useEffect(() => {
    // This would be replaced with a real auth check
    const isAuthenticated = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-gray-400 hover:text-white">
                <i className="fas fa-bell"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="font-bold">A</span>
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'pre-enrollees' && <PreEnrollees />}
          {activeTab === 'promoters' && <Promoters />}
          {activeTab === 'commissions' && <Commissions />}
          {activeTab === 'powerline' && <PowerLineManagement />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

// Components
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-tachometer-alt' },
    { id: 'pre-enrollees', label: 'Pre-Enrollees', icon: 'fas fa-user-clock' },
    { id: 'promoters', label: 'Promoters', icon: 'fas fa-users' },
    { id: 'commissions', label: 'Commissions', icon: 'fas fa-dollar-sign' },
    { id: 'powerline', label: 'PowerLine', icon: 'fas fa-project-diagram' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-bold">
          <span className="bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </h2>
        <p className="text-xs text-gray-400">Magnificent Worldwide</p>
      </div>
      <nav className="mt-4">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-900 text-blue-300 border-l-4 border-blue-500'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <i className={`${item.icon} mr-3 w-5`}></i>
                <span>{item.label}</span>
                {item.id === 'pre-enrollees' && (
                  <span className="ml-auto bg-yellow-600 text-xs py-1 px-2 rounded-full">
                    5
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const statCards = [
    { title: 'Pre-Enrollees', value: '156', change: '+12% ↑', color: 'blue' },
    { title: 'Promoters', value: '87', change: '+5% ↑', color: 'green' },
    { title: 'Commissions', value: '$8,450', change: '+15% ↑', color: 'yellow' },
    { title: 'Conversion Rate', value: '32%', change: '+3% ↑', color: 'purple' }
  ];

  const recentActivities = [
    { id: 1, type: 'New Join', user: 'Sarah Jones', detail: 'Level 1-L', time: '14:23' },
    { id: 2, type: 'Qualification', user: 'James Lee', detail: '+100 Vol-R', time: '15:47' },
    { id: 3, type: 'Commission', user: 'Kevin Gardner', detail: '+$50', time: '16:30' },
    { id: 4, type: 'New Join', user: 'Robert Chen', detail: 'Level 2-R', time: '17:12' },
    { id: 5, type: 'Conversion', user: 'Maria Silva', detail: 'Elite Package', time: '17:45' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-blue-500">
            <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <span className={`text-xs text-${card.color === 'blue' ? 'blue-400' : 
                card.color === 'green' ? 'green-400' : 
                card.color === 'yellow' ? 'yellow-400' : 'purple-400'}`}>
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Activity and Team Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold">Recent Activity</h3>
            <span className="text-xs text-gray-400">Today, May 18, 2025</span>
          </div>
          <div className="p-4">
            <div className="overflow-hidden">
              <ul>
                {recentActivities.map(activity => (
                  <li key={activity.id} className="flex items-center py-3 border-b border-gray-700 last:border-0">
                    <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                      activity.type === 'New Join' ? 'bg-green-900 text-green-300' :
                      activity.type === 'Qualification' ? 'bg-blue-900 text-blue-300' :
                      activity.type === 'Commission' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-purple-900 text-purple-300'
                    }`}>
                      <i className={
                        activity.type === 'New Join' ? 'fas fa-user-plus' :
                        activity.type === 'Qualification' ? 'fas fa-certificate' :
                        activity.type === 'Commission' ? 'fas fa-dollar-sign' :
                        'fas fa-exchange-alt'
                      }></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-gray-400">{activity.user} - {activity.detail}</p>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Team Structure */}
        <div className="bg-gray-800 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-bold">PowerLine Growth</h3>
          </div>
          <div className="p-4 h-80 flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <div className="text-xl font-bold mb-2">5,472</div>
                <div className="text-sm text-gray-400">Total Pre-Enrollees</div>
                <div className="text-xs text-green-400 mt-1">+124 this week</div>
              </div>
              
              <div className="relative w-full h-40">
                {/* Simple chart visualization */}
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  {[35, 45, 55, 40, 60, 75, 65].map((value, i) => (
                    <div key={i} className="flex-1 mx-1">
                      <div 
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                        style={{ height: `${value}%` }}
                      ></div>
                      <div className="text-xs text-center mt-1 text-gray-500">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-Enrollees Component
const PreEnrollees = () => {
  const preEnrollees = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '(555) 123-4567', package: 'Elite', deadline: '2025-05-20', status: 'active', position: 3242 },
    { id: 2, name: 'Maria Rodriguez', email: 'maria.r@example.com', phone: '(555) 234-5678', package: 'Pro', deadline: '2025-05-21', status: 'active', position: 3243 },
    { id: 3, name: 'James Johnson', email: 'james.j@example.com', phone: '(555) 345-6789', package: 'Starter', deadline: '2025-05-22', status: 'active', position: 3244 },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '(555) 456-7890', package: 'Undecided', deadline: '2025-05-19', status: 'active', position: 3245 },
    { id: 5, name: 'Robert Brown', email: 'robert.b@example.com', phone: '(555) 567-8901', package: 'Elite', deadline: '2025-05-23', status: 'active', position: 3246 },
    { id: 6, name: 'Jennifer Garcia', email: 'jennifer.g@example.com', phone: '(555) 678-9012', package: 'Pro', deadline: '2025-05-24', status: 'active', position: 3247 },
    { id: 7, name: 'Michael Miller', email: 'michael.m@example.com', phone: '(555) 789-0123', package: 'Starter', deadline: '2025-05-25', status: 'active', position: 3248 }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pre-Enrollees</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-700 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
            <i className="fas fa-filter mr-2"></i>Filter
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm">
            <i className="fas fa-download mr-2"></i>Export
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-left py-3 px-4 font-medium text-gray-400">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Package</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Position</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Deadline</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {preEnrollees.map(enrollee => (
                <tr key={enrollee.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-4">{enrollee.id}</td>
                  <td className="py-3 px-4 font-medium">{enrollee.name}</td>
                  <td className="py-3 px-4">{enrollee.email}</td>
                  <td className="py-3 px-4">{enrollee.phone}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      enrollee.package === 'Pro' ? 'bg-purple-900 text-purple-300' :
                      enrollee.package === 'Elite' ? 'bg-yellow-900 text-yellow-300' :
                      enrollee.package === 'Starter' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-900 text-gray-300'
                    }`}>
                      {enrollee.package}
                    </span>
                  </td>
                  <td className="py-3 px-4">#{enrollee.position}</td>
                  <td className="py-3 px-4">{new Date(enrollee.deadline).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-300">
                      {enrollee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="p-1 text-yellow-400 hover:text-yellow-300" title="Extend Deadline">
                        <i className="fas fa-clock"></i>
                      </button>
                      <button className="p-1 text-green-400 hover:text-green-300" title="Convert to Promoter">
                        <i className="fas fa-user-check"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-900 py-3 px-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing 1-7 of 156 pre-enrollees
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">Previous</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">2</button>
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">3</button>
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Promoters Component
const Promoters = () => {
  const promoters = [
    { id: 1, name: 'Kevin Gardner', email: 'kevin.g@example.com', package: 'Pro', leftTeam: 28, rightTeam: 35, volume: 4650, earnings: '$2,350', rank: 'Gold' },
    { id: 2, name: 'Lisa Martinez', email: 'lisa.m@example.com', package: 'Elite', leftTeam: 15, rightTeam: 18, volume: 2350, earnings: '$1,150', rank: 'Silver' },
    { id: 3, name: 'David Wilson', email: 'david.w@example.com', package: 'Pro', leftTeam: 22, rightTeam: 19, volume: 3200, earnings: '$1,575', rank: 'Silver' },
    { id: 4, name: 'Emily Johnson', email: 'emily.j@example.com', package: 'Starter', leftTeam: 8, rightTeam: 5, volume: 950, earnings: '$450', rank: 'Bronze' },
    { id: 5, name: 'Thomas Brown', email: 'thomas.b@example.com', package: 'Elite', leftTeam: 12, rightTeam: 14, volume: 1800, earnings: '$875', rank: 'Bronze' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promoters</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-700 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
            <i className="fas fa-filter mr-2"></i>Filter
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm">
            <i className="fas fa-download mr-2"></i>Export
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Promoters</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">87</p>
            <span className="text-xs text-green-400">+5% ↑</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-yellow-500">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Active This Week</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">65</p>
            <span className="text-xs text-green-400">+12% ↑</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Team Volume</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">58,430</p>
            <span className="text-xs text-green-400">+8% ↑</span>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-purple-500">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Avg. Team Size</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">18.5</p>
            <span className="text-xs text-green-400">+3% ↑</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-left py-3 px-4 font-medium text-gray-400">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Package</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Left Team</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Right Team</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Volume</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Earnings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map(promoter => (
                <tr key={promoter.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-4">{promoter.id}</td>
                  <td className="py-3 px-4 font-medium">{promoter.name}</td>
                  <td className="py-3 px-4">{promoter.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      promoter.package === 'Pro' ? 'bg-purple-900 text-purple-300' :
                      promoter.package === 'Elite' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-blue-900 text-blue-300'
                    }`}>
                      {promoter.package}
                    </span>
                  </td>
                  <td className="py-3 px-4">{promoter.leftTeam}</td>
                  <td className="py-3 px-4">{promoter.rightTeam}</td>
                  <td className="py-3 px-4">{promoter.volume}</td>
                  <td className="py-3 px-4">{promoter.earnings}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      promoter.rank === 'Gold' ? 'bg-yellow-900 text-yellow-300' :
                      promoter.rank === 'Silver' ? 'bg-gray-500 text-white' :
                      'bg-yellow-800 text-yellow-200'
                    }`}>
                      {promoter.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="p-1 text-yellow-400 hover:text-yellow-300" title="View Team">
                        <i className="fas fa-users"></i>
                      </button>
                      <button className="p-1 text-green-400 hover:text-green-300" title="Add Commission">
                        <i className="fas fa-dollar-sign"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-900 py-3 px-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing 1-5 of 87 promoters
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">Previous</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">2</button>
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">3</button>
            <button className="px-3 py-1 rounded bg-gray-700 text-gray-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Commissions Component
const Commissions = () => {
  const [showModal, setShowModal] = useState(false);
  
  const commissions = [
    { id: 1, promoter: 'Kevin Gardner', amount: '$250.00', type: 'Team Commission', date: '2025-05-15', notes: '10 cycles - $25 each' },
    { id: 2, promoter: 'Lisa Martinez', amount: '$100.00', type: 'Fast Start Bonus', date: '2025-05-16', notes: 'New Elite Package Sign-up' },
    { id: 3, promoter: 'David Wilson', amount: '$200.00', type: 'Fast Start Bonus', date: '2025-05-16', notes: 'New Pro Package Sign-up' },
    { id: 4, promoter: 'Kevin Gardner', amount: '$50.00', type: 'Mega Matching Bonus', date: '2025-05-17', notes: 'From Lisa Martinez team cycles' },
    { id: 5, promoter: 'Emily Johnson', amount: '$50.00', type: 'Fast Start Bonus', date: '2025-05-17', notes: 'New Starter Package Sign-up' },
    { id: 6, promoter: 'Thomas Brown', amount: '$125.00', type: 'Team Commission', date: '2025-05-17', notes: '5 cycles - $25 each' },
    { id: 7, promoter: 'David Wilson', amount: '$500.00', type: 'Rank Advancement Bonus', date: '2025-05-18', notes: 'Reached 3 Star Rank' }
  ];

  const commissionTypes = [
    'Fast Start Bonus',
    'Team Commission',
    'Mega Matching Bonus',
    'Rank Advancement Bonus',
    'Leadership Pool'
  ];

  // New Commission Modal
  const CommissionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="border-b border-gray-700 p-4 flex justify-between items-center">
          <h3 className="text-lg font-bold">Add New Commission</h3>
          <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-2">Promoter</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Promoter</option>
                <option value="Kevin Gardner">Kevin Gardner</option>
                <option value="Lisa Martinez">Lisa Martinez</option>
                <option value="David Wilson">David Wilson</option>
                <option value="Emily Johnson">Emily Johnson</option>
                <option value="Thomas Brown">Thomas Brown</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-2">Commission Type</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                {commissionTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-2">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-7 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-2">Date</label>
              <input 
                type="date" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={new Date().toISOString().substr(0, 10)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-medium mb-2">Notes</label>
              <textarea 
                rows="3" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any additional details about this commission..."
              ></textarea>
            </div>
