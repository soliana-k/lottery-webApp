import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='custom-sidebar'>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-dashboard' />
        <span className='sidebar-nav-text'>Dashboard</span>
      </div>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-home' />
        <span className='sidebar-nav-text'>Home</span>
      </div>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-prizes' />
        <span className='sidebar-nav-text'>Prizes</span>
      </div>
      <div className='sidebar-nav-item'>
        <div className='sidebar-icon-profiles' />
        <span className='sidebar-nav-text'>Profiles</span>
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
          <span className='sidebar-info-name'>How it works</span>
          <div className='sidebar-icon-works' />
        </div>
        <div className='sidebar-info-item'>
          <span className='sidebar-info-name'>FAQ</span>
          <div className='sidebar-icon-question' />
        </div>
        <div className='sidebar-info-item'>
          <span className='sidebar-info-name'>Contact</span>
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
