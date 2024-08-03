import express from 'express';
import {
    getCurrentDraw,
    getPastResults,
    getWinnerAnnouncements
} from '../controllers/drawResults_controller.js';

const router = express.Router();


router.get('/current', getCurrentDraw);
router.get('/past', getPastResults);
router.get('/winners', getWinnerAnnouncements);

export default router;
