import express from 'express';
import Prize from '../../models/prizes.js'; // Adjust the path to your Prize model
import upload from '../../middlewares/admin/multer.js'; // Import the Multer instance
import { updatePrize } from '../../controllers/prizes_controller.js'; // Import the updatePrize controller function

const router = express.Router();

// POST route to add a new prize
router.post('/', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImage1', maxCount: 1 },
    { name: 'additionalImage2', maxCount: 1 },
    { name: 'additionalImage3', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, price, deadline, drawDate, description } = req.body;
        
        const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const additionalImage1 = req.files['additionalImage1'] ? req.files['additionalImage1'][0].filename : null;
        const additionalImage2 = req.files['additionalImage2'] ? req.files['additionalImage2'][0].filename : null;
        const additionalImage3 = req.files['additionalImage3'] ? req.files['additionalImage3'][0].filename : null;

        // Basic validation
        if (!name || !price || !deadline || !drawDate || !mainImage || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new prize instance
        const newPrize = new Prize({
            name,
            mainImage,
            additionalImage1,
            additionalImage2,
            additionalImage3,
            price,
            deadline,
            drawDate,
            description
        });

        // Save the prize to the database
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

// PUT route to update an existing prize by ID
router.put('/:id', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImage1', maxCount: 1 },
    { name: 'additionalImage2', maxCount: 1 },
    { name: 'additionalImage3', maxCount: 1 }
]), updatePrize);

// GET route to fetch a single prize by ID
router.get('/:id', async (req, res) => {
    try {
        const prize = await Prize.findById(req.params.id); // Fetch prize by ID
        if (!prize) {
            return res.status(404).json({ message: 'Prize not found' });
        }
        res.status(200).json(prize);
    } catch (error) {
        console.error('Error fetching prize details:', error);
        res.status(500).json({ message: 'Failed to fetch prize details', error });
    }
});

// DELETE route to delete a prize by ID
router.delete('/:id', async (req, res) => {
    try {
        const prize = await Prize.findByIdAndDelete(req.params.id);
        if (!prize) {
            return res.status(404).json({ message: 'Prize not found' });
        }
        res.status(200).json({ message: 'Prize deleted successfully' });
    } catch (error) {
        console.error('Error deleting prize:', error);
        res.status(500).json({ message: 'Error deleting prize', error });
    }
});

export default router;
