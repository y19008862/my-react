import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { productApi, type Product } from '@/api/productApi';
import ProductCard from '@/components/ProductCard';
import { useWishlistStore } from '@/stores/wishlistStore';
import { generateWhatsAppLink } from '@/lib/whatsapp';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productApi.getById(Number(id))
      .then((r) => {
        setProduct(r.data);
        setSelectedImage(0);
        // Load related
        if (r.data.categoryId) {
          productApi.getAll({ categoryId: r.data.categoryId, pageSize: 4 })
            .then((rel) => setRelated(rel.data.products.filter((p) => p.id !== r.data.id)))
            .catch(() => {});
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square rounded-xl bg-cream-dark" />
            <div className="space-y-4 pt-4">
              <div className="h-4 bg-cream-dark rounded w-20" />
              <div className="h-8 bg-cream-dark rounded w-3/4" />
              <div className="h-6 bg-cream-dark rounded w-1/3" />
              <div className="h-20 bg-cream-dark rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found. Ensure your API is running.</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-cream-dark mb-3">
              <img
                src={product.images?.[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      i === selectedImage ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.categoryName}</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2">{product.name}</h1>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-semibold text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mt-6">{product.description}</p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-cream-dark text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <a
                href={generateWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gold-shimmer text-primary-foreground py-3.5 rounded-lg font-semibold text-sm uppercase tracking-wider text-center hover:shadow-lg hover:shadow-gold/20 transition-all"
              >
                Buy on WhatsApp
              </a>
              <button
                onClick={() => inWishlist ? removeItem(product.id) : addItem(product)}
                className={`p-3.5 rounded-lg border transition-colors ${
                  inWishlist ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:text-gold hover:border-gold'
                }`}
              >
                <Heart size={20} className={inWishlist ? 'fill-gold' : ''} />
              </button>
              <button
                onClick={() => {
                  navigator.share?.({ title: product.name, url: window.location.href }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                  });
                }}
                className="p-3.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
