// import express from 'express';
// import {
//     getCurrentDraw,
//     getPastResults,
//     getWinnerAnnouncements
// } from '../controllers/drawResults_controller.js';

// const router = express.Router();

// router.get('/v1/current', getCurrentDraw);
// router.get('/v1/past', getPastResults);
// router.get('/v1/winners', getWinnerAnnouncements);

// export default router;
import express from 'express';
import {
    getCurrentDraw,
    getPastResults,
    getWinnerAnnouncements,
    getClosestUpcomingDraw,  // Add this line
    getCountdownDetails
} from '../controllers/drawResults_controller.js';

const router = express.Router();

// Existing routes
router.get('/current', getCurrentDraw);
router.get('/v1/past', getPastResults);
router.get('/v1/winners', getWinnerAnnouncements);

// New route for fetching the next upcoming draw
router.get('/next', getClosestUpcomingDraw);
//router.get('/count', getCountdownDetails);

export default router;

