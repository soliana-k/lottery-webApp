import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <NavLink to="/admin/user-management" activeClassName="active">
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/number-management" activeClassName="active">
            Number Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payment-management" activeClassName="active">
            Payment Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/prize-management" activeClassName="active">
            Prize Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/content-management" activeClassName="active">
            Content Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/security-compliance" activeClassName="active">
            Security & Compliance
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
