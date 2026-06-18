import React from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import BookingInquiryView from './components/BookingInquiryView';
import { MealItem } from './types';
import { ChefHat, Phone, Mail, MapPin, Instagram, Facebook, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = React.useState<string>('home');
  // State for quote list
  const [selectedCart, setSelectedCart] = React.useState<Record<string, number>>({});
  // Add notification state
  const [addedNotification, setAddedNotification] = React.useState<string | null>(null);

  // Sync with localStorage on mount for smooth UX
  React.useEffect(() => {
    const savedCart = localStorage.getItem('happy_belly_catering_cart');
    if (savedCart) {
      try {
        setSelectedCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error reading localStorage for cart', err);
      }
    }
  }, []);

  const saveCartToStorage = (cart: Record<string, number>) => {
    setSelectedCart(cart);
    localStorage.setItem('happy_belly_catering_cart', JSON.stringify(cart));
  };

  // State manipulators
  const handleAddFoodToQuote = (item: MealItem) => {
    const nextCart = { ...selectedCart };
    nextCart[item.id] = (nextCart[item.id] || 0) + 1;
    saveCartToStorage(nextCart);

    // Trigger notification
    setAddedNotification(`"${item.name}" added to event inquiry sheet!`);
    setTimeout(() => {
      setAddedNotification(null);
    }, 4000);
  };

  const handleIncrementItem = (item: MealItem) => {
    const nextCart = { ...selectedCart };
    nextCart[item.id] = (nextCart[item.id] || 0) + 1;
    saveCartToStorage(nextCart);
  };

  const handleDecrementItem = (item: MealItem) => {
    const nextCart = { ...selectedCart };
    if (nextCart[item.id] && nextCart[item.id] > 1) {
      nextCart[item.id] -= 1;
    } else {
      delete nextCart[item.id];
    }
    saveCartToStorage(nextCart);
  };

  const handleRemoveItem = (item: MealItem) => {
    const nextCart = { ...selectedCart };
    delete nextCart[item.id];
    saveCartToStorage(nextCart);
  };

  const handleClearCart = () => {
    saveCartToStorage({});
  };

  return (
    <div id="application-root" className="min-h-screen flex flex-col bg-[#0c0d0e] text-stone-100 transition-colors">
      
      {/* 1. Header & Translucent Sticky Bar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenBooking={() => setCurrentTab('booking')} 
      />

      {/* Floating alert for item selection */}
      <AnimatePresence>
        {addedNotification && (
          <motion.div
            id="added-toast-notification"
            role="alert"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-24 right-4 sm:right-8 z-50 bg-stone-900 border border-emerald-500/30 text-white p-4 rounded-2xl shadow-2xl max-w-sm flex items-center gap-3.5"
          >
            <div className="bg-emerald-705 text-white p-1.5 rounded-lg bg-emerald-750">
              <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold">{addedNotification}</p>
              <button
                id="toast-configure-now"
                onClick={() => {
                  setCurrentTab('booking');
                  setAddedNotification(null);
                }}
                className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider mt-1 hover:text-emerald-300 transition-colors"
              >
                Configure Logistics Now →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main content page switching with motion fade parameters */}
      <main id="main-content-area" className="flex-grow pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {currentTab === 'home' && (
              <HomeView 
                onOrderNow={() => setCurrentTab('booking')}
                onAddFoodToQuote={handleAddFoodToQuote}
                selectedItemsCount={selectedCart}
              />
            )}

            {currentTab === 'about' && (
              <AboutView 
                onOpenBooking={() => setCurrentTab('booking')}
              />
            )}

            {currentTab === 'booking' && (
              <BookingInquiryView 
                selectedCart={selectedCart}
                onIncrementItem={handleIncrementItem}
                onDecrementItem={handleDecrementItem}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Luxury high-integrity Footer */}
      <footer id="footer-section" className="bg-stone-950 text-white font-sans border-t border-stone-900/60 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-900 pb-12">
          
          {/* Col 1 Brand */}
          <div className="space-y-4">
            <div id="footer-logo" className="flex items-center gap-2.5">
              <div className="bg-emerald-700 text-white p-2 rounded-xl">
                 <ChefHat className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                HAPPY BELLY<span className="text-emerald-500 font-sans font-light"> CATERING</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
              Designing bespoke gastronomy, strict food board-compliant clinical hygiene, and flawless temperature-controlled transit logistics across Nairobi and East African regions.
            </p>
            <div className="flex items-center gap-4 text-stone-500 hover:text-white pt-2">
              <a href="#instagram" className="hover:text-emerald-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="hover:text-emerald-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-semibold text-stone-300 font-mono tracking-widest border-l-2 border-emerald-500 pl-3">Pages</h4>
            <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-emerald-400 transition-all font-light">
                  Home Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-emerald-400 transition-all font-light">
                  About Story & Vision
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('booking')} className="hover:text-emerald-400 transition-all font-light">
                  Live Price Quote Machine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Operation Hours */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-semibold text-stone-300 font-mono tracking-widest border-l-2 border-emerald-500 pl-3">Staging Hours</h4>
            <div className="space-y-2 text-stone-400 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-light">Catering Ops: Mon - Sun</span>
              </div>
              <p className="font-mono text-[11px] text-stone-300 pl-5">06:00 AM - 11:00 PM PST</p>
              
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-light">Office Support: 24/7 Hours</span>
              </div>
            </div>
          </div>

          {/* Col 4 Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-semibold text-stone-300 font-mono tracking-widest border-l-2 border-emerald-500 pl-3">Get In Touch</h4>
            <div id="footer-contacts" className="space-y-3.5 text-stone-400 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <address className="not-italic font-light">
                  Happy Belly Food Arena Suite, Off Ngong Road, Kilimani, Nairobi, Kenya
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span className="font-mono font-light">+254 (0) 700 555 BELLY</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span className="font-light">booking@happybellycatering.co.ke</span>
              </div>
            </div>
          </div>

        </div>

        {/* copyright and system details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-500 font-mono">
          <p>© {new Date().getFullYear()} Happy Belly Catering Group LLC. All rights reserved.</p>
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KeBS & Ministry of Health Guidelines Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
