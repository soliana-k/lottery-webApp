// ContentManagement.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ContentManagement.css';

const ContentManagement = () => {
  return (
    <div className="content-management">
      <h2>Content Management</h2>
      <ul>
        <li><Link to="/content/FAQ/AdminFaq">FAQ Page</Link></li>
        <li><Link to="/content/Testimonals/testimonials">Testimonials Page</Link></li>
        {/* Add other content pages as needed */}
      </ul>
    </div>
  );
};

export default ContentManagement;
