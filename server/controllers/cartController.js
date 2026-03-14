const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc Get user cart
// @route GET /api/cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name images price discountPrice stock');
  res.json({ success: true, cart: cart || { items: [] } });
});

// @desc Add item to cart
// @route POST /api/cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty, size, color } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    i => i.product.toString() === productId && i.size === size && i.color === color
  );

  if (existingItem) {
    existingItem.qty += qty || 1;
  } else {
    cart.items.push({ product: productId, qty: qty || 1, size, color });
  }

  cart.updatedAt = Date.now();
  await cart.save();
  await cart.populate('items.product', 'name images price discountPrice stock');
  res.json({ success: true, cart });
});

// @desc Update cart item qty
// @route PUT /api/cart/:itemId
const updateCartItem = asyncHandler(async (req, res) => {
  const { qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  const item = cart.items.id(req.params.itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found in cart');
  }
  item.qty = qty;
  cart.updatedAt = Date.now();
  await cart.save();
  await cart.populate('items.product', 'name images price discountPrice stock');
  res.json({ success: true, cart });
});

// @desc Remove cart item
// @route DELETE /api/cart/:itemId
const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
  cart.updatedAt = Date.now();
  await cart.save();
  await cart.populate('items.product', 'name images price discountPrice stock');
  res.json({ success: true, cart });
});

// @desc Clear cart
// @route DELETE /api/cart
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], updatedAt: Date.now() });
  res.json({ success: true, message: 'Cart cleared' });
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
