import { useState, memo, useCallback } from 'react';
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const mainImage = product.images?.[0] || '/placeholder.svg';
  const hoverImage = product.images?.[1] || mainImage;

  const toggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) removeItem(product.id);
    else addItem(product);
  }, [inWishlist, product, addItem, removeItem]);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice!) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark transition-shadow duration-500 shadow-soft group-hover:shadow-elevated"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Skeleton placeholder */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-cream-dark animate-pulse-soft" />
          )}

          {/* Main image */}
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              hovered ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'
            }`}
          />
          {/* Hover image */}
          <img
            src={hoverImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
            }`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-foreground text-background text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-gold text-primary-foreground text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                Trending
              </span>
            )}
            {hasDiscount && (
              <span className="bg-green-600 text-primary-foreground text-[10px] font-semibold px-3 py-1 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card transition-all duration-200 shadow-soft active:scale-90"
          >
            <Heart
              size={16}
              strokeWidth={inWishlist ? 0 : 1.5}
              className={`transition-all duration-300 ${inWishlist ? 'fill-gold text-gold scale-110' : 'text-charcoal-light'}`}
            />
          </button>
        </div>

        <div className="mt-4 space-y-1.5 px-0.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em] font-medium">
            {product.categoryName}
          </p>
          <h3 className="font-heading text-[15px] font-semibold text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-heading font-bold text-foreground text-base">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-xs">
                ₹{product.originalPrice!.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
