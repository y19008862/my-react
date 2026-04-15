import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlistStore';

const BottomNav = () => {
  const location = useLocation();
  const count = useWishlistStore((s) => s.count);

  if (location.pathname.startsWith('/admin')) return null;

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/products', icon: Search, label: 'Shop' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist', badge: count },
    { to: '/contact', icon: User, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 relative py-2 px-4 transition-colors duration-200 ${
                active ? 'text-gold' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              {item.badge ? (
                <span className="absolute top-0.5 right-1 bg-gold text-primary-foreground text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
