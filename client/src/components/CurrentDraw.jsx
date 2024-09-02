// // import React, { useState, useEffect } from 'react';
// // import './drawresults.css';

// // function CurrentDraw() {
// //   const [drawNumbers, setDrawNumbers] = useState([]);
// //   const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour countdown

// //   useEffect(() => {
// //     const fetchCurrentDraw = async () => {
// //       try {
// //         const response = await fetch('/api/v1/current');
// //         const data = await response.json();
// //         setDrawNumbers(data.numbers || []);
// //       } catch (error) {
// //         console.error('Error fetching current draw:', error);
// //       }
// //     };

// //     fetchCurrentDraw();

// //     const interval = setInterval(() => {
// //       setTimeRemaining(prev => {
// //         if (prev <= 0) {
// //           clearInterval(interval);
// //           return 0;
// //         }
// //         return prev - 1;
// //       });
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   const formatTime = (seconds) => {
// //     const hours = Math.floor(seconds / 3600);
// //     const minutes = Math.floor((seconds % 3600) / 60);
// //     const secs = seconds % 60;
// //     return `${hours}h ${minutes}m ${secs}s`;
// //   };

// //   return (
// //     <div className="current-draw-container container-custom">
// //       <h2 className="display-4">Current Draw</h2>
// //       <div className="current-draw-section">
// //         <h3 className="h5">Draw Numbers:</h3>
// //         <p className="lead">{drawNumbers.join(', ')}</p>
// //       </div>
// //       <div className="current-draw-section">
// //         <h3 className="h5">Next Draw In:</h3>
// //         <p className="lead">{formatTime(timeRemaining)}</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CurrentDraw;
// import React, { useState, useEffect } from 'react';
// import './drawresults.css';

// function CurrentDraw() {
//   const [drawNumbers, setDrawNumbers] = useState([]);
//   const [timeRemaining, setTimeRemaining] = useState(null); // Set to null initially
//   const [nextDrawTime, setNextDrawTime] = useState(null);

//   useEffect(() => {
//     const fetchCurrentDraw = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/v1/drawresults/v1/current');
//         const data = await response.json();
//         setDrawNumbers(data.numbers || []);
//       } catch (error) {
//         console.error('Error fetching current draw:', error);
//       }
//     };

//     const fetchNextDrawTime = async () => {
//       try {
//          const response = await fetch('http://localhost:8000/api/v1/drawresults/v1/next-upcoming-draw');
//          const data = await response.json();
//          console.log('Fetched Draw Data:', data); // Add this line to log the fetched data
         
//          const drawTime = new Date(data.date).getTime();
//          console.log('Fetched Draw Time:', new Date(drawTime)); // Log the draw time
         
//          const currentTime = new Date().getTime();
//          const timeDiff = Math.floor((drawTime - currentTime) / 1000);
//          console.log('Time Difference:', timeDiff); // Log the time difference in seconds
         
//          setNextDrawTime(drawTime);
//          setTimeRemaining(timeDiff);
//       } catch (error) {
//          console.error('Error fetching next upcoming draw:', error);
//       }
//    };
   

//     fetchCurrentDraw();
//     fetchNextDrawTime();

//     const interval = setInterval(() => {
//       setTimeRemaining(prev => {
//         if (prev <= 0) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours}h ${minutes}m ${secs}s`;
//   };

//   return (
//     <div className="current-draw-container container-custom">
//       <h2 className="display-4">Current Draw</h2>
//       <div className="current-draw-section">
//         <h3 className="h5">Draw Numbers:</h3>
//         <p className="lead">{drawNumbers.join(', ')}</p>
//       </div>
//       <div className="current-draw-section">
//         <h3 className="h5">Next Draw In:</h3>
//         {timeRemaining !== null ? (
//           <p className="lead">{formatTime(timeRemaining)}</p>
//         ) : (
//           <p className="lead">Loading next draw...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CurrentDraw;
import React, { useState, useEffect } from 'react';
import './drawresults.css';

function CurrentDraw() {
  const [drawNumbers, setDrawNumbers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null); // Handle case where there's no draw

  useEffect(() => {
    const fetchCurrentDraw = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/drawresults/current');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDrawNumbers(data.numbers || []);
      } catch (error) {
        console.error('Error fetching current draw:', error);
      }
    };

    fetchCurrentDraw();
    
    // Update interval handling for the current draw countdown
    const updateCountdown = () => {
      if (timeRemaining !== null) {
        setTimeRemaining(prev => {
          if (prev === 0) {
            return 0; // No need to decrease below zero
          }
          return Math.max(prev - 1, 0);
        });
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    const fetchNextDrawTime = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/drawresults/next');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.error) {
          console.log(data.error); // Handle no upcoming draw case
          setTimeRemaining(null); // Set to null or handle it as needed
        } else {
          // Ensure data.date and data.time are correctly formatted
          const drawDate = new Date(data.date); // Assuming data.date is in ISO 8601 format
          const drawTime = data.time; // Time in format HH:mm
    
          // Construct a proper datetime string for parsing
          const drawDateTimeString = `${drawDate.toISOString().split('T')[0]}T${drawTime}:00Z`;
          const drawDateTime = new Date(drawDateTimeString);
    
          console.log('Draw Date:', drawDateTime);
          console.log('Current Time:', new Date());
    
          // Calculate time difference
          const now = new Date();
          const timeDifference = drawDateTime.getTime() - now.getTime();
          console.log('Time Difference:', timeDifference);
    
          if (isNaN(timeDifference)) {
            throw new Error('Invalid date calculation');
          }
    
          setTimeRemaining(Math.max(Math.floor(timeDifference / 1000), 0));
        }
      } catch (error) {
        console.error('Error fetching next draw time:', error.message);
      }
    };
    
    fetchNextDrawTime();
    const interval = setInterval(fetchNextDrawTime, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

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
