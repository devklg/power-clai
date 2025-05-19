import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PowerLineContext } from '../context/PowerLineContext';
import CountdownTimer from '../components/CountdownTimer';
import PowerLineVisualization from '../components/PowerLineVisualization';
import BinaryTeamVisualization from '../components/BinaryTeamVisualization';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';
import CommissionCard from '../components/CommissionCard';

const PromoterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useContext(AuthContext);
  const { teamData, loadTeamData, recentActivities } = useContext(PowerLineContext);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    leftTeam: 0,
    rightTeam: 0,
    leftVolume: 0,
    rightVolume: 0,
    personalReferrals: 0,
    totalEarnings: 0,
    weeklyEarnings: 0,
    rank: ''
  });
  
  const [recentCommissions, setRecentCommissions] = useState([]);
  
  useEffect(() => {
    // Load team data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await loadTeamData();
        // Fetch recent commissions
        // This would be an API call in a real implementation
        setRecentCommissions([
          { id: 1, type: 'Fast Start Bonus', amount: 100, date: new Date('2025-05-17') },
          { id: 2, type: 'Team Commission', amount: 75, date: new Date('2025-05-16') },
          { id: 3, type: 'Mega Matching Bonus', amount: 50, date: new Date('2025-05-15') }
        ]);
        
        // Update stats
        setStats({
          leftTeam: 28,
          rightTeam: 35,
          leftVolume: 2450,
          rightVolume: 3200,
          personalReferrals: 12,
          totalEarnings: 2350,
          weeklyEarnings: 425,
          rank: 'Gold'
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
      setIsLoading(false);
    };
    
    fetchData();
  }, [loadTeamData]);
  
  // Tabs for the dashboard
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-tachometer-alt' },
    { id: 'team', label: 'Team Structure', icon: 'fas fa-users' },
    { id: 'commissions', label: 'Commissions', icon: 'fas fa-dollar-sign' },
    { id: 'resources', label: 'Resources', icon: 'fas fa-book' },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];
  
  // Determine whether the binary tree has balance issues
  const hasBalanceIssue = Math.abs(stats.leftTeam - stats.rightTeam) > 5;
  
  // Handle referral link copy
  const copyReferralLink = () => {
    const link = `https://magnificent-talkfusion.com/join/${user?.promoterId || '1234'}`;
    navigator.clipboard.writeText(link);
    
    // In a real implementation, show a notification
    alert('Referral link copied to clipboard!');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center font-bold">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              </div>
              <div>
                <h1 className="font-bold text-xl">Welcome, {user?.firstName || 'Kevin'}</h1>
                <p className="text-sm text-gray-400">Promoter ID: {user?.promoterId || '1234'} | Rank: {stats.rank}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={copyReferralLink}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm flex items-center"
              >
                <i className="fas fa-link mr-2"></i> Share Referral Link
              </button>
              <button 
                onClick={() => navigate('/pre-enrollees/new')}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm"
              >
                <i className="fas fa-user-plus mr-2"></i> Add Pre-Enrollee
              </button>
              <button 
                onClick={logout}
                className="text-gray-400 hover:text-white"
                title="Logout"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-700">
          <div className="flex flex-wrap -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mr-2 inline-block py-4 px-4 font-medium text-sm rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-gray-300 hover:border-gray-300 border-b-2 border-transparent'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i> {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard 
                  title="Left Team" 
                  value={stats.leftTeam.toString()} 
                  subtitle={`Volume: ${stats.leftVolume}`}
                  icon="fas fa-users"
                  color="blue"
                />
                <StatsCard 
                  title="Right Team" 
                  value={stats.rightTeam.toString()} 
                  subtitle={`Volume: ${stats.rightVolume}`}
                  icon="fas fa-users"
                  color="green"
                />
                <StatsCard 
                  title="Weekly Earnings" 
                  value={`$${stats.weeklyEarnings}`} 
                  subtitle={`Total: $${stats.totalEarnings}`}
                  icon="fas fa-dollar-sign"
                  color="yellow"
                />
                <StatsCard 
                  title="Personal Referrals" 
                  value={stats.personalReferrals.toString()} 
                  subtitle="Direct enrollments"
                  icon="fas fa-user-plus"
                  color="purple"
                />
              </div>
              
              {/* Team Alert (if needed) */}
              {hasBalanceIssue && (
                <div className="bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-lg mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-yellow-500"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-200">
                        Your team structure is becoming unbalanced. Consider focusing your recruitment efforts on your {stats.leftTeam < stats.rightTeam ? 'left' : 'right'} team to maximize commissions.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Team Structure and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Team Structure */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-project-diagram mr-2 text-blue-500"></i> Binary Team Structure
                    </h3>
                  </div>
                  <div className="p-6">
                    <BinaryTeamVisualization leftCount={stats.leftTeam} rightCount={stats.rightTeam} />
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Left Volume</div>
                        <div className="text-xl font-bold text-blue-400">{stats.leftVolume}</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Right Volume</div>
                        <div className="text-xl font-bold text-green-400">{stats.rightVolume}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => setActiveTab('team')} 
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View detailed team structure <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activities */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-chart-line mr-2 text-green-500"></i> Recent Activity
                    </h3>
                  </div>
                  <div className="p-0">
                    <ActivityFeed activities={recentActivities} />
                  </div>
                </div>
              </div>
              
              {/* Recent Commissions and PowerLine Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Commissions */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-dollar-sign mr-2 text-yellow-500"></i> Recent Commissions
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {recentCommissions.map(commission => (
                        <CommissionCard 
                          key={commission.id}
                          type={commission.type}
                          amount={commission.amount}
                          date={commission.date}
                        />
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => setActiveTab('commissions')} 
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View all commissions <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* PowerLine Status */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-chart-line mr-2 text-purple-500"></i> PowerLine Status
                    </h3>
                  </div>
                  <div className="p-6">
                    <PowerLineVisualization position={user?.positionNumber || 3248} />
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Your Position</div>
                        <div className="text-xl font-bold text-purple-400">#{user?.positionNumber || 3248}</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">PowerLine Growth</div>
                        <div className="text-xl font-bold text-green-400">+124 this week</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Team Structure Tab */}
          {activeTab === 'team' && (
            <div>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-bold">Binary Team Structure</h3>
                </div>
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gray-700 p-4 rounded-lg inline-block text-center">
                      <div className="mb-2">
                        <div className="w-16 h-16 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mx-auto">
                          YOU
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">Your Position</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Left Team */}
                    <div className="text-center">
                      <h4 className="text-blue-400 font-bold mb-4">Left Team</h4>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                          L1
                        </div>
                        <div className="text-sm">John Smith</div>
                        <div className="text-xs text-gray-400">Elite Package</div>
                        <div className="mt-2 text-blue-300 text-sm">23 Members</div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                            L2
                          </div>
                          <div className="text-sm">Sarah Jones</div>
                          <div className="text-xs text-gray-400">Pro Package</div>
                          <div className="mt-2 text-blue-300 text-sm">12 Members</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                            L3
                          </div>
                          <div className="text-sm">Mike Davis</div>
                          <div className="text-xs text-gray-400">Starter Package</div>
                          <div className="mt-2 text-blue-300 text-sm">8 Members</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Team */}
                    <div className="text-center">
                      <h4 className="text-green-400 font-bold mb-4">Right Team</h4>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                          R1
                        </div>
                        <div className="text-sm">Lisa Martinez</div>
                        <div className="text-xs text-gray-400">Pro Package</div>
                        <div className="mt-2 text-green-300 text-sm">28 Members</div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                            R2
                          </div>
                          <div className="text-sm">David Wilson</div>
                          <div className="text-xs text-gray-400">Elite Package</div>
                          <div className="mt-2 text-green-300 text-sm">15 Members</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                            R3
                          </div>
                          <div className="text-sm">Emily Johnson</div>
                          <div className="text-xs text-gray-400">Pro Package</div>
                          <div className="mt-2 text-green-300 text-sm">10 Members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                      <i className="fas fa-sitemap mr-2"></i> View Full Team Tree
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold">Team Volume</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <h4 className="text-blue-400 font-bold mb-2">Left Team Volume</h4>
                        <div className="text-3xl font-bold">{stats.leftVolume}</div>
                        <div className="mt-2 text-sm text-gray-400">From {stats.leftTeam} members</div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <h4 className="text-green-400 font-bold mb-2">Right Team Volume</h4>
                        <div className="text-3xl font-bold">{stats.rightVolume}</div>
                        <div className="mt-2 text-sm text-gray-400">From {stats.rightTeam} members</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Volume Analysis</h4>
                      <p className="text-gray-300 mb-4">
                        Your lesser leg has {Math.min(stats.leftVolume, stats.rightVolume)} volume, which qualifies for {Math.floor(Math.min(stats.leftVolume, stats.rightVolume) / 200)} commission cycles.
                      </p>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm text-gray-400">Lesser Leg Qualification</span>
                          <span className="text-sm text-blue-400">{Math.floor(Math.min(stats.leftVolume, stats.rightVolume) / 200)} / 20</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${Math.min(100, (Math.floor(Math.min(stats.leftVolume, stats.rightVolume) / 200) / 20) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold">Personal Referrals</h3>
                  </div>
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 text-sm">
                          <th className="pb-3">Name</th>
                          <th className="pb-3">Package</th>
                          <th className="pb-3">Placement</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-700">
                          <td className="py-3">John Smith</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded-full text-xs">Elite</span>
                          </td>
                          <td className="py-3">Left Team</td>
                          <td className="py-3">
                            <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Active</span>
                          </td>
                        </tr>
                        <tr className="border-t border-gray-700">
                          <td className="py-3">Lisa Martinez</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded-full text-xs">Pro</span>
                          </td>
                          <td className="py-3">Right Team</td>
                          <td className="py-3">
                            <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Active</span>
                          </td>
                        </tr>
                        <tr className="border-t border-gray-700">
                          <td className="py-3">Sarah Williams</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">Starter</span>
                          </td>
                          <td className="py-3">Left Team</td>
                          <td className="py-3">
                            <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Active</span>
                          </td>
                        </tr>
                        <tr className="border-t border-gray-700">
                          <td className="py-3">Michael Brown</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">Pre-Enrollee</span>
                          </td>
                          <td className="py-3">Pending</td>
                          <td className="py-3">
                            <span className="text-yellow-400"><i className="fas fa-circle text-xs mr-1"></i> Deciding</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-4 text-center">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        View all {stats.personalReferrals} referrals <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Commissions Tab */}
          {activeTab === 'commissions' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-green-500">
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Total Earnings</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">${stats.totalEarnings}</p>
                    <span className="text-xs text-green-400">+15% ↑</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-gray-400 text-sm font-medium mb-1">This Week</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">${stats.weeklyEarnings}</p>
                    <span className="text-xs text-green-400">+8% ↑</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-purple-500">
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Fast Start Bonuses</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">$850</p>
                    <span className="text-xs text-green-400">+12% ↑</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 border-yellow-500">
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Team Commissions</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-white">$1,250</p>
                    <span className="text-xs text-green-400">+18% ↑</span>
                  </div>
                </div>
              </div>
              
              {/* Commission History */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold">Commission History</h3>
                  <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg text-sm">
                      <i className="fas fa-filter mr-2"></i>Filter
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg text-sm">
                      <i className="fas fa-download mr-2"></i>Export
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-left">
                        <th className="py-3 px-4 font-medium text-gray-400">Date</th>
                        <th className="py-3 px-4 font-medium text-gray-400">Type</th>
                        <th className="py-3 px-4 font-medium text-gray-400">Amount</th>
                        <th className="py-3 px-4 font-medium text-gray-400">Status</th>
                        <th className="py-3 px-4 font-medium text-gray-400">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-4">May 18, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-300">
                            Fast Start Bonus
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">$100.00</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Paid</span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">New Elite Package Sign-up</td>
                      </tr>
                      <tr className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-4">May 17, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-900 text-purple-300">
                            Team Commission
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">$250.00</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Paid</span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">10 cycles - $25 each</td>
                      </tr>
                      <tr className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-4">May 16, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-300">
                            Mega Matching Bonus
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">$50.00</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Paid</span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">From Lisa Martinez team cycles</td>
                      </tr>
                      <tr className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-4">May 15, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300">
                            Rank Advancement Bonus
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">$500.00</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Paid</span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">Reached Gold Rank</td>
                      </tr>
                      <tr className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-4">May 14, 2025</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-900 text-purple-300">
                            Team Commission
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">$125.00</td>
                        <td className="py-3 px-4">
                          <span className="text-green-400"><i className="fas fa-circle text-xs mr-1"></i> Paid</span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">5 cycles - $25 each</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-900 py-3 px-4 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Showing 1-5 of 28 commissions
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
              
              {/* Commission Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold">Commission Breakdown</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border-8 border-gray-700 relative">
                        {/* Simulated pie chart with CSS */}
                        <div 
                          className="absolute inset-0 bg-blue-500"
                          style={{ 
                            clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
                          }}
                        ></div>
                        <div 
                          className="absolute inset-0 bg-purple-500"
                          style={{ 
                            clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%, 50% 100%)',
                          }}
                        ></div>
                        <div 
                          className="absolute inset-0 bg-green-500"
                          style={{ 
                            clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%, 0% 60%)',
                          }}
                        ></div>
                        <div 
                          className="absolute inset-0 bg-yellow-500"
                          style={{ 
                            clipPath: 'polygon(50% 50%, 0% 60%, 0% 0%, 20% 0%)',
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 bg-gray-800 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                        <div>
                          <div className="text-sm">Fast Start Bonuses</div>
                          <div className="text-xs text-gray-400">36% - $850</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
                        <div>
                          <div className="text-sm">Team Commissions</div>
                          <div className="text-xs text-gray-400">53% - $1,250</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                        <div>
                          <div className="text-sm">Mega Matching Bonuses</div>
                          <div className="text-xs text-gray-400">6% - $150</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
                        <div>
                          <div className="text-sm">Rank Advancement</div>
                          <div className="text-xs text-gray-400">5% - $100</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold">Commission Trend</h3>
                  </div>
                  <div className="p-6">
                    <div className="h-48 relative">
                      {/* Simple bar chart visualization */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                        {[220, 350, 180, 420, 300, 480, 375].map((value, i) => (
                          <div key={i} className="flex-1 mx-1">
                            <div 
                              className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                              style={{ height: `${(value / 500) * 100}%` }}
                            ></div>
                            <div className="text-xs text-center mt-1 text-gray-500">
                              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Y-axis labels */}
                      <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                        <div>$500</div>
                        <div>$400</div>
                        <div>$300</div>
                        <div>$200</div>
                        <div>$100</div>
                        <div>$0</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="text-sm text-gray-400">Total for this week: $2,325</div>
                      <div className="text-xs text-green-400 mt-1">+18% compared to last week</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              {/* Onboarding Resources */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-video mr-2 text-red-500"></i> Training Videos
                    </h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-red-900 text-red-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-play"></i>
                          </div>
                          <div>
                            <div className="font-medium">Getting Started Guide</div>
                            <div className="text-sm text-gray-400">10:23 • Beginner Level</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-red-900 text-red-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-play"></i>
                          </div>
                          <div>
                            <div className="font-medium">Compensation Plan Overview</div>
                            <div className="text-sm text-gray-400">15:42 • Beginner Level</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-red-900 text-red-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-play"></i>
                          </div>
                          <div>
                            <div className="font-medium">Team Building Strategies</div>
                            <div className="text-sm text-gray-400">18:17 • Intermediate Level</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-red-900 text-red-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-play"></i>
                          </div>
                          <div>
                            <div className="font-medium">Advanced Binary Strategy</div>
                            <div className="text-sm text-gray-400">22:05 • Advanced Level</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div className="mt-4 text-center">
                      <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                        View all training videos <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-file-pdf mr-2 text-blue-500"></i> Documents & Guides
                    </h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-file-pdf"></i>
                          </div>
                          <div>
                            <div className="font-medium">Compensation Plan PDF</div>
                            <div className="text-sm text-gray-400">3.2 MB • Updated May 2025</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-file-alt"></i>
                          </div>
                          <div>
                            <div className="font-medium">Product Catalog</div>
                            <div className="text-sm text-gray-400">5.7 MB • Updated April 2025</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-file-powerpoint"></i>
                          </div>
                          <div>
                            <div className="font-medium">Presentation Slides</div>
                            <div className="text-sm text-gray-400">8.1 MB • Updated May 2025</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          <div className="w-10 h-10 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-file-word"></i>
                          </div>
                          <div>
                            <div className="font-medium">Quick Start Guide</div>
                            <div className="text-sm text-gray-400">1.5 MB • Updated May 2025</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div className="mt-4 text-center">
                      <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                        View document library <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="font-bold flex items-center">
                      <i className="fas fa-calendar-alt mr-2 text-green-500"></i> Upcoming Events
                    </h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      <li>
                        <div className="p-3 bg-gray-700 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Weekly Team Call</div>
                            <div className="text-xs px-2 py-1 bg-blue-900 text-blue-300 rounded-full">Zoom</div>
                          </div>
                          <div className="text-sm text-gray-400 mb-2">
                            <i className="far fa-calendar-alt mr-2"></i> Tuesday, May 20, 2025
                          </div>
                          <div className="text-sm text-gray-400">
                            <i className="far fa-clock mr-2"></i> 7:00 PM - 8:00 PM EST
                          </div>
                          <button className="mt-3 w-full py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                            Add to Calendar
                          </button>
                        </div>
                      </li>
                      <li>
                        <div className="p-3 bg-gray-700 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Product Training</div>
                            <div className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded-full">Webinar</div>
                          </div>
                          <div className="text-sm text-gray-400 mb-2">
                            <i className="far fa-calendar-alt mr-2"></i> Thursday, May 22, 2025
                          </div>
                          <div className="text-sm text-gray-400">
                            <i className="far fa-clock mr-2"></i> 1:00 PM - 2:30 PM EST
                          </div>
                          <button className="mt-3 w-full py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                            Register Now
                          </button>
                        </div>
                      </li>
                      <li>
                        <div className="p-3 bg-gray-700 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Regional Conference</div>
                            <div className="text-xs px-2 py-1 bg-purple-900 text-purple-300 rounded-full">In Person</div>
                          </div>
                          <div className="text-sm text-gray-400 mb-2">
                            <i className="far fa-calendar-alt mr-2"></i> June 5-7, 2025
                          </div>
                          <div className="text-sm text-gray-400">
                            <i className="fas fa-map-marker-alt mr-2"></i> Chicago, IL
                          </div>
                          <button className="mt-3 w-full py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                            Learn More
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Marketing Materials */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-bold">Marketing Materials</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="w-full h-32 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <i className="fas fa-images text-4xl text-gray-400"></i>
                      </div>
                      <h4 className="font-medium mb-1">Social Media Graphics</h4>
                      <p className="text-sm text-gray-400 mb-4">12 ready-to-share images</p>
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                        Download Pack
                      </button>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="w-full h-32 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <i className="fas fa-photo-video text-4xl text-gray-400"></i>
                      </div>
                      <h4 className="font-medium mb-1">Promotional Videos</h4>
                      <p className="text-sm text-gray-400 mb-4">8 shareable videos</p>
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                        View Gallery
                      </button>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="w-full h-32 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <i className="fas fa-envelope-open-text text-4xl text-gray-400"></i>
                      </div>
                      <h4 className="font-medium mb-1">Email Templates</h4>
                      <p className="text-sm text-gray-400 mb-4">15 ready-to-use templates</p>
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                        Browse Templates
                      </button>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <div className="w-full h-32 bg-gray-600 rounded-lg mb-4 flex items-center justify-center">
                        <i className="fas fa-comments text-4xl text-gray-400"></i>
                      </div>
                      <h4 className="font-medium mb-1">Conversation Scripts</h4>
                      <p className="text-sm text-gray-400 mb-4">10 proven scripts</p>
                      <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                        Download Scripts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support Resources */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-bold">Support Resources</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center mr-4">
                          <i className="fas fa-headset text-xl"></i>
                        </div>
                        <h4 className="text-lg font-medium">Technical Support</h4>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Get help with platform-related issues, account access, or technical problems.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <i className="fas fa-envelope text-gray-500 mr-2"></i>
                          <span className="text-sm">support@magnificent.com</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-phone text-gray-500 mr-2"></i>
                          <span className="text-sm">1-800-555-1234</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-clock text-gray-500 mr-2"></i>
                          <span className="text-sm">Mon-Fri, 9AM-5PM EST</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-900 text-green-300 rounded-full flex items-center justify-center mr-4">
                          <i className="fas fa-user-friends text-xl"></i>
                        </div>
                        <h4 className="text-lg font-medium">Team Support</h4>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Connect with your upline sponsor for personalized coaching and team support.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <i className="fas fa-user text-gray-500 mr-2"></i>
                          <span className="text-sm">Kevin Gardner</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-envelope text-gray-500 mr-2"></i>
                          <span className="text-sm">kevin@magnwm.com</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-phone text-gray-500 mr-2"></i>
                          <span className="text-sm">1-800-555-5678</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-900 text-purple-300 rounded-full flex items-center justify-center mr-4">
                          <i className="fas fa-book-open text-xl"></i>
                        </div>
                        <h4 className="text-lg font-medium">Knowledge Base</h4>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Access our comprehensive knowledge base with FAQs, tutorials, and guides.
                      </p>
                      <div className="space-y-3">
                        <a href="#" className="block bg-gray-600 hover:bg-gray-500 p-2 rounded text-sm">
                          <i className="fas fa-question-circle mr-2"></i> Frequently Asked Questions
                        </a>
                        <a href="#" className="block bg-gray-600 hover:bg-gray-500 p-2 rounded text-sm">
                          <i className="fas fa-graduation-cap mr-2"></i> Video Email Tutorials
                        </a>
                        <a href="#" className="block bg-gray-600 hover:bg-gray-500 p-2 rounded text-sm">
                          <i className="fas fa-scroll mr-2"></i> Compensation Plan Guide
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4">
                  {/* Settings navigation */}
                  <div className="bg-gray-900 p-4">
                    <ul className="space-y-1">
                      <li>
                        <button
                          className="flex items-center w-full px-4 py-3 rounded-lg transition-colors bg-blue-900 text-blue-300"
                        >
                          <i className="fas fa-user-circle mr-3 w-5"></i>
                          <span>Profile Settings</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center w-full px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        >
                          <i className="fas fa-bell mr-3 w-5"></i>
                          <span>Notification Settings</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center w-full px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        >
                          <i className="fas fa-shield-alt mr-3 w-5"></i>
                          <span>Security</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center w-full px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        >
                          <i className="fas fa-chart-pie mr-3 w-5"></i>
                          <span>Dashboard Preferences</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center w-full px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                        >
                          <i className="fas fa-cog mr-3 w-5"></i>
                          <span>Team Settings</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Settings content */}
                  <div className="col-span-3 p-6">
                    <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                    
                    {/* Profile Photo */}
                    <div className="mb-8">
                      <h3 className="text-md font-semibold mb-4 text-gray-300">Profile Photo</h3>
                      <div className="flex items-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-2xl mr-6">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                        <div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm mb-2 block">
                            Upload New Photo
                          </button>
                          <button className="text-red-400 hover:text-red-300 text-sm">
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Personal Information */}
                    <form>
                      <div className="mb-8">
                        <h3 className="text-md font-semibold mb-4 text-gray-300">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">First Name</label>
                            <input 
                              type="text" 
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                              defaultValue={user?.firstName || 'Kevin'}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                            <input 
                              type="text" 
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                              defaultValue={user?.lastName || 'Gardner'}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                            <input 
                              type="email" 
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                              defaultValue={user?.email || 'kevin@example.com'}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                            <input 
                              type="tel" 
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                              defaultValue={user?.phone || '(555) 123-4567'}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Address Information */}
                      <div className="mb-8">
                        <h3 className="text-md font-semibold mb-4 text-gray-300">Address Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">Street Address</label>
                            <input 
                              type="text" 
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                              defaultValue={user?.address?.street || '123 Main St'}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-gray-400 text-sm mb-2">City</label>
                              <input 
                                type="text" 
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                                defaultValue={user?.address?.city || 'Anytown'}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-sm mb-2">State/Province</label>
                              <input 
                                type="text" 
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                                defaultValue={user?.address?.state || 'CA'}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-400 text-sm mb-2">ZIP/Postal Code</label>
                              <input 
                                type="text" 
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3"
                                defaultValue={user?.address?.zipCode || '12345'}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">Country</label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3">
                              <option selected={user?.address?.country === 'US'}>United States</option>
                              <option selected={user?.address?.country === 'CA'}>Canada</option>
                              <option selected={user?.address?.country === 'UK'}>United Kingdom</option>
                              <option selected={user?.address?.country === 'AU'}>Australia</option>
                              <option selected={user?.address?.country === 'Other'}>Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      {/* Binary Team Preferences */}
                      <div className="mb-8">
                        <h3 className="text-md font-semibold mb-4 text-gray-300">Binary Team Preferences</h3>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2">Default Placement</label>
                            <div className="grid grid-cols-2 gap-4">
                              <label className="flex items-center bg-gray-800 p-3 rounded-lg border-2 border-blue-500">
                                <input type="radio" name="defaultLeg" className="mr-3" defaultChecked />
                                <div>
                                  <div className="font-medium">Left Leg</div>
                                  <div className="text-xs text-gray-400">Current: {stats.leftTeam} members</div>
                                </div>
                              </label>
                              <label className="flex items-center bg-gray-800 p-3 rounded-lg border-2 border-gray-600">
                                <input type="radio" name="defaultLeg" className="mr-3" />
                                <div>
                                  <div className="font-medium">Right Leg</div>
                                  <div className="text-xs text-gray-400">Current: {stats.rightTeam} members</div>
                                </div>
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              This setting determines the default placement leg for your new team members.
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="font-medium">Auto-Balancing</div>
                              <div className="text-xs text-gray-400">
                                Automatically balance your team structure
                              </div>
                            </div>
                            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                              <input 
                                type="checkbox" 
                                className="sr-only"
                                defaultChecked
                              />
                              <span className="absolute left-1 top-1 bg-blue-500 w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Spillover Notifications</div>
                              <div className="text-xs text-gray-400">
                                Get notified when spillover occurs in your team
                              </div>
                            </div>
                            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-600">
                              <input 
                                type="checkbox" 
                                className="sr-only"
                                defaultChecked
                              />
                              <span className="absolute left-1 top-1 bg-blue-500 w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 py-6 mt-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="gradient-text text-xl font-bold">Magnificent Worldwide</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; 2025 Magnificent Worldwide Marketing & Sales Group. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Define the component types for the smaller components used in the dashboard
// These would typically be in separate files

const StatsCard = ({ title, value, subtitle, icon, color }) => {
  const getBorderColor = () => {
    switch (color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'yellow': return 'border-yellow-500';
      case 'purple': return 'border-purple-500';
      default: return 'border-blue-500';
    }
  };
  
  const getIconColor = () => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'yellow': return 'text-yellow-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-blue-500';
    }
  };
  
  return (
    <div className={`bg-gray-800 rounded-lg p-5 shadow-lg border-l-4 ${getBorderColor()}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className={`text-xl ${getIconColor()}`}>
          <i className={`${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities = [] }) => {
  // If no activities are provided, use some demo data
  const demoActivities = [
    { id: 1, type: 'New Join', user: 'Sarah Jones', detail: 'Level 1-L', time: '14:23' },
    { id: 2, type: 'Qualification', user: 'James Lee', detail: '+100 Vol-R', time: '15:47' },
    { id: 3, type: 'Commission', user: 'Kevin Gardner', detail: '+$50', time: '16:30' },
    { id: 4, type: 'New Join', user: 'Robert Chen', detail: 'Level 2-R', time: '17:12' },
    { id: 5, type: 'Conversion', user: 'Maria Silva', detail: 'Elite Package', time: '17:45' }
  ];
  
  const displayActivities = activities.length > 0 ? activities : demoActivities;
  
  return (
    <div className="overflow-hidden">
      <ul>
        {displayActivities.map(activity => (
          <li key={activity.id} className="flex items-center py-3 px-4 border-b border-gray-700 last:border-0">
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
  );
};

const CommissionCard = ({ type, amount, date }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'Fast Start Bonus':
        return 'bg-blue-900 text-blue-300';
      case 'Team Commission':
        return 'bg-purple-900 text-purple-300';
      case 'Mega Matching Bonus':
        return 'bg-green-900 text-green-300';
      case 'Rank Advancement Bonus':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };
  
  const formatDate = (dateObj) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className={`px-3 py-2 rounded-full text-xs ${getTypeStyles()} mr-4`}>
          {type}
        </div>
        <div>
          <div className="font-medium">${amount.toFixed(2)}</div>
          <div className="text-xs text-gray-400">{formatDate(date)}</div>
        </div>
      </div>
      <div>
        <i className="fas fa-chevron-right text-gray-500"></i>
      </div>
    </div>
  );
};

const BinaryTeamVisualization = ({ leftCount, rightCount }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mb-6">
          YOU
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-1 h-8 bg-gray-700 mb-2"></div>
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              {leftCount}
            </div>
            <div className="mt-2 text-xs text-gray-400">Left Team</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1 h-8 bg-gray-700 mb-2"></div>
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center font-bold text-sm">
              {rightCount}
            </div>
            <div className="mt-2 text-xs text-gray-400">Right Team</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PowerLineVisualization = ({ position }) => {
  // Generate some sample positions around the current position
  const generatePositions = (currentPosition) => {
    return [
      { id: 1, position: currentPosition - 3 },
      { id: 2, position: currentPosition - 2 },
      { id: 3, position: currentPosition - 1 },
      { id: 4, position: currentPosition },
      { id: 5, position: currentPosition + 1 },
      { id: 6, position: currentPosition + 2 },
    ];
  };
  
  const positions = generatePositions(position);
  
  return (
    <div className="flex flex-col items-center">
      {positions.map((pos, index) => (
        <div 
          key={pos.id} 
          className="flex flex-col items-center"
        >
          <div className={`w-12 h-12 ${
            pos.position === position 
              ? 'bg-yellow-500 text-gray-900' 
              : pos.position < position
                ? 'bg-blue-600'
                : 'bg-purple-600'
          } rounded-full flex items-center justify-center font-bold text-sm ${
            pos.position === position ? 'animate-pulse' : ''
          }`}>
            {pos.position === position ? 'YOU' : '#' + pos.position}
          </div>
          {index < positions.length - 1 && (
            <div className="w-1 h-8 bg-gray-700"></div>
          )}
        </div>
      ))}
      <div className="mt-4 text-center text-xs text-gray-400">
        New pre-enrollees are added below your position
      </div>
    </div>
  );
};

export default PromoterDashboard;
