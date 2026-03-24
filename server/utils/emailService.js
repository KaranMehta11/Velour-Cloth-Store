const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMailSafe = async (to, subject, html) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !to) return;
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
  } catch (err) {
    // prevent transactional email failure from breaking app flow
  }
};

const sendOrderConfirmation = async (user, order) => sendMailSafe(
  user.email,
  `Order Confirmed! #${String(order._id).slice(-8).toUpperCase()} — Velour`,
  `<h2 style="color:#B8963E;margin:0 0 12px;">VELOUR</h2>
   <p>Thank you for your order, ${user.name || 'Customer'}!</p>
   <p>Order number: #${String(order._id).slice(-8).toUpperCase()}</p>
   <p>Total: ₹${Math.round(order.totalPrice || 0).toLocaleString('en-IN')}</p>
   <p>Estimated delivery: 3-5 business days</p>
   <a href="${process.env.CLIENT_URL}/account?tab=orders" style="display:inline-block;padding:10px 16px;background:#0A0A0A;color:#fff;text-decoration:none;">Track Your Order</a>`
);

const sendWelcomeEmail = async (user) => sendMailSafe(
  user.email,
  `Welcome to Velour, ${user.name}!`,
  `<h2 style="color:#B8963E;margin:0 0 12px;">Welcome to Velour</h2>
   <p>Hi ${user.name}, your account is ready.</p>
   <p>Promo code: <strong>NEWUSER20</strong> for 20% off first order.</p>
   <a href="${process.env.CLIENT_URL}/shop" style="display:inline-block;padding:10px 16px;background:#0A0A0A;color:#fff;text-decoration:none;">Start Shopping</a>`
);

const sendShippingUpdate = async (user, order) => sendMailSafe(
  user.email,
  'Your Velour order is on its way! 🚚',
  `<h2 style="color:#B8963E;margin:0 0 12px;">Shipping Update</h2>
   <p>Your tracking number: <strong>${order.trackingNumber || `VL${String(order._id).slice(-10).toUpperCase()}`}</strong></p>
   <p>Estimated delivery: 3-5 business days</p>
   <a href="${process.env.CLIENT_URL}/order/track/${order._id}" style="display:inline-block;padding:10px 16px;background:#0A0A0A;color:#fff;text-decoration:none;">Track Order</a>`
);

module.exports = { sendOrderConfirmation, sendWelcomeEmail, sendShippingUpdate };
