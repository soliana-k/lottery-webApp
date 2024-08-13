import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Form } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';
//import './NumberStatusAvailability.css';

const NumberStatusAvailability = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('/api/numbers');
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
    const statusMatches = filter === 'all' || number.status === filter;
    const searchMatches = number.number.toString().includes(search);
    return statusMatches && searchMatches;
  });

  if (loading) {
    return <Spinner animation="border" />;
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
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by number"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Form.Select
          className="mt-2"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="selected">Selected</option>
        </Form.Select>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredNumbers.map((number) => (
            <tr key={number.id}>
              <td>{number.id}</td>
              <td>{number.number}</td>
              <td>{number.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NumberStatusAvailability;
