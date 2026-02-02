import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, Users } from 'lucide-react';
import { useRef } from 'react';
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
    description: 'Dedicated team available 24/7 for inquiries',
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const valuesAnimation = useStaggeredReveal({ threshold: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Left pane: slides in from left, slides out to left
  // Content centered from 0.2 to 0.8 scroll progress
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [-60, -20, 0, 0, -20, -60]
  );
  const leftOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15, 0.85, 0.92, 1],
    [0, 0.7, 1, 1, 0.7, 0]
  );

  // Right pane: slides in from right, slides out to right
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [60, 20, 0, 0, 20, 60]
  );
  const rightOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15, 0.85, 0.92, 1],
    [0, 0.7, 1, 1, 0.7, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden bg-cream"
    >
      {/* Parallax Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large charcoal line */}
        <motion.div
          style={{ x: leftX, opacity: leftOpacity }}
          className="absolute top-1/3 left-1/4 w-2 h-96 bg-charcoal"
          aria-hidden="true"
        />

        {/* Amber square */}
        <motion.div
          style={{ x: rightX, opacity: rightOpacity }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border-8 border-amber"
          aria-hidden="true"
        />
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
          {/* LEFT PANE - Story + Certifications - Slides in from left */}
          <motion.div
            style={{
              x: leftX,
              opacity: leftOpacity,
            }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-charcoal/90 leading-relaxed">
                Founded in 2010, NetraOverseas began with a simple mission: to bridge the gap
                between quality producers and global markets. What started as a small trading
                company has now grown into a trusted name across 45+ countries.
              </p>
              <p className="text-lg text-charcoal/90 leading-relaxed">
                Our expertise spans diverse product categories including agricultural
                commodities, spices, flours, and industrial goods. We take pride in our rigorous
                quality control processes and commitment to sustainable trade practices.
              </p>
              <p className="text-lg text-charcoal/90 leading-relaxed">
                Today, with a team of over 200 dedicated professionals and a network of trusted
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

          {/* RIGHT PANE - Brutalist Mosaic Gallery - Slides in from right */}
          <motion.div
            style={{
              x: rightX,
              opacity: rightOpacity,
            }}
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
