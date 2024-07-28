import React, { useState } from 'react';
import './BiddingPayment.css';

const BiddingPayment = () => {
    const [amount, setAmount] = useState(200);

    const increment = () => setAmount(prev => prev + 1);
    const decrement = () => setAmount(prev => (prev > 0 ? prev - 1 : 0));

    return (
        <div className="bidding-payment">
            <h2>Set Your Bidding Amount</h2>
            <div className="amount-controller">
                <button className="btn-b rounded" onClick={decrement}>-</button>
                <input type="number" value={amount} readOnly />
                <button className="btn-b rounded" onClick={increment}>+</button>
            </div>
        </div>
    );
};

export default BiddingPayment;
