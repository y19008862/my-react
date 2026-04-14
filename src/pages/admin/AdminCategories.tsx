import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ArrowLeft, LogOut } from 'lucide-react';
import { categoryApi, type Category } from '@/api/categoryApi';
import { adminApi } from '@/api/adminApi';
import { useAuthStore } from '@/stores/authStore';

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCat, setEditCat] = useState<Partial<Category> | null>(null);
  const logout = useAuthStore((s) => s.logout);

  const load = () => {
    setLoading(true);
    categoryApi.getAll()
      .then((r) => setCategories(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!editCat || !editCat.name) return;
    try {
      if (editCat.id) {
        await adminApi.updateCategory(editCat.id, { name: editCat.name, description: editCat.description, image: editCat.image });
      } else {
        await adminApi.createCategory({ name: editCat.name, description: editCat.description, image: editCat.image });
      }
      setEditCat(null);
      load();
    } catch { /* handle error */ }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    try {
      await adminApi.deleteCategory(id);
      load();
    } catch { /* handle error */ }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard" className="text-muted-foreground hover:text-foreground"><ArrowLeft size={20} /></Link>
          <span className="font-heading text-lg font-bold text-foreground">Categories</span>
        </div>
        <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">{categories.length} categories</p>
          <button
            onClick={() => setEditCat({ name: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-primary-foreground rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors"
          >
            <Plus size={16} /> Add Category
          </button>
        </div>

        {editCat && (
          <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-6 w-full max-w-sm space-y-4">
              <h3 className="font-heading text-lg font-semibold">{editCat.id ? 'Edit' : 'Add'} Category</h3>
              <input
                value={editCat.name || ''}
                onChange={(e) => setEditCat({ ...editCat, name: e.target.value })}
                placeholder="Category Name"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <input
                value={editCat.description || ''}
                onChange={(e) => setEditCat({ ...editCat, description: e.target.value })}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <div className="flex gap-3">
                <button onClick={handleSave} className="flex-1 bg-gold text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors">Save</button>
                <button onClick={() => setEditCat(null)} className="flex-1 border border-border py-2 rounded-lg text-sm hover:bg-cream-dark transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 bg-cream-dark rounded-lg" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-card border border-border rounded-xl px-5 py-4">
                <div>
                  <p className="font-medium text-foreground">{c.name}</p>
                  {c.description && <p className="text-muted-foreground text-xs mt-0.5">{c.description}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditCat(c)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
