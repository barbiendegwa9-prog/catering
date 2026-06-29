import React from 'react';
import { ChefHat, Phone, CalendarRange, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenBooking, theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-stone-900/90 backdrop-blur-md shadow-lg border-b border-stone-800 py-2'
            : 'bg-white/90 backdrop-blur-md shadow-md border-b border-stone-200 py-2'
          : theme === 'dark'
            ? 'bg-stone-950/65 backdrop-blur-sm py-3.5'
            : 'bg-stone-50/65 backdrop-blur-sm py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            id="nav-logo"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              setCurrentTab('home');
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="bg-emerald-700 text-white p-1.5 rounded-lg transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-105">
              <ChefHat id="logo-icon" className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className={`font-serif text-lg sm:text-xl font-bold tracking-tight group-hover:text-emerald-500 transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-stone-900'
              }`}>
                HAPPY BELLY<span className="text-emerald-500 font-sans font-light"> CATERING</span>
              </span>
              <p className="text-[9px] text-emerald-500 font-mono tracking-wide uppercase font-semibold">Trusted Healthy Catering</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-5 font-sans">
            <button
              id="nav-link-home"
              onClick={() => setCurrentTab('home')}
              className={`text-xs font-semibold tracking-wider transition-all relative py-1 uppercase ${
                currentTab === 'home'
                  ? 'text-emerald-500 font-bold'
                  : theme === 'dark'
                    ? 'text-stone-300 hover:text-white'
                    : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Home
              {currentTab === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
            <button
              id="nav-link-about"
              onClick={() => setCurrentTab('about')}
              className={`text-xs font-semibold tracking-wider transition-all relative py-1 uppercase ${
                currentTab === 'about'
                  ? 'text-emerald-500 font-bold'
                  : theme === 'dark'
                    ? 'text-stone-300 hover:text-white'
                    : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              About Us
              {currentTab === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
            <button
              id="nav-link-booking"
              onClick={() => setCurrentTab('booking')}
              className={`text-xs font-semibold tracking-wider transition-all relative py-1 uppercase ${
                currentTab === 'booking'
                  ? 'text-emerald-500 font-bold'
                  : theme === 'dark'
                    ? 'text-stone-300 hover:text-white'
                    : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Booking & Price Calculator
              {currentTab === 'booking' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Action Call & CTA */}
          <div id="nav-actions" className="flex items-center gap-2.5 sm:gap-4">
            <a
              id="nav-phone-call"
              href="tel:+254700555234"
              className={`hidden lg:flex items-center gap-2 transition-colors py-1.5 ${
                theme === 'dark' ? 'text-stone-300 hover:text-emerald-400' : 'text-stone-700 hover:text-emerald-600'
              }`}
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-mono font-medium">+254 (0) 700 555 BELLY</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle dark and light theme"
              className={`p-2 rounded-full border transition-all hover:scale-110 active:scale-95 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-stone-900/85 border-stone-800 text-amber-400 hover:text-amber-300 hover:bg-stone-800'
                  : 'bg-stone-100/90 border-stone-200 text-amber-600 hover:text-amber-700 hover:bg-stone-200/80'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Desktop CTA Button */}
            <button
              id="get-instant-quote-btn"
              onClick={onOpenBooking}
              className="hidden sm:flex bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/40 hover:-translate-y-0.5 transition-all items-center gap-1.5"
            >
              <CalendarRange className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Get Free Quote</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`md:hidden p-2 rounded-xl border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-stone-900/85 border-stone-800 text-stone-300 hover:text-white'
                  : 'bg-stone-100 border-stone-200 text-stone-700 hover:text-stone-900'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-4.5 h-4.5" />
              ) : (
                <Menu className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-b overflow-hidden ${
              theme === 'dark'
                ? 'bg-stone-950 border-stone-900 text-stone-200'
                : 'bg-white border-stone-200 text-stone-800'
            }`}
          >
            <div className="px-4 py-4 space-y-2 flex flex-col font-sans">
              <button
                id="mobile-nav-link-home"
                onClick={() => {
                  setCurrentTab('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors ${
                  currentTab === 'home'
                    ? 'bg-emerald-800 text-white'
                    : theme === 'dark'
                      ? 'hover:bg-stone-900 text-stone-300'
                      : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                Home
              </button>
              <button
                id="mobile-nav-link-about"
                onClick={() => {
                  setCurrentTab('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors ${
                  currentTab === 'about'
                    ? 'bg-emerald-800 text-white'
                    : theme === 'dark'
                      ? 'hover:bg-stone-900 text-stone-300'
                      : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                About Us
              </button>
              <button
                id="mobile-nav-link-booking"
                onClick={() => {
                  setCurrentTab('booking');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors ${
                  currentTab === 'booking'
                    ? 'bg-emerald-800 text-white'
                    : theme === 'dark'
                      ? 'hover:bg-stone-900 text-stone-300'
                      : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                Booking & Price Calculator
              </button>

              {/* Mobile Free Quote Action */}
              <div className="pt-2 border-t border-stone-800/30">
                <button
                  id="mobile-menu-cta-btn"
                  onClick={() => {
                    onOpenBooking();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <CalendarRange className="w-3.5 h-3.5" />
                  <span>Get Free Quote</span>
                </button>
              </div>

              {/* Mobile Contact Support phone number */}
              <div className={`pt-2 flex flex-col gap-1 text-[10px] font-mono ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>
                <span>Hotline: +254 (0) 700 555 BELLY</span>
                <span>Operating Hours: 06:00 AM - 11:00 PM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
