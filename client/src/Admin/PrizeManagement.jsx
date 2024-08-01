import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PrizeManagement.css';

function PrizeManagement() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const response = await axios.get('/api/prizes');
        setPrizes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch prizes:', error);
      }
    };

    fetchPrizes();
  }, []);

  return (
    <div className="prize-management">
      <h2>Prize Management</h2>
      {loading ? (
        <p>Loading prizes...</p>
      ) : (
        <table className="prize-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Winner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prizes.map((prize) => (
              <tr key={prize.id}>
                <td>{prize.id}</td>
                <td>{prize.name}</td>
                <td>{prize.quantity}</td>
                <td>{prize.winner}</td>
                <td>
                  <button>Distribute</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PrizeManagement;
