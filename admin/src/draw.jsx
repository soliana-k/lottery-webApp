import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './draw.css';
import Breadcrumbs from './breadcrumb';

const DrawManagement = () => {
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [showEditDraw, setShowEditDraw] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [draws, setDraws] = useState([{ id: 1, date: '2024-08-15', time: '14:00', status: ['Upcoming'], winner: 'John Doe' }]);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawStatus, setDrawStatus] = useState('Upcoming');
  const [editingDraw, setEditingDraw] = useState(null);
  const [deletingDrawId, setDeletingDrawId] = useState(null);

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

  const handleCreateSubmit = () => {
    const newDraw = {
      id: draws.length + 1,
      date: drawDate,
      time: drawTime,
      status: [drawStatus],
    };
    setDraws([...draws, newDraw]);
    setDrawDate('');
    setDrawTime('');
    setDrawStatus('Upcoming');
    handleCloseCreate();
  };

  const handleEditSubmit = () => {
    const updatedDraws = draws.map(draw =>
      draw.id === editingDraw.id
        ? { ...draw, date: drawDate, time: drawTime, status: [drawStatus] }
        : draw
    );
    setDraws(updatedDraws);
    setDrawDate('');
    setDrawTime('');
    setDrawStatus('Upcoming');
    setEditingDraw(null);
    handleCloseEdit();
  };

  const handleDelete = () => {
    setDraws(draws.filter(draw => draw.id !== deletingDrawId));
    setDeletingDrawId(null);
    handleCloseDeleteConfirm();
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
                  <td>{draw.date}</td>
                  <td>{draw.time}</td>
                  <td>{draw.status.join(', ')}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleShowEdit(draw)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleShowDeleteConfirm(draw.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showCreateDraw} onHide={handleCloseCreate}>
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
                  />
                </Form.Group>
                <Form.Group controlId="drawTime" className="mt-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={drawTime}
                    onChange={(e) => setDrawTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="drawStatus" className="mt-3">
                  <Form.Label>Status</Form.Label>
                  <div className="d-flex">
                    {['Upcoming', 'Completed', 'Cancelled'].map(status => (
                      <Form.Check
                        key={status}
                        type="radio"
                        label={status}
                        name="status"
                        value={status}
                        className="me-3"
                        checked={drawStatus === status}
                        onChange={() => setDrawStatus(status)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCreate}>Close</Button>
              <Button variant="primary" onClick={handleCreateSubmit}>Create Draw</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showEditDraw} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Draw</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="editDrawDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={drawDate}
                    onChange={(e) => setDrawDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="editDrawTime" className="mt-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={drawTime}
                    onChange={(e) => setDrawTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="editDrawStatus" className="mt-3">
                  <Form.Label>Status</Form.Label>
                  <div className="d-flex">
                    {['Upcoming', 'Completed', 'Cancelled'].map(status => (
                      <Form.Check
                        key={status}
                        type="radio"
                        label={status}
                        name="status"
                        value={status}
                        className="me-3"
                        checked={drawStatus === status}
                        onChange={() => setDrawStatus(status)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
              <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this draw?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteConfirm}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default DrawManagement;
