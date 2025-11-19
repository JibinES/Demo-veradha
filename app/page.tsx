import Link from 'next/link'
import { ArrowRight, Truck, RotateCcw, Shield, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/ui/ProductCard'
import products from '@/data/products.json'

const heroSlides = [
  {
    title: 'Spring Collection 2024',
    subtitle: 'Embrace the season with fresh, elegant styles',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    cta: 'Shop Now',
    href: '/shop/new-arrivals',
  },
  {
    title: 'Sustainable Fashion',
    subtitle: 'Eco-friendly pieces that make a difference',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    cta: 'Discover More',
    href: '/sustainability',
  },
]

const categories = [
  {
    name: 'Women',
    gradient: 'from-pink-400 to-purple-600',
    icon: '👗',
    href: '/shop/women',
  },
  {
    name: 'Men',
    gradient: 'from-blue-400 to-indigo-600',
    icon: '👔',
    href: '/shop/men',
  },
  {
    name: 'Accessories',
    gradient: 'from-green-400 to-teal-600',
    icon: '👜',
    href: '/shop/accessories',
  },
  {
    name: 'Sale',
    gradient: 'from-orange-400 to-red-600',
    icon: '🏷️',
    href: '/shop/sale',
    highlight: true,
  },
]

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over ₹999',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Easy returns & exchanges',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure transactions',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Carefully curated products',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'Absolutely love the quality and fit! The fabrics are so soft and comfortable. Will definitely shop again.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    text: 'Great selection and amazing customer service. Delivery was fast and packaging was perfect.',
    rating: 5,
  },
  {
    name: 'Ananya Patel',
    text: 'Best online shopping experience! The clothes look even better in person. Highly recommended!',
    rating: 5,
  },
]

export default function HomePage() {
  const newArrivals = products.slice(0, 8)
  const trending = products.filter(p => p.rating >= 4.7).slice(0, 8)
  const saleProducts = products.filter(p => p.salePrice).slice(0, 8)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-verde-600 via-verde-500 to-verde-400">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-xl text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                {heroSlides[0].title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                {heroSlides[0].subtitle}
              </p>
              <Link href={heroSlides[0].href}>
                <Button size="lg" variant="primary">
                  {heroSlides[0].cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-verde-50 text-verde-600 mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <div className={`relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br ${category.gradient} transition-transform duration-300 group-hover:scale-105`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="text-6xl mb-4">{category.icon}</div>
                    <h3 className={`text-2xl font-display font-bold ${
                      category.highlight ? 'text-yellow-300' : 'text-white'
                    }`}>
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Trending Now
            </h2>
            <Link href="/shop" className="text-verde-600 hover:text-verde-700 font-medium flex items-center">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              New Arrivals
            </h2>
            <Link href="/shop/new-arrivals" className="text-verde-600 hover:text-verde-700 font-medium flex items-center">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-verde-600 text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Special Offers
              </h2>
              <p className="text-xl text-verde-50">
                Don't miss out on our exclusive deals
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex text-yellow-400 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
