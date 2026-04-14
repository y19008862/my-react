import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { productApi, type Product } from '@/api/productApi';
import { categoryApi, type Category } from '@/api/categoryApi';
import { Shield, Truck, RotateCcw, Gem } from 'lucide-react';

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

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, newRes, trendRes] = await Promise.all([
          categoryApi.getAll(),
          productApi.getAll({ sort: 'newest', page: 1, pageSize: 8 }),
          productApi.getAll({ sort: 'trending', page: 1, pageSize: 8 }),
        ]);
        setCategories(catRes.data);
        setNewArrivals(newRes.data.products);
        setTrending(trendRes.data.products);
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="pb-20 md:pb-0">
      <HeroSection />

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-body font-medium mb-2">Browse</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Collections</h2>
          </motion.div>
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.slice(0, 4).map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          ) : !loading ? (
            <p className="text-center text-muted-foreground">Connect your API to see categories</p>
          ) : (
            <LoaderSkeleton count={4} />
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-body font-medium mb-2">Just In</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">New Arrivals</h2>
          </motion.div>
          {loading ? (
            <LoaderSkeleton count={4} />
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Connect your API to see products</p>
          )}
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-body font-medium mb-2">Popular</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Trending Now</h2>
          </motion.div>
          {loading ? (
            <LoaderSkeleton count={4} />
          ) : trending.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {trending.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Connect your API to see trending products</p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-body font-medium mb-2">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                  <item.icon size={22} className="text-gold" />
                </div>
                <h4 className="font-heading text-sm font-semibold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
