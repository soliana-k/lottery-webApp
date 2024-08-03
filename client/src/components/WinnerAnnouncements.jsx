import React, { useState, useEffect } from 'react';
import './drawresults.css';

function WinnerAnnouncements() {
  const [winners, setWinners] = useState([]);
  const [showAllWinners, setShowAllWinners] = useState(false);
  const [error, setError] = useState(null);

  const fetchWinners = async () => {
    try {
      const response = await fetch('/api/winners');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWinners(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching winners:', error);
      setError('Failed to fetch winners');
    }
  };


  useEffect(() => {
    fetchWinners();

    const interval = setInterval(() => {
      fetchWinners();
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="winner-announcements-container container-custom">
      <h2 className="display-4">Winner Announcements</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-unstyled">
        {winners.map((winner) => (
          <li key={winner._id} className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <span className="winner-name">{winner.name}</span>
            <span className="winner-prize">{winner.prize}</span>
          </li>
        ))}
      </ul>
      {!showAllWinners && (
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => setShowAllWinners(true)}
        >
          Show All Winners
        </button>
      )}
    </div>
  );
}

export default WinnerAnnouncements;
