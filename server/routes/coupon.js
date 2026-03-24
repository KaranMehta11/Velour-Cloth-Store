const express = require('express');
const Coupon = require('../models/Coupon');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

const validateCoupon = (coupon, cartTotal) => {
  if (!coupon || !coupon.isActive) return { valid: false, message: 'Invalid/expired coupon' };
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return { valid: false, message: 'Invalid/expired coupon' };
  if (coupon.usedCount >= coupon.maxUses) return { valid: false, message: 'Invalid/expired coupon' };
  if (Number(cartTotal) < Number(coupon.minOrderValue || 0)) return { valid: false, message: 'Invalid/expired coupon' };
  return { valid: true };
};

router.post('/validate', async (req, res) => {
  const { code, cartTotal } = req.body;
  const coupon = await Coupon.findOne({ code: String(code || '').toUpperCase() });
  const check = validateCoupon(coupon, cartTotal);
  if (!check.valid) return res.status(400).json(check);

  const subtotal = Number(cartTotal);
  const discountAmount = coupon.discountType === 'percentage'
    ? (subtotal * coupon.discountValue) / 100
    : coupon.discountValue;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return res.json({
    valid: true,
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountAmount,
    finalTotal,
  });
});

router.post('/apply', async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code: String(code || '').toUpperCase() });
  if (!coupon) return res.status(400).json({ valid: false, message: 'Invalid/expired coupon' });
  coupon.usedCount += 1;
  await coupon.save();
  return res.json({ success: true });
});

router.get('/admin/coupons', protect, adminOnly, async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json({ success: true, coupons });
});

router.post('/admin/coupons', protect, adminOnly, async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    code: String(req.body.code || '').toUpperCase(),
  });
  res.status(201).json({ success: true, coupon });
});

router.delete('/admin/coupons/:id', protect, adminOnly, async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
