import React, { useState } from 'react'; // Import useState for state management
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom'; // Corrected import statement
import Sidebar from './Sidebar.jsx';
import TopNavigationBar from './UserDashboard.jsx';

const Transaction = () => {
  // Use location to determine the current path
  const location = useLocation();
  if (location.pathname === '/transaction') {
    return (
      <>
        {/* Sidebar and TopNavigationBar components are included here */}
        <Sidebar />
        <TopNavigationBar />

        <main className="setting-main">
          {/* setting header */}
          <div className="setting-header">
              <h1 className="setting-header-title">Transaction History</h1>
          </div>
          </main>
          </>)}}
          export default Transaction;