import React, { useEffect, useState } from 'react';
import './payment.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Payment = () => {
    const { admin } = useSelector((store) => store.auth);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/admin/payments');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="admin-payment-page">
            <h2>Admin Payment Management</h2>
            <div className="payment-list">
                {payments.length > 0 ? (
                    payments.map((payment) => (
                        <div key={payment._id} className="payment-item">
                            <p>Payment ID: {payment._id}</p>
                            <p>Amount: ${payment.amount}</p>
                            <p>Status: {payment.status}</p>
                            <p>Date: {new Date(payment.date).toLocaleString()}</p>
                            <p>User: {payment.userId.fullname}</p>
                        </div>
                    ))
                ) : (
                    <p>No payments found.</p>
                )}
            </div>
        </div>
    );
};

export default Payment;
