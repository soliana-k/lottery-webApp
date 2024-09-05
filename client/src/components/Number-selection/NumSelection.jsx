import { useSelector, useDispatch } from 'react-redux';
import { InfoSection } from '../howitworks/how-it-works';
import React, { useState, useEffect } from 'react';
import './nsp.css';
import { postLotteryData } from '../../redux/lotterySlice'; 
import { Alert, Snackbar } from '@mui/material'; 
import axios from 'axios';
import './NumberSelection.css';

const NumberSelection = ({ onSelect }) => {
  const [numbers, setNumbers] = useState([]);

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

  const renderNumbers = () => {
    const columnsPerRow = 13;
    const numberGrid = [];
    const totalNumbers = numbers.length;
    const rows = Math.ceil(totalNumbers / columnsPerRow);

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const startIndex = rowIndex * columnsPerRow;
      const endIndex = startIndex + columnsPerRow;
      const rowNumbers = numbers.slice(startIndex, endIndex);

      numberGrid.push(
        <div key={rowIndex} className="number-row">
          {rowNumbers.map((num) => (
            <div
              key={num.number}
              className={`number-circle ${num.selected ? 'selected' : ''}`}
              onClick={() => onSelect(num.number)} 
            >
              {num.number}
            </div>
          ))}
          {rowNumbers.length < columnsPerRow &&
            Array.from({ length: columnsPerRow - rowNumbers.length }).map((_, index) => (
              <div key={`empty-${index}`} className="number-circle empty"></div>
            ))}
        </div>
      );
    }

    return numberGrid;
  };

  return (
    <div className="number-selection container">
      <h2>Select a Number</h2>
      <div className="number-grid">{renderNumbers()}</div>
    </div>
  );
};

const NumberSelectionPage = () => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const userEmail = useSelector((state) => state.auth.user?.email);
    const dispatch = useDispatch();
    const lotteryStatus = useSelector((state) => state.lottery.status);
    const lotteryError = useSelector((state) => state.lottery.error); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); 
    
   
    const [lotteryStarted, setLotteryStarted] = useState(false);

    const handleNumberSelect = (number) => {
      
        setSelectedNumber(number);
    };

    const handleStartLottery = () => {
        
        if (selectedNumber && userEmail) {
            dispatch(postLotteryData({ number: selectedNumber, email: userEmail }));
            setLotteryStarted(true); 
        }
    };

    useEffect(() => {
       
        if (lotteryStarted && lotteryStatus === 'succeeded') {
            setAlertMessage(`Lottery started successfully with number ${selectedNumber} for email ${userEmail}`);
            setAlertSeverity('success');
            setOpenSnackbar(true);
            setLotteryStarted(false); 
        } else if (lotteryStarted && lotteryStatus === 'failed') {
            setAlertMessage(`Error starting lottery: ${lotteryError}`);
            setAlertSeverity('error');
            setOpenSnackbar(true);
            setLotteryStarted(false); 
        }
    }, [lotteryStatus, lotteryError, selectedNumber, userEmail, lotteryStarted]);

    return (
        <div className="number-selection-page">
            <div className="instructions">
                <h2>Instructions</h2>
                <p>To select a number, simply click on it. You can only select one number at a time. If you click on a selected number, it will be deselected.</p>
            </div>
            <NumberSelection onSelect={handleNumberSelect} />
            <div className="start-lottery-container">
                <button 
                    onClick={handleStartLottery} 
                    className={`start-lottery-btn ${!selectedNumber || lotteryStatus === 'loading' ? 'disabled' : ''}`} 
                    disabled={!selectedNumber || lotteryStatus === 'loading'}
                >
                    {lotteryStatus === 'loading' ? 'Processing...' : 'Start Lottery'}
                </button>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

function PlayPage() {
  return (
    <div>
        
      
        <InfoSection/>
        <NumberSelectionPage/>
       
      
        
    </div>
  )
}

export default PlayPage