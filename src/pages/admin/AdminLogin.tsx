import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-gold-gradient">Madhuvan Novelty</h1>
          <p className="text-muted-foreground text-sm mt-2">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border shadow-sm space-y-4">
          <h2 className="font-heading text-lg font-semibold text-foreground text-center">Sign In</h2>
          
          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-primary-foreground py-3 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
