import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Grid3X3, MessageSquare, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminApi, type DashboardData } from '@/api/adminApi';
import { useAuthStore } from '@/stores/authStore';

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    adminApi.getDashboard()
      .then((r) => setData(r.data))
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Products', value: data?.totalProducts ?? '—', sub: `${data?.activeProducts ?? 0} active`, icon: Package, to: '/admin/products', color: 'bg-gold/10 text-gold' },
    { label: 'Categories', value: data?.totalCategories ?? '—', sub: '', icon: Grid3X3, to: '/admin/categories', color: 'bg-green-100 text-green-700' },
    { label: 'Testimonials', value: data?.totalTestimonials ?? '—', sub: `${data?.pendingTestimonials ?? 0} pending`, icon: MessageSquare, to: '/admin/dashboard', color: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <Link to="/admin/dashboard" className="font-heading text-lg font-bold text-gold-gradient">Admin Panel</Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">View Site</Link>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={c.to} className="block bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
                  <c.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-foreground">{c.value}</p>
                <p className="text-muted-foreground text-sm">{c.label}</p>
                {c.sub && <p className="text-muted-foreground text-xs mt-1">{c.sub}</p>}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4">
          <Link to="/admin/products" className="px-6 py-3 bg-gold text-primary-foreground rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors">
            Manage Products
          </Link>
          <Link to="/admin/categories" className="px-6 py-3 border border-border rounded-lg text-sm font-medium hover:bg-cream-dark transition-colors">
            Manage Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
