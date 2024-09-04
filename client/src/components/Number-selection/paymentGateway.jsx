// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; 
// import { completePayment } from '../../redux/lotterySlice';
// import './paymentGateway.css';

// const PayPalButton = ({ amount }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const selectedNumber = useSelector(state => state.lottery.selectedNumber);

//   useEffect(() => {
//     const scriptId = 'paypal-script';
//     let script = document.getElementById(scriptId);

//     if (!script) {
//       script = document.createElement('script');
//       script.src = "https://www.paypal.com/sdk/js?client-id=AT6kDe5la19x_h1q_ZOAN8_wtsx4whqBGu_b4iq_5C-iAlvsUQT-xRxYu459xkR6xNFfVZiPVpnmq3Zd"; // Replace with your PayPal client ID
//       script.id = scriptId;
//       script.async = true;
//       script.onload = () => {
//         if (window.paypal && window.paypal.Buttons) {
//           const container = document.getElementById('paypal-button-container');
//           if (!container.hasChildNodes()) {
//             window.paypal.Buttons({
//               style: {
//                 layout: 'vertical',
//                 color: 'blue',
//                 shape: 'rect',
//                 label: 'paypal',
//               },
//               createOrder: function (data, actions) {
//                 return actions.order.create({
//                   purchase_units: [{
//                     amount: {
//                       value: amount.toFixed(2) // Ensure amount is formatted correctly
//                     }
//                   }]
//                 });
//               },
//               onApprove: function (data, actions) {
//                 return actions.order.capture().then(async function (details) {
//                   // Mark payment as completed
//                   dispatch(completePayment());

//                   // Make a request to start the lottery
//                   try {
//                     const response = await fetch('/api/v1/lottery/start-lottery', {
//                       method: 'POST',
//                       headers: {
//                         'Content-Type': 'application/json',
//                       },
//                       body: JSON.stringify({ number: selectedNumber }),
//                     });
//                     if (response.ok) {
//                       navigate('/start-lottery'); // Navigate to start-lottery page
//                     } else {
//                       console.error('Error starting lottery:', await response.text());
//                     }
//                   } catch (error) {
//                     console.error('Error starting lottery:', error);
//                   }
//                 });
//               },
//               onError: function (err) {
//                 console.error('PayPal error:', err);
//               }
//             }).render('#paypal-button-container');
//           }
//         } else {
//           console.error('PayPal Buttons SDK not found.');
//         }
//       };
//       script.onerror = () => {
//         console.error('Failed to load PayPal script.');
//       };
//       document.body.appendChild(script);
//     }

//     return () => {
//       const container = document.getElementById('paypal-button-container');
//       if (container) {
//         container.innerHTML = ''; // Clean up PayPal button container
//       }
//     };
//   }, [dispatch, navigate, amount, selectedNumber]);

//   return <div id="paypal-button-container"></div>;
// };

// export default PayPalButton;
// PaymentComponent.jsx

// import React, { useState } from 'react';
// import axios from 'axios';

// const PaymentComponent = ({ amount, user }) => {
//     const [paymentUrl, setPaymentUrl] = useState('');

//     const handlePayment = async () => {
//         try {
//             const response = await axios.post('/api/v1/payments/initiate-payment', {
//                 amount,
//                 email: user.email,
//                 first_name: user.firstName,
//                 last_name: user.lastName,
//                 phone_number: user.phoneNumber,
//                 currency: 'ETB', // Ethiopian Birr
//             });

//             if (response.data.status === 'success') {
//                 setPaymentUrl(response.data.data.link);
//                 window.location.href = response.data.data.link; // Redirect to Chapa payment page
//             }
//         } catch (error) {
//             console.error('Payment initiation failed:', error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={haandlePayment} className="btn btn-primary">Pay Now</button>
//             {paymentUrl && <p>Redirecting to payment...</p>}
//         </div>
//     );
// };

// export default PaymentComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentComponent = ({ amount, user }) => {
    const [paymentUrl, setPaymentUrl] = useState('');
    const [initialized, setInitialized] = useState(false);

    const handlePayment = async () => {
        if (!initialized) {
            setInitialized(true);
            try {
                const response = await axios.post('/api/v1/payments/initiate-payment', {
                    amount,
                    email: user.email,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    phone_number: user.phoneNumber,
                    currency: 'ETB', // Ethiopian Birr
                });

                if (response.data.status === 'success') {
                    setPaymentUrl(response.data.data.link);
                    window.location.href = response.data.data.link; // Redirect to Chapa payment page
                }
            } catch (error) {
                console.error('Payment initiation failed:', error);
            }
        }
    };

    useEffect(() => {
        return () => {
            setInitialized(false); // Reset initialization on unmount
        };
    }, []);

    return (
        <div>
            {!paymentUrl && (
                <button onClick={handlePayment} className="btn btn-primary">
                    Pay Now
                </button>
            )}
            {paymentUrl && <p>Redirecting to payment...</p>}
        </div>
    );
};

// No need for React.memo if it was causing issues
export default PaymentComponent;







