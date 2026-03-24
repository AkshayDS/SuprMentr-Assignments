// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartHandshake, Home, Info, Users } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <HeartHandshake className="nav-logo" />
        <span>Orphan Care Network</span>
      </div>
      <ul className="nav-links">
        <li>
          {/* NavLink automatically adds an 'active' class when the route matches */}
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Home className="nav-icon" size={18} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Info className="nav-icon" size={18} /> About
          </NavLink>
        </li>
        <li>
          <NavLink to="/volunteer" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Users className="nav-icon" size={18} /> Volunteer
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
