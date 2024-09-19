import express from 'express';
import { getHistoricalDraws, completeDraw, getAllDraws, updateDraw, deleteDraw, createDraw } from '../../controllers/admin/drawController.js';

const router = express.Router();

// Create a new draw with prizes
router.post('/create', createDraw);

// Get all draws
router.get('/', getAllDraws);

// Update a draw
router.put('/:draw', updateDraw);

// Mark draw as completed
router.put('/complete/:draw', completeDraw);

// Get historical draws
router.get('/history', getHistoricalDraws);

// Delete a draw
router.delete('/delete/:draw', deleteDraw);

export default router;
