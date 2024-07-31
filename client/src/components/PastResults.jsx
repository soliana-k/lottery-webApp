import React, { useState } from 'react';
import './drawresults.css'; // Ensure you have this imported for custom styling

// Mock data for past results
const pastResults = [
  { date: '2024-07-01', numbers: [1, 9, 15, 22, 33, 42] },
  { date: '2024-07-08', numbers: [4, 14, 20, 29, 37, 48] },
  // More results...
];

function PastResults() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = pastResults.filter(result =>
    result.date.includes(searchTerm)
  );

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
    </div>
  );
}

export default PastResults;
