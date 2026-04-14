import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category } from '@/api/categoryApi';

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  onCategoryChange: (id: number | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const Filters = ({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'trending', label: 'Trending' },
  ];

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h4 className="font-heading text-sm uppercase tracking-wider text-foreground mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              !selectedCategory ? 'bg-gold text-primary-foreground' : 'bg-cream-dark text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategoryChange(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === c.id ? 'bg-gold text-primary-foreground' : 'bg-cream-dark text-muted-foreground hover:text-foreground'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-heading text-sm uppercase tracking-wider text-foreground mb-3">Sort By</h4>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => onSortChange(o.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                sortBy === o.value ? 'bg-gold text-primary-foreground' : 'bg-cream-dark text-muted-foreground hover:text-foreground'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block mb-8">{filterContent}</div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-cream-dark rounded-lg text-sm font-medium text-foreground mb-4"
      >
        <SlidersHorizontal size={16} /> Filters
      </button>

      {/* Mobile slide-up */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/50 z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 p-6 max-h-[70vh] overflow-y-auto md:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg">Filters</h3>
                <button onClick={() => setMobileOpen(false)}><X size={20} /></button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filters;
