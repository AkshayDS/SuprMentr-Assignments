import React from 'react';
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import our custom components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Volunteer from './pages/Volunteer';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    // BrowserRouter wraps the entire application to enable client-side routing
    <Router>
      <div className="app-container">
        {/* Navbar is placed outside of Routes so it renders on every page */}
        <Navbar />
        
        <main className="main-content">
          {/* Routes defines the different paths and the components they render */}
          <Routes>
            {/* Each Route maps a URL path to a specific component */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/volunteer" element={<Volunteer />} />
            
            {/* The catch-all route uses path="*" to match any undefined URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
