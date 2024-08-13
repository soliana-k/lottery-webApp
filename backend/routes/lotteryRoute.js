import express from 'express';
import { handleNumberAndPayment, getAvailableNumbers, selectNumber } from '../controllers/lotteryController.js'; // Adjust the path as necessary


const router = express.Router();


router.post('/start-lottery', handleNumberAndPayment);
router.post('/selectNumber/:id', selectNumber);


router.get('/availableNumbers', getAvailableNumbers);



export default router;
