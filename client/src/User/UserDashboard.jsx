import React, { useState } from 'react';
import './UserDashboard.css';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import DarkMode from './DarkMode';
import Sidebar from './Sidebar.jsx';
import { Card } from 'react-bootstrap';

const TopNavigationBar = ({ toggleDarkMode, isDarkMode, toggleSidebar }) => {
  return (
    <nav className="dashboard-nav">
      <div className="menu-toggle" onClick={toggleSidebar}>
        <i className="bx bx-menu" onClick={toggleSidebar}></i>
      </div>
      <form action="#" className="search-form">
        <div className="search-input-wrapper">
          <input type="search" placeholder="Search..." className="search-input" />
          <button type="submit" className="search-button">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      {/* Dark Mode Toggle */}
      <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Link to="#" className="notification-icon">
        <i className="bx bxs-bell"></i>
        <span className="notification-count">8</span>
      </Link>
      <Link to="#" className="profile-icon">
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="Profile" />
      </Link>
    </nav>
  );
};

const UserDashboard = () => {
  // Sample data for notifications
  const notifications = [
    { id: 1, message: 'Upcoming draw on 2024-08-01!', date: '2024-07-25' },
    { id: 2, message: 'Congratulations to the winners of the July draw!', date: '2024-07-21' },
    { id: 3, message: 'Your ticket purchase was successful!', date: '2024-07-22' },
    // Add more notifications as needed
  ];

  // Sample data for transactions
  const transactions = [
    { item: 'Chair', amount: '2000.00 br', date: '2024-08-01' },
    { item: 'Dining table', amount: '6000.00 br', date: '2024-08-02' },
    // Add more transactions as needed
  ];

  // Available numbers data
  const rows = [
    Array.from({ length: 18 }, (_, i) => i + 1),
    Array.from({ length: 18 }, (_, i) => i + 19),
    Array.from({ length: 18 }, (_, i) => i + 37),
    Array.from({ length: 17 }, (_, i) => i + 55),
    Array.from({ length: 17 }, (_, i) => i + 72),
    Array.from({ length: 15 }, (_, i) => i + 89),
  ];

  const renderNumbers = () => (
    <Card className="number-card">
      <Card.Header className="number-card-header">
        <h3>Available Numbers</h3>
      </Card.Header>
      <Card.Body>
        <div className="number-selection">
          <div className="number-grid">
            {rows.map((row, rowIndex) => (
              <div className="number-row" key={rowIndex}>
                {row.map((num) => (
                  <div key={num} className="number-circle">
                    {num}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="dashboard-container">
      {/* Main content of the dashboard */}
      <main className="dashboard-main">
        {/* Dashboard header */}
        <div className="dashboard-header">
            <h1 className="header-title">Dashboard</h1>
        </div>

        {/* Table and Notification sections */}
        <div className="table-section">
          {/* Notification Section */}
          <Card className="notification-section">
            <Card.Header className="notification-header d-flex justify-content-between align-items-center">
              <h3>Notifications</h3>
              <div>
                <i className="bx bx-bell"></i>
                <i className="bx bx-filter ml-2"></i>
              </div>
            </Card.Header>
            <Card.Body>
              {/* List for displaying notifications */}
              <ul className="notification-list">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="notification-item d-flex justify-content-between align-items-center"
                  >
                    <p>{notification.message}</p>
                    <span className="notification-date">{notification.date}</span>
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          {/* Transaction History Section */}
          <Card className="transaction-history">
            <Card.Header className="transaction-header d-flex justify-content-between align-items-center">
              <h3>Transaction History</h3>
              <div>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter ml-2"></i>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Table for displaying transaction history */}
              <table className="transaction-table table table-borderless">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.item}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>

        {/* Available Numbers Section */}
        {renderNumbers()}
      </main>
    </div>
  );
};

const DashboardWrapper = () => {
  const location = useLocation(); // Use location to determine the current path
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode); // Function to toggle dark mode
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Function to toggle sidebar

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} /> {/* Sidebar component */}
      <section className={`dashboard-content ${isSidebarOpen ? 'content-expanded' : ''}`}>
        {/* Top Navigation Bar */}
        <TopNavigationBar
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          toggleSidebar={toggleSidebar}
        />
        {/* Conditional rendering based on the current path */}
        {location.pathname === '/dashboard' && <UserDashboard />}
      </section>
    </div>
  );
};

export default DashboardWrapper;
