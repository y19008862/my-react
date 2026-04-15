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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/products?categoryId=${category.id}`}
        className="group block relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        <img
          src={category.image || '/placeholder.svg'}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-heading text-xl md:text-2xl text-cream">{category.name}</h3>
          {category.productCount !== undefined && (
            <p className="text-cream/70 text-sm mt-1.5">{category.productCount} pieces</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
