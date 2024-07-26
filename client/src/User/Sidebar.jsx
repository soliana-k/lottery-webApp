import React from 'react';
import './Sidebar.css'; // Ensure your CSS file is named appropriately

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='nav-item'>
        <div className='icon-tasks' />
        <span className='nav-text'>My Tasks</span>
      </div>
      <div className='nav-item'>
        <div className='icon-statistics' />
        <span className='nav-text'>Statistics</span>
      </div>
      <div className='nav-item'>
        <div className='icon-profiles' />
        <span className='nav-text'>Profiles</span>
      </div>
      <div className='nav-item'>
        <div className='icon-settings' />
        <span className='nav-text'>Settings</span>
      </div>
      <div className='teams-section'>
        <div className='teams-header'>
          <span className='teams-title'>TEAMS</span>
        </div>
        <div className='team-item'>
          <span className='team-name'>Sales</span>
          <div className='icon-sales' />
        </div>
        <div className='team-item'>
          <div className='icon-marketing' />
          <span className='team-name'>Marketing</span>
        </div>
        <div className='team-item'>
          <span className='team-name'>Add project</span>
          <div className='icon-add-project' />
        </div>
        <div className='theme-toggle'>
          <div className='icon-theme'>
            <div className='icon-light' />
            <div className='icon-dark' />
          </div>
          <span className='theme-label'>Light</span>
          <span className='theme-label'>Dark</span>
        </div>
      </div>
      <div className='dashboard-button'>
        <button className='dashboard-btn'>
          <div className='icon-dashboard' />
          <span className='btn-text'>Dashboard</span>
        </button>
      </div>
      <div className='spacer' />
    </div>
  );
};

export default Sidebar;