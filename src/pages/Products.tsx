import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { productApi } from '@/api/productApi';
import { categoryApi } from '@/api/categoryApi';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null;
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page') || '1');
  const pageSize = 12;

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll().then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', search, categoryId, sort, page],
    queryFn: () => productApi.getAll({ search, categoryId: categoryId || undefined, sort, page, pageSize }).then(r => r.data),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const products = productsData?.products ?? [];
  const totalCount = productsData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    setSearchParams(params);
  };

  return (
    <div className="pt-24 md:pt-28 pb-28 md:pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-medium mb-2">Explore</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Our Collection</h1>
          <p className="text-muted-foreground mt-3 text-sm">Discover exquisite pieces crafted with elegance</p>
        </motion.div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateParam('search', (e.target as HTMLInputElement).value || null);
            }}
            placeholder="Search jewelry..."
            className="w-full md:w-96 pl-11 pr-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 transition-shadow"
          />
        </div>

        <Filters
          categories={categories}
          selectedCategory={categoryId}
          onCategoryChange={(id) => updateParam('categoryId', id ? String(id) : null)}
          sortBy={sort}
          onSortChange={(s) => updateParam('sort', s || null)}
        />

        {isLoading ? (
          <LoaderSkeleton count={pageSize} />
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <button
                  onClick={() => updateParam('page', String(page - 1))}
                  disabled={page <= 1}
                  className="p-3 rounded-xl border border-border disabled:opacity-30 hover:bg-cream-dark transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => updateParam('page', String(p))}
                      className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all ${
                        page === p ? 'bg-gold text-primary-foreground shadow-md shadow-gold/20' : 'border border-border hover:bg-cream-dark'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => updateParam('page', String(page + 1))}
                  disabled={page >= totalPages}
                  className="p-3 rounded-xl border border-border disabled:opacity-30 hover:bg-cream-dark transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg font-heading">No products found</p>
            <p className="text-muted-foreground text-sm mt-2">Connect your API to see products here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
