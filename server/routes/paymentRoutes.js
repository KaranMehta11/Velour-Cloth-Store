const express = require('express');
const router = express.Router();
const { createCheckoutSession, stripeWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.post('/create-checkout-session', protect, createCheckoutSession);

module.exports = router;
