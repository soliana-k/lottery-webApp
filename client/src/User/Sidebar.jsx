import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='custom-sidebar'>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-dashboard' />
        <span className='sidebar-nav-text'><Link to="/dashboard">Dashboard</Link></span>
      </div>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-home' />
        <span className='sidebar-nav-text'><Link to="/">Home</Link></span>
      </div>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-prizes' />
        <span className='sidebar-nav-text'><Link to="/prizes">Prizes</Link></span>
      </div>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-settings' />
        <span className='sidebar-nav-text'>Settings</span>
      </div>
      <div className='sidebar-infos-section'>
        <div className='sidebar-infos-header'>
          <span className='sidebar-infos-title'>Info</span>
        </div>
        <div className='sidebar-info-item'>
          <span className='sidebar-info-name'><Link to="/how_it_works">How it works</Link></span>
          <div className='sidebar-icon-works' />
        </div>
        <div className='sidebar-info-item'>
          <span className='sidebar-info-name'><Link to="/faq">FAQ</Link></span>
          <div className='sidebar-icon-question' />
        </div>
        <div className='sidebar-info-item'>
          <span className='sidebar-info-name'><Link to="/contact">Contact</Link></span>
          <div className='sidebar-icon-contact' />
        </div>
        <div className='sidebar-theme-toggle'>
          <div className='sidebar-icon-theme'>
            <div className='sidebar-icon-light' />
            <div className='sidebar-icon-dark' />
          </div>
          <span className='sidebar-theme-label'>Light</span>
          <span className='sidebar-theme-label'>Dark</span>
        </div>
      </div>
      <div className='sidebar-spacer' />
    </div>
  );
};

export default Sidebar;
