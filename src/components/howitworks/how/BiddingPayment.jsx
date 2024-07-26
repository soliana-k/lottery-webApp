import React from 'react';
import './BiddingPayment.css';
import { FaHandPointer } from 'react-icons/fa';

const BiddingPayment = () => {
    return (
        <div className="bidding-payment">
            
            <div className="amount-controller">
                <button className="amount-button">
                    <FaHandPointer className="hand-icon" />
                    +
                </button>
                <input className="amount-input" type="text" value="ETB 200" readOnly />
                <button className="amount-button" disabled>-</button>
            </div>
            <h5>Set Your Bidding Amount</h5>
        </div>
    );
};

export default BiddingPayment;
