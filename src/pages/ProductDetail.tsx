import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { productApi, type Product } from '@/api/productApi';
import ProductCard from '@/components/ProductCard';
import { useWishlistStore } from '@/stores/wishlistStore';
import { generateWhatsAppLink } from '@/lib/whatsapp';

const ProductDetailSkeleton = () => (
  <div className="pt-28 md:pt-32 pb-20 min-h-screen">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <div className="aspect-square rounded-2xl bg-cream-dark animate-pulse-soft" />
          <div className="flex gap-3 mt-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-20 h-20 rounded-xl bg-cream-dark animate-pulse-soft" />
            ))}
          </div>
        </div>
        <div className="space-y-6 pt-4">
          <div className="h-3 bg-cream-dark rounded-full w-20 animate-pulse-soft" />
          <div className="h-10 bg-cream-dark rounded w-3/4 animate-pulse-soft" />
          <div className="h-8 bg-cream-dark rounded w-1/3 animate-pulse-soft" />
          <div className="h-px bg-border" />
          <div className="space-y-2">
            <div className="h-3 bg-cream-dark rounded-full w-full animate-pulse-soft" />
            <div className="h-3 bg-cream-dark rounded-full w-5/6 animate-pulse-soft" />
            <div className="h-3 bg-cream-dark rounded-full w-2/3 animate-pulse-soft" />
          </div>
          <div className="h-14 bg-cream-dark rounded-xl animate-pulse-soft mt-8" />
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productApi.getById(Number(id))
      .then((r) => {
        setProduct(r.data);
        setSelectedImage(0);
        if (r.data.categoryId) {
          productApi.getAll({ categoryId: r.data.categoryId, pageSize: 4 })
            .then((rel) => setRelated(rel.data.products.filter((p) => p.id !== r.data.id)))
            .catch(() => {});
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = useCallback(() => {
    navigator.share?.({ title: product?.name, url: window.location.href }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
    });
  }, [product]);

  if (loading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg font-heading">Product not found</p>
          <p className="text-muted-foreground text-sm mt-2">Ensure your API is running.</p>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images?.length ? product.images : ['/placeholder.svg'];
  const lightboxSlides = images.map((src) => ({ src }));

  return (
    <div className="pt-28 md:pt-32 pb-32 md:pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24"
        >
          {/* Images */}
          <div>
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark cursor-zoom-in group shadow-soft"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal/5">
                <div className="bg-card/90 backdrop-blur-sm rounded-full p-3.5 shadow-elevated">
                  <ZoomIn size={20} className="text-foreground" />
                </div>
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-5 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                      i === selectedImage
                        ? 'border-gold shadow-gold-glow ring-1 ring-gold/20'
                        : 'border-transparent opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pt-2 md:pt-6">
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.25em] font-medium">{product.categoryName}</p>
            <h1 className="font-heading text-3xl md:text-[2.5rem] font-bold text-foreground mt-3 leading-tight tracking-tight">{product.name}</h1>

            <div className="flex items-baseline gap-3 mt-8">
              <span className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="w-full h-px bg-border my-10" />

            <p className="text-muted-foreground text-sm leading-[1.8] tracking-wide">{product.description}</p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full bg-cream-dark text-xs font-medium text-muted-foreground tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-12">
              <a
                href={generateWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gold-shimmer text-primary-foreground py-4 rounded-xl font-semibold text-sm uppercase tracking-widest text-center shadow-gold-glow hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 active:scale-[0.98]"
              >
                Buy on WhatsApp
              </a>
              <button
                onClick={() => inWishlist ? removeItem(product.id) : addItem(product)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 active:scale-95 ${
                  inWishlist
                    ? 'border-gold bg-gold/5 text-gold'
                    : 'border-border text-muted-foreground hover:text-gold hover:border-gold/50'
                }`}
              >
                <Heart size={20} strokeWidth={inWishlist ? 0 : 1.5} className={inWishlist ? 'fill-gold' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="p-4 rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300 active:scale-95"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={selectedImage}
          plugins={[Zoom]}
          zoom={{ maxZoomPixelRatio: 3 }}
          carousel={{ finite: images.length <= 1 }}
          on={{ view: ({ index }) => setSelectedImage(index) }}
        />

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 md:mt-40">
            <div className="text-center mb-14">
              <p className="text-gold uppercase tracking-[0.25em] text-xs font-medium mb-3">Discover More</p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
