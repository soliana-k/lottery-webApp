import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  const [originalDrawDate, setOriginalDrawDate] = useState('');

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/draws');
        setDraws(response.data);
      } catch (error) {
        console.error('Error fetching draws:', error);
      }
    };

    fetchDraws();
  }, []);

  const handleShowCreate = () => setShowCreateDraw(true);
  const handleCloseCreate = () => {
    setShowCreateDraw(false);
    resetFormFields();
  };

  const handleShowEdit = (draw) => {
    setEditingDraw(draw);
    setDrawDate(formatDateForInput(draw.date));
    setDrawTime(draw.time);
    setDrawStatus(draw.status);
    setOriginalDrawDate(formatDateForInput(draw.date));
    setShowEditDraw(true);
  };

  const handleCloseEdit = () => {
    setShowEditDraw(false);
    resetFormFields();
  };

  const handleShowDeleteConfirm = (drawId) => {
    setDeletingDrawId(drawId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const resetFormFields = () => {
    setDrawDate('');
    setDrawTime('');
    setDrawStatus('Upcoming');
  };

  const handleCreateSubmit = async () => {
    try {
      const data = {
        date: drawDate,
        time: drawTime,
        status: 'Upcoming',
      };
      const response = await axios.post('http://localhost:8000/api/v1/admin/draws/create', data);
      setDraws([...draws, response.data]);
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating draw:', error.response ? error.response.data : error.message);
    }
  };

  const combineDateAndTime = (date, time) => {
    return new Date(`${date}T${time}`).toISOString();
  };

  const handleEditSubmit = async () => {
    try {
      const updatedDraw = {
        date: combineDateAndTime(drawDate, drawTime),
        time: drawTime,
        status: drawStatus,
      };
      await axios.put(`http://localhost:8000/api/v1/admin/draws/${editingDraw._id}`, updatedDraw);
      const updatedDraws = draws.map(draw =>
        draw._id === editingDraw._id
          ? { ...draw, ...updatedDraw }
          : draw
      );
      setDraws(updatedDraws);
      handleCloseEdit();
    } catch (error) {
      console.error('Error editing draw:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/draws/delete/${id}`);
      setDraws(draws.filter(draw => draw._id !== id));
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error('Error deleting draw:', error);
    }
  };

  const formatDateForInput = (dateString) => {
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
              <Link to="#" onClick={handleShowCreate} className="btn btn-primary">Create New Draw</Link>
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
                <tr key={draw._id}>
                  <td>{draw._id}</td>
                  <td>{formatDateForInput(draw.date)}</td>
                  <td>{draw.time}</td>
                  <td>{draw.status}</td>
                  <td>
                    <Row>
                      <Col>
                        <Link to="#" onClick={() => handleShowEdit(draw)}>Edit</Link>
                      </Col>
                      <Col>
                        <Link to="#" className="text-danger" onClick={() => handleShowDeleteConfirm(draw._id)}>Delete</Link>
                      </Col>
                    </Row>
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
                    disabled
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
                    placeholder={originalDrawDate}
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
              Are you sure you want to delete this draw?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deletingDrawId)}>
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
