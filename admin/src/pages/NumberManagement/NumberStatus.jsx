import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../breadcrumb';
//import './exp.css'; // Add this to handle custom styling

const NumberStatusAvailability = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
        setNumbers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);

  const filteredNumbers = numbers.filter(number => {
    const statusMatches = filter === 'all' || number.selected.toString() === filter;
    const searchMatches = number.number.toString().includes(search);
    return statusMatches && searchMatches;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" />
        <p>Loading numbers...</p>
      </div>
    );
  }

  return (
    <div className="number-status-availability">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Number Status and Availability', href: '/numbermgmt' }
        ]}
      />
      <h2>Number Status & Availability</h2>
      
      <Link to="/num">
        <Button variant="primary" className="mb-3 manage-button">
          Go to Number Management
        </Button>
      </Link>
      
      <Form className="search-filter-form">
        <Form.Control
          type="text"
          placeholder="Search by number"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Form.Select
          className="mt-2 filter-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">Selected</option>
          <option value="false">Available</option>
        </Form.Select>
      </Form>

      <Table className="number-table" striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredNumbers.map((number) => (
            <tr key={number._id}>
              <td>{number._id}</td>
              <td>{number.number}</td>
              <td className={number.selected ? 'selected-status' : 'available-status'}>
                {number.selected ? 'Selected' : 'Available'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NumberStatusAvailability;
