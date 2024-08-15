import express from 'express';
import { getHistoricalDraws, completeDraw, getAllDraws, updateDraw, deleteDraw, createDraw } from '../../controllers/admin/drawController.js';

const router = express.Router();

// Create a new draw
router.post('/create', createDraw);

// Get all draws
router.get('/', getAllDraws); 

// Update a draw
router.put('/:id', updateDraw);

// Mark draw as completed
router.put('/complete/:id', completeDraw);

// Get historical draws
router.get('/history', getHistoricalDraws);

// Delete a draw
router.delete('/:id', deleteDraw); 

export default router;
