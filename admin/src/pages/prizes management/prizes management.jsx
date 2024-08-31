import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb'; 

const Prizemanagement = () => {
  return (
    <div className="content-management-container">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Prizes Management' }
        ]}
      />
      
      {/* Content Sections */}
      <div className="row">
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">Add Prizes</Card.Title>
              <Card.Text>
                Manage the Prizes section. Add new prizes.
              </Card.Text>
              <Link to="/Addprizes">
                <Button variant="primary">
                  Go to Add Prizes
                </Button>
              </Link>
            </Card.Body>
          </Card>
          
        </div>
        <div className="col-md-6 mb-4 d-flex mt-5">
          <Card className="text-center card-equal">
            <Card.Body>
              <Card.Title className="mb-4">Edit or Delete Prizes</Card.Title>
              <Card.Text>
                Manage the Prizes section. Edit, or delete frequently added prizes.
              </Card.Text>
              <Link to="/prizes/prizes/prizes">
                <Button variant="primary">
                  Go to Edit or Delete Prizes
                </Button>
              </Link>
            </Card.Body>
          </Card>
          
        </div>
        
        
      </div>
    </div>
  );
}

export default Prizemanagement;
