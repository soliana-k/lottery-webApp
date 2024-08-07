import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './NumberManagement.css';

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
              <Link to="/draw">
                <Button variant="primary">
                  Go to Draw Management
                </Button>
              </Link>
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
              <Link to="/number">
                <Button variant="primary">
                  Go to Number Availability & Status
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default NumberManagement;
