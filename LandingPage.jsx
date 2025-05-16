import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import CountdownTimer from '../components/ui/CountdownTimer';
import PowerLinePreview from '../components/powerline/PowerLinePreview';
import VideoEmbed from '../components/ui/VideoEmbed';
import BenefitCard from '../components/ui/BenefitCard';

const LandingPage = () => {
  // Launch date - May 19, 2025
  const launchDate = new Date('May 19, 2025 23:59:59').getTime();
  
  // State for pre-enrollee counter simulation
  const [enrolleeCount, setEnrolleeCount] = useState(3247);
  
  // Simulate real-time growth
  useEffect(() => {
    const interval = setInterval(() => {
      // Random increase between 1-3
      const increase = Math.floor(Math.random() * 3) + 1;
      setEnrolleeCount(prev => prev + increase);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-hero-pattern py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 section-transition">
                <span className="gradient-text">Revolutionary Video Email</span><br/>
                <span className="text-3xl">The Only SaaS That Pays You For Sharing</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Join the future of communication with Talk Fusion's video email platform where innovation meets opportunity. 
                <span className="font-bold text-secondary-400"> Get paid in just 1 minute</span> after earning a commission.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link to="/pre-enroll" className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 transition duration-300 text-center">
                  Reserve Your Position Now
                </Link>
                <a href="#learn-more" className="border border-primary-500 text-primary-400 font-bold py-3 px-6 rounded-lg hover:bg-primary-900 hover:text-white transition duration-300 text-center">
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="rounded-lg overflow-hidden shadow-2xl max-w-md w-full">
                <VideoEmbed 
                  videoId="dCNseEHe0ro" 
                  title="Talk Fusion Opportunity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Launch Countdown */}
      <section className="py-12 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Launch Countdown</h2>
            <p className="text-xl text-gray-300">Pre-enrollment is open until <span className="text-secondary-400 font-bold">May 19, 2025</span></p>
          </div>
          <CountdownTimer targetDate={launchDate} />
        </div>
      </section>
      
      {/* What is a PowerLine Section */}
      <section id="learn-more" className="py-16 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What is a PowerLine?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding the revolutionary system that makes our team building so powerful
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary-400">The PowerLine Explained</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  A PowerLine is a <span className="font-bold text-secondary-400">revolutionary pre-enrollment system</span> that creates 
                  momentum and synergy before you even officially join. Unlike traditional network marketing where you start alone, 
                  our PowerLine places you in a growing queue of motivated individuals.
                </p>
                <p>
                  When you pre-enroll (at <span className="font-bold">no cost or obligation</span>), you secure your position in line. 
                  Everyone who joins after you is placed below you in the structure. This means you benefit from the entire team's 
                  growth efforts, not just your own.
                </p>
                <p>
                  During your 7-day decision window, you can watch your team grow in real-time. If you choose to become an official 
                  promoter, you lock in your position permanently, keeping everyone who joined after you in your downline.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-dark-800 rounded-lg p-8">
                <h4 className="text-xl font-bold mb-6 text-center">How PowerLine Positioning Works</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-secondary-400 rounded-full flex items-center justify-center font-bold text-dark-900 mr-4">1</div>
                    <div>
                      <p className="font-semibold">You Pre-Enroll Today</p>
                      <p className="text-sm text-gray-400">Secure position in the PowerLine</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center font-bold text-white mr-4">2</div>
                    <div>
                      <p className="font-semibold">Others Join After You</p>
                      <p className="text-sm text-gray-400">New members are placed below your position</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-white mr-4">3</div>
                    <div>
                      <p className="font-semibold">Your Team Grows Automatically</p>
                      <p className="text-sm text-gray-400">Benefit from upline spillover and team momentum</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white mr-4">4</div>
                    <div>
                      <p className="font-semibold">Lock Your Position</p>
                      <p className="text-sm text-gray-400">Join officially and keep your entire downline</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* PowerLine Benefits */}
          <div className="bg-dark-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Exclusive PowerLine Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BenefitCard 
                icon="users-cog" 
                title="Automatic Team Building" 
                description="Your team grows even while you sleep. New enrollees are automatically placed in your downline based on chronological order."
                color="green"
              />
              <BenefitCard 
                icon="hand-holding-usd" 
                title="No Cost Pre-Enrollment" 
                description="Secure your position without any financial commitment. You have 7 days to decide if Talk Fusion is right for you."
                color="blue"
              />
              <BenefitCard 
                icon="project-diagram" 
                title="Spillover Benefits" 
                description="Receive overflow from your sponsor and upline's recruiting efforts. Their success directly benefits your position."
                color="yellow"
              />
              <BenefitCard 
                icon="eye" 
                title="Real-Time Visibility" 
                description="Watch your organization grow in real-time. See exactly who's joining and how your team is expanding."
                color="purple"
              />
              <BenefitCard 
                icon="rocket" 
                title="Momentum Building" 
                description="Being part of a growing PowerLine creates excitement and urgency, making it easier to recruit others."
                color="red"
              />
              <BenefitCard 
                icon="shield-alt" 
                title="Risk-Free Decision" 
                description="Full 7-day evaluation period. If you decide not to join, simply let your position expire with no obligations."
                color="orange"
              />
            </div>
          </div>
          
          {/* The Kevin Gardner Advantage */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-dark-800 to-dark-900 rounded-lg p-8 border-l-4 border-secondary-400">
              <h3 className="text-2xl font-bold mb-4">The Kevin Gardner Advantage</h3>
              <p className="text-lg text-gray-300 mb-6">
                As a word-of-mouth marketing expert, I've designed this PowerLine system based on proven principles of 
                <span className="font-bold text-white"> integrity, professionalism, and treating others as I want to be treated</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-bold text-secondary-400 mb-2"><i className="fas fa-heart mr-2"></i>Commitment to Your Success</h4>
                  <p className="text-sm text-gray-400">My goal is to help everyone on my team experience success beyond their wildest dreams.</p>
                </div>
                <div>
                  <h4 className="font-bold text-secondary-400 mb-2"><i className="fas fa-handshake mr-2"></i>Team Synergy</h4>
                  <p className="text-sm text-gray-400">We grow together as one team. Your success is our success, and we all rise together.</p>
                </div>
                <div>
                  <h4 className="font-bold text-secondary-400 mb-2"><i className="fas fa-graduation-cap mr-2"></i>Expert Guidance</h4>
                  <p className="text-sm text-gray-400">Benefit from proven strategies and personalized support throughout your journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Presentation Section */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover the Talk Fusion Opportunity</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch these powerful presentations to understand why Talk Fusion is revolutionizing the industry
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-dark-900 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Talk Fusion: Goodbye Email, Hello Video Email</h3>
                <div className="relative pb-[56.25%] h-0">
                  <VideoEmbed 
                    videoId="mKW8LZqf4VE" 
                    title="Talk Fusion: Goodbye Email, Hello Video Email" 
                  />
                </div>
                <p className="text-gray-400 mt-4">Learn how Talk Fusion is transforming email communication with revolutionary video technology.</p>
              </div>
            </div>
            <div className="bg-dark-900 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Talk Fusion 2?</h3>
                <div className="relative pb-[56.25%] h-0">
                  <VideoEmbed 
                    videoId="HW6NqKkbs6M" 
                    title="Why Talk Fusion 2?" 
                  />
                </div>
                <p className="text-gray-400 mt-4">Discover why Talk Fusion 2 is the game-changer that's disrupting the industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* PowerLine Preview */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Watch Your PowerLine Grow in Real-Time</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of synergistic team building. Every pre-enrollment builds momentum for the entire team.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <PowerLinePreview enrolleeCount={enrolleeCount} />
          </div>
        </div>
      </section>
      
      {/* Quick Benefits */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-800 border-l-4 border-primary-500 p-8 rounded-lg text-center transform transition hover:-translate-y-2 duration-300">
              <div className="text-5xl text-primary-500 mb-4"><i className="fas fa-rocket"></i></div>
              <h3 className="text-2xl font-bold mb-4">First-Mover Advantage</h3>
              <p className="text-gray-300">Position yourself at the front of the line. Everyone who follows builds YOUR business.</p>
            </div>
            <div className="bg-dark-800 border-l-4 border-primary-500 p-8 rounded-lg text-center transform transition hover:-translate-y-2 duration-300">
              <div className="text-5xl text-primary-500 mb-4"><i className="fas fa-users"></i></div>
              <h3 className="text-2xl font-bold mb-4">Team Synergy</h3>
              <p className="text-gray-300">In business for yourself but not by yourself. We grow together as one powerful team.</p>
            </div>
            <div className="bg-dark-800 border-l-4 border-primary-500 p-8 rounded-lg text-center transform transition hover:-translate-y-2 duration-300">
              <div className="text-5xl text-primary-500 mb-4"><i className="fas fa-clock"></i></div>
              <h3 className="text-2xl font-bold mb-4">1-Minute Pay</h3>
              <p className="text-gray-300">The world's first instant pay compensation plan. You earned it, you get it!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dark-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Winning Team?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Led by Kevin Gardner, word of mouth marketing expert, our team is committed to helping you achieve 
            <span className="text-secondary-400 font-bold"> success beyond your wildest dreams</span>.
          </p>
          <Link to="/pre-enroll" className="bg-gradient-to-r from-secondary-500 to-secondary-700 hover:from-secondary-400 hover:to-secondary-600 text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:-translate-y-1 transition duration-300 inline-block">
            Reserve Your FREE Position Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
