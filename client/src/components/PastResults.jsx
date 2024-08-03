import React, { useState, useEffect } from 'react';
import './drawresults.css';

function PastResults() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPastResults = async () => {
      try {
        const response = await fetch(`/api/past?page=${page}`);
        const data = await response.json();
        setResults(prevResults => [...prevResults, ...data]);
      } catch (error) {
        console.error('Error fetching past results:', error);
      }
    };

    fetchPastResults();
  }, [page]);

  const filteredResults = results.filter(result =>
    result.date.includes(searchTerm)
  );

  const loadMoreResults = () => {
    setPage(prevPage => prevPage + 1);
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
