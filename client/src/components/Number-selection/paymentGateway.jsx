import React from 'react';
import { useSelector } from 'react-redux';

function PaymentGateway({ totalAmount, email, name }) {
  const generateUniqueTxRef = () => {
    return `tx_ref-${Date.now()}`;
  };

  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-oWSvzMK1nY2h23bNmGqDueRlVTHA0GAU" />
        <input type="hidden" name="tx_ref" value={generateUniqueTxRef()} />
        <input type="hidden" name="amount" value={totalAmount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={name} />
        <input type="hidden" name="title" value="Prize Purchase" />
        <input type="hidden" name="description" value="Paying for prize" />
        <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
        <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
        <input type="hidden" name="return_url" value="https://example.com/returnurl" />
        <input type="hidden" name="meta[title]" value="test" />
        <button className='checkout-btn rounded active' type="submit">Proceed to Checkout</button>
      </form>
    </div>
  );
}

export default PaymentGateway;
