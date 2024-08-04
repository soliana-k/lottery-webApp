import React, { useState } from 'react';  // Import useState hook
import { Link } from 'react-router-dom';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css';

const Sidebar = ({ isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Initialize active menu state

  // Function to handle menu clicks
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <section id="sidebar" className={isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <Link to="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">Double B</span>
      </Link>
      <ul className="side-menu">
        {/* Home */}
        <li className={activeMenu === 'Home' ? 'active' : ''}>  {/* Conditional class for active menu */}
          <Link to="/" onClick={() => handleMenuClick('Home')}>
            <i className='bx bxs-home'></i>
            <span className="text">Home</span>
          </Link>
        </li>

        {/* Dashboard */}
        <li className={activeMenu === 'Dashboard' ? 'active' : ''}>
          <Link to="/dashboard" onClick={() => handleMenuClick('Dashboard')}>
            <i className='bx bxs-dashboard'></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>

        {/* Transaction History */}
        <li className={activeMenu === 'Transaction History' ? 'active' : ''}>
          <Link to="/transaction" onClick={() => handleMenuClick('Transaction History')}>
            <i className='bx bxs-wallet-alt'></i>
            <span className="text">Transaction History</span>
          </Link>
        </li>

        {/* Prizes */}
        <li className={activeMenu === 'Prizes' ? 'active' : ''}>
          <Link to="/prizes" onClick={() => handleMenuClick('Prizes')}>
            <i className='bx bxs-trophy'></i>
            <span className="text">Prizes</span>
          </Link>
        </li>

        {/* Draw Results */}
        <li className={activeMenu === 'Draw Results' ? 'active' : ''}>
          <Link to="/draw_results" onClick={() => handleMenuClick('Draw Results')}>
            <i className='bx bxs-calendar-event'></i>
            <span className="text">Draw Results</span>
          </Link>
        </li>

        {/* How It Works */}
        <li className={activeMenu === 'How It Works' ? 'active' : ''}>
          <Link to="/how_it_works" onClick={() => handleMenuClick('How It Works')}>
            <i className='bx bxs-info-circle'></i>
            <span className="text">How It Works</span>
          </Link>
        </li>

        {/* Contact */}
        <li className={activeMenu === 'Contact' ? 'active' : ''}>
          <Link to="/contact" className="contact" onClick={() => handleMenuClick('Contact')}>
            <i className='bx bxs-phone'></i>
            <span className="text">Contact</span>
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
