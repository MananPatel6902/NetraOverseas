import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Wheat,
  Leaf,
  Coffee,
  Droplets,
  ArrowRight,
  Package,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  description: string;
  origin: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  products: Product[];
}

const categories: Category[] = [
  {
    id: 'spices',
    name: 'Spices',
    icon: Leaf,
    description: 'Premium quality spices sourced from the finest regions',
    products: [
      {
        id: 'turmeric',
        name: 'Turmeric Powder',
        description: 'High-curcumin turmeric from Erode, known for its vibrant color and medicinal properties.',
        origin: 'India',
        image: '/images/turmeric.jpg',
      },
      {
        id: 'cumin',
        name: 'Cumin Seeds',
        description: 'Aromatic cumin seeds from Gujarat, perfect for culinary and medicinal use.',
        origin: 'India',
        image: '/images/cumin.jpg',
      },
      {
        id: 'cardamom',
        name: 'Green Cardamom',
        description: 'Premium grade cardamom from Kerala, the queen of spices.',
        origin: 'India',
        image: '/images/cardamom.jpg',
      },
      {
        id: 'pepper',
        name: 'Black Pepper',
        description: 'Bold and aromatic black peppercorns from the Western Ghats.',
        origin: 'India',
        image: '/images/pepper.jpg',
      },
    ],
  },
  {
    id: 'flours',
    name: 'Flours',
    icon: Wheat,
    description: 'Nutritious flours milled to perfection',
    products: [
      {
        id: 'chickpea',
        name: 'Channe ka Atta',
        description: 'Protein-rich chickpea flour, gluten-free and versatile.',
        origin: 'India',
        image: '/images/chickpea-flour.jpg',
      },
      {
        id: 'wheat',
        name: 'Ghehu ka Atta',
        description: 'Stone-ground whole wheat flour for authentic taste.',
        origin: 'India',
        image: '/images/wheat-flour.jpg',
      },
      {
        id: 'rice',
        name: 'Rice Flour',
        description: 'Fine rice flour ideal for South Indian delicacies.',
        origin: 'India',
        image: '/images/rice-flour.jpg',
      },
      {
        id: 'millet',
        name: 'Millet Flour',
        description: 'Nutrient-dense millet flour for healthy alternatives.',
        origin: 'India',
        image: '/images/millet-flour.jpg',
      },
    ],
  },
  {
    id: 'grains',
    name: 'Grains & Pulses',
    icon: Package,
    description: 'Wholesome grains and pulses for global markets',
    products: [
      {
        id: 'basmati',
        name: 'Basmati Rice',
        description: 'Aromatic long-grain basmati rice from Punjab.',
        origin: 'India',
        image: '/images/basmati.jpg',
      },
      {
        id: 'moong',
        name: 'Moong Dal',
        description: 'Split yellow mung beans, easy to digest and nutritious.',
        origin: 'India',
        image: '/images/moong-dal.jpg',
      },
      {
        id: 'toor',
        name: 'Toor Dal',
        description: 'Premium pigeon peas, staple of Indian cuisine.',
        origin: 'India',
        image: '/images/toor-dal.jpg',
      },
      {
        id: 'quinoa',
        name: 'Quinoa',
        description: 'Protein-rich superfood grain for health-conscious consumers.',
        origin: 'Peru/India',
        image: '/images/quinoa.jpg',
      },
    ],
  },
  {
    id: 'oils',
    name: 'Oils & Ghee',
    icon: Droplets,
    description: 'Pure and natural oils for cooking and wellness',
    products: [
      {
        id: 'mustard',
        name: 'Mustard Oil',
        description: 'Cold-pressed mustard oil with authentic pungency.',
        origin: 'India',
        image: '/images/mustard-oil.jpg',
      },
      {
        id: 'coconut',
        name: 'Coconut Oil',
        description: 'Virgin coconut oil from Kerala, multi-purpose goodness.',
        origin: 'India',
        image: '/images/coconut-oil.jpg',
      },
      {
        id: 'ghee',
        name: 'Pure Ghee',
        description: 'Traditional clarified butter with rich aroma.',
        origin: 'India',
        image: '/images/ghee.jpg',
      },
      {
        id: 'sesame',
        name: 'Sesame Oil',
        description: 'Cold-pressed sesame oil for cooking and massage.',
        origin: 'India',
        image: '/images/sesame-oil.jpg',
      },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: Coffee,
    description: 'Refreshing beverages and ingredients',
    products: [
      {
        id: 'tea',
        name: 'Assam Tea',
        description: 'Bold and malty black tea from Assam gardens.',
        origin: 'India',
        image: '/images/tea.jpg',
      },
      {
        id: 'coffee',
        name: 'Arabica Coffee',
        description: 'Single-origin Arabica from Chikmagalur hills.',
        origin: 'India',
        image: '/images/coffee.jpg',
      },
      {
        id: 'cashew',
        name: 'Cashew Nuts',
        description: 'Premium W320 grade cashews from Goa.',
        origin: 'India',
        image: '/images/cashew.jpg',
      },
      {
        id: 'raisins',
        name: 'Raisins',
        description: 'Sweet and plump raisins from Nashik vineyards.',
        origin: 'India',
        image: '/images/raisins.jpg',
      },
    ],
  },
];

export function Inventory() {
  const [activeCategory, setActiveCategory] = useState<string>('spices');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Slide animations for left and right content
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [-120, -40, 0, -40, -120]
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [120, 40, 0, 40, 120]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setIsTransitioning(false);
    }, 300);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="inventory"
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-50"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Slides in from left */}
        <motion.div
          className="text-center mb-12"
          style={{ x: leftX, opacity: contentOpacity }}
        >
          <motion.span
            className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Products
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore Our Inventory
          </motion.h2>
          <motion.p
            className="text-slate-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Browse our extensive catalog of premium quality products. Click on a
            category to discover our offerings.
          </motion.p>
        </motion.div>

        {/* Category Tabs - Slides in from right */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          style={{ x: rightX, opacity: contentOpacity }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Category Description */}
        <AnimatePresence mode="wait">
          {activeCategoryData && (
            <motion.div
              key={activeCategory}
              className="text-center mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-slate-500">{activeCategoryData.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div style={{ opacity: contentOpacity }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategoryData?.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 border border-slate-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Product Image Placeholder */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Package className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />

                    {/* Origin Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
                      <span className="text-xs text-blue-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        {product.origin}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h4 className="text-slate-900 font-semibold text-lg mb-2 group-hover:text-blue-700 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={scrollToContact}
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 group/btn"
                    >
                      Request Quote
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bulk Order CTA */}
        <motion.div
          className="mt-16 text-center"
          style={{ opacity: contentOpacity }}
        >
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-slate-100 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Looking for Bulk Orders?
            </h3>
            <p className="text-slate-500 mb-6">
              We offer competitive pricing and customized solutions for wholesale
              buyers. Contact our sales team for special rates.
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white shadow-lg shadow-blue-600/20"
            >
              Contact Sales Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
