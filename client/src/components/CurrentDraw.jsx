import React, { useState, useEffect } from 'react';
import './drawresults.css'; // Ensure you have this imported for custom styling

function generateRandomNumbers(count, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function CurrentDraw() {
  const [drawNumbers, setDrawNumbers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour countdown

  useEffect(() => {
    // Generate random numbers when the component mounts
    setDrawNumbers(generateRandomNumbers(6, 60));

    // Set up an interval to update the countdown
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="current-draw-container container-custom">
      <h2 className="display-4">Current Draw</h2>
      <div className="current-draw-section">
        <h3 className="h5">Draw Numbers:</h3>
        <p className="lead">{drawNumbers.join(', ')}</p>
      </div>
      <div className="current-draw-section">
        <h3 className="h5">Next Draw In:</h3>
        <p className="lead">{formatTime(timeRemaining)}</p>
      </div>
    </div>
  );
}

export default CurrentDraw;
