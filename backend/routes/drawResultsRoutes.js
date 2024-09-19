import express from 'express';
import { startDraw, getClosestUpcomingDraw, getCountdownDetails, getPastResults, getWinnerAnnouncements } from '../controllers/drawResults_controller.js';

const router = express.Router();

router.post('/start', startDraw);  
router.get('/upcoming', getClosestUpcomingDraw);  
router.get('/countdown', getCountdownDetails);  
router.get('/past-results', getPastResults);  
router.get('/winners', getWinnerAnnouncements);  

export default router;
