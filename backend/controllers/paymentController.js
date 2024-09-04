import axios from 'axios';

const CHAPA_API_BASE_URL = 'https://api.chapa.co/v1';
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

export const initiatePayment = async (req, res) => {
    const { amount, email, first_name, last_name, phone_number, currency } = req.body;

    try {
        const response = await axios.post(
            `${CHAPA_API_BASE_URL}/transaction/initialize`,
            {
                amount,
                currency,
                email,
                first_name,
                last_name,
                tx_ref: `tx-${Date.now()}`,
                callback_url: `${process.env.FRONTEND_URL}/payment-success`, 
                return_url: `${process.env.FRONTEND_URL}/payment-callback`,
                phone_number,
                customizations: {
                    title: "Number Selection Payment",
                    description: "Payment for selecting numbers in the lottery",
                    logo: `${process.env.FRONTEND_URL}/logo.png`
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        res.status(200).json({
            status: 'success',
            message: 'Payment initiated successfully',
            data: response.data.data,
        });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ status: 'error', message: 'Payment initiation failed', error: error.message });
    }
};
