import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthBook = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // Login State
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginStatus, setLoginStatus] = useState('idle');
  const [loginMessage, setLoginMessage] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Signup State
  const [signupForm, setSignupForm] = useState({ fullName: '', email: '', password: '' });
  const [signupStatus, setSignupStatus] = useState('idle');
  const [signupMessage, setSignupMessage] = useState('');
  const [showSignupPass, setShowSignupPass] = useState(false);

  const turnPage = () => {
    setIsFlipped(!isFlipped);
    setLoginMessage('');
    setSignupMessage('');
  };

  const handeLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus('loading');
    setLoginMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', loginForm);
      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('userName', res.data.fullName);
      navigate('/');
    } catch (err) {
      setLoginStatus('error');
      setLoginMessage(err.response?.data?.message || 'Invalid credentials.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupStatus('loading');
    setSignupMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', signupForm);
      setSignupStatus('success');
      setSignupMessage('Success! Redirecting...');
      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('userName', res.data.fullName);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setSignupStatus('error');
      setSignupMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="book-container">
      <div className={`book ${isFlipped ? 'flipped-state' : ''}`}>
        
        {/* RIGHT SUB-PAGE: SIGN UP FORM (Always sitting on the right side underneath the turning page) */}
        <div className="page right-page base-page shadow-right">
          <div className="form-content">
            <h1 className="title-gradient">Create Account</h1>
            <p className="subtitle">Join us and start your journey</p>
            
            {signupMessage && (
              <div className={`alert ${signupStatus}`}>
                <AlertCircle size={16} /> {signupMessage}
              </div>
            )}
            
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input type="text" name="fullName" placeholder="Full Name" className="form-control" onChange={handleSignupChange} required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <Mail className="input-icon" size={18} />
                  <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleSignupChange} required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <Lock className="input-icon" size={18} />
                  <input type={showSignupPass ? "text" : "password"} name="password" placeholder="Password" className="form-control" onChange={handleSignupChange} required minLength="6" />
                  <button type="button" className="password-toggle" onClick={() => setShowSignupPass(!showSignupPass)}>
                    {showSignupPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary" disabled={signupStatus === 'loading'}>
                {signupStatus === 'loading' ? 'Creating...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>

        {/* TURNING PAGE (Right side when closed, Left side when flipped) */}
        {/* Front face = Login Form, Back face = Info panel over left side */}
        <div className={`page turning-page ${isFlipped ? 'flipped' : ''}`}>
          
          {/* FRONT FACE: LOGIN FORM */}
          <div className="page-face front">
            <div className="form-content">
              <h1 className="title-gradient">Welcome Back</h1>
              <p className="subtitle">Log in to your account</p>

              {loginMessage && (
                <div className={`alert ${loginStatus}`}>
                  <AlertCircle size={16} /> {loginMessage}
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <div className="input-container">
                    <Mail className="input-icon" size={18} />
                    <input type="email" name="email" placeholder="Email" className="form-control" onChange={handeLoginChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-container">
                    <Lock className="input-icon" size={18} />
                    <input type={showLoginPass ? "text" : "password"} name="password" placeholder="Password" className="form-control" onChange={handeLoginChange} required />
                    <button type="button" className="password-toggle" onClick={() => setShowLoginPass(!showLoginPass)}>
                      {showLoginPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={loginStatus === 'loading'}>
                  {loginStatus === 'loading' ? 'Logging in...' : 'Log In'}
                </button>
              </form>
            </div>
          </div>
          
          {/* BACK FACE: PANEL COVERING LEFT SIDE AFTER FLIP */}
          <div className="page-face back panel-bg">
            <div className="panel-content">
              <h2>One of us?</h2>
              <p>If you already have an account, just sign in to view your dashboard.</p>
              <button onClick={turnPage} className="btn-outline">Sign In</button>
            </div>
          </div>
          
        </div>

        {/* LEFT SUB-PAGE: INFO PANEL FOR SIGN UP (Always sitting on the left side underneath) */}
        <div className="page left-page base-page panel-bg shadow-left">
          <div className="panel-content">
            <h2>New Here?</h2>
            <p>Sign up and discover a great amount of new opportunities!</p>
            <button onClick={turnPage} className="btn-outline">Sign Up</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AuthBook;
