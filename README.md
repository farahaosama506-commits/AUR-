# 🛍️ AURÉ — Full-Stack E-Commerce Fashion Store

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?logo=stripe)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A modern, production-ready online fashion store with admin dashboard.**

[Live Demo](https://aur-olc.vercel.app) · [Report Bug](https://github.com/farahaosama506-commits/AUR-/issues)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Performance](#-performance)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Stats](#-stats)
- [License](#-license)

---

## ✨ Features

### 🛍️ Store Front

| Feature | Description |
|---------|-------------|
| Product Browsing | 6 categories (Men, Women, Lingerie, Zara, Nike, Dom Hill) |
| Category Pages | Image overlays with smooth navigation |
| Product Detail | Image gallery, quantity selector, add-to-cart |
| Search | Full-text product search |
| Newsletter | Email subscription |

### 🔐 Authentication

| Feature | Description |
|---------|-------------|
| Register | With email confirmation |
| Login | Password visibility toggle |
| Forgot Password | OTP code via email (8-digit input) |
| Reset Password | Set new password after verification |
| Logout | Custom confirmation modal |

### 🛒 Cart & Checkout

| Feature | Description |
|---------|-------------|
| Cart State | Zustand + localStorage (auto-persist) |
| Quantity | Increase / decrease |
| Remove Items | Instant UI update |
| Cart Badge | Item count in header |
| Stripe Checkout | Test & live mode ready |

### 📋 Orders

| Feature | Description |
|---------|-------------|
| Order Creation | Auto-created on checkout |
| Status Tracking | Pending → Processing → Shipped → Delivered → Cancelled |
| My Orders | User-specific order history |

### 👑 Admin Dashboard

| Feature | Description |
|---------|-------------|
| Access | `/admin` protected by JWT + middleware |
| Dashboard | Stats (products, users, orders) |
| Products | Full CRUD with image support |
| Users | View, add, delete, change roles |
| Orders | Filter by status, view details, update status |

### 📱 UX

| Feature | Description |
|---------|-------------|
| Responsive | Desktop, tablet, mobile |
| Mobile Menu | Hamburger with smooth navigation |
| User Avatar | Dropdown with My Orders & Logout |
| Notifications | Toast messages for cart actions |
| Error Pages | 404, error boundaries |
| Loading States | Suspense boundaries |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **UI** | React 19 |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | Supabase Auth + JWT |
| **State** | Zustand |
| **Payment** | Stripe |
| **Validation** | Zod |
| **Styling** | CSS Modules |
| **Animation** | CSS Animations + Framer Motion |
| **Security** | bcryptjs, jsonwebtoken |
| **Deployment** | Vercel |

---

## 📸 Screenshots

<details>
<summary>Click to expand</summary>

| Page | Description |
|------|-------------|
| Home | Hero + Featured Products + Newsletter |
| Shop | Category cards + Product grid |
| Product | Image gallery + Details + Add to Cart |
| Cart | Item list + Quantity + Checkout |
| Login | Email/Password with visibility toggle |
| Register | Username/Email/Password with validation |
| Forgot Password | Email input + OTP verification |
| Admin Dashboard | Stats overview |
| Admin Products | CRUD table |
| Admin Users | User management |
| Admin Orders | Order tracking with status |

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or yarn
- **Supabase** account ([free tier](https://supabase.com))
- **Stripe** account ([test mode](https://stripe.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/farahaosama506-commits/AUR-.git
cd AUR-

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=your-64-char-secret

# 4. Run database migrations in Supabase SQL Editor
# (See /scripts/migrations.sql)

# 5. Seed the database
node scripts/seed.js

# 6. Start development server
npm run dev
Open http://localhost:3000

📁 Project Structure
text
AUR-/
├── app/
│   ├── api/                  # API Routes
│   │   ├── auth/             # Register, Login, Forgot Password
│   │   ├── products/         # Product CRUD
│   │   ├── orders/           # Order management
│   │   ├── checkout/         # Stripe integration
│   │   └── admin/            # Admin API endpoints
│   │
│   ├── admin/                # Admin Dashboard
│   │   ├── login/            # Admin login
│   │   └── dashboard/        # Products, Users, Orders
│   │
│   ├── shop/                 # Store front
│   ├── product/[id]/         # Product detail
│   ├── cart/                 # Shopping cart
│   ├── login/ / register/    # Auth pages
│   ├── forgot-password/      # Password recovery
│   ├── reset-password/       # OTP verification
│   ├── my-orders/            # User orders
│   ├── privacy/ / terms/     # Legal pages
│   └── success/              # Payment success
│
├── components/               # Reusable components
│   ├── Header.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── ProductGrid.js
│   └── Newsletter.js
│
├── lib/
│   ├── store/                # Zustand stores (cart, auth)
│   ├── supabase.js           # Supabase client
│   ├── validation.js         # Zod schemas
│   ├── rate-limit.js         # Rate limiting
│   └── utils/                # Helper functions
│
├── middleware.js              # Route protection
├── next.config.mjs           # Next.js configuration
└── package.json
🔒 Security
Layer	Implementation
Input Validation	Zod schemas on all API routes
Rate Limiting	3 req/min (register), 5 req/min (login)
Security Headers	X-Frame-Options, X-Content-Type-Options, HSTS
Database	RLS (Row Level Security) policies
Authentication	JWT with 24-hour expiry
Passwords	bcrypt + pepper hashing
Email	Confirmation required before login
Admin Routes	404 response for unauthorized access
⚡ Performance
Optimization	Description
Server Components	Product data fetched on server (no useEffect)
Dynamic Imports	Header, Footer loaded on demand
SSG	Static generation for product pages
Image Optimization	next/image with sizes & quality=75
Suspense	Loading boundaries for async content
Lazy Loading	Below-fold images deferred
CSS Modules	Scoped styles, no runtime cost
🧪 Testing
Stripe Test Card
text
Card Number: 4242 4242 4242 4242
Expiry:     Any future date (e.g., 12/28)
CVC:        Any 3 digits (e.g., 123)
Admin Access
Register at /register

Update role in Supabase:

sql
UPDATE auth.users 
SET raw_user_meta_data = '{"role":"admin"}'::jsonb 
WHERE email = 'your-email@example.com';
Login at /admin/login

🚀 Deployment
Live Demo: aur-olc.vercel.app

Deployed on Vercel with automatic CI/CD from GitHub.

📊 Stats
Metric	Value
Lines of Code	~18,000
Files	~100
API Routes	12
Pages	20+
Components	15+
Product Categories	6
📄 License
This project is licensed under the MIT License.

🤝 Connect
GitHub: @farahaosama506-commits

<div align="center">
Built with ❤️ using Next.js & Supabase

⭐ Star this repo if you find it useful!

</div> ```
