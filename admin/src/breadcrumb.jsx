// Breadcrumbs.jsx
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          active={index === items.length - 1}
        >
          {index === items.length - 1 ? (
            item.label
          ) : (
            <Link to={item.href}>{item.label}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
