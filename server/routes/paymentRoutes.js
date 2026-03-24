const express = require('express');
const router = express.Router();
const { createCheckoutSession, stripeWebhook, getCheckoutSession } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.post('/create-checkout-session', protect, createCheckoutSession);
router.get('/session/:sessionId', protect, getCheckoutSession);

module.exports = router;
