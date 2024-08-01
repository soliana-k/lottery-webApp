
const express = require('express');
const router = express.Router();
const numberSelectionController = require('');


router.post('/process-payment', numberSelectionController.processPayment);

module.exports = router;
