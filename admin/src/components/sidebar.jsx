import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css'; // Ensure you have this in your project

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Initialize active menu state

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <section id="sidebar">
      <Link to="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">DoubleB</span>
      </Link>
      <ul className="side-menu">
        {/* Dashboard */}
        <li className={activeMenu === 'Dashboard' ? 'active' : ''}>
          <Link to="/dashboard" onClick={() => handleMenuClick('Dashboard')}>
            <i className='bx bxs-dashboard'></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>

        {/* Home */}
        <li className={activeMenu === 'Home' ? 'active' : ''}>
          <Link to="/home" onClick={() => handleMenuClick('Home')}>
            <i className='bx bxs-home'></i>
            <span className="text">Home</span>
          </Link>
        </li>

        {/* Users */}
        <li className={activeMenu === 'Users' ? 'active' : ''}>
          <Link to="#" onClick={() => handleMenuClick('Users')}>
            <i className='bx bxs-group'></i>
            <span className="text">Users</span>
          </Link>
        </li>

        {/* Payment */}
        <li className={activeMenu === 'Payment' ? 'active' : ''}>
          <Link to="/payment" onClick={() => handleMenuClick('Payment')}>
            <i className='bx bxs-credit-card'></i>
            <span className="text">Payment</span>
          </Link>
        </li>
        </ul>

        <ul className="side-menu">
        {/* Settings */}
        <li className={activeMenu === 'Settings' ? 'active' : ''}>
          <Link to="/settings" onClick={() => handleMenuClick('Settings')}>
            <i className='bx bxs-cog'></i>
            <span className="text">Settings</span>
          </Link>
        </li>

        {/* Logout */}
        <li className={activeMenu === 'Logout' ? 'active' : ''}>
          <Link to="/" className="logout" onClick={() => handleMenuClick('Logout')}>
            <i className='bx bxs-log-out-circle'></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
