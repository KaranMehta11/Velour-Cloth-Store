const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Get wishlist
// @route GET /api/wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist', 'name images price discountPrice category rating numReviews');
  res.json({ success: true, wishlist: user.wishlist });
});

// @desc Add to wishlist
// @route POST /api/wishlist/:productId
const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.wishlist.includes(req.params.productId)) {
    res.status(400);
    throw new Error('Product already in wishlist');
  }
  user.wishlist.push(req.params.productId);
  await user.save();
  res.json({ success: true, message: 'Added to wishlist' });
});

// @desc Remove from wishlist
// @route DELETE /api/wishlist/:productId
const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
  await user.save();
  res.json({ success: true, message: 'Removed from wishlist' });
});

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
