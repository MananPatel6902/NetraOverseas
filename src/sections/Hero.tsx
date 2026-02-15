import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { BrutalistStatCard } from '@/components/ui-custom/BrutalistCard';
import { LiquidGlassText } from '@/components/ui-custom/LiquidGlassText';
import { scrollTo } from '@/lib/lenis';

const stats = [
  { value: '45+', label: 'COUNTRIES' },
  { value: '10K+', label: 'SHIPMENTS' },
  { value: '500+', label: 'PRODUCTS' },
  { value: '99%', label: 'ON-TIME' },
];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Left pane slides out to the left when scrolling
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -80, -200]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.7, 0]);

  // Right pane slides out to the right when scrolling
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 80, 200]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.7, 0]);

  // Video overlay fades out slightly for better content visibility
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.7]);

  const handleScrollTo = (sectionId: string) => {
    scrollTo(sectionId, { offset: 0, duration: 1.2 });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="../../images/cargo-ship-poster.jpg"
        >
          <source src="/videos/cargo-ship.mp4" type="video/mp4" />
          <source src="/videos/cargo-ship.webm" type="video/webm" />
        </video>
        {/* Dark overlay for better text readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70"
          style={{ opacity: overlayOpacity }}
        />
        {/* Additional cream tint overlay */}
        <div className="absolute inset-0 bg-cream/30" />
      </div>

      {/* Fallback Background (shows if video doesn't load) */}
      <div className="absolute inset-0 z-[-1] bg-cream">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="brutalist-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brutalist-grid)" />
          </svg>
        </div>
      </div>

      {/* Main Content - Absolute positioning for precise placement */}
      <div className="relative z-10 w-full h-screen px-4 sm:px-6 lg:px-8">

        {/* Company Name - Positioned on the upper edge of the boat */}
        <motion.div
          style={{
            opacity: leftOpacity,
          }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="absolute top-[10%] sm:top-[12%] md:top-[14%] lg:top-[13%] inset-x-0 flex justify-center px-4"
        >
          <LiquidGlassText text="NETRA" subtitle="FLY-OVERSEAS" />
        </motion.div>

        {/* BOTTOM SECTION - Below the boat */}
        <div className="absolute bottom-4 sm:bottom-[6%] md:bottom-[8%] lg:bottom-[10%] left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 sm:gap-6 lg:gap-16 items-end">
              {/* LEFT - Tagline and Description */}
              <motion.div
                style={{
                  x: leftX,
                  opacity: leftOpacity,
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="space-y-2 sm:space-y-3"
              >
                {/* Tagline - Monospace */}
                <p
                  className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold uppercase tracking-widest drop-shadow-lg"
                  style={{ fontFamily: 'monospace' }}
                >
                  Global Trade Solutions
                </p>

                {/* Body Text */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-md">
                  Connecting businesses worldwide with premium quality products. From spices to
                  grains, we deliver excellence to 45+ countries.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <button
                    onClick={() => handleScrollTo('#inventory')}
                    className="group relative px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-amber border-3 sm:border-4 border-charcoal text-charcoal font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 shadow-lg"
                    style={{ borderRadius: 0 }}
                  >
                    <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                      Explore Products
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleScrollTo('#contact')}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/90 backdrop-blur-sm border-3 sm:border-4 border-charcoal text-charcoal font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 shadow-lg"
                    style={{ borderRadius: 0 }}
                  >
                    Contact Us
                  </button>
                </div>
              </motion.div>

              {/* RIGHT - Stats Grid */}
              <motion.div
                style={{
                  x: rightX,
                  opacity: rightOpacity,
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-5">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    >
                      <BrutalistStatCard
                        value={stat.value}
                        label={stat.label}
                        variant={index % 2 === 0 ? 'default' : 'accent'}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile to save space */}
      <motion.div
        className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-white/70 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
