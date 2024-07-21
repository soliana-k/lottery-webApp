import React, { useState } from 'react';
// import './navbar.css';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserDashboard.css';  // Import custom CSS

// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-white px-lg-3 py-lg-2 shadow-sm sticky-top">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" href="App.js">Double B</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse " id="navbarSupportedContent">
//                     <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold h-font">
//                         <li className="nav-item">
//                             <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/How_it_works">How It Works</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/prizes">Prizes</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/faq">FAQ</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/Contact">Contact</Link>
//                         </li>
//                     </ul>
//                     <form className="d-flex">
//                         <FontAwesomeIcon icon={faBell} className="icon mx-2" size="lg" />
//                         <FontAwesomeIcon icon={faUser} className="icon mx-2" size="lg" />
//                     </form>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// Sample data
const availableNumbers = Array.from({ length: 81 }, (_, i) => i); // Numbers 0-80
const transactions = [
  { id: 1, number: 7, date: '2024-07-20', amount: '$10', status: 'Paid' },
  { id: 2, number: 15, date: '2024-07-21', amount: '$15', status: 'Pending' },
  // Add more items as needed
];
const notifications = [
  { id: 1, message: 'Upcoming draw on 2024-08-01!', date: '2024-07-25' },
  { id: 2, message: 'Congratulations to the winners of the July draw!', date: '2024-07-21' },
  // Add more items as needed
];

const Dashboard = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  const handleConfirmSelection = () => {
    alert(`Number ${selectedNumber} selected!`);
    // Implement confirmation logic here
  };

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        <Col xs={12} md={5} lg={6} className="main-content">
          <Card className="mb-4">
            <Card.Header>Notifications</Card.Header>
            <Card.Body className="notification-list">
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
          <Card>
            <Card.Header>Transaction History</Card.Header>
            <Card.Body className="transaction-list">
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
        <Col xs={12} md={7} lg={6} className="number-selection">
          <Card className="number-selection-card">
            <Card.Header>Number Selection</Card.Header>
            <Card.Body>
              <div className="number-grid">
                {availableNumbers.map(number => (
                  <Button
                    key={number}
                    variant={selectedNumber === number ? 'primary' : 'secondary'}
                    onClick={() => handleNumberSelect(number)}
                    className={`number-button ${selectedNumber === number ? 'selected' : ''}`}
                  >
                    {number}
                  </Button>
                ))}
              </div>
              <Button
                className="confirm-button mt-3 btn btn-primary"
                onClick={handleConfirmSelection}
                disabled={selectedNumber === null}
              >
                Start Lottery
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// export { Navbar, Dashboard }; After correcting the navigation bar use this code to export
export default Dashboard;

