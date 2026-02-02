import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, MessageSquare, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'import', label: 'Import Services' },
  { value: 'export', label: 'Export Services' },
  { value: 'partnership', label: 'Business Partnership' },
  { value: 'career', label: 'Career Opportunities' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Slide animations - content centered from 0.2 to 0.8 scroll progress
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [-60, -20, 0, 0, -20, -60]
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [60, 20, 0, 0, 20, 60]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.15, 0.85, 0.92, 1],
    [0, 0.7, 1, 1, 0.7, 0]
  );

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Form submitted:', formData);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-50"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Info - Slides in from left */}
          <motion.div
            style={{ x: leftX, opacity: contentOpacity }}
          >
            <span className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Whether you're looking to import quality products or explore export
              opportunities, our team is ready to help you navigate the global
              trade landscape.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: MessageSquare,
                  title: 'Quick Response',
                  description: 'We typically respond within 24 hours during business days.',
                },
                {
                  icon: User,
                  title: 'Dedicated Support',
                  description: 'A dedicated account manager for every client.',
                },
                {
                  icon: Mail,
                  title: 'Multiple Channels',
                  description: 'Reach us via email, phone, or WhatsApp.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-semibold mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form - Slides in from right */}
          <motion.div
            style={{ x: rightX, opacity: contentOpacity }}
          >
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Send Us a Message
              </h3>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-slate-500">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 234 567 8900"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType" className="text-slate-700">
                        Inquiry Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={handleInquiryTypeChange}
                        required
                      >
                        <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-blue-500/20">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200">
                          {inquiryTypes.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={type.value}
                              className="text-slate-900 hover:bg-blue-50 focus:bg-blue-50"
                            >
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white py-6 text-lg group shadow-lg shadow-blue-600/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-slate-400 text-xs">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
