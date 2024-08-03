
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { completePayment } from '../../redux/lotterySlice';

const PayPalButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const selectedNumber = useSelector((state) => state.lottery.selectedNumber);

  useEffect(() => {
    
    window.paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00' 
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
  }, [dispatch, navigate, selectedNumber]);

  return(<div id="paypal-button-container"></div>);
};

export default PayPalButton;
