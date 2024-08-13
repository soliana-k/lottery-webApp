// frontend/src/pages/DrawManagement.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Spinner } from 'react-bootstrap';
//import './DrawManagement.css';
import Breadcrumbs from '../../breadcrumb';

const DrawManagement = () => {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await axios.get('/api/draws');
        setDraws(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch draws:', error);
        setLoading(false);
      }
    };

    fetchDraws();
  }, []);

  const handleDeleteDraw = async (drawId) => {
    try {
      await axios.delete(`/api/draws/${drawId}`);
      setDraws(draws.filter(d => d.id !== drawId));
    } catch (error) {
      console.error('Failed to delete draw:', error);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="draw-management">
         <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Draw management', href: '/draw' }
        ]}
      />
      <h2>Draw Management</h2>
      <Button variant="primary" onClick={() => window.location.href = '/create-draw'}>
        Create New Draw
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {draws.map((draw) => (
            <tr key={draw._id}>
              <td>{draw._id}</td>
              <td>{draw.name}</td>
              <td>{new Date(draw.date).toLocaleDateString()}</td>
              <td>{draw.status}</td>
              <td>
                <Button variant="info" onClick={() => window.location.href = `/edit-draw/${draw.id}`}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteDraw(draw.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DrawManagement;
