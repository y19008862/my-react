import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Category } from '@/api/categoryApi';

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/products?categoryId=${category.id}`}
        className="group block relative aspect-[3/4] rounded-xl overflow-hidden"
      >
        <img
          src={category.image || '/placeholder.svg'}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-heading text-xl text-cream">{category.name}</h3>
          {category.productCount !== undefined && (
            <p className="text-cream/70 text-sm mt-1">{category.productCount} pieces</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
