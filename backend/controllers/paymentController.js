import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: 'CHASECK_TEST-eNaoXpCUOV6UOVSSA7FJOqAz3dfJVwS1',
});

const generateTransactionReference = async () => {
  const tx_ref = await chapa.generateTransactionReference();
  return tx_ref;
};

export const initializeTransaction = async (req, res) => {
  try {
    const tx_ref = await generateTransactionReference();

    const response = await chapa.initialize({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      currency: 'ETB',
      amount: req.body.amount,
      tx_ref: tx_ref,
      callback_url: 'https://www.google.com/callback',
      customization: {
        title: 'Payment for lottery',
        description: 'Lottery payment description',
      },
    });

    res.status(200).json({
      message: "Transaction initialized successfully",
      checkout_url: response.data.checkout_url,
    });
  
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const response = await chapa.verify({
      tx_ref: req.body.tx_ref,
    });

    res.status(200).json({
      message: "Payment verified successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error occurred' });
  }
};
