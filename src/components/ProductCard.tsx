import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/api/productApi';
import { useWishlistStore } from '@/stores/wishlistStore';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/products/${product.id}`} className="group block">
        <div
          className="relative aspect-square overflow-hidden rounded-lg bg-cream-dark"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? hoverImage : mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-charcoal text-cream text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                Trending
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors shadow-sm"
          >
            <Heart
              size={18}
              className={inWishlist ? 'fill-gold text-gold' : 'text-charcoal-light'}
            />
          </button>
        </div>

        <div className="mt-3 px-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.categoryName}</p>
          <h3 className="font-heading text-base mt-1 text-foreground group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-body font-semibold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-muted-foreground line-through text-sm">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
