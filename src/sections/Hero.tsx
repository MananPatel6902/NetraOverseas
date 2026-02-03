import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { BrutalistStatCard } from '@/components/ui-custom/BrutalistCard';
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

      {/* Split-Screen Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
          <div className='flex square-full square-box flex-col justify-center bg-white/20 backdrop-blur-sm  p-8'> 
            {/* LEFT PANE - Text Content - Slides in from left, out to left */}
            <motion.div
              style={{
                x: leftX,
                opacity: leftOpacity,
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Company Name - Brutalist Typography */}
              <h1 className="text-brutalist drop-shadow-lg">
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-amber font-black leading-none">
                  NETRA
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mt-2 text-charcoal">
                  OVERSEAS
                </span>
              </h1>

              {/* Tagline - Monospace */}
              <p
                className="text-xl sm:text-2xl text-white font-semibold uppercase tracking-wide drop-shadow-md"
                style={{ fontFamily: 'monospace' }}
              >
                Global Trade Solutions
              </p>

              {/* Body Text */}
              <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed drop-shadow-sm">
                Connecting businesses worldwide with premium quality products. From spices to
                grains, we deliver excellence to 45+ countries.
              </p>

              {/* CTA Button - Brutalist Style */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleScrollTo('#inventory')}
                  className="group relative px-8 py-4 bg-amber border-4 border-charcoal text-charcoal font-bold text-lg uppercase tracking-wide transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 shadow-lg"
                  style={{ borderRadius: 0 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Explore Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => handleScrollTo('#contact')}
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm border-4 border-charcoal text-charcoal font-bold text-lg uppercase tracking-wide transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 shadow-lg"
                  style={{ borderRadius: 0 }}
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
          {/* RIGHT PANE - Stats Grid - Slides in from right, out to right */}
          <motion.div
            style={{
              x: rightX,
              opacity: rightOpacity,
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
