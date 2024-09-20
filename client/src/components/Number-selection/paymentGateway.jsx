import React from 'react';

function PaymentGateway({ totalAmount, email, userName }) { // Add userName as a prop
  const generateUniqueTxRef = () => {
    return `tx_ref-${Date.now()}`;
  };

  // Log values to check if they are correct
  console.log('Total Amount:', totalAmount);
  console.log('Email:', email);

  console.log('User Name:', userName); // Use userName instead of name


  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-oWSvzMK1nY2h23bNmGqDueRlVTHA0GAU" />
        <input type="hidden" name="tx_ref" value={generateUniqueTxRef()} />
        <input type="hidden" name="amount" value={totalAmount} />
        <input type="hidden" name="currency" value="ETB" />


        <input type="hidden"  name="email" value={email || ''} /> {/* Default to empty string if undefined */}
      
        <input type="hidden" name="title" value="Prize Purchase" />
        <input type="hidden" name="description" value="Paying for prize" />
        <input type="hidden" name="logo" value="https://yourcompany.com/logo.png" />
        <input type="hidden" name="callback_url" value="http://localhost:3000/api/payments/callback" />
        <input type="hidden" name="email" value={email || ''} /> {/* Default to empty string if undefined */}
        <input type="hidden" name="first_name" value={userName || ''} /> {/* Use userName here */}
        <input type="hidden" name="title" value="Prize Purchase" />
        <input type="hidden" name="description" value="Paying for prize" />
        <input type="hidden" name="logo" value="https://yourcompany.com/logo.png" />
        <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />

        <input type="hidden" name="return_url" value="https://example.com/returnurl" />
        <input type="hidden" name="meta[title]" value="test" />
        
        <button className='checkout-btn rounded active' type="submit">Proceed to Checkout</button>
      </form>
    </div>
  );
}

export default PaymentGateway;
