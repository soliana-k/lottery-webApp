import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Countdown from '../src/pages/NumberManagement/count'; // Import Countdown component
import './draw.css';
import Breadcrumbs from './breadcrumb';

const DrawManagement = () => {
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [showEditDraw, setShowEditDraw] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [draws, setDraws] = useState([]);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawStatus, setDrawStatus] = useState('Upcoming');
  const [editingDraw, setEditingDraw] = useState(null);
  const [deletingDrawId, setDeletingDrawId] = useState(null);
  const [upcomingDrawTime, setUpcomingDrawTime] = useState(null);

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/draws'); // Adjust the URL as needed
        setDraws(response.data);

        // Find the upcoming draw time
        const upcomingDraw = response.data.find(draw => draw.status === 'Upcoming');
        if (upcomingDraw) {
          setUpcomingDrawTime(`${upcomingDraw.date}T${upcomingDraw.time}`);
        }
      } catch (error) {
        console.error('Error fetching draws:', error);
      }
    };

    fetchDraws();
  }, []);

  const handleShowCreate = () => setShowCreateDraw(true);
  const handleCloseCreate = () => setShowCreateDraw(false);

  const handleShowEdit = (draw) => {
    setEditingDraw(draw);
    setDrawDate(draw.date);
    setDrawTime(draw.time);
    setDrawStatus(draw.status[0] || 'Upcoming');
    setShowEditDraw(true);
  };

  const handleCloseEdit = () => setShowEditDraw(false);

  const handleShowDeleteConfirm = (drawId) => {
    setDeletingDrawId(drawId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleCreateSubmit = async () => {
    try {
      const data = {
        date: drawDate,
        time: drawTime,
        status: drawStatus,
      };
  
      if (!['Upcoming', 'Completed', 'Cancelled'].includes(data.status)) {
        throw new Error('Invalid status value');
      }
      
      const response = await axios.post('http://localhost:8000/api/admin/draws/create', data);
      console.log('Draw created successfully:', response.data);
      setDraws([...draws, response.data]);
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating draw:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const updatedDraw = {
        date: drawDate,
        time: drawTime,
        status: [drawStatus],
      };
      await axios.put(`http://localhost:8000/api/admin/draws/${editingDraw.id}`, updatedDraw);
      const updatedDraws = draws.map(draw =>
        draw.id === editingDraw.id
          ? { ...draw, ...updatedDraw }
          : draw
      );
      setDraws(updatedDraws);
      setDrawDate('');
      setDrawTime('');
      setDrawStatus('Upcoming');
      setEditingDraw(null);
      handleCloseEdit();
    } catch (error) {
      console.error('Error editing draw:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/admin/draws/${deletingDrawId}`);
      setDraws(draws.filter(draw => draw.id !== deletingDrawId));
      setDeletingDrawId(null);
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error('Error deleting draw:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); 
    const day = (`0${date.getDate()}`).slice(-2); 
    return `${year}-${month}-${day}`;
  };

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number' },
          { label: 'Draw Management', href: '/draw' }
        ]}
      />
      <Row className="my-4">
        <Col md={12}>
          <h2 className="mb-4">Draw Management Dashboard</h2>
          <Row className="mb-3">
            <Col>
              <Button variant="primary" onClick={handleShowCreate}>Create New Draw</Button>
            </Col>
            <Col className="text-end">
              <Link to="/draw-history">View History</Link>
            </Col>
          </Row>

          {/* Display Countdown if upcoming draw time is available */}
          {/* {upcomingDrawTime && (
            <Row className="mb-3">
              <Col md={12}>
                <h3>Next Draw Countdown</h3>
                <Countdown targetDate={upcomingDrawTime} />
              </Col>
            </Row>
          )} */}

          <Table striped bordered hover>
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
                  <td>{formatDate(draw.date)}</td>
                  <td>{draw.time}</td>
                  <td>{draw.status}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleShowEdit(draw)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleShowDeleteConfirm(draw.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Create Draw Modal */}
          <Modal show={showCreateDraw} onHide={handleCloseCreate}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Draw</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formDrawDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={drawDate}
                    onChange={(e) => setDrawDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDrawTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={drawTime}
                    onChange={(e) => setDrawTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDrawStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={drawStatus}
                    onChange={(e) => setDrawStatus(e.target.value)}
                  >
                    <option>Upcoming</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleCreateSubmit}>
                  Create
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Edit Draw Modal */}
          <Modal show={showEditDraw} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Draw</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formDrawDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={drawDate}
                    onChange={(e) => setDrawDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDrawTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={drawTime}
                    onChange={(e) => setDrawTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDrawStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={drawStatus}
                    onChange={(e) => setDrawStatus(e.target.value)}
                  >
                    <option>Upcoming</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleEditSubmit}>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this draw?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default DrawManagement;
