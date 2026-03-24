// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';

const Home = () => {
  return (
    <div className="page home-page show-animate">
      <Reveal delay={0}>
        <div className="hero-section float-animate">
          <h1>Welcome to <span>Orphan Care Network</span></h1>
          <p>We believe every child deserves a loving family, quality education, and the opportunity to thrive. Join us in making a lasting impact on their lives.</p>
          <div className="cta-buttons">
            <Link to="/volunteer" className="btn btn-primary">Get Involved <ArrowRight size={18} className="ml-2" /></Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Children Supported</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">120+</div>
            <div className="stat-label">Active Volunteers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Partner Orgs</div>
          </div>
        </div>
      </Reveal>

      <div className="features-grid">
        <Reveal delay={100}>
          <div className="feature-card">
            <div className="icon-wrapper"><Heart size={32} /></div>
            <h3>Sponsorship</h3>
            <p>Sponsor a child's basic needs including food, clothing, and shelter to ensure they are safe and healthy.</p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="feature-card">
            <div className="icon-wrapper"><GraduationCap size={32} /></div>
            <h3>Education Support</h3>
            <p>Provide educational resources, school supplies, and tutoring programs to foster academic success.</p>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="feature-card">
            <div className="icon-wrapper"><Users size={32} /></div>
            <h3>Community Mentorship</h3>
            <p>Connect with a child to offer guidance, friendship, and positive role modeling as they grow.</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="content-container text-center">
          <Calendar size={48} className="text-secondary mx-auto mb-4 float-animate" />
          <h2 className="page-title">Upcoming <span>Events</span></h2>
          <p className="page-subtitle">Join us at our next community outreach event this Saturday!</p>
          <Link to="/volunteer" className="btn btn-secondary mt-4">View the Calendar</Link>
        </div>
      </Reveal>
    </div>
  );
};

export default Home;
