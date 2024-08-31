import express from 'express';
import {
    getCurrentDraw,
    getPastResults,
    getWinnerAnnouncements
} from '../controllers/drawResults_controller.js';

const router = express.Router();

router.get('/v1/current', getCurrentDraw);
router.get('/v1/past', getPastResults);
router.get('/v1/winners', getWinnerAnnouncements);

export default router;
