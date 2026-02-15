import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { Navigation } from '@/components/ui-custom/Navigation';
import { Footer } from '@/components/ui-custom/Footer';
import { WhatsAppWidget } from '@/components/ui-custom/WhatsAppWidget';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
}

interface Owner {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  phone?: string;
  email?: string;
  linkedin?: string;
}

const owners: Owner[] = [
  {
    id: 'owner-1',
    name: 'Ketan Patel',
    role: 'Founder & CEO',
    image: '/images/owner-1.jpg',
    bio: 'With over 25 years of experience in international trade, Ketan founded NetraFlyOverseas with a vision to connect Indian producers with global markets. His expertise in supply chain management and deep understanding of agricultural commodities has been instrumental in the company\'s growth.',
    phone: '+91 98765 43210',
    email: 'ketan@netraflyoverseas.com',
    linkedin: '#',
  },
  {
    id: 'owner-2',
    name: 'Chintu Patel',
    role: 'Co-Founder & COO',
    image: '/images/owner-2.jpg',
    bio: 'Chintu brings 20 years of operations expertise to NetraFlyOverseas. Her focus on quality assurance and process optimization has helped establish the company as a trusted name in premium exports. She oversees all operational aspects and ensures timely delivery worldwide.',
    phone: '+91 98765 43211',
    email: 'chintu@netraflyoverseas.com',
    linkedin: '#',
  },
];

const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Amit Patel',
    role: 'Head of Exports',
    image: '/images/team-member-1.jpg',
    bio: 'Amit leads our export operations with 15 years of experience in international logistics and customs clearance.',
    linkedin: '#',
    email: 'amit@netraoverseas.com',
  },
  {
    id: 'team-2',
    name: 'Sneha Desai',
    role: 'Quality Assurance Manager',
    image: '/images/team-member-2.jpg',
    bio: 'Sneha ensures all products meet international quality standards with her decade of experience in food safety.',
    linkedin: '#',
    email: 'sneha@netraoverseas.com',
  },
  {
    id: 'team-3',
    name: 'Mohammed Ali',
    role: 'Regional Manager - Middle East',
    image: '/images/team-member-3.jpg',
    bio: 'Based in Dubai, Mohammed manages our Middle East operations and client relationships across the GCC region.',
    linkedin: '#',
    email: 'mohammed@netraoverseas.com',
  }
  
];

export function Team() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 bg-gradient-to-b from-cream to-white overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="team-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-amber text-sm font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'monospace' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            THE PEOPLE BEHIND
            <br />
            <span className="text-amber">NETRA OVERSEAS</span>
          </motion.h1>
          <motion.p
            className="text-lg text-charcoal/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A dedicated team of professionals committed to delivering excellence
            in global trade and building lasting partnerships worldwide.
          </motion.p>
        </div>
      </section>

      {/* Owners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-amber text-sm font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'monospace' }}
            >
              Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
              OUR FOUNDERS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {owners.map((owner, index) => (
              <motion.div
                key={owner.id}
                className="bg-cream rounded-none border-4 border-charcoal p-8 shadow-[8px_8px_0_#1A1A1A] hover:shadow-[12px_12px_0_#1A1A1A] transition-all duration-300"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 border-4 border-charcoal bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <span className="text-6xl text-charcoal/30 font-black">
                        {owner.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-charcoal mb-1">
                      {owner.name}
                    </h3>
                    <p
                      className="text-amber font-bold uppercase tracking-wide text-sm mb-4"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {owner.role}
                    </p>
                    <p className="text-charcoal/70 mb-6 leading-relaxed">
                      {owner.bio}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      {owner.phone && (
                        <a
                          href={`tel:${owner.phone}`}
                          className="flex items-center gap-2 text-charcoal/70 hover:text-amber transition-colors text-sm"
                        >
                          <Phone className="w-4 h-4" />
                          {owner.phone}
                        </a>
                      )}
                      {owner.email && (
                        <a
                          href={`mailto:${owner.email}`}
                          className="flex items-center gap-2 text-charcoal/70 hover:text-amber transition-colors text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          {owner.email}
                        </a>
                      )}
                      {owner.linkedin && (
                        <a
                          href={owner.linkedin}
                          className="flex items-center gap-2 text-charcoal/70 hover:text-amber transition-colors text-sm"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-amber text-sm font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'monospace' }}
            >
              Our Experts
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal">
              KEY TEAM MEMBERS
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white border-4 border-charcoal p-6 shadow-[6px_6px_0_#D97706] hover:shadow-[8px_8px_0_#D97706] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="w-full h-48 border-4 border-charcoal mb-6 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <span className="text-5xl text-charcoal/20 font-black">
                    {member.name.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-black text-charcoal mb-1">
                  {member.name}
                </h3>
                <p
                  className="text-amber font-bold uppercase tracking-wide text-xs mb-3"
                  style={{ fontFamily: 'monospace' }}
                >
                  {member.role}
                </p>
                <p className="text-charcoal/70 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 border-2 border-charcoal flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 border-2 border-charcoal flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              JOIN OUR TEAM
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion
              for excellence in global trade. If you're ready to make an impact,
              we'd love to hear from you.
            </p>
            <a
              href="mailto:careers@netraoverseas.com"
              className="inline-block px-8 py-4 bg-amber border-4 border-amber text-charcoal font-bold text-lg uppercase tracking-wide hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 shadow-[4px_4px_0_#F5F1E8]"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
