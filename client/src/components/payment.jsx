import React, { useState } from 'react';
import axios from 'axios';
import './payment.css';

const Payment = () => {
  const [form, setForm] = useState({
    amount: '',
    currency: 'ETB',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const tx_ref = `${form.first_name}-${Date.now()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/accept-payment",
        {
          ...form,
          tx_ref,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      window.location.href = res.data.data.checkout_url;
      console.log(res);

      setForm({
        amount: "",
        currency: "ETB",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        tx_ref,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Make a Payment</h2>
        <div>
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
        <div>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
