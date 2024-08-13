// NumberManagement.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './NumberManagement.css';
import Breadcrumbs from './breadcrumb';

function NumberManagement() {
  return (
    <div className="number-management-container">
       <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home/' },
          { label: 'Number Management', href: '/numbermgmt' }
        ]}
      />
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
              <Link to="/numbermgmt">
                <Button variant="primary">
                  Go to Number Availability & Status
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">Audit Logs</Card.Title>
              <Card.Text>
                View audit logs for both number management and draw management.
              </Card.Text>
              <Link to="/audit-logs">
                <Button variant="primary">
                  Go to Audit Logs
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
