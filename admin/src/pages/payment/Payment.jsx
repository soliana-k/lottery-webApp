import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./payment.css"


const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
            "http://localhost:8000/api/payments"
          );
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div>
      <h2>User Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Amount Paid</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.transactionId}>
              <td>{payment.name}</td>
              <td>{payment.email}</td>
              <td>{payment.amount}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
