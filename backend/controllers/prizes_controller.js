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
// Function to handle updating a prize
export const updatePrize = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, deadline, drawDate, description } = req.body;
        const image = req.file ? req.file.filename : null;

        // Find the prize by ID and update with the new data
        const updatedPrize = await Prize.findByIdAndUpdate(
            id,
            { name, image, price, deadline, drawDate, description },
            { new: true } // Returns the updated document
        );

        if (!updatedPrize) {
            return res.status(404).json({ message: 'Prize not found' });
        }

        res.status(200).json({ message: 'Prize updated successfully!', prize: updatedPrize });
    } catch (error) {
        console.error('Error updating prize:', error);
        res.status(500).json({ message: 'Failed to update prize.', error });
    }
};