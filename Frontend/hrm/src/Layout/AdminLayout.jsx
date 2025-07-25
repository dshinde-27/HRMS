// src/Layout/AdminLayout.js
import React from 'react';
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: '1.5rem', marginLeft: '220px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
