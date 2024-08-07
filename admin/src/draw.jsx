import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Form, Modal, Dropdown } from 'react-bootstrap';
import './draw.css'

const DrawManagement = () => {
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [showEditDraw, setShowEditDraw] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [draws, setDraws] = useState([{ id: 1, date: '2024-08-15', time: '14:00', status: ['Upcoming'] }]);
  const [history, setHistory] = useState([]);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawStatus, setDrawStatus] = useState('Upcoming'); // Changed to a single value
  const [editingDraw, setEditingDraw] = useState(null);
  const [deletingDrawId, setDeletingDrawId] = useState(null);

  const handleShowCreate = () => setShowCreateDraw(true);
  const handleCloseCreate = () => setShowCreateDraw(false);

  const handleShowEdit = (draw) => {
    setEditingDraw(draw);
    setDrawDate(draw.date);
    setDrawTime(draw.time);
    setDrawStatus(draw.status[0] || 'Upcoming'); // Set initial status
    setShowEditDraw(true);
  };

  const handleCloseEdit = () => setShowEditDraw(false);

  const handleShowDeleteConfirm = (drawId) => {
    setDeletingDrawId(drawId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleCreateSubmit = () => {
    const selectedStatuses = Object.keys(drawStatus).filter(status => drawStatus[status]);
    const newDraw = {
      id: draws.length + 1,
      date: drawDate,
      time: drawTime,
      status: [drawStatus],
    };
    setDraws([...draws, newDraw]);

    setHistory([...history, { action: 'Created', ...newDraw, timestamp: new Date().toLocaleString() }]);

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
    const updatedDraw = updatedDraws.find(draw => draw.id === editingDraw.id);

    setDraws(updatedDraws);

    setHistory([
      ...history,
      {
        action: 'Edited',
        id: editingDraw.id,
        oldData: editingDraw,
        newData: updatedDraw,
        timestamp: new Date().toLocaleString()
      }
    ]);

    setDrawDate('');
    setDrawTime('');
    setDrawStatus('Upcoming');
    setEditingDraw(null);
    handleCloseEdit();
  };

  const handleDelete = () => {
    const deletedDraw = draws.find(draw => draw.id === deletingDrawId);
    setDraws(draws.filter(draw => draw.id !== deletingDrawId));

    setHistory([
      ...history,
      {
        action: 'Deleted',
        id: deletingDrawId,
        deletedDraw,
        timestamp: new Date().toLocaleString()
      }
    ]);

    setDeletingDrawId(null);
    handleCloseDeleteConfirm();
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={12}>
          <h2 className="mb-4">Draw Management Dashboard</h2>
          <Button variant="primary" className="mb-3" onClick={handleShowCreate}>Create New Draw</Button>
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

      
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Show History
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {history.length === 0 ? (
            <Dropdown.Item>No history available</Dropdown.Item>
          ) : (
            history.map((entry, index) => (
              <Dropdown.Item key={index}>
                <strong>{entry.action}</strong> - {entry.timestamp}
                {entry.id && <div>ID: {entry.id}</div>}
                {entry.oldData && <div>Old Data: {JSON.stringify(entry.oldData)}</div>}
                {entry.newData && <div>New Data: {JSON.stringify(entry.newData)}</div>}
                {entry.deletedDraw && <div>Deleted Draw: {JSON.stringify(entry.deletedDraw)}</div>}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default DrawManagement;
