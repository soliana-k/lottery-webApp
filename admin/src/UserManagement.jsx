// NumberManagement.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './UserManagement.css';
import Breadcrumbs from './breadcrumb';

function UserManagement() {
  return (
    <div className="user-management-container">
       <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home/' },
          { label: 'User Management', href: '/usermgmt' }
        ]}
      />
      <div className="row">
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">User lists</Card.Title>
              <Card.Text>
                Manage and View registered User and edit or delete them as needed.
              </Card.Text>
              <Link to="/Userlist">
                <Button variant="primary">
                  Go to User Lists
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        
    
      </div>
    </div>
  );
}

export default UserManagement;
