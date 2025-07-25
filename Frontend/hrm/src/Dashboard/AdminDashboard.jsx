import React from 'react';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';

function AdminDashboard() {
  return (
    <div>
        <Sidebar/>
        <Navbar/>
        <a href='/roleandpermission'>Roles and Permission</a>
    </div>
  )
}

export default AdminDashboard