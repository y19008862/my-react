import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Image, LogOut, ArrowLeft } from 'lucide-react';
import { productApi, type Product } from '@/api/productApi';
import { categoryApi, type Category } from '@/api/categoryApi';
import { adminApi } from '@/api/adminApi';
import { useAuthStore } from '@/stores/authStore';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProductId, setUploadProductId] = useState<number | null>(null);
  const logout = useAuthStore((s) => s.logout);

  const load = () => {
    setLoading(true);
    Promise.all([adminApi.getProducts({ pageSize: 100 }), adminApi.getCategories()])
      .then(([pRes, cRes]) => { setProducts(pRes.data.products); setCategories(cRes.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editProduct) return;
    try {
      if (editProduct.id) {
        await adminApi.updateProduct(editProduct.id, {
          name: editProduct.name || '',
          description: editProduct.description || '',
          price: editProduct.price || 0,
          originalPrice: editProduct.originalPrice,
          categoryId: editProduct.categoryId || 0,
          material: editProduct.material,
          stoneType: editProduct.stoneType,
          isActive: editProduct.isActive,
          isTrending: editProduct.isTrending,
          isNew: editProduct.isNew,
        });
      } else {
        await adminApi.createProduct({
          name: editProduct.name || '',
          description: editProduct.description || '',
          price: editProduct.price || 0,
          originalPrice: editProduct.originalPrice,
          categoryId: editProduct.categoryId || 0,
          material: editProduct.material,
          stoneType: editProduct.stoneType,
          isTrending: editProduct.isTrending,
          isNew: editProduct.isNew,
        });
      }
      setEditProduct(null);
      load();
    } catch { /* handle error */ }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await adminApi.deleteProduct(id);
      load();
    } catch { /* handle error */ }
  };

  const handleImageUpload = async () => {
    if (!imageFiles.length || !uploadProductId) return;
    setUploading(true);
    try {
      await adminApi.uploadImages(uploadProductId, imageFiles);
      setImageFiles([]);
      setUploadProductId(null);
      load();
    } catch { /* handle error */ }
    setUploading(false);
  };

  const handleToggle = async (product: Product, field: 'isNew' | 'isTrending' | 'isActive') => {
    try {
      if (field === 'isActive') await adminApi.toggleActive(product.id);
      else if (field === 'isTrending') await adminApi.toggleTrending(product.id);
      else if (field === 'isNew') await adminApi.toggleNewArrival(product.id);
      load();
    } catch { /* handle error */ }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
          <span className="font-heading text-lg font-bold text-foreground">Products</span>
        </div>
        <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">{products.length} products</p>
          <button
            onClick={() => setEditProduct({ name: '', description: '', price: 0, categoryId: categories[0]?.id })}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-primary-foreground rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Edit Modal */}
        {editProduct && (
          <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4">
              <h3 className="font-heading text-lg font-semibold">{editProduct.id ? 'Edit' : 'Add'} Product</h3>
              <input
                value={editProduct.name || ''}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                placeholder="Product Name"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <textarea
                value={editProduct.description || ''}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                placeholder="Description"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={editProduct.price || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  placeholder="Price"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
                <input
                  type="number"
                  value={editProduct.originalPrice || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, originalPrice: Number(e.target.value) || undefined })}
                  placeholder="Original Price"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <select
                value={editProduct.categoryId || ''}
                onChange={(e) => setEditProduct({ ...editProduct, categoryId: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              >
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={editProduct.material || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, material: e.target.value })}
                  placeholder="Material"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
                <input
                  value={editProduct.stoneType || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, stoneType: e.target.value })}
                  placeholder="Stone Type"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={handleSave} className="flex-1 bg-gold text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors">
                  Save
                </button>
                <button onClick={() => setEditProduct(null)} className="flex-1 border border-border py-2 rounded-lg text-sm hover:bg-cream-dark transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Upload Modal */}
        {uploadProductId && (
          <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-6 w-full max-w-sm space-y-4">
              <h3 className="font-heading text-lg font-semibold">Upload Images</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                className="text-sm"
              />
              <div className="flex gap-3">
                <button onClick={handleImageUpload} disabled={!imageFiles.length || uploading} className="flex-1 bg-gold text-primary-foreground py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button onClick={() => { setUploadProductId(null); setImageFiles([]); }} className="flex-1 border border-border py-2 rounded-lg text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-cream-dark rounded-lg" />)}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-cream-dark/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Product</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Price</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">New</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Trending</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Active</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-cream-dark/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-cream-dark overflow-hidden flex-shrink-0">
                            <img src={p.mainImageUrl || p.images?.[0] || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-foreground line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleToggle(p, 'isNew')} className={`w-5 h-5 rounded border ${p.isNew ? 'bg-gold border-gold' : 'border-border'}`} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleToggle(p, 'isTrending')} className={`w-5 h-5 rounded border ${p.isTrending ? 'bg-gold border-gold' : 'border-border'}`} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleToggle(p, 'isActive')} className={`w-5 h-5 rounded border ${p.isActive ? 'bg-green-500 border-green-500' : 'border-border'}`} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setUploadProductId(p.id)} className="p-1.5 text-muted-foreground hover:text-foreground"><Image size={16} /></button>
                          <button onClick={() => setEditProduct(p)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
