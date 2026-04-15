import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream py-20 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl text-gold-gradient mb-5">Madhuvan Novelty</h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              Exquisite imitation jewelry crafted with passion. Elegance made accessible.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-base text-cream mb-5 tracking-wide">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-cream/60 text-sm hover:text-gold transition-colors">Home</Link>
              <Link to="/products" className="text-cream/60 text-sm hover:text-gold transition-colors">Collections</Link>
              <Link to="/wishlist" className="text-cream/60 text-sm hover:text-gold transition-colors">Wishlist</Link>
              <Link to="/contact" className="text-cream/60 text-sm hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-base text-cream mb-5 tracking-wide">Categories</h4>
            <div className="flex flex-col gap-3 text-cream/60 text-sm">
              <span>Necklaces</span>
              <span>Earrings</span>
              <span>Bangles</span>
              <span>Rings</span>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-base text-cream mb-5 tracking-wide">Contact</h4>
            <div className="flex flex-col gap-3 text-cream/60 text-sm">
              <span>contact@madhuvannovelty.com</span>
              <span>+91 99999 99999</span>
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10 mt-16 pt-8 text-center text-cream/40 text-xs tracking-wide">
          © {new Date().getFullYear()} Madhuvan Novelty. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
