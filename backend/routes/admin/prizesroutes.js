import express from 'express';
import Prize from '../../models/prizes.js'; // Adjust the path to your Prize model
import upload from '../../middlewares/admin/multer.js'; // Import the Multer instance

const router = express.Router();

// POST route to add a new prize
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, deadline, drawDate } = req.body;
        const image = req.file?.filename; // Get the filename of the uploaded image

        // Basic validation
        if (!name || !price || !deadline || !drawDate || !image) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newPrize = new Prize({
            name,
            image,
            price,
            deadline,
            drawDate
        });

        await newPrize.save();
        res.status(201).json(newPrize);
    } catch (error) {
        console.error('Error adding prize:', error);
        res.status(500).json({ message: 'Error adding prize', error });
    }
});

// GET route to fetch all prizes
router.get('/', async (req, res) => {
    try {
        const prizes = await Prize.find(); // Fetch all prizes
        res.status(200).json(prizes);
    } catch (error) {
        console.error('Error fetching prizes:', error);
        res.status(500).json({ message: 'Error fetching prizes', error });
    }
});

export default router;
