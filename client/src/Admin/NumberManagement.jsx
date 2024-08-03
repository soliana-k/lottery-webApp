import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NumberManagement.css';
import { selectedNumbers, remainingNumbers } from './dummy';



const RemainingNumbers = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
   
    const fetchRemainingNumbers = async () => {
      try {
       
        setNumbers(remainingNumbers);
      } catch (error) {
        console.error('Error fetching remaining numbers:', error);
      }
    };

    fetchRemainingNumbers();
  }, []);

  return (
    <div className="remaining-numbers">
      <h2>Remaining Numbers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Number</th>
            <th>Selected At</th>
            <th>Selected By</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(remainingNumbers) && remainingNumbers.length > 0 ? (
    remainingNumbers.map((number) => (
      <tr key={number.number}>
        <td>{number.number}</td>
        <td>{number.selectedAt ? new Date(number.selectedAt).toLocaleString() : 'N/A'}</td>
        <td>{number.selectedBy ? number.selectedBy.username : 'N/A'}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No data available</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};



const GenerateReport = () => {
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('/api/numbers/report');
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="generate-report">
      <h2>Generate Report</h2>
      <button onClick={handleGenerateReport} className="btn btn-primary">Generate Report</button>
      <div className="report-data">
        <h3>Report Data</h3>
        <ul className="list-group">
          {reportData.map((number) => (
            <li key={number.number} className="list-group-item">
              Number: {number.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};







const SelectedNumbers = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    
    const fetchSelectedNumbers = async () => {
      try {
       
        setNumbers(selectedNumbers);
      } catch (error) {
        console.error('Error fetching selected numbers:', error);
      }
    };

    fetchSelectedNumbers();
  }, []);

  return (
    <div className="selected-numbers">
      <h2>Selected Numbers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Number</th>
            <th>Selected At</th>
            <th>Selected By</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(selectedNumbers) && selectedNumbers.length > 0 ? (
          selectedNumbers.map((number) => (
            <tr key={number.number}>
              <td>{number.number}</td>
              <td>{number.selectedAt ? new Date(number.selectedAt).toLocaleString() : 'N/A'}</td>
              <td>{number.selectedBy ? number.selectedBy.username : 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No data available</td>
          </tr>
        )}
      </tbody>

      </table>
    </div>
  );
};









function NumberManagement() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('/api/numbers');
        setNumbers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div className="number-management">
      
      <GenerateReport/>
      <SelectedNumbers/>
      <RemainingNumbers/>
      <h2>Number Management</h2>
      {loading ? (
        <p>Loading numbers...</p>
      ) : (
        <table className="number-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((number) => (
              <tr key={number.id}>
                <td>{number.number}</td>
                <td>{number.status ? 'Available' : 'Unavailable'}</td>
                <td>
                  <button>Toggle Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NumberManagement;
