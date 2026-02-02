import { Navigation } from '@/components/ui-custom/Navigation';
import { WhatsAppWidget } from '@/components/ui-custom/WhatsAppWidget';
import { Footer } from '@/components/ui-custom/Footer';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Inventory } from '@/sections/Inventory';
import { Offices } from '@/sections/Offices';
import { Contact } from '@/sections/Contact';

export function Home() {
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
