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
    const message = items.map((p) => `${p.name} - ₹${p.price.toLocaleString('en-IN')}`).join('\n');
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('My Wishlist:\n' + message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Wishlist</h1>
            <p className="text-muted-foreground mt-1">{items.length} items saved</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={shareWishlist}
              className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-lg text-sm font-medium hover:bg-gold/20 transition-colors"
            >
              <Share2 size={16} /> Share via WhatsApp
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
            <Link to="/products" className="inline-block mt-4 text-gold text-sm font-medium hover:underline">
              Explore Collection →
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <Link to={`/products/${item.id}`} className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-cream-dark">
                    <img src={item.mainImageUrl || item.images?.[0] || '/placeholder.svg'} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.id}`} className="font-heading text-sm font-semibold text-foreground hover:text-gold transition-colors line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.categoryName}</p>
                    <p className="font-semibold text-foreground mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 h-fit text-muted-foreground hover:text-destructive transition-colors"
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
