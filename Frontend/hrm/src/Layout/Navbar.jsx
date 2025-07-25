import React from 'react';
import '../Layout/Layout.css';
import { FiBell } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <div className="navbar">
      <div className="search-container">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-icons">
        <FiBell className="icon" />
        <FaUserCircle className="icon profile-icon" />
      </div>
    </div>
  );
}

export default Navbar;
