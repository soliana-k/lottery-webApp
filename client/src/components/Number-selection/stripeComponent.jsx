import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './paycom.css'; // Ensure you have custom styles if needed

const stripePromise = loadStripe('pk_test_51PjlruRoElbOWAeHYqrwOSdet30rhhyMsNIPp4SZF13IBMhtJWkCutdgGG3uOtE2xnqk1mLDH8CgtiB5jH8AoU9w00vISfxOs3');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
 
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('PaymentMethod:', paymentMethod);
      setPaymentCompleted(true); // Show the alert on successful payment
    }
  };

  return (
    <div>
      {paymentCompleted && (
        <div className="alert alert-success" role="alert">
          Payment completed successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        
        <button type="submit" className="btn btn-primary" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

const PaymentComponent = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentComponent;
