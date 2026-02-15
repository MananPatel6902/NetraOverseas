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
import inventoryData from '@/data/inventory.json';

// Icon mapping from string names in JSON to actual components
const iconMap: Record<string, React.ElementType> = {
  Leaf,
  Wheat,
  Coffee,
  Droplets,
  Package,
};

interface Product {
  id: string;
  name: string;
  description: string;
  origin: string;
  image: string;
}

interface CategoryData {
  id: string;
  name: string;
  icon: string;
  description: string;
  products: Product[];
}

// --- ProductCard Component ---
interface ProductCardProps {
  product: Product;
  index: number;
  onRequestQuote: () => void;
}

function ProductCard({ product, index, onRequestQuote }: ProductCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 border border-slate-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

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
          onClick={onRequestQuote}
          className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 group/btn"
        >
          Request Quote
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- CategoryTab Component ---
interface CategoryTabProps {
  category: CategoryData;
  isActive: boolean;
  onClick: () => void;
}

function CategoryTab({ category, isActive, onClick }: CategoryTabProps) {
  const Icon = iconMap[category.icon] || Package;

  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg shadow-blue-600/20'
          : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{category.name}</span>
    </motion.button>
  );
}

// --- Main Inventory Component ---
const categories: CategoryData[] = inventoryData;

export function Inventory() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'spices');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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
        {/* Section Header */}
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

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          style={{ x: rightX, opacity: contentOpacity }}
        >
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            />
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
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onRequestQuote={scrollToContact}
                />
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
