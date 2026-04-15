import { Link } from 'react-router-dom';
import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/api/categoryApi';

interface Props {
  category: Category;
}

const CategoryCard = memo(({ category }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/products?categoryId=${category.id}`}
        className="group block relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-500"
      >
        <img
          src={category.image || '/placeholder.svg'}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <h3 className="font-heading text-xl md:text-2xl text-cream tracking-tight">{category.name}</h3>
          {category.productCount !== undefined && (
            <p className="text-cream/60 text-sm mt-2">{category.productCount} pieces</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
