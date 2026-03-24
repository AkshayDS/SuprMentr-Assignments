import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthBook from './components/AuthBook';
import Home from './pages/Home';

function App() {
  return (
    <>
      {/* The animated colorful background is always present behind the Book */}
      <div className="animated-bg"></div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthBook />} />
          
          {/* Redirect standard auth routes to the 3D Book view */}
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/signup" element={<Navigate to="/auth" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
