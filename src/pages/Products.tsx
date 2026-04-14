import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import LoaderSkeleton from '@/components/LoaderSkeleton';
import { productApi, type Product } from '@/api/productApi';
import { categoryApi, type Category } from '@/api/categoryApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null;
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page') || '1');
  const pageSize = 12;

  useEffect(() => {
    categoryApi.getAll().then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    productApi
      .getAll({ search, categoryId: categoryId || undefined, sort, page, pageSize })
      .then((r) => {
        setProducts(r.data.products);
        setTotalCount(r.data.totalCount);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, categoryId, sort, page]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    setSearchParams(params);
  };

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Collection</h1>
          <p className="text-muted-foreground mt-2">Discover exquisite pieces crafted with elegance</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateParam('search', (e.target as HTMLInputElement).value || null);
            }}
            placeholder="Search by name..."
            className="w-full md:w-80 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>

        <Filters
          categories={categories}
          selectedCategory={categoryId}
          onCategoryChange={(id) => updateParam('categoryId', id ? String(id) : null)}
          sortBy={sort}
          onSortChange={(s) => updateParam('sort', s || null)}
        />

        {loading ? (
          <LoaderSkeleton count={pageSize} />
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => updateParam('page', String(page - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-cream-dark transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => updateParam('page', String(p))}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        page === p ? 'bg-gold text-primary-foreground' : 'border border-border hover:bg-cream-dark'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => updateParam('page', String(page + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg border border-border disabled:opacity-30 hover:bg-cream-dark transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-muted-foreground text-sm mt-1">Connect your API to see products here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
