import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const inputClass = "w-full px-5 py-4 rounded-xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/15 focus:border-gold/30 transition-all duration-300";

  return (
    <div className="pt-28 md:pt-32 pb-32 md:pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.25em] text-[11px] font-medium mb-3">Get In Touch</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground tracking-tight">Contact Us</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name"
                className={inputClass}
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email Address"
                className={inputClass}
              />
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your Message"
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="w-full bg-gold-shimmer text-primary-foreground py-4 rounded-xl font-semibold text-sm uppercase tracking-widest shadow-gold-glow hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 active:scale-[0.98]"
              >
                Send via WhatsApp
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-10">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-8">Contact Information</h2>
            {[
              { icon: MapPin, title: 'Address', text: 'Mumbai, Maharashtra, India' },
              { icon: Phone, title: 'Phone', text: '+91 99999 99999' },
              { icon: Mail, title: 'Email', text: 'contact@madhuvannovelty.com' },
              { icon: MessageCircle, title: 'WhatsApp', text: 'Chat with us directly' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gold/8 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
