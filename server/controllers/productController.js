const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { deleteFromCloudinary } = require('../utils/cloudinary');

// @desc Get all products with filters
// @route GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { category, size, color, minPrice, maxPrice, sort, page = 1, limit = 12, search } = req.query;
  const query = {};

  if (category && category !== 'All') query.category = category;
  if (size) query.sizes = { $in: [size] };
  if (color) query['colors.name'] = { $regex: color, $options: 'i' };
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
      { category: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price_asc') sortOption = { price: 1 };
  else if (sort === 'price_desc') sortOption = { price: -1 };
  else if (sort === 'best_selling') sortOption = { sold: -1 };
  else if (sort === 'rating') sortOption = { rating: -1 };

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortOption)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  res.json({
    success: true,
    products,
    page: Number(page),
    pages: Math.ceil(count / Number(limit)),
    count,
  });
});

// @desc Get featured products
// @route GET /api/products/featured
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).limit(8);
  res.json({ success: true, products });
});

// @desc Get single product
// @route GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, product });
});

// @desc Create product (admin)
// @route POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, discountPrice, category, sizes, colors, stock, featured } = req.body;
  const images = (req.files || []).map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));

  const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors || [];
  const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes || [];

  const product = await Product.create({
    name, description, price, discountPrice, category,
    sizes: parsedSizes, colors: parsedColors, stock, featured, images,
  });

  res.status(201).json({ success: true, product });
});

// @desc Update product (admin)
// @route PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, description, price, discountPrice, category, sizes, colors, stock, featured, removeImageIds } = req.body;
  const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors || product.colors;
  const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes || product.sizes;

  let images = [...product.images];
  const toRemove = typeof removeImageIds === 'string'
    ? JSON.parse(removeImageIds)
    : (removeImageIds || []);

  if (Array.isArray(toRemove) && toRemove.length > 0) {
    for (const publicId of toRemove) {
      await deleteFromCloudinary(publicId).catch(() => {});
    }
    images = images.filter((img) => !toRemove.includes(img.public_id));
  }

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
    images = [...images, ...newImages];
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price !== undefined ? price : product.price;
  product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
  product.category = category || product.category;
  product.sizes = parsedSizes;
  product.colors = parsedColors;
  product.stock = stock !== undefined ? stock : product.stock;
  product.featured = featured !== undefined ? featured : product.featured;
  product.images = images;

  const updated = await product.save();
  res.json({ success: true, product: updated });
});

// @desc Delete product (admin)
// @route DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete images from Cloudinary
  for (const img of product.images) {
    if (img.public_id) {
      await deleteFromCloudinary(img.public_id).catch(() => {});
    }
  }

  await product.deleteOne();
  res.json({ success: true, message: 'Product deleted' });
});

// @desc Add review
// @route POST /api/products/:id/review
const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  product.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  });

  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ success: true, message: 'Review added' });
});

module.exports = { getProducts, getFeaturedProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview };
