const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { setTokenCookies, generateAccessToken } = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

// @desc Register user
// @route POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already exists');
  }
  const user = await User.create({ name, email, password });
  setTokenCookies(res, user._id);
  res.status(201).json({
    success: true,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc Login user
// @route POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  setTokenCookies(res, user._id);
  res.json({
    success: true,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc Logout user
// @route POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
});

// @desc Refresh access token
// @route GET /api/auth/refresh
const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401);
    throw new Error('No refresh token');
  }
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const accessToken = generateAccessToken(decoded.id);
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });
  res.json({ success: true });
});

// @desc Get logged-in user
// @route GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('wishlist', 'name images price discountPrice');
  res.json({ success: true, user });
});

module.exports = { register, login, logout, refreshToken, getMe };
