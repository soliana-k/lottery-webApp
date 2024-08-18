import express from 'express';
import { handleNumberAndPayment, getAvailableNumbers, selectNumber, addNumber, deleteNumber, massAddNumbers } from '../controllers/lotteryController.js'; // Adjust the path as necessary


const router = express.Router();


router.post('/start-lottery', handleNumberAndPayment);
router.post('/selectNumber/:id', selectNumber);

router.post('/addNumber', addNumber);
router.delete('/deleteNumber/:number', deleteNumber);
router.get('/availableNumbers', getAvailableNumbers);
router.post('/massAddNumbers', massAddNumbers);



export default router;
