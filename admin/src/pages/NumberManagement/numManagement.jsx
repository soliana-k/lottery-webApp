import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './numManagement.css';
import Breadcrumbs from '../../breadcrumb';

const NumManagement = () => {
  const [newNumber, setNewNumber] = useState('');
  const [massAddCount, setMassAddCount] = useState('');
  const [numbers, setNumbers] = useState([]);

  // Fetch existing numbers from the backend
  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
        setNumbers(response.data);
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  // Handle adding a single number
  const handleAddNumber = async () => {
    if (!newNumber) return;

    try {
      const response = await axios.post('http://localhost:8000/api/v1/lottery/addNumber', { number: newNumber });
      if (response.status === 201) {
        setNumbers([...numbers, response.data]);
        setNewNumber(''); // Clear the input field
      }
    } catch (error) {
      console.error('Error adding number:', error);
    }
  };

  // Handle mass adding numbers
  const handleMassAdd = async () => {
    const count = parseInt(massAddCount, 10);
    if (!count || count < 1 || count > 81) return; // Validate input

    const massNumbers = Array.from({ length: count }, (_, i) => i + 1);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/lottery/massAddNumbers', { numbers: massNumbers });
      if (response.status === 201) {
        setNumbers([...numbers, ...response.data]);
        setMassAddCount(''); // Clear the mass add input field
      }
    } catch (error) {
      console.error('Error mass adding numbers:', error);
    }
  };

  // Handle deleting a number
  const handleDeleteNumber = async (number) => {
    const confirmed = window.confirm(`Are you sure you want to delete number ${number}?`);
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/lottery/deleteNumber/${number}`);
      if (response.status === 200) {
        setNumbers(numbers.filter(n => n.number !== number));
        console.log(`Number ${number} deleted.`);
      }
    } catch (error) {
      console.error('Error deleting number:', error);
    }
  };

  // Render the number grid with delete button
  const renderNumbers = () => {
    const gridSize = 81; // Total numbers in the grid
    const gridNumbers = Array.from({ length: gridSize }, (_, i) => i + 1);

    return gridNumbers.map((num) => {
      const numberData = numbers.find((n) => n.number === num);
      return numberData ? (
        <div
          key={num}
          className={`number-circle ${numberData.selected ? 'selected' : ''}`}
        >
          <span>{num}</span>
          <button
            className="delete-button"
            onClick={() => handleDeleteNumber(num)}
          >
            &times;
          </button>
        </div>
      ) : null; // Only render circles for added numbers
    });
  };

  return (
    <div className="number-selection container">
          <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Number Status and Availability', href: '/numbermgmt' },
          { label: 'Number Management', href: '/num' },
        ]}
      />
      <h2>Admin Number Management</h2>
      
      <div className="add-number">
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="Enter number to add"
        />
        <button onClick={handleAddNumber}>Add Number</button>
      </div>

      <div className="add-mass-numbers mass-add">
        <input
          type="number"
          value={massAddCount}
          onChange={(e) => setMassAddCount(e.target.value)}
          placeholder="Enter count for mass add"
        />
        <button onClick={handleMassAdd}>Mass Add Numbers</button>
      </div>

      <div className="number-grid">
        {renderNumbers()}
      </div>
    </div>
  );
};

export default NumManagement;
