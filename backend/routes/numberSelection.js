import express from 'express';
import { getAvailableNumbers, selectNumber } from '../controllers/numberSelectionController.js';

const router = express.Router();


router.get('/availableNumbers', getAvailableNumbers);


router.post('/selectNumber/:id', selectNumber);

export default router;
