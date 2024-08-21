import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import 'boxicons/css/boxicons.min.css';

const Sidebar = ({ isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showUsers, setShowUsers] = useState(true);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleUsersClick = () => {
    setShowUsers(!showUsers);
  };

  return (
    <section id="sidebar" className={isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <Link to="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">DoubleB</span>
      </Link>
      <ul className="side-menu">
        <li className={activeMenu === 'Dashboard' ? 'active' : ''}>
          <Link to="/dashboard" onClick={() => handleMenuClick('Dashboard')}>
            <i className='bx bxs-dashboard'></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>

        <li className={activeMenu === 'Home' ? 'active' : ''}>
          <Link to="/home" onClick={() => handleMenuClick('Home')}>
            <i className='bx bxs-home'></i>
            <span className="text">Home</span>
          </Link>
        </li>

        <li onClick={handleUsersClick} className={activeMenu === 'Users' ? 'active' : ''}>
          <a href="#" onClick={() => handleMenuClick('Users')}>
            <i className='bx bxs-group'></i>
            <span className="text">Users</span>
            {showUsers ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i>}
          </a>
        </li>
        {showUsers && (
          <ul className="nested">
            <li className={activeMenu === 'User List' ? 'active' : ''}>
              <Link to="/user-list" onClick={() => handleMenuClick('User List')}>
                <i className='bx bxs-list-ul'></i>
                <span className="text">User List</span>
              </Link>
            </li>
            <li className={activeMenu === 'New Users' ? 'active' : ''}>
              <Link to="/new-users" onClick={() => handleMenuClick('New Users')}>
                <i className='bx bxs-user-plus'></i>
                <span className="text">New Users</span>
              </Link>
            </li>
            <li className={activeMenu === 'Winners' ? 'active' : ''}>
              <Link to="/winners" onClick={() => handleMenuClick('Winners')}>
                <i className='bx bxs-star'></i>
                <span className="text">Winners</span>
              </Link>
            </li>
          </ul>
        )}

        <li className={activeMenu === 'Payment' ? 'active' : ''}>
          <Link to="/payment" onClick={() => handleMenuClick('Payment')}>
            <i className='bx bxs-credit-card'></i>
            <span className="text">Payment</span>
          </Link>
        </li>

        <li className={activeMenu === 'Settings' ? 'active' : ''}>
          <Link to="/settings" onClick={() => handleMenuClick('Settings')}>
            <i className='bx bxs-cog'></i>
            <span className="text">Settings</span>
          </Link>
        </li>

        <li className={activeMenu === 'Logout' ? 'active' : ''}>
          <Link to="/logout" className="logout" onClick={() => handleMenuClick('Logout')}>
            <i className='bx bxs-log-out-circle'></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;