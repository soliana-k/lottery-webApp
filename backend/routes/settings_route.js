import express from 'express';
const router = express.Router();

let settings = {
    fontSize: '16px',
    bgColor: '#ffffff'
};

// Get settings
router.get('/', (req, res) => {
    res.json(settings);
});

// Update settings
router.post('/', (req, res) => {
    const { fontSize, bgColor } = req.body;
    settings = { fontSize, bgColor };
    res.status(200).json(settings);
});

export default router;
