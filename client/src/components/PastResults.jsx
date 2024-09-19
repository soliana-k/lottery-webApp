// import React, { useState, useEffect } from 'react';
// import './drawresults.css';

// function PastResults() {
//   const [results, setResults] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAllResults, setShowAllResults] = useState(false);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchPastResults = async () => {
//       try {
//         const response = await fetch(`/api/v1/past?page=${page}`);
//         const data = await response.json();
//         setResults(prevResults => [...prevResults, ...data]);
//       } catch (error) {
//         console.error('Error fetching past results:', error);
//       }
//     };

//     fetchPastResults();
//   }, [page]);

//   const filteredResults = results.filter(result =>
//     result.date.includes(searchTerm)
//   );

//   const loadMoreResults = () => {
//     setPage(prevPage => prevPage + 1);
//     setShowAllResults(true);
//   };

//   return (
//     <div className="past-results-container container-custom">
//       <h2 className="display-4">Past Results</h2>
//       <input
//         type="text"
//         className="form-control form-control-lg mb-4"
//         placeholder="Search by date"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul className="list-unstyled">
//         {filteredResults.map((result, index) => (
//           <li key={index} className="p-3 border-bottom">
//             {result.date}: {result.numbers.join(', ')}
//           </li>
//         ))}
//       </ul>
//       {!showAllResults && (
//         <button 
//           className="btn btn-primary mt-3" 
//           onClick={loadMoreResults}
//         >
//           Load More
//         </button>
//       )}
//     </div>
//   );
// }

// export default PastResults;
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import './PastResults.css';

function maskEmail(email) {
  if (!email || typeof email !== 'string') return email; // Return the email if it's not a string or undefined

  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return email; // Don't mask if local part is too short

  const maskedLocalPart = localPart[0] + '*'.repeat(localPart.length - 2) + localPart.slice(-1);
  return `${maskedLocalPart}@${domain}`;
}

function PastResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastResults = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/drawresults/past-results');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setResults(data);
        } else {
          throw new Error('Received non-JSON response from the server');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching past results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastResults();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error fetching results: {error}</Typography>;
  }

  return (
    <Box mt={5} p={3}>
      <Typography variant="h4" gutterBottom>
        Past Results
      </Typography>
      <Paper
        elevation={3}
        sx={{ height: 50, width: '100%', overflow: 'hidden', position: 'relative' }}
      >
        <div className="scrolling-container">
          <div className="scrolling-content">
            <ul>
              {results.concat(results).map((result, index) => (
                <li key={index}>
                  <Typography>
                    <strong>Winner:</strong> {maskEmail(result.winner)} - 
                    <strong> Selected Number(s):</strong> {result.selectedNumbers.map(num => num.number).join(', ')}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Paper>
    </Box>
  );
}

export default PastResults;



















