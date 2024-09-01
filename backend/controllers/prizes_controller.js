import Prize from '../models/prizes.js';

export const addPrize = async (req, res) => {
    try {
        const { name, price, deadline, drawDate, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const newPrize = new Prize({
            name,
            image,
            price,
            deadline,
            drawDate,
            description
        });

        await newPrize.save();
        res.status(201).json({ message: 'Prize added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add prize.' });
    }
};
