import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Ship, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Founder', href: '/team', isRoute: true },
    { label: 'Careers', href: '#contact' },
    { label: 'News', href: '#' },
  ],
  services: [
    { label: 'Import Services', href: '#inventory' },
    { label: 'Export Services', href: '#inventory' },
    { label: 'Logistics', href: '#' },
    { label: 'Custom Clearance', href: '#' },
  ],
  products: [
    { label: 'Spices', href: '#inventory' },
    { label: 'Flours', href: '#inventory' },
    { label: 'Grains & Pulses', href: '#inventory' },
    { label: 'Oils & Ghee', href: '#inventory' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQs', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (link: FooterLink) => {
    if (link.isRoute) {
      navigate(link.href);
      window.scrollTo(0, 0);
      return;
    }

    if (link.href === '#') return;

    // If we're not on the home page and the link is a section anchor, navigate home first
    if (location.pathname !== '/' && link.href.startsWith('#')) {
      navigate('/');
      // Wait for navigation then scroll to section
      setTimeout(() => {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white border-t border-slate-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Ship className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-lg">NetraOverseas</p>
                <p className="text-blue-600 text-xs tracking-wider font-semibold">
                  GLOBAL TRADE SOLUTIONS
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-slate-500 text-sm mb-6 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Your trusted partner in global trade. Connecting quality products
              with markets worldwide since 2010.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="mailto:info@netraoverseas.com"
                className="flex items-center gap-3 text-slate-500 hover:text-blue-700 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@netraoverseas.com
              </a>
              <a
                href="tel:+917912345678"
                className="flex items-center gap-3 text-slate-500 hover:text-blue-700 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 79 1234 5678
              </a>
              <div className="flex items-start gap-3 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Gandhinagar, Gujarat, India</span>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (columnIndex + 1) }}
            >
              <h4 className="text-slate-900 font-semibold mb-4 capitalize">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-slate-500 hover:text-blue-700 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="text-slate-500 hover:text-blue-700 transition-colors text-sm"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-slate-400 text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} NetraOverseas. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
