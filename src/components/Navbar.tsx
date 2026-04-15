import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/stores/wishlistStore';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const wishlistCount = useWishlistStore((s) => s.count);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  const navBg = scrolled || !isHome || menuOpen
    ? 'bg-card/95 backdrop-blur-xl shadow-[0_1px_0_0_hsl(var(--border)/0.5)]'
    : 'bg-transparent';

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Collections' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-heading text-xl md:text-2xl font-bold text-gold-gradient">
                Madhuvan Novelty
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                    location.pathname === l.to ? 'text-gold' : 'text-foreground hover:text-gold'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 text-foreground hover:text-gold transition-colors duration-200">
                <Search size={19} strokeWidth={1.5} />
              </button>
              <Link to="/wishlist" className="p-2.5 relative text-foreground hover:text-gold transition-colors duration-200">
                <Heart size={19} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-primary-foreground text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-border/50 overflow-hidden bg-card"
            >
              <form onSubmit={handleSearch} className="container mx-auto px-4 py-4">
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewelry..."
                  className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body text-sm tracking-wide"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-card/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center pt-16 gap-10">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-lg font-heading tracking-[0.2em] uppercase transition-colors duration-200 ${
                    location.pathname === l.to ? 'text-gold' : 'text-foreground'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
