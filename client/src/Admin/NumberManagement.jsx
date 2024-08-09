import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NumberManagement.css';


import { Table, Button, Form, Modal, Card } from 'react-bootstrap';
 

export const NumberAvailability = () => {
  const [numbers, setNumbers] = useState([
    { number: 1, status: 'Available' },
    { number: 2, status: 'Reserved' },
    { number: 3, status: 'Inactive' },
  ]);

  const handleStatusChange = (index, status) => {
    const newNumbers = [...numbers];
    newNumbers[index].status = status;
    setNumbers(newNumbers);
  };

  return (
    <div className="card p-4 mb-4">
      <h3 className="mb-3">Number Availability and Status</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((item, index) => (
            <tr key={item.number}>
              <td>{item.number}</td>
              <td>
                <Form.Select
                  value={item.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option>Available</option>
                  <option>Reserved</option>
                  <option>Inactive</option>
                </Form.Select>
              </td>
              <td>
                <Button variant="primary" onClick={() => alert('Status Updated')}>Update Status</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};






export const DrawManagement = () => {
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [draws, setDraws] = useState([
    { id: 1, date: '2024-08-15', time: '14:00', status: 'Upcoming' },
  
  ]);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');

  const handleShow = () => setShowCreateDraw(true);
  const handleClose = () => setShowCreateDraw(false);

  const handleSubmit = () => {
    const newDraw = {
      id: draws.length + 1, 
      date: drawDate,
      time: drawTime,
      status: 'Upcoming',
    };
    setDraws([...draws, newDraw]);
    setDrawDate('');
    setDrawTime('');
    handleClose(); 
  };

  return (
    <div className="draw-management-container">
      <div className="card p-4 shadow-sm mb-4">
        <h3 className="mb-4 text-primary">Draw Management</h3>
        <Button variant="primary" className="mb-3" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i> Create New Draw
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {draws.map((draw) => (
              <tr key={draw.id}>
                <td>{draw.id}</td>
                <td>{draw.date}</td>
                <td>{draw.time}</td>
                <td>{draw.status}</td>
                <td>
                  <Button variant="warning" className="me-2">
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                  <Button variant="danger">
                    <i className="bi bi-trash"></i> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showCreateDraw} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Draw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="drawDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={drawDate}
                onChange={(e) => setDrawDate(e.target.value)}
                placeholder="Select the draw date"
              />
            </Form.Group>
            <Form.Group controlId="drawTime" className="mt-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={drawTime}
                onChange={(e) => setDrawTime(e.target.value)}
                placeholder="Select the draw time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Draw
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};








function NumberManagement() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('/api/numbers');
        setNumbers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
      }
    };

    fetchNumbers();
  }, []);


  const navigate = useNavigate();

  const goToDrawManagement = () => {
    navigate('/draw');
  };

  const goToNumberAvailability = () => {
    navigate('/number');
  };

  return (
    <div className="number-management-container">
      <div className="row">
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">Draw Management</Card.Title>
              <Card.Text>
                Manage and create draws. View existing draws and edit or delete them as needed.
              </Card.Text>
              <Button variant="primary" onClick={goToDrawManagement}>
                Go to Draw Management
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">Number Availability & Status</Card.Title>
              <Card.Text>
                View and manage the availability of numbers. Check the status of numbers and update them as required.
              </Card.Text>
              <Button variant="primary" onClick={goToNumberAvailability}>
                Go to Number Availability & Status
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );

}
export default NumberManagement;

