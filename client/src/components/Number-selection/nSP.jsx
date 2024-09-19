import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NumberSelection from './numberSelection'; 
import './nsp.css';
import { postLotteryData } from '../../redux/lotterySlice'; 
import { Alert, Snackbar } from '@mui/material'; 

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

    const NumberSelectionPage = ({ onSelect }) => {
        const [selectedNumber, setSelectedNumber] = useState(null);
      
        const handleNumberSelect = (number) => {
          setSelectedNumber(number);
          onSelect(number); // Pass the selected number to the parent
        };
    }

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

export default NumberSelectionPage;
