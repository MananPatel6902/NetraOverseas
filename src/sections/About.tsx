import { motion } from 'framer-motion';
import { Shield, Clock, Users } from 'lucide-react';
import { useStaggeredReveal } from '@/hooks/useConvergingScroll';
import { BrutalistCard } from '@/components/ui-custom/BrutalistCard';
import { BrutalistMosaicGrid } from '@/components/layout/AsymmetricGrid';

const values = [
  {
    icon: Shield,
    title: 'QUALITY',
    description: 'Rigorous checks at every stage of supply chain',
  },
  {
    icon: Clock,
    title: 'DELIVERY',
    description: 'On-time guaranteed with real-time tracking',
  },
  {
    icon: Users,
    title: 'SUPPORT',
    description: 'Dedicated support available 24/7 for inquiries',
  },
];

const galleryImages = [
  { src: '/images/warehouse-1.jpg', alt: 'Modern warehouse facility', span: 2 as const },
  { src: '/images/shipping-1.jpg', alt: 'Container shipping', span: 1 as const },
  { src: '/images/team-1.jpg', alt: 'Professional team', span: 1 as const },
  { src: '/images/packaging-1.jpg', alt: 'Quality packaging', span: 1 as const },
  { src: '/images/shipping-1.jpg', alt: 'Global logistics', span: 1 as const },
];

const certifications = [
  'ISO 9001:2015',
  'HACCP COMPLIANT',
  'FSSAI REGISTERED',
  'APEDA RECOGNIZED',
];

export function About() {
  const valuesAnimation = useStaggeredReveal({ threshold: 0.2 });

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden bg-cream"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-2/8 w-2 h-96 bg-charcoal opacity-20" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-8 border-amber opacity-30" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-amber text-sm font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'monospace' }}
          >
            ABOUT US
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal">
            YOUR TRUSTED
            <br />
            GLOBAL PARTNER
          </h2>
        </motion.div>

        {/* Split-Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* LEFT PANE - Story + Certifications */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-charcoal/90 leading-relaxed">
                Founded in 2019, Netra Fly Overseas began with a simple mission: to bridge the gap
                between quality producers and global markets. What started as a small trading
                company has now grown into a trusted name across 45+ countries.
              </p>
              <p className="text-lg text-charcoal/90 leading-relaxed">
                Our expertise spans diverse product categories including agricultural
                commodities, spices, flours, and industrial goods. We take pride in our rigorous
                quality control processes and commitment to sustainable trade practices.
              </p>
              <p className="text-lg text-charcoal/90 leading-relaxed">
                Today, under the sole leadership of our founder and a network of trusted
                partners worldwide, we continue to deliver excellence in every shipment.
              </p>
            </div>

            {/* Certifications List - Brutalist Style */}
            <div className="space-y-3 pt-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-charcoal flex-shrink-0" />
                  <span
                    className="text-charcoal font-bold text-sm uppercase tracking-wide"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT PANE - Brutalist Mosaic Gallery */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BrutalistMosaicGrid images={galleryImages} />
          </motion.div>
        </div>

        {/* Values Cards - Brutalist Style */}
        <motion.div
          ref={valuesAnimation.ref}
          variants={valuesAnimation.containerVariants}
          initial="hidden"
          animate={valuesAnimation.isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={valuesAnimation.itemVariants}>
              <BrutalistCard className="h-full">
                <div className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 border-4 border-charcoal flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-charcoal" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4
                      className="text-charcoal font-black text-lg mb-2 uppercase tracking-wide"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {value.title}
                    </h4>
                    <p className="text-charcoal/70 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </BrutalistCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
