import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Activity, Bell, Star } from 'lucide-react';

const Home = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Basic protection: check if user is logged in
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/auth');
    } else {
      const storedName = localStorage.getItem('userName');
      setUserName(storedName || 'User');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    navigate('/auth');
  };

  return (
    <div className="home-container">
      <div className="home-dashboard">
        
        {/* Animated Slide-Down Header */}
        <header className="welcome-header">
          <div className="welcome-text">
            <h1>Welcome Back, {userName}!</h1>
            <p className="subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Here's what's happening with your account today.
            </p>
          </div>
          <div className="header-actions">
            <button className="icon-btn" title="Notifications">
              <Bell size={26} />
            </button>
            <button className="icon-btn logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={26} />
            </button>
          </div>
        </header>

        {/* Staggered Fade-Up Grid */}
        <div className="stats-grid">
          
          <div className="stat-card">
            <div className="icon-wrapper">
              <User size={34} color="#fff" />
            </div>
            <h2>Profile Setup</h2>
            <p>Your profile is currently 80% complete. Add a profile picture to finish setup.</p>
            <button className="card-btn">Update Profile</button>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper">
              <Activity size={34} color="#fff" />
            </div>
            <h2>Recent Activity</h2>
            <p>You have 3 new notifications and 1 unread message since your last login.</p>
            <button className="card-btn">View Activity</button>
          </div>

          <div className="stat-card">
            <div className="icon-wrapper">
              <Star size={34} color="#fff" />
            </div>
            <h2>Pro Membership</h2>
            <p>Ready for more? Upgrade to Premium to unlock advanced animated features!</p>
            <button className="card-btn premium">Upgrade Now</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;
