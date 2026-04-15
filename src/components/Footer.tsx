import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream py-24 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl text-gold-gradient mb-6">Madhuvan Novelty</h3>
            <p className="text-cream/50 text-sm leading-[1.8]">
              Exquisite imitation jewelry crafted with passion. Elegance made accessible.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm text-cream/80 mb-6 tracking-[0.15em] uppercase">Quick Links</h4>
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-cream/45 text-sm hover:text-gold transition-colors duration-200">Home</Link>
              <Link to="/products" className="text-cream/45 text-sm hover:text-gold transition-colors duration-200">Collections</Link>
              <Link to="/wishlist" className="text-cream/45 text-sm hover:text-gold transition-colors duration-200">Wishlist</Link>
              <Link to="/contact" className="text-cream/45 text-sm hover:text-gold transition-colors duration-200">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm text-cream/80 mb-6 tracking-[0.15em] uppercase">Categories</h4>
            <div className="flex flex-col gap-4 text-cream/45 text-sm">
              <span>Necklaces</span>
              <span>Earrings</span>
              <span>Bangles</span>
              <span>Rings</span>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-sm text-cream/80 mb-6 tracking-[0.15em] uppercase">Contact</h4>
            <div className="flex flex-col gap-4 text-cream/45 text-sm">
              <span>contact@madhuvannovelty.com</span>
              <span>+91 99999 99999</span>
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/8 mt-20 pt-10 text-center text-cream/30 text-xs tracking-[0.15em]">
          © {new Date().getFullYear()} Madhuvan Novelty. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
