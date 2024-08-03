import React, { useState } from 'react';
import './UserDashboard.css';
import { Link } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import Sidebar from './Sidebar';
import { Card } from 'react-bootstrap';

const UserDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode); // Function to toggle dark mode

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Function to toggle sidebar

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
    Array.from({ length: 10 }, (_, i) => i + 1),
    Array.from({ length: 10 }, (_, i) => i + 11),
    Array.from({ length: 10 }, (_, i) => i + 21),
    Array.from({ length: 10 }, (_, i) => i + 31),
    Array.from({ length: 10 }, (_, i) => i + 41),
    Array.from({ length: 10 }, (_, i) => i + 51),
    Array.from({ length: 9 }, (_, i) => i + 61),
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
                {row.map(num => (
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
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} /> {/* Sidebar component */}
      <section className={`dashboard-content ${isSidebarOpen ? 'content-expanded' : ''}`}>
        <NavigationBar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          toggleSidebar={toggleSidebar} 
        /> {/* Use the NavigationBar component */}
        
        {/* Main content of the dashboard */}
        <main className="dashboard-main">
          {/* Dashboard header */}
          <div className="dashboard-header">
            <div className="header-left">
              <h1 className="header-title">Dashboard</h1>
              <ul className="breadcrumb">
                <li><Link className="breadcrumb-link active" to="/">Home</Link></li>
                <li><i className='bx bx-chevron-right'></i></li>
                <li><Link to="/dashboard" className="breadcrumb-link">Dashboard</Link></li>
              </ul>
            </div>
          </div>

          {/* Table and Notification sections */}
          <div className="table-section">
            {/* Notification Section */}
            <Card className="notification-section">
              <Card.Header className="notification-header d-flex justify-content-between align-items-center">
                <h3>Notifications</h3>
                <div>
                  <i className='bx bx-bell'></i>
                  <i className='bx bx-filter ml-2'></i>
                </div>
              </Card.Header>
              <Card.Body>
                {/* List for displaying notifications */}
                <ul className="notification-list">
                  {notifications.map(notification => (
                    <li key={notification.id} className="notification-item d-flex justify-content-between align-items-center">
                      <p>{notification.message}</p>
                      <span className="notification-date">{notification.date}</span>
                      <i className='bx bx-dots-vertical-rounded'></i>
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
                  <i className='bx bx-search'></i>
                  <i className='bx bx-filter ml-2'></i>
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
      </section>
    </div>
  );
};

export default UserDashboard;
