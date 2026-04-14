import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream py-16 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl text-gold-gradient mb-4">Madhuvan Novelty</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Exquisite imitation jewelry crafted with passion. Elegance made accessible.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-cream mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-cream/70 text-sm hover:text-gold transition-colors">Home</Link>
              <Link to="/products" className="text-cream/70 text-sm hover:text-gold transition-colors">Collections</Link>
              <Link to="/wishlist" className="text-cream/70 text-sm hover:text-gold transition-colors">Wishlist</Link>
              <Link to="/contact" className="text-cream/70 text-sm hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg text-cream mb-4">Categories</h4>
            <div className="flex flex-col gap-2 text-cream/70 text-sm">
              <span>Necklaces</span>
              <span>Earrings</span>
              <span>Bangles</span>
              <span>Rings</span>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg text-cream mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-cream/70 text-sm">
              <span>contact@madhuvannovelty.com</span>
              <span>+91 99999 99999</span>
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-cream/50 text-xs">
          © {new Date().getFullYear()} Madhuvan Novelty. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
