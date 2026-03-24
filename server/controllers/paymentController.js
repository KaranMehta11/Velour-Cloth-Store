const asyncHandler = require('express-async-handler');
const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'PLACEHOLDER' 
  ? require('stripe')(process.env.STRIPE_SECRET_KEY) 
  : null;
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// @desc Create Stripe checkout session
// @route POST /api/payment/create-checkout-session
const createCheckoutSession = asyncHandler(async (req, res) => {
  if (!stripe) {
    res.status(503);
    throw new Error('Payment service not configured. Please add STRIPE_SECRET_KEY to .env');
  }

  const { items = [], shippingAddress = {}, couponCode } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Cart items are required');
  }

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      // Stripe for INR accepts amount in paise.
      unit_amount: Math.round(Number(item.price || 0)),
    },
    quantity: Number(item.qty) || Number(item.quantity) || 1,
  }));

  let totalPrice = lineItems.reduce(
    (sum, li) => sum + li.price_data.unit_amount * li.quantity,
    0
  );

  let appliedCouponCode = '';
  if (couponCode) {
    const coupon = await Coupon.findOne({ code: String(couponCode).toUpperCase() });
    if (coupon && coupon.isActive && (!coupon.expiresAt || coupon.expiresAt >= new Date()) && coupon.usedCount < coupon.maxUses) {
      const discountAmount = coupon.discountType === 'percentage'
        ? Math.round((totalPrice * coupon.discountValue) / 100)
        : Math.round(coupon.discountValue * 100);
      totalPrice = Math.max(0, totalPrice - discountAmount);
      appliedCouponCode = coupon.code;
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
    metadata: {
      userId: req.user._id.toString(),
      shippingAddress: JSON.stringify(shippingAddress),
      orderItems: JSON.stringify(items),
      totalPrice: String(totalPrice),
      couponCode: appliedCouponCode,
    },
    customer_email: req.user.email,
  });

  res.json({ url: session.url });
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
    const userId = session.metadata?.userId;
    const shippingAddress = JSON.parse(session.metadata?.shippingAddress || '{}');
    const orderItems = JSON.parse(session.metadata?.orderItems || '[]');
    const totalPricePaise = Number(session.metadata?.totalPrice || 0);
    const couponCode = session.metadata?.couponCode;

    const existingOrder = await Order.findOne({
      'paymentResult.id': session.payment_intent,
    });

    if (!existingOrder) {
      const normalizedItems = orderItems.map((item) => ({
        name: item.name,
        qty: Number(item.qty) || Number(item.quantity) || 1,
        image: item.image || '',
        price: Number(item.price || 0) / 100,
        size: item.size,
        color: item.color,
        product: item.product || item.productId,
      }));

      const order = await Order.create({
        user: userId,
        orderItems: normalizedItems,
        shippingAddress: {
          address: shippingAddress.address || '',
          city: shippingAddress.city || '',
          postalCode: shippingAddress.postalCode || '',
          country: shippingAddress.country || '',
        },
        paymentMethod: 'stripe',
        paymentResult: {
          id: session.payment_intent,
          status: session.payment_status,
          email_address: session.customer_details?.email || session.customer_email,
        },
        itemsPrice: totalPricePaise / 100,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: totalPricePaise / 100,
        isPaid: true,
        paidAt: Date.now(),
      });

      for (const item of normalizedItems) {
        if (item.product) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { sold: item.qty, stock: -item.qty },
          });
        }
      }

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });
      if (couponCode) {
        await Coupon.findOneAndUpdate({ code: couponCode }, { $inc: { usedCount: 1 } });
      }
      // keep reference to avoid unused var lint in some setups
      void order;
    }
  }

  res.json({ received: true });
});

// @desc Get stripe session details
// @route GET /api/payment/session/:sessionId
const getCheckoutSession = asyncHandler(async (req, res) => {
  if (!stripe) {
    res.status(503);
    throw new Error('Payment service not configured. Please add STRIPE_SECRET_KEY to .env');
  }

  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const items = (session.line_items?.data || []).map((li) => ({
    name: li.description,
    quantity: li.quantity,
    amount: (li.amount_total || 0) / 100,
    currency: li.currency,
  }));

  res.json({
    session: {
      id: session.id,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email || session.customer_email,
      amountTotal: (session.amount_total || 0) / 100,
      currency: session.currency,
      items,
    },
  });
});

module.exports = { createCheckoutSession, stripeWebhook, getCheckoutSession };
