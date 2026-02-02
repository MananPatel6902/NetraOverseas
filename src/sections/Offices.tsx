import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Building2, Globe } from 'lucide-react';

const offices = [
  {
    type: 'Head Office',
    location: 'India',
    name: 'NetraOverseas Pvt. Ltd.',
    address: 'Plot No. 42, Sector 18, Industrial Area,\nGandhinagar, Gujarat - 382016, India',
    phone: '+91 79 1234 5678',
    mobile: '+91 98765 43210',
    email: 'info@netraoverseas.com',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM IST',
    timezone: 'GMT+5:30',
    icon: Building2,
    color: 'from-blue-700 to-blue-600',
  },
  {
    type: 'Overseas Branch',
    location: 'UAE',
    name: 'NetraOverseas FZE',
    address: 'Office 305, Building A,\nDubai Silicon Oasis,\nDubai, United Arab Emirates',
    phone: '+971 4 123 4567',
    mobile: '+971 50 123 4567',
    email: 'dubai@netraoverseas.com',
    hours: 'Sun - Thu: 9:00 AM - 6:00 PM GST',
    timezone: 'GMT+4',
    icon: Globe,
    color: 'from-amber-600 to-orange-600',
  },
];

export function Offices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Slide animations
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [-150, -50, 0, -50, -150]
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [150, 50, 0, 50, 150]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="offices"
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* World map pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#0f172a" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Slides in from left */}
        <motion.div
          className="text-center mb-16"
          style={{ x: leftX, opacity: contentOpacity }}
        >
          <motion.span
            className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Locations
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Global Presence
          </motion.h2>
          <motion.p
            className="text-slate-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            With offices strategically located across key markets, we ensure
            seamless connectivity and support for our global clientele.
          </motion.p>
        </motion.div>

        {/* Offices Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <motion.div
              key={office.type}
              className="group relative"
              style={{
                x: index === 0 ? leftX : rightX,
                opacity: contentOpacity,
              }}
            >
              <div className="bg-white rounded-2xl p-8 h-full border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${office.color} flex items-center justify-center shadow-lg`}
                    >
                      <office.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                        {office.type}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {office.location}
                      </h3>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {office.timezone}
                    </span>
                  </div>
                </div>

                {/* Company Name */}
                <p className="text-slate-900 font-semibold mb-6">{office.name}</p>

                {/* Contact Details */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm whitespace-pre-line">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <a
                        href={`tel:${office.phone}`}
                        className="text-slate-700 text-sm hover:text-blue-700 transition-colors font-medium"
                      >
                        {office.phone}
                      </a>
                      <a
                        href={`tel:${office.mobile}`}
                        className="text-slate-500 text-sm hover:text-blue-700 transition-colors"
                      >
                        {office.mobile}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <a
                      href={`mailto:${office.email}`}
                      className="text-slate-700 text-sm hover:text-blue-700 transition-colors font-medium"
                    >
                      {office.email}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-slate-500 text-sm">{office.hours}</p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div
                  className={`absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r ${office.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Reach Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ opacity: contentOpacity }}
        >
          {[
            { value: '2', label: 'Office Locations' },
            { value: '45+', label: 'Countries Served' },
            { value: '24/7', label: 'Support Available' },
            { value: '15+', label: 'Language Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
