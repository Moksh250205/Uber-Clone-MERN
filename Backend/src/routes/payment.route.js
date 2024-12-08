const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/checkout', authMiddleware.authUser, paymentController.createCheckoutSession);

router.post('/confirm', authMiddleware.authUser, paymentController.confirmPayment);

module.exports = router;