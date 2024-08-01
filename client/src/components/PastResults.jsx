import React, { useState, useEffect } from 'react';
import './drawresults.css'; // Ensure you have this imported for custom styling

// Utility function to generate random numbers
const generateRandomNumbers = (count, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

// Utility function to generate a random date
const generateRandomDate = () => {
  const start = new Date(2024, 0, 1); // Start from January 1, 2024
  const end = new Date(2024, 11, 31); // End at December 31, 2024
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
};

function PastResults() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);

  useEffect(() => {
    // Generate random past results
    const randomResults = Array.from({ length: 5 }, () => ({
      date: generateRandomDate(),
      numbers: generateRandomNumbers(6, 60)
    }));
    setResults(randomResults);
  }, []);

  const filteredResults = results.filter(result =>
    result.date.includes(searchTerm)
  );

  const loadMoreResults = () => {
    const additionalResults = Array.from({ length: 3 }, () => ({
      date: generateRandomDate(),
      numbers: generateRandomNumbers(6, 60)
    }));
    setResults(prevResults => [...prevResults, ...additionalResults]);
    setShowAllResults(true);
  };

  return (
    <div className="past-results-container container-custom">
      <h2 className="display-4">Past Results</h2>
      <input
        type="text"
        className="form-control form-control-lg mb-4"
        placeholder="Search by date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="list-unstyled">
        {filteredResults.map((result, index) => (
          <li key={index} className="p-3 border-bottom">
            {result.date}: {result.numbers.join(', ')}
          </li>
        ))}
      </ul>
      {!showAllResults && (
        <button 
          className="btn btn-primary mt-3" 
          onClick={loadMoreResults}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default PastResults;
