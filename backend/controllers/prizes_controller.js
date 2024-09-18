import Prize from '../models/prizes.js';

// Function to handle adding a prize
export const addPrize = async (req, res) => {
    try {
        const { name, price, deadline, drawDate, description } = req.body;
        const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const additionalImages = req.files['additionalImages'] ? req.files['additionalImages'].map(file => file.filename) : [];

        // Basic validation
        if (!name || !price || !deadline || !drawDate || !mainImage || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newPrize = new Prize({
            name,
            mainImage,
            additionalImages,
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
        const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const additionalImages = req.files['additionalImages'] ? req.files['additionalImages'].map(file => file.filename) : [];

        // Build the update object
        const updateData = {
            name,
            price,
            deadline,
            drawDate,
            description
        };

        if (mainImage) updateData.mainImage = mainImage;
        if (additionalImages.length > 0) updateData.additionalImages = additionalImages;

        // Find the prize by ID and update with the new data
        const updatedPrize = await Prize.findByIdAndUpdate(
            id,
            updateData,
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
