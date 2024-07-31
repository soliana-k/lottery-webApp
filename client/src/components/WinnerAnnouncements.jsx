import React from 'react';
import './drawresults.css'; // Ensure you have this imported for custom styling

// Mock data for winners
const winners = [
  { name: 'Faiza', prize: 'Car' },
  { name: 'Feven', prize: 'Vacation' },
  // More winners...
];

function WinnerAnnouncements() {
  return (
    <div className="winner-announcements-container container-custom">
      <h2 className="display-4">Winner Announcements</h2>
      <ul className="list-unstyled">
        {winners.map((winner, index) => (
          <li key={index} className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <span className="winner-name">{winner.name}</span>
            <span className="winner-prize">{winner.prize}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WinnerAnnouncements;
