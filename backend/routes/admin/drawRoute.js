import express from 'express';
import { getHistoricalDraws, completeDraw, getAllDraws, updateDraw, deleteDraw, createDraw } from '../../controllers/admin/drawController.js';

const router = express.Router();

// Create a new draw
router.post('/', createDraw); // Implement this function

// Get all draws
router.get('/', getAllDraws); // Implement this function

// Update a draw
router.put('/:id', updateDraw); // Implement this function

// Mark draw as completed
router.put('/complete/:id', completeDraw);

// Get historical draws
router.get('/history', getHistoricalDraws);

// Delete a draw
router.delete('/:id', deleteDraw); // Implement this function

export default router;
