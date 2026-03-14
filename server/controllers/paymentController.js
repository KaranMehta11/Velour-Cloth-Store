const asyncHandler = require('express-async-handler');
const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'PLACEHOLDER' 
  ? require('stripe')(process.env.STRIPE_SECRET_KEY) 
  : null;
const Order = require('../models/Order');

// @desc Create Stripe checkout session
// @route POST /api/payment/create-checkout-session
const createCheckoutSession = asyncHandler(async (req, res) => {
  if (!stripe) {
    res.status(503);
    throw new Error('Payment service not configured. Please add STRIPE_SECRET_KEY to .env');
  }

  const { items, shippingAddress, orderData } = req.body;

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round((item.discountPrice || item.price) * 100),
    },
    quantity: item.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
    metadata: {
      userId: req.user._id.toString(),
      orderData: JSON.stringify(orderData),
    },
  });

  res.json({ success: true, url: session.url, sessionId: session.id });
});

// @desc Stripe webhook
// @route POST /api/payment/webhook
const stripeWebhook = asyncHandler(async (req, res) => {
  if (!stripe) {
    return res.status(200).json({ received: true });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderData = JSON.parse(session.metadata.orderData || '{}');
    
    await Order.findByIdAndUpdate(orderData.orderId, {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: session.payment_intent,
        status: session.payment_status,
        email_address: session.customer_details?.email,
      },
    });
  }

  res.json({ received: true });
});

module.exports = { createCheckoutSession, stripeWebhook };
