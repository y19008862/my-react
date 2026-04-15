import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-jewelry.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury jewelry collection"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream/85 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gold uppercase tracking-[0.35em] text-xs font-body font-medium mb-8"
        >
          Exquisite Imitation Jewelry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1]"
        >
          Elegance You{' '}
          <span className="text-gold-gradient italic">Deserve</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-muted-foreground text-lg md:text-xl font-body max-w-lg mx-auto leading-relaxed"
        >
          Discover our curated collection of premium imitation jewelry — crafted to perfection, priced for everyone.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/products"
            className="bg-gold-shimmer text-primary-foreground px-10 py-4 rounded-xl font-body font-semibold text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-gold/25 transition-all active:scale-[0.98]"
          >
            Explore Collection
          </Link>
          <Link
            to="/contact"
            className="border-2 border-foreground/15 text-foreground px-10 py-4 rounded-xl font-body font-medium text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
