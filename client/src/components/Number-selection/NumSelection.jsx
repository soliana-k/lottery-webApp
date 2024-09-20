import { useSelector, useDispatch } from 'react-redux';
import { InfoSection } from '../howitworks/how-it-works';
import React, {useState, useEffect } from 'react';
import './nsp.css';
import { postLotteryData } from '../../redux/lotterySlice'; 
import { Alert, Snackbar } from '@mui/material'; 
import axios from 'axios';
import './NumberSelection.css';
import  PaymentGateway   from './paymentGateway';
import { useParams } from 'react-router-dom';

const NumberSelection = ({ onSelect }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);

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

  const handleNumberClick = (number) => {
    setSelectedNumber((prevNumber) => (prevNumber === number ? null : number));
    onSelect(number); 
  };

  useEffect(() => {
    
    setNumbers((prevNumbers) =>
      prevNumbers.map((num) =>
        num.number === selectedNumber ? { ...num, selected: true } : num
      )
    );
  }, [selectedNumber]);

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
              className={`number-circle ${num.selected || num.number === selectedNumber ? 'selected' : ''}`}
              onClick={() => handleNumberClick(num.number)}
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






// const NumberSelection = ({ onSelect, confirmedNumber }) => {
//   const [numbers, setNumbers] = useState([]);
//   const [selectedNumber, setSelectedNumber] = useState(null);

//   useEffect(() => {
//     const fetchNumbers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
//         setNumbers(response.data);
//       } catch (error) {
//         console.error('Error fetching numbers:', error);
//       }
//     };

//     fetchNumbers();
//   }, []);

  
//   const handleNumberClick = (number) => {
//     if (selectedNumber === number) {
      
//       setSelectedNumber(null);
//     } else {
//       setSelectedNumber(number);
//     }
//   };


//   useEffect(() => {
//     if (confirmedNumber) {
//       setNumbers((prevNumbers) =>
//         prevNumbers.map((num) =>
//           num.number === confirmedNumber ? { ...num, selected: true } : num
//         )
//       );
//     }
//   }, [confirmedNumber]);

//   const renderNumbers = () => {
//     const columnsPerRow = 13;
//     const numberGrid = [];
//     const totalNumbers = numbers.length;
//     const rows = Math.ceil(totalNumbers / columnsPerRow);

//     for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
//       const startIndex = rowIndex * columnsPerRow;
//       const endIndex = startIndex + columnsPerRow;
//       const rowNumbers = numbers.slice(startIndex, endIndex);

//       numberGrid.push(
//         <div key={rowIndex} className="number-row">
//           {rowNumbers.map((num) => (
//             <div
//               key={num.number}
//               className={`number-circle ${num.selected || selectedNumber === num.number ? 'selected' : ''}`}
//               onClick={() => handleNumberClick(num.number)}
//             >
//               {num.number}
//             </div>
//           ))}
//           {rowNumbers.length < columnsPerRow &&
//             Array.from({ length: columnsPerRow - rowNumbers.length }).map((_, index) => (
//               <div key={`empty-${index}`} className="number-circle empty"></div>
//             ))}
//         </div>
//       );
//     }

//     return numberGrid;
//   };

//   return (
//     <div className="number-selection container">
//       <h2>Select a Number</h2>
//       <div className="number-grid">{renderNumbers()}</div>
//     </div>
//   );
// };






// const NumberSelectionPage = () => {
//   const [selectedNumber, setSelectedNumber] = useState(null);
//   const userEmail = useSelector((state) => state.auth.user?.email);
//   const dispatch = useDispatch();
//   const lotteryStatus = useSelector((state) => state.lottery.status);
//   const lotteryError = useSelector((state) => state.lottery.error);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertSeverity, setAlertSeverity] = useState('success');

//   const handleNumberSelect = (number) => {
//     setSelectedNumber(number);
//   };

//   const handleStartLottery = () => {
//     if (selectedNumber && userEmail) {
//       dispatch(postLotteryData({ number: selectedNumber, email: userEmail }));
//     } else {
//       setAlertMessage('Please select a number before starting the lottery.');
//       setAlertSeverity('warning');
//       setOpenSnackbar(true);
//     }
//   };

//   useEffect(() => {
//     if (lotteryStatus === 'succeeded') {
//       setAlertMessage(`Lottery started successfully with number ${selectedNumber} for email ${userEmail}`);
//       setAlertSeverity('success');
//       setOpenSnackbar(true);
//     } else if (lotteryStatus === 'failed') {
//       setAlertMessage(`Error starting lottery: ${lotteryError}`);
//       setAlertSeverity('error');
//       setOpenSnackbar(true);
//     }
//   }, [lotteryStatus, lotteryError, selectedNumber, userEmail]);

//   return (
//     <div className="number-selection-page">
//       <div className="instructions">
//         <h2>Instructions</h2>
//         <p>To select a number, simply click on it. You can only select one number at a time. If you click on a selected number, it will be deselected.</p>
//       </div>
//       <NumberSelection onSelect={handleNumberSelect} />
//       <div className="start-lottery-container">
//         <button 
//           onClick={handleStartLottery} 
//           className={`start-lottery-btn ${!selectedNumber || lotteryStatus === 'loading' ? 'disabled' : ''}`} 
//           disabled={!selectedNumber || lotteryStatus === 'loading'}
//         >
//           {lotteryStatus === 'loading' ? 'Processing...' : 'Start Lottery'}
//         </button>
//       </div>
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
//         <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
//           {alertMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };




const NumberSelectionPage = ({ onSelect }) => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const userEmail = useSelector((state) => state.auth.user?.email);
    const userName = useSelector((state) => state.auth.user?.name); // Add this if you have a name in your user state
    const dispatch = useDispatch();
    const lotteryStatus = useSelector((state) => state.lottery.status);
    const lotteryError = useSelector((state) => state.lottery.error); 
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); 
    
   
    const [lotteryStarted, setLotteryStarted] = useState(false);

    const handleNumberSelect = (number) => {
      
        setSelectedNumber(number);

        if (onSelect) {
          onSelect(number); // Notify parent component (PlayPage)
        }
    };

    const handleStartLottery = () => {
        
        if (selectedNumber && userEmail) {
            dispatch(postLotteryData({ number: selectedNumber, email: userEmail }));
            setLotteryStarted(true); 
        }
    };

    const handleProceedToCheckout = async () => {
      if (selectedNumber) {
        try {
          // Assuming prize price and other data are passed from parent
          const prizePrice = 1000; // You should get this value from the prize data
          const response = await axios.post('http://localhost:8000/api/v1/payments/initiate', {
            amount: prizePrice,
            email: userEmail,
            name: userName,
          });
          window.location.href = response.data.paymentUrl; // Redirect to Chapa payment page
        } catch (error) {
          console.error('Error proceeding to checkout:', error);
          setAlertMessage('Error proceeding to checkout');
          setAlertSeverity('error');
          setOpenSnackbar(true);
        }
      }
    };
    

  useEffect(() => {
    if (lotteryStarted) {
      if (lotteryStatus === 'succeeded') {
        setAlertMessage(
          `Lottery started successfully with number ${selectedNumber} for email ${userEmail}`
        );
        setAlertSeverity('success');
        setOpenSnackbar(true);
        setLotteryStarted(false); 
      } else if (lotteryStatus === 'failed') {
        setAlertMessage(`Error starting lottery: ${lotteryError}`);
        setAlertSeverity('error');
        setOpenSnackbar(true);
        setLotteryStarted(false); 
      }
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
  const { id } = useParams(); // Get the prize ID from the URL
  const [prize, setPrize] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null); // Store selected number
  const [totalAmount, setTotalAmount] = useState(0); // Total amount including any calculations

   // Use useSelector at the top of your component
   const userEmail = useSelector((state) => state.auth.user?.email);
  


  useEffect(() => {
    const fetchPrize = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/prizes/${id}`);
        setPrize(response.data);
        setTotalAmount(response.data.price); // Set the total amount to the prize price initially
      } catch (error) {
        console.error('Error fetching prize details:', error);
      }
    };

    fetchPrize();
  }, [id]);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  if (!prize) {
    return <p>Loading prize details...</p>;
  }

  return (
    <div className="play-page">
  {/* Number selection section */}
  <NumberSelectionPage onSelect={handleNumberSelect} />

  {/* Container for summary table and payment gateway */}
  <div className="summary-payment-container">
    <div className="summary-table">
      <h2>Prize Summary</h2>
      <table className="horizontal-table">
        <tbody>
          <tr>
            <td>Prize Image:</td>
            <td>Prize Name:</td>
            <td>Prize Amount:</td>
            <td>Selected Number:</td>
            <td>Total Amount:</td>
          </tr>
          <tr>
            <td>
              <img
                src={`http://localhost:8000/uploads/${prize.image}`}
                alt={prize.name}
                style={{ width: '100px', height: '100px' }}
              />
            </td>
            <td>{prize.name}</td>
            <td>{prize.price} br</td>
            <td>{selectedNumber ? selectedNumber : 'No number selected'}</td>
            <td>{totalAmount} br</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="payment-gateway">
    <PaymentGateway
            totalAmount={totalAmount}
            email={userEmail}
           
          />
        </div>
  </div>
</div>

    
  );
}

export default PlayPage;
