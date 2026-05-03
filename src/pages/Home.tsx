import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '@/components/ui-custom/Navigation';
import { WhatsAppWidget } from '@/components/ui-custom/WhatsAppWidget';
import { Footer } from '@/components/ui-custom/Footer';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Inventory } from '@/sections/Inventory';
import { Offices } from '@/sections/Offices';
import { Contact } from '@/sections/Contact';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      const timer = setTimeout(() => {
        const element = document.querySelector(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <Hero />
        <About />
        <Inventory />
        <Offices />
        <Contact />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
