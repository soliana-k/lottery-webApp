
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NumberSelection from './numberSelection'; 
import './nsp.css';
import { completePayment } from '../../redux/lotterySlice'; 
import { Link } from 'react-router-dom';
import { Modal, Button , Form} from 'react-bootstrap';

import  { useState } from 'react';
import PaymentModal from './paymentModal';

// StartLotteryButton Component
const StartLotteryButton = () => {
    const paymentCompleted = useSelector((state) => state.lottery.paymentCompleted);

    return (
        <div className="start-lottery-container">
            <Link 
                to="/start-lottery" 
                className={`start-lottery-btn ${!paymentCompleted ? 'disabled' : ''}`} 
                aria-disabled={!paymentCompleted}
            >
                Start Lottery
            </Link>
        </div>
    );
};

// BiddingPayment Component
const BiddingPayment = () => {
    const dispatch = useDispatch();

    const handlePayment = () => {
        // Implement payment logic here
        // For now, we just simulate payment completion
        dispatch(completePayment());
        console.log('Payment Completed');
    };

    return (
        <div className="bidding-payment">
            {/* Payment options */}
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

// NumberSelectionPage Component
// const NumberSelectionPage = () => {
//     const selectedNumber = useSelector((state) => state.lottery.selectedNumber);
//     console.log('Selected Number:', selectedNumber);

//     return (
//         <div className="number-selection-page">
//             <div className="instructions">
//                 <h2>Instructions</h2>
//                 <p>To select a number, simply click on it. You can only select one number at a time. If you click on a selected number, it will be deselected.</p>
//                 <h3>Pricing Details</h3>
//                 <p>Each selection costs $10. Make sure to complete the payment after selecting your number.</p>
//             </div>
//             <NumberSelection />
//             <div className="payment-section">
//                 <h2>Payment</h2>
//                 <p>Proceed to payment using one of the following options:</p>
//                 <button 
//                     className="btn btn-primary" 
//                     disabled={selectedNumber === null}
//                 >
//                     Pay with PayPal
//                 </button>
//                 <button 
//                     className="btn btn-secondary" 
//                     disabled={selectedNumber === null}
//                 >
//                     Pay with Credit/Debit Card
//                 </button>
//             </div>
//             <BiddingPayment />
//             <StartLotteryButton />
//         </div>
//     );
// };
// export default NumberSelectionPage;

// src/components/PaymentModal.js









const NumberSelectionPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

    const handlePayment = (method) => {
        setPaymentMethod(method);
        setShowModal(true); // Show the modal
    };

    return (
        <div className="number-selection-page">
            <div className="instructions">
                <h2>Instructions</h2>
                <p>To select a number, simply click on it. You can only select one number at a time. If you click on a selected number, it will be deselected.</p>
                <h3>Pricing Details</h3>
                <p>Each selection costs 200 ETB. Make sure to complete the payment after selecting your number.</p>
            </div>
            <NumberSelection />
            <div className="payment-section">
                <h2>Payment</h2>
                <p>Proceed to payment using one of the following options:</p>
                <button 
                    className="btn btn-primary" 
                    disabled={selectedNumber === null} 
                    onClick={() => handlePayment('PayPal')}
                >
                    Pay with PayPal
                </button>
                <button 
                    className="btn btn-secondary" 
                    disabled={selectedNumber === null} 
                    onClick={() => handlePayment('Credit/Debit Card')}
                >
                    Pay with Credit/Debit Card
                </button>
            </div>
            <PaymentModal show={showModal} handleClose={() => setShowModal(false)} paymentMethod={paymentMethod} />
        </div>
    );
};

export default NumberSelectionPage;
