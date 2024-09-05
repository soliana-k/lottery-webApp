
// import React , { useState }from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import NumberSelection from './numberSelection'; 
// import './nsp.css';
// import { completePayment } from '../../redux/lotterySlice'; 
// import { Link } from 'react-router-dom';
// import { Modal, Button , Form} from 'react-bootstrap';





// import PayPalButton from './paymentGateway';
// import PaymentComponent from './paymentGateway';
// import Payment from '../payment';
// // import PaymentComponent from './stripeComponent';


// const StartLotteryButton = () => {
//     const paymentCompleted = useSelector((state) => state.lottery.paymentCompleted);

//     return (
//         <div className="start-lottery-container">
//             <Link 
//                 to="/start-lottery" 
//                 className={`start-lottery-btn ${!paymentCompleted ? 'disabled' : ''}`} 
//                 aria-disabled={!paymentCompleted}
//             >
//                 Start Lottery
//             </Link>
//         </div>
//     );
// };










// const NumberSelectionPage = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

//     const handlePayment = (method) => {
//         setPaymentMethod(method);
//         setShowModal(true); // Show the modal
//     };

//     return (
//         <div className="number-selection-page">
//             <div className="instructions">
//                 <h2>Instructions</h2>
//                 <p>To select a number, simply click on it. You can only select one number at a time. If you click on a selected number, it will be deselected.</p>
//                 <h3>Pricing Details</h3>
//                 <p>Each selection costs 200 ETB. Make sure to complete the payment after selecting your number.</p>
//             </div>
//             <br/>
//             <NumberSelection />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
//             <div className="payment-section">
//             <PaymentComponent />
//             {/* <Payment/> */}
            
            
//             </div>
//         </div>
//     );
// };

// export default NumberSelectionPage;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NumberSelection from './numberSelection'; 
import './nsp.css';
import { completeSelection, postLotteryData } from '../../redux/lotterySlice';
import { Alert, Snackbar } from '@mui/material'; // Import Alert and Snackbar components

const NumberSelectionPage = () => {
    const [selectedNumber, setSelectedNumber] = useState(null);
    const userEmail = useSelector((state) => state.auth.user?.email);
    const dispatch = useDispatch();
    const lotteryStatus = useSelector((state) => state.lottery.status);
    const lotteryError = useSelector((state) => state.lottery.error); // To handle errors
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'

    const handleNumberSelect = (number) => {
        setSelectedNumber(number);
        dispatch(completeSelection({ number, email: userEmail }));
    };

    const handleStartLottery = () => {
        if (selectedNumber && userEmail) {
            dispatch(postLotteryData({ number: selectedNumber, email: userEmail }));
        }
    };

    useEffect(() => {
        if (lotteryStatus === 'succeeded') {
            setAlertMessage(`Lottery started successfully with number ${selectedNumber} for email ${userEmail}`);
            setAlertSeverity('success');
            setOpenSnackbar(true);
        }
        if (lotteryStatus === 'failed') {
            setAlertMessage(`Error starting lottery: ${lotteryError}`);
            setAlertSeverity('error');
            setOpenSnackbar(true);
        }
    }, [lotteryStatus, lotteryError, selectedNumber, userEmail]);

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

