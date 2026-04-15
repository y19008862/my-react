import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/api/productApi';
import { useWishlistStore } from '@/stores/wishlistStore';

interface Props {
  product: Product;
}

const ProductCard = memo(({ product }: Props) => {
  const [hovered, setHovered] = useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const mainImage = product.images?.[0] || '/placeholder.svg';
  const hoverImage = product.images?.[1] || mainImage;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) removeItem(product.id);
    else addItem(product);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice!) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark shadow-sm hover:shadow-xl hover:shadow-charcoal/5 transition-shadow duration-500"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Main image */}
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {/* Hover image */}
          <img
            src={hoverImage}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-charcoal text-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Trending
              </span>
            )}
            {hasDiscount && (
              <span className="bg-green-600 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card transition-all shadow-sm active:scale-90"
          >
            <Heart
              size={18}
              className={`transition-colors ${inWishlist ? 'fill-gold text-gold' : 'text-charcoal-light'}`}
            />
          </button>
        </div>

        <div className="mt-4 px-1">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-medium">{product.categoryName}</p>
          <h3 className="font-heading text-base mt-1.5 text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-heading font-semibold text-foreground text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-xs">₹{product.originalPrice!.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
