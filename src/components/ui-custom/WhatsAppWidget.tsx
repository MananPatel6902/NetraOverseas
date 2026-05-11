import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+18257135461';
  const message = 'Hello! I would like to inquire about your products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Popup */}
      {isOpen && (
        <motion.div
          className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900 font-semibold">Netra Fly Overseas Support</p>
                <p className="text-green-600 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          <p className="text-slate-500 text-sm mb-4">
            Hi there! How can we help you today? Click the button below to chat
            with us on WhatsApp.
          </p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Start Chat
          </a>
        </motion.div>
      )}

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
        <span
          className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Icon */}
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
        
        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
      </motion.button>
    </div>
  );
}
