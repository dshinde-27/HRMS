import React, { useState } from 'react';
import { GiMushroomHouse } from "react-icons/gi";
import '../Layout/Layout.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='sidebar-page'>
      <div className='sidebar-container'>
        <div className='sidebar-header'>
          <GiMushroomHouse /><span>Project</span>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item" onClick={() => setIsOpen(!isOpen)}>
            Dashboard
          </div>
          {isOpen && (
            <div className="submenu">
              <div className="submenu-item">Overview</div>
              <div className="submenu-item">Analytics</div>
              <div className="submenu-item">Reports</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
