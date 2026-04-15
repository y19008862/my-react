import { lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { productApi } from '@/api/productApi';
import { categoryApi } from '@/api/categoryApi';
import { Shield, Truck, RotateCcw, Gem } from 'lucide-react';

const CategoryCard = lazy(() => import('@/components/CategoryCard'));
const ProductCard = lazy(() => import('@/components/ProductCard'));

const testimonials = [
  { name: 'Priya Sharma', text: 'Absolutely stunning pieces! The quality is unbelievable for the price.', rating: 5 },
  { name: 'Anita Patel', text: 'My go-to store for all occasions. Every piece looks so premium!', rating: 5 },
  { name: 'Meera Joshi', text: 'Got so many compliments on the necklace set. Will definitely order more!', rating: 5 },
];

const trustItems = [
  { icon: Gem, title: 'Premium Quality', desc: 'Handcrafted with finest materials' },
  { icon: Truck, title: 'Fast Shipping', desc: 'Pan-India delivery in 3-5 days' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day hassle-free returns' },
  { icon: Shield, title: 'Secure Shopping', desc: '100% safe & secure checkout' },
];

const sectionHeader = (subtitle: string, title: string) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-14"
  >
    <p className="text-gold uppercase tracking-[0.25em] text-xs font-body font-medium mb-3">{subtitle}</p>
    <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
  </motion.div>
);

const Home = () => {
  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll().then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const { data: newArrivals = [], isLoading: newLoading } = useQuery({
    queryKey: ['products', 'newest'],
    queryFn: () => productApi.getAll({ sort: 'newest', page: 1, pageSize: 8 }).then(r => r.data.products),
    staleTime: 5 * 60 * 1000,
  });

  const { data: trending = [], isLoading: trendLoading } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: () => productApi.getAll({ sort: 'trending', page: 1, pageSize: 8 }).then(r => r.data.products),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="pb-20 md:pb-0">
      <HeroSection />

      {/* Categories */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {sectionHeader('Browse', 'Our Collections')}
          <Suspense fallback={<LoaderSkeleton count={4} />}>
            {catLoading ? (
              <LoaderSkeleton count={4} />
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                {categories.slice(0, 4).map((c) => (
                  <CategoryCard key={c.id} category={c} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Connect your API to see categories</p>
            )}
          </Suspense>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          {sectionHeader('Just In', 'New Arrivals')}
          <Suspense fallback={<LoaderSkeleton count={4} />}>
            {newLoading ? (
              <LoaderSkeleton count={4} />
            ) : newArrivals.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Connect your API to see products</p>
            )}
          </Suspense>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {sectionHeader('Popular', 'Trending Now')}
          <Suspense fallback={<LoaderSkeleton count={4} />}>
            {trendLoading ? (
              <LoaderSkeleton count={4} />
            ) : trending.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                {trending.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Connect your API to see trending products</p>
            )}
          </Suspense>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-cream-dark">
        <div className="container mx-auto px-4">
          {sectionHeader('Testimonials', 'What Our Customers Say')}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-10 rounded-2xl shadow-sm"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">"{t.text}"</p>
                <p className="font-heading font-semibold text-foreground text-lg">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {trustItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <item.icon size={24} className="text-gold" />
                </div>
                <h4 className="font-heading text-sm font-semibold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
