# Velour — Ultra-Luxury Cloth Store
*Premium digital shopping experience for discerning customers*

---

## 📱 Project Overview

**Velour** is a full-stack e-commerce platform designed with ultra-luxury aesthetic principles. Every interaction, from the typography to the spacing, reflects premium brand positioning. The platform features a sophisticated split-panel authentication system, intuitive product exploration, seamless checkout flow, and comprehensive account management.

**Live Repository**: [github.com/KaranMehta11/Velour-Cloth-Store](https://github.com/KaranMehta11/Velour-Cloth-Store)

---

## 🎨 Design System

### Color Palette
```
Primary Colors:
  • Cream (#F5F0E8)         — Background, luxury elegance
  • Gold (#B8963E)          — Accents, CTAs, premium feel
  • Black (#0A0A0A)         — Primary text, structure
  • Charcoal (#1C1C1C)      — Secondary backgrounds, depth
  • White (#FFFFFF)         — Cards, contrast

Neutral Colors:
  • Muted (#6B6560)         — Secondary text, labels
  • Border (#E8E3DE)        — Dividers, subtle separation
  • Light Gold (#C9A96E)    — Gold hover states
```

CSS variables defined in `client/src/index.css`:
```css
:root {
  --color-cream: #F5F0E8;
  --color-gold: #B8963E;
  --color-black: #0A0A0A;
  --color-charcoal: #1C1C1C;
  --color-white: #FFFFFF;
  --color-muted: #6B6560;
  --color-border: #E8E3DE;
  --color-gold-light: #C9A96E;
}
```

### Typography

**Headings** — Cormorant Garamond (serif)
- Ultra-light 300 weight for premium elegance
- Sizes: 5xl (48px), 4xl (36px), 3xl (30px), 2xl (24px)
- Large-cap feel, perfect for fashion retail

**UI / Body** — Jost* (sans-serif)
- Weights: 200 (light), 300 (normal), 400 (medium)
- Uppercase labels with letter-spacing: 0.1em–0.2em
- Clean, modern, high-readability

**Accents** — EB Garamond (serif)
- Italic styling for quotes and testimonials
- Creates visual hierarchy vs. Cormorant

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700&family=Jost:ital,wght@0,200;0,300;0,400&family=EB+Garamond:ital@0;1&display=swap');

.font-garamond-serif { font-family: 'Cormorant Garamond', serif; }
.font-sans { font-family: 'Jost', sans-serif; }
.font-garamond-italic { font-family: 'EB Garamond', serif; font-style: italic; }
```

### Design Principles

| Principle | Implementation |
|-----------|-----------------|
| **Sharp Corners** | `rounded-none` throughout — no curves, luxury minimalism |
| **Massive Whitespace** | `py-20`, `py-24`, `py-32` — generous breathing room |
| **Bottom-Border Inputs** | Transparent backgrounds, 1px border-bottom, 2px on focus, floating labels |
| **Floating Labels** | Labels change from `var(--color-muted)` to `var(--color-gold)` on input focus |
| **No Transforms** | Buttons don't scale; color/opacity changes only |
| **Gold Accents** | Buttons, hover states, active elements — consistent decision-making color |
| **Responsive Typography** | Garamond headings scale: mobile sm → desktop 5xl |
| **Strategic Imagery** | Full-height images in auth pages (70% dark overlay) |

### Layout Patterns

**Max-Width Consistency**
- Main container: `max-w-6xl` (1152px), centered with `mx-auto`
- Modals/forms: `max-w-sm` (384px)
- Ensures content doesn't stretch excessively on large screens

**Grid System**
- Mobile-first responsive design
- `md:` breakpoint for medium screens
- Example: `grid md:grid-cols-2` (1 col mobile, 2 col tablet+)

**Spacing Standard**
- Gap: `gap-12` (48px between elements)
- Padding: `p-8` (32px cards), `px-6` (24px horizontal)
- Vertical: `py-20` (80px sections), `mb-12` (48px blocks)

---

## ✨ Features

### User Authentication
- **Split-panel design**: Image on left, form on right
- **Login Page**: Email/password, "Remember me", password reset link
- **Register Page**: Full name, email, password confirmation
- **Floating labels**: Cream background turns to gold on input focus
- **Bottom-border inputs**: Luxury hotel aesthetic
- **Secure tokenization**: JWT stored in localStorage, refreshed on login

### Product Showcase
- **Home Page** (10 sections):
  1. Hero banner with luxury background
  2. Featured collections carousel
  3. Best sellers grid
  4. New arrivals
  5. Testimonials gallery
  6. Size & care guide
  7. Styling tips carousel
  8. Newsletter signup
  9. Social proof
  10. Footer with links
- **Typography**: Garamond serif for headlines, Jost sans for body

- **Shop Page**:
  - Header with category filters
  - Sidebar filters: Price range ($0–$500+), Size, Color, Material
  - Product grid (3-4 columns responsive)
  - Live filtering without page reload

- **Product Detail Page** (2-column layout):
  - Left: Product gallery (main image + thumbnails)
  - Right: 
    * Price in INR (₹ symbol, Indian number formatting: ₹12,345)
    * Star rating with review count
    * Detailed description (care instructions, material)
    * Size selector dropdown
    * Color picker (circular color swatches)
    * Quantity picker (−/+ buttons)
    * "ADD TO CART" & "SAVE TO WISHLIST" buttons
    * Reviews section (expandable)

### Shopping Cart
- **Table layout** with columns:
  | Product | Price | Quantity | Total | Delete |
  - Product images (16×20 thumbnail)
  - Inline quantity controls (− + buttons)
  - Delete with gold hover state

- **Order Summary** (sticky sidebar):
  - Subtotal, Shipping (FREE if >₹8,299), Tax (8%)
  - **TOTAL** in large gold text
  - Promo code input (bottom-border-only)
  - "PROCEED TO CHECKOUT" button

- **Empty State**: Large shopping bag icon, centered messaging, "CONTINUE SHOPPING" CTA

### Multi-Step Checkout
- **Progress Indicator**: Circles (1 → ✓) with connecting gold lines
  1. Shipping Information
  2. Payment Details
  3. Confirm Order

- **Step 1 (Shipping)**:
  - Full Name, Email, Phone
  - Address, Apartment (optional), City, State, Postal Code, Country
  - All inputs: floating labels, bottom-border style

- **Step 2 (Payment)**:
  - Charcoal info box with demo card (4242 4242 4242 4242)
  - Card Number, Expiry Date, CVV, Cardholder Name
  - "BACK" (border style) & "PLACE ORDER" buttons

- **Order Summary** sidebar tracks items, quantities, totals throughout

### Order Confirmation
- **Animated checkmark**: SVG pathLength animation (0→1 over 0.8s)
- Order number displayed in charcoal box
- Delivery estimate: 3–5 Business Days
- Tracking link via email notification
- CTAs: "TRACK ORDER" (gold) & "CONTINUE SHOPPING" (border hover fill)

### Account Management
- **Sidebar Profile Card**:
  - Gold circle avatar with white initials
  - User name, email, admin badge if applicable

- **Tab Navigation** (gold underline active):
  1. **My Orders** → Luxury table showing Order ID, Date, Total, Status, Action
     - Click "VIEW DETAILS" to expand order items, shipping address
     - Expandable animation with Framer Motion
  2. **Wishlist** → 4-column product grid (ProductCard components)
  3. **Profile Settings** → Form to update name, email, password
     - Bottom-border inputs with floating labels
     - "SAVE CHANGES" button

### Admin Dashboard
- **Admin Layout**: Sidebar navigation, responsive
- **Products Management**: Add, edit, delete products with image upload (Cloudinary)
- **Orders Management**: View all orders, filter by status, update shipping
- **Admin-only routes**: Protected by role-based access control

---

## 🏗️ Project Structure

```
Velour/
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx                  # Main router setup
│   │   ├── App.css                  # Global styles (fallback)
│   │   ├── index.css                # CSS variables, Tailwind import
│   │   ├── main.jsx                 # React DOM render
│   │   ├── api/
│   │   │   └── axios.js             # Axios instance with auth interceptor
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Badge.jsx            # Order status badge
│   │   │   ├── CartDrawer.jsx       # Mobile cart sidebar
│   │   │   ├── ColorSelector.jsx    # Color picker with circular swatches
│   │   │   ├── EmptyState.jsx       # Placeholder for empty collections
│   │   │   ├── Footer.jsx           # Luxury footer with links
│   │   │   ├── LoadingSpinner.jsx   # Animated loader
│   │   │   ├── Navbar.jsx           # Top navigation (search, cart, account)
│   │   │   ├── ProductCard.jsx      # Product grid item
│   │   │   ├── ReviewStars.jsx      # Star rating display
│   │   │   └── SizeSelector.jsx     # Size dropdown
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx         # 10-section hero page
│   │   │   ├── ShopPage.jsx         # Category + filters + product grid
│   │   │   ├── ProductPage.jsx      # Detail view (2-column)
│   │   │   ├── CartPage.jsx         # Table layout, order summary
│   │   │   ├── CheckoutPage.jsx     # 3-step form wizard
│   │   │   ├── OrderSuccessPage.jsx # Confirmation + animation
│   │   │   ├── LoginPage.jsx        # Split-panel authentication
│   │   │   ├── RegisterPage.jsx     # Account creation
│   │   │   ├── AccountPage.jsx      # User dashboard (orders, wishlist, profile)
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx  # Admin sidebar + outlet
│   │   │       ├── AdminProducts.jsx # CRUD product management
│   │   │       ├── AdminOrders.jsx  # Order fulfillment view
│   │   │       └── AdminDashboard.jsx # Admin analytics
│   │   └── store/                   # Zustand state management
│   │       ├── useAuthStore.js      # Login, logout, user state
│   │       ├── useCartStore.js      # Cart items, quantity management
│   │       └── useWishlistStore.js  # Wishlist CRUD
│   ├── public/                      # Static assets
│   ├── vite.config.js              # Vite bundler config
│   ├── tailwind.config.js          # Tailwind CSS framework config
│   ├── postcss.config.js           # PostCSS for Tailwind
│   ├── eslint.config.js            # Linting rules
│   └── package.json                # Frontend dependencies

├── server/                          # Node.js + Express backend
│   ├── index.js                     # Entry point, middleware setup
│   ├── seed.js                      # Database seeder (sample products/users)
│   ├── controllers/                 # Business logic handlers
│   │   ├── authController.js        # Login, register, JWT generation
│   │   ├── productController.js     # CRUD operations for products
│   │   ├── cartController.js        # Add, remove, update cart
│   │   ├── wishlistController.js    # Add, remove wishlist items
│   │   ├── orderController.js       # Create, fetch, update orders
│   │   ├── paymentController.js     # Stripe/payment gateway integration
│   │   └── adminController.js       # Admin stats, order management
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                  # JWT verification, role check
│   │   ├── error.js                 # Global error handler
│   │   └── upload.js                # Multer file upload middleware
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js                  # User profile, auth fields
│   │   ├── Product.js               # Product details, inventory
│   │   ├── Cart.js                  # Shopping cart (user's cart items)
│   │   └── Order.js                 # Order history, payment status
│   ├── routes/                      # API endpoint definitions
│   │   ├── authRoutes.js            # POST /login, /register
│   │   ├── productRoutes.js         # GET /products, /products/:id
│   │   ├── cartRoutes.js            # GET/POST/DELETE /cart
│   │   ├── wishlistRoutes.js        # GET/POST/DELETE /wishlist
│   │   ├── orderRoutes.js           # POST /orders, GET /orders/:id
│   │   ├── paymentRoutes.js         # POST /payment/process
│   │   └── adminRoutes.js           # Admin-only endpoints
│   ├── utils/                       # Helper functions
│   │   ├── cloudinary.js            # Image upload service
│   │   └── generateToken.js         # JWT creation
│   └── package.json                 # Backend dependencies

├── package.json                     # Workspace root package.json
└── README.md                        # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI library
- **Vite** — Fast module bundler
- **Tailwind CSS** — Utility-first styling framework
- **Framer Motion** — Animation library (SVG pathLength, transitions)
- **Zustand** — Lightweight state management (Zustand stores)
- **Axios** — HTTP client with interceptors for JWT
- **React Router v6** — Client-side routing
- **React Hot Toast** — Toast notifications
- **Lucide React** — Icon components

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — Document database
- **Mongoose** — ODM for MongoDB
- **JWT (jsonwebtoken)** — Authentication tokens
- **Bcryptjs** — Password hashing
- **Multer** — File upload handling
- **Cloudinary** — Image hosting & CDN
- **Stripe** — Payment processing
- **CORS** — Cross-origin middleware
- **dotenv** — Environment variables
- **Nodemon** — Development auto-reload

### Database Models
```javascript
User {
  _id, 
  name, 
  email, 
  password (hashed), 
  role, 
  avatar, 
  createdAt
}

Product {
  _id, 
  name, 
  description, 
  price, 
  category, 
  images, 
  sizes, 
  colors, 
  stock, 
  rating, 
  reviews, 
  createdAt
}

Cart {
  _id, 
  user, 
  items: [{product, qty, size, color}], 
  totalPrice, 
  updatedAt
}

Order {
  _id, 
  user, 
  orderItems: [{product, qty, size, color, price}], 
  shippingAddress, 
  paymentMethod, 
  totalPrice, 
  status, 
  createdAt
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 16.x
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/KaranMehta11/Velour-Cloth-Store.git
cd Velour
```

#### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

#### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

#### 4. Configure Environment Variables

**Backend** (`.env` at `server/` root):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/velour
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
PORT=5000
```

**Frontend** (`.env` at `client/` root):
```env
VITE_API_URL=http://localhost:5000/api
```

#### 5. Seed Database (Optional)
```bash
cd server
npm run seed
```

### Running the Project

#### Development Mode (Both servers)

**Terminal 1 — Backend**:
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend**:
```bash
cd client
npm run dev
# Runs on http://localhost:5173 (Vite default)
```

#### Production Build

**Frontend**:
```bash
cd client
npm run build
# Output: client/dist/
```

**Backend**: Ready to deploy with `npm start`

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | User login, returns JWT |
| POST | `/api/auth/logout` | Clear session |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products (with filters) |
| GET | `/api/products/:id` | Fetch single product details |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:itemId` | Update cart item qty |
| DELETE | `/api/cart/:itemId` | Remove from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/my-orders` | Fetch user's orders |
| GET | `/api/orders/:id` | Fetch order details |
| PUT | `/api/orders/:id` | Update order status (admin) |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Fetch user's wishlist |
| POST | `/api/wishlist` | Add to wishlist |
| DELETE | `/api/wishlist/:productId` | Remove from wishlist |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard statistics |
| GET | `/api/admin/orders` | All orders (admin view) |
| PUT | `/api/admin/orders/:id` | Update order status |

---

## 💳 Payment Integration

**Stripe** integration for secure payments:
- Test card: `4242 4242 4242 4242` (any future expiry, any CVV)
- Payment form pre-filled with demo info in checkout
- Real Stripe API call on production
- Invoice generation and email receipt

---

## 🎯 Page Completion Status

| Page | Status | Design | Features |
|------|--------|--------|----------|
| Home Page | ✅ COMPLETE | Luxury hero, 10 sections | Banner, collections, testimonials, newsletter |
| Shop Page | ✅ COMPLETE | Filter sidebar, grid | Product search, category filter, live filtering |
| Product Page | ✅ COMPLETE | 2-column detail | Gallery, specs, reviews, size/color selector |
| Cart Page | ✅ COMPLETE | Table layout, summary | Item management, promo code, order summary |
| Checkout Page | ✅ COMPLETE | Multi-step wizard | Shipping form, payment step, order confirm |
| Order Success Page | ✅ COMPLETE | Celebration design | Animated checkmark, order number, CTAs |
| Login Page | ✅ COMPLETE | Split-panel auth | Email/password, remember me, recovery |
| Register Page | ✅ COMPLETE | Split-panel form | Full name, email, password, terms |
| Account Page | ✅ COMPLETE | Sidebar + tabs | My Orders table, Wishlist grid, Profile form |
| Admin Dashboard | ✅ COMPLETE | Admin layout | Products CRUD, Orders mgmt |
| Components | ✅ COMPLETE | Modular design | Navbar, Badge, ProductCard, Footer, etc. |

---

## 🎨 Color Guide Reference

For quick color lookups while developing:

```
Primary (Luxury):
  --color-cream:      #F5F0E8  (Off-white, warm elegant background)
  --color-gold:       #B8963E  (Premium accent, decision-making element)
  --color-black:      #0A0A0A  (Deep black, primary text)

Secondary (Functional):
  --color-charcoal:   #1C1C1C  (Dark background for information boxes)
  --color-white:      #FFFFFF  (Card backgrounds, stark contrast)
  --color-muted:      #6B6560  (Secondary text, labels - less prominent)

Edges (Subtle):
  --color-border:     #E8E3DE  (Dividers, subtle separation)
  --color-gold-light: #C9A96E  (Hover states, lighter accent)
```

---

## 📝 Contributing

1. **Branch Naming**: `feature/feature-name` or `fix/bug-name`
2. **Commit Messages**: Detailed, past tense: `"style: redesigned product card with new spacing"`
3. **Code Style**: 
   - Use Tailwind utility classes
   - Organize components by feature
   - Comment complex logic
4. **Testing**: 
   - Test locally before pushing
   - Verify responsive design (mobile, tablet, desktop)

---

## 🔒 Security Considerations

- ✅ Passwords hashed with bcryptjs (salt rounds: 10+)
- ✅ JWT stored in localStorage (httpOnly for production)
- ✅ Auth middleware protects admin routes
- ✅ Environment variables for sensitive keys
- ✅ CORS configured to allow frontend origin only
- ✅ Stripe integration handles PCI compliance

---

## 📧 Contact & Support

- **Repository**: [github.com/KaranMehta11/Velour-Cloth-Store](https://github.com/KaranMehta11/Velour-Cloth-Store)
- **Issues**: Open an issue on GitHub for bugs/feature requests
- **Developer**: Karan Mehta

---

## 📄 License

This project is proprietary. All rights reserved © 2024 Velour.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Luxury fashion e-commerce (The Row, Fear of God, Brunello Cucinelli)
- **Typography**: Cormorant Garamond, Jost, EB Garamond Google Fonts
- **Frameworks**: React, Express, MongoDB, Tailwind CSS community
- **Hosting**: Cloudinary for image management
- **Payments**: Stripe for secure transactions

---

**Last Updated**: [Final Redesign Phase Completed — All Pages Luxury-Optimized]
