const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendShippingUpdate } = require('../utils/emailService');

// @desc Create order
// @route POST /api/orders
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Update product sold count
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { sold: item.qty, stock: -item.qty } });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'stripe',
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  // Clear cart after order
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

  res.status(201).json({ success: true, order });
});

// @desc Get user orders
// @route GET /api/orders/my-orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// @desc Get single order
// @route GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }
  res.json({ success: true, order });
});

// @desc Get all orders (admin)
// @route GET /api/orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// @desc Update order status (admin)
// @route PUT /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  order.status = status;
  if (status === 'Delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  if (status === 'Shipped') {
    if (!order.trackingNumber) {
      order.trackingNumber = `VL${String(order._id).slice(-10).toUpperCase()}`;
    }
    if (order.user?.email) sendShippingUpdate(order.user, order);
  }
  await order.save();
  res.json({ success: true, order });
});

// @desc Mark order as paid
// @route PUT /api/orders/:id/pay
const markOrderAsPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = req.body;
  await order.save();
  res.json({ success: true, order });
});

// @desc Get order tracking timeline
// @route GET /api/orders/:id/tracking
const getOrderTracking = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  const statusOrder = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = order.status === 'Delivered'
    ? 4
    : order.status === 'Shipped'
      ? 2
      : 1;

  const steps = [
    { status: 'Order Placed', description: 'Your order has been confirmed' },
    { status: 'Processing', description: 'Your items are being prepared' },
    { status: 'Shipped', description: 'Your order is on its way' },
    { status: 'Out for Delivery', description: 'Almost there!' },
    { status: 'Delivered', description: 'Enjoy your purchase!' },
  ].map((s, idx) => ({
    ...s,
    completed: idx <= currentStatusIndex,
    timestamp: order.trackingSteps?.[idx]?.timestamp || order.createdAt,
  }));

  order.trackingSteps = steps;
  if (!order.trackingNumber && (order.status === 'Shipped' || order.status === 'Delivered')) {
    order.trackingNumber = `VL${String(order._id).slice(-10).toUpperCase()}`;
  }
  await order.save();

  void statusOrder;
  res.json({ success: true, order });
});

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, markOrderAsPaid, getOrderTracking };
