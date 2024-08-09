import express from 'express';
import { selectNumber, getSelectedNumbers } from '../controllers/numberSelectionController.js';

const router = express.Router();

router.get('/selectedNumbers', getSelectedNumbers);  // New route to get selected numbers
router.post('/selectNumber/:id', selectNumber);

export default router;
