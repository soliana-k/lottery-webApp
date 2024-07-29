import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import Sidebar from './Sidebar';
import './UserDashboard.css';

// Sample data
const availableNumbers = Array.from({ length: 81 }, (_, i) => i); // Numbers 0-80
const transactions = [
  { id: 1, number: 7, date: '2024-07-20', amount: '$10', status: 'Paid' },
  { id: 2, number: 15, date: '2024-07-21', amount: '$15', status: 'Pending' },
  // I will add more items as needed
];
const notifications = [
  { id: 1, message: 'Upcoming draw on 2024-08-01!', date: '2024-07-25' },
  { id: 2, message: 'Congratulations to the winners of the July draw!', date: '2024-07-21' },
  // I will add more items as needed
];

const UserDashboard = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  const handleConfirmSelection = () => {
    alert(`Number ${selectedNumber} selected!`);
    // Confirmation logic will be implemented after the backend
  };

  return (
    <div className="user-dashboard-wrapper">
      <Sidebar />
      <div className="user-dashboard-content">
        <Container fluid>
          <Row>
            <Col xs={12} md={4} lg={5} className="user-dashboard-main-content">
              <Card className="user-dashboard-card mb-4">
                <Card.Header>Notifications</Card.Header>
                <Card.Body className="user-dashboard-notification-list">
                  <ListGroup>
                    {notifications.map(notification => (
                      <ListGroup.Item key={notification.id}>
                        <div>{notification.message}</div>
                        <div className="text-muted">{notification.date}</div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="user-dashboard-card">
                <Card.Header>Transaction History</Card.Header>
                <Card.Body className="user-dashboard-transaction-list">
                  <ListGroup>
                    {transactions.map(transaction => (
                      <ListGroup.Item key={transaction.id}>
                        <div>Number: {transaction.number}</div>
                        <div>Date: {transaction.date}</div>
                        <div>Amount: {transaction.amount}</div>
                        <div>Status: {transaction.status}</div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={8} lg={7} className="user-dashboard-number-selection">
              <Card className="user-dashboard-card">
                <Card.Header>Number Selection</Card.Header>
                <Card.Body>
                  <div className="user-dashboard-number-grid">
                    {availableNumbers.map(number => (
                      <Button
                        key={number}
                        variant={selectedNumber === number ? 'primary' : 'secondary'}
                        onClick={() => handleNumberSelect(number)}
                        className={`user-dashboard-number-button ${selectedNumber === number ? 'selected' : ''}`}
                      >
                        {number}
                      </Button>
                    ))}
                  </div>
                  <Button
                    className="user-dashboard-confirm-button"
                    onClick={handleConfirmSelection}
                    disabled={selectedNumber === null}
                    variant="secondary"
                  >
                    Start Lottery
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserDashboard;
