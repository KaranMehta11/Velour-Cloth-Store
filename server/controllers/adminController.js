const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc Get admin stats
// @route GET /api/admin/stats
const getAdminStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalProducts = await Product.countDocuments();

  const revenueData = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const totalRevenue = revenueData[0]?.total || 0;

  const recentOrders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

  const topProducts = await Product.find().sort({ sold: -1 }).limit(5).select('name sold price images');

  // Revenue last 7 days
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));
    const dayRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end }, isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    last7Days.push({
      date: start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      revenue: dayRevenue[0]?.total || 0,
    });
  }

  res.json({
    success: true,
    stats: { totalRevenue, totalOrders, totalUsers, totalProducts },
    recentOrders,
    topProducts,
    revenueChart: last7Days,
  });
});

module.exports = { getAdminStats };
