# 🏢 Velour - Ultra-Luxury Fashion E-Commerce Store

> A premium MERN stack e-commerce platform redesigned with an ultra-luxury aesthetic inspired by Louis Vuitton, Chanel, and Dior.

![Velour Banner](https://img.shields.io/badge/Made%20with-MERN-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=flat-square)

---

## 📋 Project Overview

**Velour** is a full-stack e-commerce platform built with MongoDB, Express, React, and Node.js. The application features a comprehensive luxury fashion brand redesign with a sophisticated design system, premium typography, refined color palette, and seamless shopping experience.

### Key Features

- ✨ **Ultra-Luxury Design System** — Inspired by high-end fashion brands
- 🎨 **Premium Typography** — Cormorant Garamond (headings), Jost (UI), EB Garamond (accents)
- 💳 **Complete E-Commerce Flow** — Browse, filter, add to cart, checkout, order tracking
- 👥 **User Authentication** — Secure login/registration with JWT tokens
- 💝 **Wishlist System** — Save favorite items for later
- ⭐ **Product Reviews** — Customer ratings and testimonials
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized
- 🎯 **Admin Dashboard** — Manage products, orders, and inventory
- 💰 **INR Currency** — All prices displayed in Indian Rupees (₹)
- 🔍 **Advanced Filtering** — Search by category, size, color, and price range

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Cream** | `#F5F0E8` | Primary background |
| **Black** | `#0A0A0A` | Primary text |
| **Gold** | `#B8963E` | Accents & CTAs |
| **Gold Light** | `#D4AF6A` | Hover states |
| **Charcoal** | `#1C1C1C` | Dark sections |
| **Muted** | `#6B6560` | Secondary text |
| **White** | `#FDFCFA` | Off-white |
| **Border** | `#E8E0D0` | Subtle borders |

### Typography

- **Headings**: Cormorant Garamond (300-400 weight, proportional spacing)
- **UI/Buttons**: Jost (200-400 weight, uppercase with 0.15-0.3em letter-spacing)
- **Italics/Accents**: EB Garamond (serif accents)

### Design Patterns

- **Sharp Corners**: All buttons use `rounded-none` for modern luxury aesthetic
- **Minimal Shadows**: Flat design with selective use of borders
- **Whitespace**: Generous padding (100px+) for refined spacing
- **Animations**: Smooth transitions (350ms ease for hovers, 500ms for page transitions)

---

## 🏗️ Project Structure

```
Velour/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js            # API configuration
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Navigation with announcement bar
│   │   │   ├── ProductCard.jsx     # Product display card
│   │   │   ├── Footer.jsx          # Footer with newsletter
│   │   │   ├── SizeSelector.jsx    # Size options
│   │   │   ├── ColorSelector.jsx   # Color swatches
│   │   │   ├── CartDrawer.jsx      # Shopping cart drawer
│   │   │   ├── ReviewStars.jsx     # Rating display
│   │   │   └── LoadingSpinner.jsx  # Loading indicator
│   │   ├── pages/                  # Route pages
│   │   │   ├── HomePage.jsx        # Hero + 10 sections
│   │   │   ├── ShopPage.jsx        # Product collection
│   │   │   ├── ProductPage.jsx     # Product detail (2-column)
│   │   │   ├── CartPage.jsx        # Shopping cart
│   │   │   ├── CheckoutPage.jsx    # Payment & delivery
│   │   │   ├── LoginPage.jsx       # Split-panel auth
│   │   │   ├── RegisterPage.jsx    # Create account
│   │   │   ├── OrderSuccessPage.jsx # Order confirmation
│   │   │   ├── AccountPage.jsx     # User profile
│   │   │   └── admin/              # Admin routes
│   │   ├── store/                  # Zustand state management
│   │   │   ├── useAuthStore.js
│   │   │   ├── useCartStore.js
│   │   │   └── useWishlistStore.js
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles & animations
│   │   └── App.css                 # App styles
│   ├── index.html                  # HTML template with fonts
│   ├── tailwind.config.js          # Tailwind configuration (luxury theme)
│   ├── postcss.config.js           # PostCSS setup
│   ├── eslint.config.js            # ESLint rules
│   ├── vite.config.js              # Vite bundler config
│   └── package.json
│
├── server/                         # Express Backend
│   ├── models/                     # Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── controllers/                # Route handlers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── wishlistController.js
│   │   └── adminController.js
│   ├── routes/                     # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── wishlistRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/                 # Custom middleware
│   │   ├── auth.js                 # JWT verification
│   │   ├── error.js                # Error handling
│   │   └── upload.js               # File uploads
│   ├── utils/
│   │   ├── cloudinary.js           # Image cloud storage
│   │   └── generateToken.js        # JWT token generation
│   ├── index.js                    # Server entry point
│   ├── seed.js                     # Database initialization
│   └── package.json
│
├── package.json                    # Root package
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ and **npm** v8+
- **MongoDB** local instance or Atlas cluster
- **Cloudinary** account (for image storage)
- **Stripe** API keys (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KaranMehta11/Velour-Cloth-Store.git
   cd Velour-Cloth-Store
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Configure environment variables**

   **Server** - Create `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/velour
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/velour
   
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=7d
   
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   STRIPE_API_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

   **Client** - Create `client/.env.local`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Seed the database** (optional)
   ```bash
   cd server
   node seed.js
   ```

5. **Start development servers**

   **Terminal 1 - Backend**:
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend**:
   ```bash
   cd client
   npm run dev
   ```

   Backend runs on `http://localhost:5000`  
   Frontend runs on `http://localhost:5173`

---

## 📦 Technology Stack

### Frontend
- **Framework**: React 18.x + Vite
- **UI Library**: Tailwind CSS with custom luxury theme
- **State Management**: Zustand
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Form Validation**: React Hook Form

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Cloudinary
- **Payments**: Stripe API
- **Validation**: express-validator

---

## 🎯 Key Features & Pages

### Homepage (10 Sections)
1. **Hero Section** — Split layout with fashion imagery and philosophy
2. **Announcement Bar** — Scrolling marquee with shipping/collection info
3. **Editorial Collections** — 3 category cards (Men, Women, Accessories)
4. **New Arrivals** — Product grid of latest items
5. **Editorial Banner** — Full-width feature with text overlay
6. **Bestsellers** — Top-selling product grid
7. **Brand Philosophy** — 2-column brand story section
8. **Testimonials** — Customer reviews with 5-star ratings
9. **Press Features** — Brand mentions in media
10. **Newsletter** — Email subscription with gold CTA

### Product Pages
- **Shop** — Filterable collection with minimal luxury sidebar
- **Product Detail** — 55% image gallery, 45% product info
- **Size/Color Selection** — Interactive selectors with gold accents
- **Reviews** — Customer ratings and comments
- **Related Products** — Recommendations based on category

### Purchase Flow
- **Cart** — Clean table layout with order summary
- **Checkout** — Billing, shipping, payment integration
- **Order Confirmation** — Success page with order details

### Authentication
- **Login** — Split-panel design with image + form
- **Register** — Create account with form validation
- **Account Page** — User profile, order history, wishlist

### Admin
- **Dashboard** — Sales analytics and metrics
- **Products** — Create, read, update, delete products
- **Orders** — View and manage customer orders
- **Inventory** — Track product stock levels

---

## 💱 Currency & Pricing

All prices are displayed in **Indian Rupees (₹)** with proper formatting:
- USD prices are multiplied by 83x conversion rate
- Numbers formatted with Indian grouping: ₹1,23,456

Example:
- Product price: $30 (USD) → ₹2,490 (INR)

---

## 🎬 Recent Updates

### Phase 1: Foundation (Complete)
- ✅ Custom Tailwind color palette (luxury-cream, luxury-gold, etc.)
- ✅ Google Fonts: Cormorant Garamond + Jost + EB Garamond
- ✅ Global CSS animations and utility classes

### Phase 2: Components (Complete)
- ✅ Navbar with announcement bar & mobile overlay
- ✅ ProductCard with hover effects and luxury styling
- ✅ Footer with newsletter subscription
- ✅ SizeSelector & ColorSelector components

### Phase 3: Pages (In Progress)
- ✅ HomePage (10 luxury sections)
- ✅ ShopPage (filtered collection with header banner)
- ✅ ProductPage (2-column detail layout)
- ✅ LoginPage (split-panel authentication)
- ⏳ RegisterPage
- ⏳ CartPage & CheckoutPage
- ⏳ OrderSuccessPage & AccountPage

### Phase 4: Admin (Not Started)
- ⏳ Admin Dashboard
- ⏳ Product Management
- ⏳ Order Management

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — User login
- `POST /api/auth/logout` — User logout
- `GET /api/auth/me` — Get user profile

### Products
- `GET /api/products` — Get all products with filters
- `GET /api/products/:id` — Get product details
- `POST /api/products/:id/review` — Add product review

### Cart
- `GET /api/cart` — Get user's cart
- `POST /api/cart/add` — Add item to cart
- `DELETE /api/cart/item/:id` — Remove item from cart
- `PATCH /api/cart/item/:id` — Update item quantity

### Orders
- `GET /api/orders` — Get user's orders
- `POST /api/orders` — Create order
- `GET /api/orders/:id` — Get order details

### Wishlist
- `GET /api/wishlist` — Get user's wishlist
- `POST /api/wishlist/add` — Add to wishlist
- `DELETE /api/wishlist/:id` — Remove from wishlist

---

## 📱 Responsive Design

- **Mobile** (< 768px) — Single column, hamburger menu, full-width sections
- **Tablet** (768px - 1024px) — 2-column grids, optimized padding
- **Desktop** (> 1024px) — 4-column grids, full luxury experience

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change in server/.env or kill existing process
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000 | kill -9 <PID>
```

### Database Connection Error
- Check MongoDB is running: `mongod`
- Verify connection string in `.env`
- Ensure firewall allows MongoDB port (27017)

### Image Upload Issues
- Verify Cloudinary credentials in `.env`
- Check file size limits
- Ensure valid image formats (jpg, png, webp)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Karan Mehta**
- GitHub: [@KaranMehta11](https://github.com/KaranMehta11)
- Project: [Velour Cloth Store](https://github.com/KaranMehta11/Velour-Cloth-Store)

---

## 🙏 Acknowledgments

- Design inspiration: Louis Vuitton, Chanel, Dior
- Typography: Google Fonts
- Icons: React Icons
- State Management: Zustand
- Animations: Framer Motion
- Payment Processing: Stripe

---

**Last Updated**: March 2026  
**Status**: 🟢 Active Development
