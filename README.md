# WebNoble - Premium Digital Agency Website

A high-converting, premium agency website built with Next.js, featuring a dark theme with electric violet accents, 3D elements, and conversion-focused design.

## Features

- **Dark Mode Design**: Near-black background (#0A0A0A) with electric violet (#7C5CFF) accents
- **3D Elements**: Animated floating crystal using CSS 3D transforms
- **Responsive Design**: Fully responsive for desktop and mobile
- **Authentication**: Email/password auth with Google OAuth scaffolding
- **Dashboard**: Client dashboard to track project/order status
- **Contact Form**: Lead capture form stored in MongoDB
- **Stripe Integration**: Payment checkout scaffolding (ready for activation)

## Sections

1. **Navbar**: Sticky, shrinks on scroll, mobile hamburger menu
2. **Hero**: Bold headline, floating 3D crystal, CTA buttons
3. **Services**: 4 glassy cards with 3D icons
4. **Process**: 4-step workflow visualization
5. **Work**: Project portfolio with hover effects
6. **Stats**: Animated counters
7. **Testimonials**: Client reviews grid
8. **Pricing**: 3-tier pricing with "Contact for Pricing"
9. **About**: Founder/agency story
10. **FAQ**: Accordion-style questions
11. **Contact**: Lead capture form + WhatsApp/Phone buttons
12. **Footer**: Links, newsletter signup, contact info

## Quick Start

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## Environment Variables

Create/edit `.env` file:

```env
# Database
MONGO_URL=mongodb://localhost:27017
DB_NAME=webnoble

# App URL (for Stripe redirects)
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Stripe Integration (Replace with your keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

# Stripe Price IDs (Create in Stripe Dashboard)
STRIPE_PRICE_LANDING_PAGE=price_xxx
STRIPE_PRICE_GROWTH_WEBSITE=price_xxx
STRIPE_PRICE_SCALE_PARTNER=price_xxx

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## Setting Up Stripe

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from Dashboard > Developers > API Keys
3. Create products and prices in Dashboard > Products
4. Add the price IDs to your `.env` file
5. Set up webhooks for `checkout.session.completed` event

## Editing Content

All editable content is in `/app/app/page.js` at the top:

- `SITE_CONFIG`: Phone, email, WhatsApp links
- `SERVICES`: Service cards content
- `PROCESS_STEPS`: Process timeline
- `PROJECTS`: Portfolio items
- `STATS`: Counter values
- `TESTIMONIALS`: Client reviews
- `PRICING`: Pricing tiers and features
- `FAQS`: FAQ questions and answers
- `CLIENT_LOGOS`: Logo marquee names

## Contact Information

- **Phone**: +91 9064721352
- **WhatsApp**: wa.me/919064721352
- **Email**: hello@webnoble.com

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/logout` | POST | User logout |
| `/api/leads` | POST | Submit contact form |
| `/api/newsletter` | POST | Newsletter signup |
| `/api/orders` | GET/POST | Manage orders |
| `/api/user/orders` | GET | Get user's orders |
| `/api/user/profile` | GET | Get user profile |
| `/api/webhooks/stripe` | POST | Stripe webhook handler |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Database**: MongoDB
- **Icons**: Lucide React
- **Payments**: Stripe (scaffolded)

## License

Private - WebNoble Digital Studio
