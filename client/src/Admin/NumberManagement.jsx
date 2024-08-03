import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NumberManagement.css';

function NumberManagement() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('/api/numbers');
        setNumbers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div className="number-management">
      <h2>Number Management</h2>
      {loading ? (
        <p>Loading numbers...</p>
      ) : (
        <table className="number-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((number) => (
              <tr key={number.id}>
                <td>{number.number}</td>
                <td>{number.status ? 'Available' : 'Unavailable'}</td>
                <td>
                  <button>Toggle Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NumberManagement;
