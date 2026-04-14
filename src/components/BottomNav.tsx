import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlistStore';

const BottomNav = () => {
  const location = useLocation();
  const count = useWishlistStore((s) => s.count);

  // Hide on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/products', icon: Search, label: 'Shop' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist', badge: count },
    { to: '/contact', icon: User, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 relative transition-colors ${
                active ? 'text-gold' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge ? (
                <span className="absolute -top-1 right-0 bg-gold text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
