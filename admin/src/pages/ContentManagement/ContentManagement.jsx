import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './ContentManagement.css'; 

const ContentManagement = () => {
  return (
    <div className="content-management-container">
      <h2>Content Management</h2>
      <div className="row">
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">FAQ Management</Card.Title>
              <Card.Text>
                Manage the FAQ section. Add, edit, or delete frequently asked questions.
              </Card.Text>
              <Link to="/content/FAQ/AdminFaq">
                <Button variant="primary">
                  Go to FAQ Management
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">Testimonials Management</Card.Title>
              <Card.Text>
                View and manage user testimonials. Add, edit, or remove testimonials as needed.
              </Card.Text>
              <Link to="/content/Testimonals/testimonials">
                <Button variant="primary">
                  Go to Testimonials Management
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContentManagement;
