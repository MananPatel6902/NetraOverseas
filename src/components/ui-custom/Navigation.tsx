import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Inventory', href: '#inventory' },
  { label: 'Offices', href: '#offices' },
  { label: 'Team', href: '/team', isRoute: true },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: NavLink) => {
    if (link.isRoute) {
      navigate(link.href);
      window.scrollTo(0, 0);
      setIsMobileMenuOpen(false);
      return;
    }

    // If we're not on the home page and the link is a section anchor
    if (location.pathname !== '/' && link.href.startsWith('#')) {
      navigate('/', { state: { scrollTo: link.href } });
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector('#hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Ship className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <p className={`font-bold text-lg leading-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                  NetraOverseas
                </p>
                <p className="text-blue-600 text-xs tracking-wider font-medium">
                  GLOBAL TRADE SOLUTIONS
                </p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-slate-600 hover:text-blue-700'
                      : 'text-slate-700 hover:text-blue-700'
                  } ${link.isRoute && location.pathname === link.href ? 'text-blue-700' : ''}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600"
                    whileHover={{ width: '60%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={() => handleNavClick({ label: 'Contact', href: '#contact' })}
                className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white border-0 shadow-lg shadow-blue-600/20"
              >
                Get Quote
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl border border-slate-200 shadow-xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link)}
                    className={`px-4 py-3 text-left text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium ${
                      link.isRoute && location.pathname === link.href ? 'text-blue-700 bg-blue-50' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <Button
                  onClick={() => handleNavClick({ label: 'Contact', href: '#contact' })}
                  className="mt-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white"
                >
                  Get Quote
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
