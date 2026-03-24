require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');

const app = express();

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Stripe webhook needs raw body — must be before express.json()
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/coupon', require('./routes/coupon'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Velour API is running' }));

// Error handler
app.use(errorHandler);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI === 'PLACEHOLDER') {
    console.warn('⚠️  MONGO_URI not set. Running without database connection.');
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
