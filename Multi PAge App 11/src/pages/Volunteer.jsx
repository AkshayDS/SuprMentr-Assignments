// src/pages/Volunteer.jsx
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Reveal from '../components/Reveal';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    interest: '',
    motivation: ''
  });
  
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call processing time
    setTimeout(() => {
      setSubmittedData(formData);
    }, 500);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      interest: '',
      motivation: ''
    });
  };

  return (
    <div className="page volunteer-page show-animate">
      <Reveal delay={0}>
        <div className="content-container text-center">
          <h2 className="page-title">Get <span>Involved</span></h2>
          <p className="page-subtitle">Your time and skills can make a world of difference. Join our network of compassionate volunteers today.</p>
        </div>
      </Reveal>

      <div className="grid-2">
        <Reveal delay={100}>
          <div className="content-container h-full">
            <h3 className="mb-4 text-primary text-2xl font-bold">Ways to Help</h3>
            <div className="volunteer-options" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: 0 }}>
              <div className="option-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                <h4 className="text-xl font-bold mb-2">Mentorship Program</h4>
                <p className="text-muted">Spend 2 hours a week guiding and supporting a child's educational journey via virtual or in-person sessions.</p>
              </div>
              <div className="option-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
                <h4 className="text-xl font-bold mb-2">Community Events</h4>
                <p className="text-muted">Help organize fundraising, awareness events, and summer camps in your local area.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="content-container">
            <h3 className="mb-4 text-primary text-2xl font-bold">Volunteer Application</h3>
            
            {submittedData ? (
              <div className="text-center py-4 float-animate">
                <CheckCircle size={64} className="text-secondary mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Application Received!</h4>
                <p className="text-muted mb-4">Thank you, <strong className="text-main">{submittedData.fullName}</strong>. Here is a summary of your application:</p>
                
                <div className="submitted-summary" style={{ textAlign: 'left', background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                  <p className="mb-2"><strong>Email:</strong> {submittedData.email}</p>
                  <p className="mb-2"><strong>Area of Interest:</strong> <span style={{ textTransform: 'capitalize' }}>{submittedData.interest}</span></p>
                  <p className="mb-2"><strong>Motivation:</strong></p>
                  <p className="text-muted mt-2" style={{ fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '3px solid var(--primary)' }}>"{submittedData.motivation}"</p>
                </div>
                
                <p className="text-muted">Our coordinator will contact you within 48 hours to discuss next steps.</p>
                <button onClick={resetForm} className="btn btn-secondary w-full mt-4">Submit Another Application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Area of Interest</label>
                  <select 
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="form-select" 
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="mentorship">Mentorship</option>
                    <option value="events">Event Coordination</option>
                    <option value="fundraising">Fundraising</option>
                    <option value="other">Other Skills</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Why do you want to join us?</label>
                  <textarea 
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className="form-textarea" 
                    placeholder="Tell us briefly about your background and motivation..." 
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-full mt-4">
                  Submit Application <Send size={18} className="ml-2" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Volunteer;
