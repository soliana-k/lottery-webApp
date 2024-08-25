import React, { useEffect, useState } from 'react';
import './payment.css';

const Payment = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Simulate fetching payment data from the backend
        // Replace this with an actual API call in a real application
        const fetchPayments = async () => {
            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For now, we're just using an empty array to simulate "No payments found"
            setPayments([]);
        };

        fetchPayments();
    }, []);

    return (
        <div className="admin-payment-container">
            <h2>Admin Payment Management</h2>
            {payments.length === 0 ? (
                <div className="no-payments-message">
                    No payments found.
                </div>
            ) : (
                <div className="payments-list">
                    {/* Map through payments array and display each payment */}
                    {payments.map((payment, index) => (
                        <div key={index} className="payment-item">
                            {/* Display payment details here */}
                            <p>Payment ID: {payment.id}</p>
                            <p>Amount: {payment.amount}</p>
                            <p>Status: {payment.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Payment;
