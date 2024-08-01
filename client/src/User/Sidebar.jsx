import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <section id="sidebar" className={isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <a href="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">Double B</span>
      </a>
      <ul className="side-menu top">
        <li className="active">
          <Link to="/dashboard">
            <i className='bx bxs-dashboard'></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/transaction">
            <i className='bx bxs-wallet-alt'></i>
            <span className="text">Transaction History</span>
          </Link>
        </li>
        <li>
          <Link to="/prizes">
            <i className='bx bxs-trophy'></i>
            <span className="text">Prizes</span>
          </Link>
        </li>
        <li>
          <Link to="/draw_results">
            <i className='bx bxs-calendar-event'></i>
            <span className="text">Draw Results</span>
          </Link>
        </li>
        <li>
          <Link to="/how_it_works">
            <i className='bx bxs-info-circle'></i>
            <span className="text">How It Works</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="contact">
            <i className='bx bxs-phone'></i>
            <span className="text">Contact</span>
          </Link>
        </li>
      </ul>
      <ul className="side-menu bottom">
        <li>
          <Link to="/setting">
            <i className='bx bxs-cog'></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="logout">
            <i className='bx bxs-log-out-circle'></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
