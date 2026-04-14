import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-dark">
      {/* Subtle gold decorative element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gold uppercase tracking-[0.3em] text-xs font-body font-medium mb-6"
        >
          Exquisite Imitation Jewelry
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
        >
          Elegance You{' '}
          <span className="text-gold-gradient italic">Deserve</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-muted-foreground text-lg font-body max-w-lg mx-auto"
        >
          Discover our curated collection of premium imitation jewelry — crafted to perfection, priced for everyone.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/products"
            className="bg-gold-shimmer text-primary-foreground px-8 py-3.5 rounded-lg font-body font-semibold text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            Explore Collection
          </Link>
          <Link
            to="/contact"
            className="border border-foreground/20 text-foreground px-8 py-3.5 rounded-lg font-body font-medium text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
