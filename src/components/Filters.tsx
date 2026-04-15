import { useState, memo } from 'react';
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

const Filters = memo(({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'trending', label: 'Trending' },
  ];

  const chipClass = (active: boolean) =>
    `px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
      active
        ? 'bg-foreground text-background'
        : 'bg-cream-dark text-muted-foreground hover:text-foreground hover:bg-cream-dark/80'
    }`;

  const filterContent = (
    <div className="space-y-8">
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Category</h4>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onCategoryChange(null)} className={chipClass(!selectedCategory)}>All</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => onCategoryChange(c.id)} className={chipClass(selectedCategory === c.id)}>{c.name}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Sort By</h4>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((o) => (
            <button key={o.value} onClick={() => onSortChange(o.value)} className={chipClass(sortBy === o.value)}>{o.label}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block mb-12">{filterContent}</div>

      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden flex items-center gap-2.5 px-5 py-3.5 bg-cream-dark rounded-xl text-sm font-medium text-foreground mb-8 active:scale-[0.98] transition-transform"
      >
        <SlidersHorizontal size={16} /> Filters
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-charcoal/40 z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 p-8 pb-10 max-h-[75vh] overflow-y-auto md:hidden"
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-8" />
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-xl font-semibold">Filters</h3>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-cream-dark transition-colors">
                  <X size={20} />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Filters.displayName = 'Filters';

export default Filters;
