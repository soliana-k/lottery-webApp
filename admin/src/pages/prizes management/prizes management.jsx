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
          { label: 'Prizes Management',  }
        ]}
      />
      
      {/* Content Sections */}
      <div >
        <h1>laaaaaaaaaaa</h1>
        
        
      </div>
    </div>
  );
}

export default Prizemanagement;
