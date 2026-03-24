// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="page notfound-page show-animate">
      <div className="centered-content">
        <AlertCircle size={64} className="error-icon" />
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary mt-4">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
