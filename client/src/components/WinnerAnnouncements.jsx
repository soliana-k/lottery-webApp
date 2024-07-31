import React, { useState, useEffect } from 'react';
import './drawresults.css'; // Ensure you have this imported for custom styling

// Initial mock data for winners
const initialWinners = [
  { name: 'Faiza', prize: 'Car' },
  { name: 'Feven', prize: 'Vacation' },
];

// Additional mock data to simulate loading more winners
const moreWinners = [
  { name: 'Fatuma', prize: 'Smartphone' },
  { name: 'Feben', prize: 'Gift Card' },
  { name: 'Kalkidan', prize: 'Tablet' },
  { name: 'Kebede', prize: 'Headphones' },
];

function WinnerAnnouncements() {
  const [winners, setWinners] = useState(initialWinners);
  const [showAllWinners, setShowAllWinners] = useState(false);
  const [latestWinnersIndex, setLatestWinnersIndex] = useState(0);

  // Function to simulate adding new winners
  const addMoreWinners = () => {
    setWinners(prevWinners => [...prevWinners, ...moreWinners]);
    setShowAllWinners(true);
  };

  // Effect to simulate updating winners every 5 seconds
  useEffect(() => {
    if (showAllWinners) return; // Stop the interval if all winners are shown

    const timer = setInterval(() => {
      setLatestWinnersIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= moreWinners.length) {
          clearInterval(timer); // Stop timer when all additional winners are shown
          return prevIndex;
        }
        // Update winners state with the new winner
        setWinners(prevWinners => [...prevWinners, moreWinners[nextIndex]]);
        return nextIndex;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [showAllWinners]); // Depend on showAllWinners to control the effect

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
      {!showAllWinners && (
        <button 
          className="btn btn-primary mt-3" 
          onClick={addMoreWinners}
        >
          Show All Winners
        </button>
      )}
    </div>
  );
}

export default WinnerAnnouncements;
