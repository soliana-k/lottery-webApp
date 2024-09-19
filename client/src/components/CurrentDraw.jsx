import React, { useState, useEffect } from 'react';
import './drawresults.css';

function CurrentDraw() {
  const [drawNumbers, setDrawNumbers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [currentDrawId, setCurrentDrawId] = useState(null);
  const [drawTime, setDrawTime] = useState(null);

  useEffect(() => {
    const fetchCurrentDraw = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/drawresults/upcoming');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        if (data.error) {
          console.log('No upcoming draw:', data.error);
          setTimeRemaining(null);
        } else {
          setCurrentDrawId(data._id);
          setDrawTime(data.time); // Assuming this is HH:mm format
    
          // Create the draw date object combining the date and time (adjust for timezones)
          const drawDate = new Date(data.date);
          drawDate.setHours(parseInt(data.time.split(':')[0]));
          drawDate.setMinutes(parseInt(data.time.split(':')[1]));
          drawDate.setSeconds(0);
    
          const now = new Date();
          const timeDifference = drawDate.getTime() - now.getTime();
    
          console.log('Draw Date:', drawDate);
          console.log('Current Time:', now);
          console.log('Time Difference:', timeDifference);
    
          if (isNaN(timeDifference)) {
            throw new Error('Invalid date calculation');
          }
    
          setTimeRemaining(Math.max(Math.floor(timeDifference / 1000), 0));
        }
      } catch (error) {
        console.error('Error fetching upcoming draw:', error.message);
      }
    };
    

    fetchCurrentDraw();
    const interval = setInterval(fetchCurrentDraw, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      if (timeRemaining !== null) {
        setTimeRemaining(prev => {
          if (prev === 0) {
            return 0;
          }
          return Math.max(prev - 1, 0);
        });
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0 && currentDrawId) {
      const triggerDraw = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v1/drawresults/start', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ drawId: currentDrawId }),
          });

          if (!response.ok) {
            throw new Error('Failed to trigger draw');
          }

          const data = await response.json();
          console.log('Draw triggered successfully:', data);
          setDrawNumbers(data.numbers || []);
        } catch (error) {
          console.error('Error triggering draw:', error);
        }
      };

      triggerDraw();
    }
  }, [timeRemaining, currentDrawId]);

  const formatTime = (seconds) => {
    if (seconds === null) return 'No upcoming draw';
    
    const totalSeconds = Math.floor(seconds);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
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
