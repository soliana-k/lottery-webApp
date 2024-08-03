import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { completePayment } from '../../redux/lotterySlice';
import './paymentGateway.css'; // Import the CSS file

const PayPalButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

  useEffect(() => {
    // Load PayPal script dynamically
    const scriptId = 'paypal-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AT6kDe5la19x_h1q_ZOAN8_wtsx4whqBGu_b4iq_5C-iAlvsUQT-xRxYu459xkR6xNFfVZiPVpnmq3Zd"; // Replace YOUR_CLIENT_ID with your actual PayPal client ID
      script.id = scriptId;
      script.async = true;
      script.onload = () => {
        console.log('PayPal script loaded successfully.');
        if (window.paypal && window.paypal.Buttons) {
          const container = document.getElementById('paypal-button-container');
          if (container && !container.hasChildNodes()) {
            window.paypal.Buttons({
              style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal',
              },
              createOrder: function (data, actions) {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '200.00'
                    }
                  }]
                });
              },
              onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                  dispatch(completePayment());
                  navigate('/start-lottery');
                });
              },
              onError: function (err) {
                console.error('PayPal error:', err);
              }
            }).render('#paypal-button-container');
          } else {
            console.error('PayPal button container not found or already has children.');
          }
        } else {
          console.error('PayPal Buttons SDK not found.');
        }
      };
      script.onerror = () => {
        console.error('Failed to load PayPal script.');
      };
      document.body.appendChild(script);
    } else {
      console.log('PayPal script already loaded.');
    }

    return () => {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [dispatch, navigate, selectedNumber]);

  return(<div id="paypal-button-container"></div>);
};

export default PayPalButton;
