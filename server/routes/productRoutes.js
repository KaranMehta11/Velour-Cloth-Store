const express = require('express');
const router = express.Router();
const {
  getProducts, getFeaturedProducts, getProductById,
  createProduct, updateProduct, deleteProduct, addReview,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, upload.array('images', 5), createProduct);
router.put('/:id', protect, adminOnly, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/review', protect, addReview);

module.exports = router;
