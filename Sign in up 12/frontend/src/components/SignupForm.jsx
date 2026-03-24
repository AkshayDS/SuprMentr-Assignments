import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setStatus('success');
      setMessage('Account created successfully! Redirecting...');
      
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userName', response.data.fullName);
      
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setStatus('error');
      if (error.response && error.response.status === 409) {
        setMessage('This email is already registered. Try logging in.');
      } else {
        setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1>Create Account</h1>
        <p>Join our platform in seconds</p>
      </div>

      {status === 'error' && (
        <div className="alert error">
          <AlertCircle size={18} />
          {message}
        </div>
      )}

      {status === 'success' && (
        <div className="alert success">
          <CheckCircle size={18} />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <div className="input-container">
            <User className="input-icon" size={20} />
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-container">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? (
            <><span className="loader"></span> Creating account...</>
          ) : status === 'success' ? (
            'Account Created'
          ) : 'Sign Up'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Log in</Link>
      </p>
    </div>
  );
};

export default SignupForm;
