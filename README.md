# Verde Fashion - E-Commerce Demo

A modern, elegant clothing e-commerce website built with Next.js, TypeScript, and Tailwind CSS. This is a demo project showcasing a fully functional online shopping experience with a clean, minimalist design featuring a green color theme.

## 🔐 Admin Panel Access

Access the professional admin dashboard:

- **URL**: `http://localhost:3000/admin` or `yoursite.com/admin`
- **Password**: `admin123`

**Admin Features:**
- 📊 Dashboard with analytics and order statistics
- 📦 Product management (40+ products)
- 🛒 Order tracking and management (5 demo orders)
- ⚙️ Settings and configuration
- 🔒 Password-protected access

## Image Workaround

**Note:** This demo uses CSS gradient placeholders instead of external images to ensure the site works perfectly offline or in environments with network restrictions. All product images, hero banners, and category images are generated using beautiful Tailwind CSS gradients with emojis and text overlays.

This approach:
- ✅ Works without any network connectivity
- ✅ Loads instantly (no image fetching)
- ✅ Looks professional and modern
- ✅ Perfect for demos and presentations
- ✅ Can be easily replaced with real images from a CDN when deploying to production

## Features

### Customer-Facing Features
- **Product Catalog**: 40+ products across Women, Men, and Accessories categories
- **Product Filtering**: Filter by size, price range, category, and more
- **Product Sorting**: Sort by price, rating, newest, etc.
- **Shopping Cart**: Full cart management with localStorage persistence
- **Wishlist**: Save favorite items for later
- **Checkout Flow**: Demo checkout process with multiple payment options
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Panel Features ⭐ NEW!
- **Dashboard**: Analytics overview with revenue stats, order metrics, and graphs
- **Product Management**: View all products with search, filtering, and quick actions
- **Order Management**: Track and manage customer orders with detailed views
- **Settings**: Configure store information, notifications, and security
- **Password Protection**: Secure admin access with customizable password
- **Professional UI**: Dark sidebar navigation with intuitive layout

### Design Highlights
- Clean, minimalist UI with ample white space
- Custom green color palette (Verde theme)
- Smooth animations and transitions using Framer Motion
- Interactive product cards with hover effects
- Image galleries on product detail pages
- Professional typography using Inter and Poppins fonts

### Technical Features
- Built with Next.js 16 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Zustand for state management
- Client-side cart/wishlist persistence
- Optimized images from Unsplash
- SEO-friendly structure

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
website/
├── app/                      # Next.js App Router pages
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout flow
│   ├── products/[slug]/     # Product detail pages
│   ├── shop/[category]/     # Category listing pages
│   ├── wishlist/            # Wishlist page
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Header, Footer
│   └── ui/                  # Reusable UI components
├── data/
│   └── products.json        # Product catalog (40 products)
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
├── store/
│   └── useStore.ts          # Zustand store (cart/wishlist)
└── public/                  # Static assets
```

## Pages & Routes

- `/` - Homepage with hero, categories, trending, and new arrivals
- `/shop/[category]` - Product listing with filters (women, men, accessories, sale, new-arrivals)
- `/products/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout flow (demo)
- `/wishlist` - Saved items

## Key Components

### UI Components
- `Button` - Customizable button with variants (primary, secondary, outline, ghost)
- `Card` - Container component with shadow and hover effects
- `Input` - Form input with label and error states
- `Badge` - Notification badge for cart/wishlist counts
- `ProductCard` - Product display card with quick add and wishlist

### Layout Components
- `Header` - Sticky header with navigation, search, cart, and wishlist
- `Footer` - Site footer with links, newsletter, and social media

## Deployment to Vercel

### One-Click Deploy

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Verde Fashion e-commerce demo"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Vercel will automatically detect Next.js and configure the build settings

5. Click "Deploy" and wait for the deployment to complete

6. Your site will be live at `https://your-project-name.vercel.app`

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

No environment variables are required for this demo. All data is stored in JSON files and localStorage.

## Design System

### Colors
- **Primary Green**: `#2D5016` (dark forest green)
- **Medium Green**: `#4A7C2C`
- **Accent Green**: `#6BAE46` (bright green for CTAs)
- **Background**: `#FFFFFF` (white)
- **Text**: `#1A1A1A` (near black)

### Typography
- **Headings**: Poppins
- **Body**: Inter
- **Font Sizes**: 14px (small), 16px (base), 24-40px (headings)

### Spacing
- Base unit: 8px
- Standard padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Section spacing: 48-64px

## Features Demo

### Shopping Flow
1. Browse products on homepage or category pages
2. Filter and sort products
3. View product details with image gallery
4. Select size and color
5. Add to cart or wishlist
6. Proceed to checkout
7. Complete demo payment flow

### Demo Discount Code
Use code `VERDE10` at checkout for 10% off!

## Performance

- Lighthouse Score: 90+ (target)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Images optimized with Next.js Image component
- Lazy loading for product images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential features for a production version:
- User authentication and accounts
- Real payment processing (Stripe/Razorpay)
- Order tracking system
- Customer reviews submission
- Admin panel/CMS
- Email notifications
- Product search with autocomplete
- Multi-language support
- Advanced analytics

## License

This is a demo project. Feel free to use it for learning or as a template for your own projects.

## Credits

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Lucide Icons](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

## Contact

For questions or demo requests, please contact via the website.

---

Built with ❤️ using Next.js and Tailwind CSS
