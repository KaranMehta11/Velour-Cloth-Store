require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const products = [
  // MEN (8 products)
  {
    name: 'The Classic Oxford Shirt',
    description: 'A timeless oxford shirt crafted from premium Egyptian cotton. Features a button-down collar, chest pocket, and a relaxed-yet-refined silhouette. Perfect for boardroom to weekend.',
    price: 129,
    discountPrice: 99,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Navy', hex: '#1E3A5F' }],
    stock: 80,
    featured: true,
  },
  {
    name: 'Tailored Wool Blazer',
    description: 'Italian-crafted wool blazer with a slim silhouette. Features a notched lapel, two-button front, and fully lined interior. An investment piece for the modern gentleman.',
    price: 299,
    discountPrice: null,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Charcoal', hex: '#36454F' }, { name: 'Navy', hex: '#1E3A5F' }],
    stock: 40,
    featured: true,
  },
  {
    name: 'Slim Fit Chino Trousers',
    description: 'Versatile slim-fit chinos woven from a cotton-elastane blend for all-day comfort. Clean lines and a tapered leg make these the go-to foundation piece for any outfit.',
    price: 89,
    discountPrice: 69,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Stone', hex: '#B2A28C' }, { name: 'Olive', hex: '#6B7145' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 100,
    featured: false,
  },
  {
    name: 'Merino Crew-Neck Sweater',
    description: 'Luxuriously soft merino wool sweater with a classic crew neck. Temperature regulating and naturally odor resistant. A wardrobe essential across all seasons.',
    price: 149,
    discountPrice: null,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Camel', hex: '#C19A6B' }, { name: 'Forest', hex: '#355E3B' }, { name: 'Slate', hex: '#708090' }],
    stock: 60,
    featured: true,
  },
  {
    name: 'Japanese Selvedge Denim',
    description: 'Crafted from authentic Japanese selvedge denim, these jeans age beautifully with wear. A straight cut with subtle taper — the perfect everyday denim.',
    price: 199,
    discountPrice: null,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Indigo', hex: '#4B0082' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 50,
    featured: false,
  },
  {
    name: 'Linen Resort Shirt',
    description: 'Breathable pure linen shirt with a relaxed Cuban collar. The ideal warm-weather companion — versatile enough for beach days and rooftop dinners alike.',
    price: 109,
    discountPrice: 89,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Sand', hex: '#C2B280' }, { name: 'Sky', hex: '#87CEEB' }, { name: 'White', hex: '#FFFFFF' }],
    stock: 75,
    featured: false,
  },
  {
    name: 'Heritage Leather Belt',
    description: 'Full-grain vegetable-tanned leather belt with a brushed gold buckle. Hardens and softens with your body over time, becoming uniquely yours.',
    price: 79,
    discountPrice: null,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80', public_id: '' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Tan', hex: '#D2B48C' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 90,
    featured: false,
  },
  {
    name: 'Cashmere Turtleneck',
    description: 'Grade-A cashmere turtleneck with a ribbed body and close-fitting neck. The pinnacle of cold-weather luxury — impossibly soft against the skin.',
    price: 249,
    discountPrice: 199,
    category: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Ivory', hex: '#FFFFF0' }, { name: 'Mushroom', hex: '#A69587' }],
    stock: 35,
    featured: true,
  },
  // WOMEN (10 products)
  {
    name: 'Silk Satin Midi Dress',
    description: 'Fluid silk satin dress with a bias-cut silhouette that drapes effortlessly over the body. A spaghetti-strap neckline and midi length create a look that is simultaneously modern and timeless.',
    price: 239,
    discountPrice: 189,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Midnight', hex: '#1C1C3A' }, { name: 'Blush', hex: '#FFB6C1' }],
    stock: 45,
    featured: true,
  },
  {
    name: 'Wide-Leg Tailored Trousers',
    description: 'High-waisted wide-leg trousers cut from a premium wool-crepe blend. A power silhouette that transitions seamlessly from the office to evening.',
    price: 169,
    discountPrice: null,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1551163943-3f6abb3d7099?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Ecru', hex: '#C2B280' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 55,
    featured: true,
  },
  {
    name: 'The Oversized Blazer',
    description: 'A deconstructed, relaxed-fit blazer that pairs as a statement layer over anything — dresses, denim, or nothing at all. Crafted in a soft, unstructured tweed.',
    price: 219,
    discountPrice: 179,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1484327973588-c31f829103fe?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Oatmeal', hex: '#D4C5A9' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 40,
    featured: false,
  },
  {
    name: 'Ribbed Knit Maxi Dress',
    description: 'A figure-skimming maxi dress in a soft ribbed cotton blend. Elegant simplicity with a scoop neck and subtle ruched side-detail.',
    price: 159,
    discountPrice: null,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Sand', hex: '#C2B280' }, { name: 'Forest', hex: '#355E3B' }, { name: 'Terracotta', hex: '#CC6633' }],
    stock: 60,
    featured: true,
  },
  {
    name: 'Linen Button-Down Shirt',
    description: 'Relaxed linen shirt with a slightly oversized silhouette. Wear it tucked, knotted, or layered open — the ultimate versatile warm-weather piece.',
    price: 99,
    discountPrice: 79,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Sage', hex: '#9DAD8C' }, { name: 'Blush', hex: '#FFB6C1' }],
    stock: 80,
    featured: false,
  },
  {
    name: 'Mini A-Line Skirt',
    description: 'A classic A-line mini skirt with a hidden side zip. The clean, structured silhouette pairs with everything from bodysuit to oversized knit.',
    price: 119,
    discountPrice: null,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1583496661160-fb5218db5d54?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Cream', hex: '#FFFDD0' }, { name: 'Black', hex: '#1A1A1A' }, { name: 'Caramel', hex: '#C68642' }],
    stock: 70,
    featured: false,
  },
  {
    name: 'Plunge-Neck Bodysuit',
    description: 'A sleek plunge-neck bodysuit in a smooth second-skin fabric. The elevated foundation layer for every look in your wardrobe.',
    price: 79,
    discountPrice: 59,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4a70c8?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Ivory', hex: '#FFFFF0' }, { name: 'Black', hex: '#1A1A1A' }, { name: 'Mocha', hex: '#7B5335' }],
    stock: 90,
    featured: false,
  },
  {
    name: 'Structured Trench Coat',
    description: 'A modern take on the iconic trench coat in a water-resistant Italian cotton. Double-breasted front, belted waist, and a classic storm flap — timeless protection with a fashion edge.',
    price: 349,
    discountPrice: null,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1548624313-0396c75e4b88?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1525450824786-227cbef70703?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Camel', hex: '#C19A6B' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 25,
    featured: true,
  },
  {
    name: 'The Wrap Midi Dress',
    description: 'A universally flattering wrap dress in a flowing crepe fabric. The adjustable tie waist creates an hourglass silhouette across all body types.',
    price: 189,
    discountPrice: 149,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Floral Ivory', hex: '#FFFFF0' }, { name: 'Deep Wine', hex: '#722F37' }],
    stock: 50,
    featured: false,
  },
  {
    name: 'Cashmere Cardigan',
    description: 'A long, open-front cashmere cardigan with deep patch pockets. Supreme softness meets minimalist elegance. The perfect transitional layer.',
    price: 279,
    discountPrice: 229,
    category: 'Women',
    images: [
      { url: 'https://images.unsplash.com/photo-1638185618847-a7ff1b43a3ac?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&q=80', public_id: '' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [{ name: 'Oatmeal', hex: '#D4C5A9' }, { name: 'Sage', hex: '#9DAD8C' }, { name: 'Dusty Rose', hex: '#DCAE96' }],
    stock: 35,
    featured: true,
  },
  // ACCESSORIES (6 products)
  {
    name: 'Italian Leather Tote',
    description: 'Hand-stitched from vegetable-tanned Italian leather, this capacious tote develops a rich patina over time. Gold hardware, suede interior, and a removable zip pouch.',
    price: 299,
    discountPrice: null,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', public_id: '' },
    ],
    sizes: ['M'],
    colors: [{ name: 'Tan', hex: '#D2B48C' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 30,
    featured: true,
  },
  {
    name: 'Silk Scarf',
    description: 'A 100% silk scarf hand-printed in Milan with an abstract pattern inspired by Art Deco architecture. Wear as a headscarf, necktie, bag accent, or wrap.',
    price: 89,
    discountPrice: null,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1591803986655-df2b02d777cf?w=800&q=80', public_id: '' },
    ],
    sizes: ['M'],
    colors: [{ name: 'Ivory/Gold', hex: '#F7E7CE' }, { name: 'Navy/Red', hex: '#1E3A5F' }],
    stock: 60,
    featured: false,
  },
  {
    name: 'Merino Wool Beanie',
    description: 'A ribbed merino wool beanie with a refined, non-bulky silhouette. Naturally temperature-regulating and itch-free against all skin types.',
    price: 49,
    discountPrice: null,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1510598155-b72714e8d990?w=800&q=80', public_id: '' },
    ],
    sizes: ['M'],
    colors: [{ name: 'Charcoal', hex: '#36454F' }, { name: 'Camel', hex: '#C19A6B' }, { name: 'Ivory', hex: '#FFFFF0' }],
    stock: 100,
    featured: false,
  },
  {
    name: 'Leather Card Wallet',
    description: 'Ultra-slim cardholder in full-grain leather. Holds up to 8 cards with RFID blocking. A gift that gets more beautiful with every use.',
    price: 59,
    discountPrice: 45,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1598979668966-0a0f1eeb4ab8?w=800&q=80', public_id: '' },
    ],
    sizes: ['M'],
    colors: [{ name: 'Cognac', hex: '#9A4722' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 120,
    featured: false,
  },
  {
    name: 'Sunglasses — The Oversized',
    description: 'Architectural oversized frames in handmade Italian acetate with polarized UV400 lenses. A statement that shields.',
    price: 149,
    discountPrice: null,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', public_id: '' },
    ],
    sizes: ['M'],
    colors: [{ name: 'Tortoise', hex: '#8B6914' }, { name: 'Black', hex: '#1A1A1A' }],
    stock: 45,
    featured: false,
  },
  {
    name: 'Gold Vermeil Necklace',
    description: '18k gold vermeil pendant on a fine chain. Ethically sourced and hand-finished by our artisan partners in Florence. The kind of piece worn every day for decades.',
    price: 119,
    discountPrice: null,
    category: 'Accessories',
    images: [
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', public_id: '' },
      { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', public_id: '' },
    ],
    sizes: ['M'],
    colors: [{ name: 'Gold', hex: '#C9A96E' }, { name: 'Silver', hex: '#C0C0C0' }],
    stock: 50,
    featured: true,
  },
];

const seed = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI === 'PLACEHOLDER') {
      console.error('❌ MONGO_URI not set in .env. Cannot seed database.');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const adminUser = await User.create({
      name: 'Admin Velour',
      email: 'admin@velour.com',
      password: 'Admin@123',
      role: 'admin',
    });
    await User.create({
      name: 'Jane Smith',
      email: 'user@velour.com',
      password: 'User@123',
      role: 'user',
    });
    console.log('👤 Users created: admin@velour.com / Admin@123 | user@velour.com / User@123');

    // Create products
    const created = await Product.insertMany(products);
    console.log(`📦 Created ${created.length} products`);

    console.log('✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
