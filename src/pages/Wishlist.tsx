import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/stores/wishlistStore';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

const Wishlist = () => {
  const { items, removeItem, loadFromStorage } = useWishlistStore();

  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  const shareWishlist = () => {
    const message = items.map((p, i) =>
      `${i + 1}. ${p.name}\n   Price: ₹${p.price.toLocaleString('en-IN')}\n   View: ${window.location.origin}/products/${p.id}`
    ).join('\n\n');
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('✨ My Wishlist from Madhuvan Novelty:\n\n' + message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-28 md:pt-32 pb-32 md:pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold uppercase tracking-[0.25em] text-[11px] font-medium mb-3">Saved Items</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight">Wishlist</h1>
            <p className="text-muted-foreground mt-2 text-sm">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={shareWishlist}
              className="flex items-center gap-2 px-5 py-2.5 bg-gold/8 text-gold rounded-xl text-sm font-medium hover:bg-gold/15 transition-colors duration-200"
            >
              <Share2 size={15} /> Share
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-28"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-cream-dark flex items-center justify-center">
              <Heart size={36} className="text-muted-foreground/30" strokeWidth={1} />
            </div>
            <p className="text-foreground text-xl font-heading font-semibold">Your wishlist is empty</p>
            <p className="text-muted-foreground text-sm mt-3 mb-8">Save your favourite pieces to find them later</p>
            <Link
              to="/products"
              className="inline-block bg-gold-shimmer text-primary-foreground px-10 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-gold-glow hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="flex gap-5 p-5 bg-card rounded-2xl border border-border/60 shadow-soft hover:shadow-elevated transition-shadow duration-300"
                >
                  <Link to={`/products/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-cream-dark">
                    <img
                      src={item.images?.[0] || '/placeholder.svg'}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <Link to={`/products/${item.id}`} className="font-heading text-sm font-semibold text-foreground hover:text-gold transition-colors duration-200 line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">{item.categoryName}</p>
                    <p className="font-heading font-bold text-foreground mt-2 text-base">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2.5 h-fit rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
