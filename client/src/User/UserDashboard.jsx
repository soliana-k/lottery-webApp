import React from 'react';
import './UserDashboard.css';
import 'boxicons/css/boxicons.min.css';
import { Card } from 'react-bootstrap';
import TopNavBar from './TopNavBar.jsx';
import Sidebar from './Sidebar.jsx';

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

  return (
    <div className="dashboard-container">
      <TopNavBar />
      <Sidebar />
      <div className="dashboard-content">
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

        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
