import React from 'react';
import { ChefHat, Phone, CalendarRange } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

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
          ? 'bg-stone-900/90 backdrop-blur-md shadow-lg border-b border-stone-800 py-3'
          : 'bg-stone-950/60 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            id="nav-logo"
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="bg-emerald-700 text-white p-2 rounded-xl transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-105">
              <ChefHat id="logo-icon" className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                HAPPY BELLY<span className="text-emerald-500 font-sans font-light"> CATERING</span>
              </span>
              <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">Gastronomy & Custom Catering</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8 font-sans">
            <button
              id="nav-link-home"
              onClick={() => setCurrentTab('home')}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 uppercase ${
                currentTab === 'home'
                  ? 'text-emerald-400'
                  : 'text-stone-300 hover:text-white'
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
              className={`text-sm font-medium tracking-wide transition-all relative py-1 uppercase ${
                currentTab === 'about'
                  ? 'text-emerald-400'
                  : 'text-stone-300 hover:text-white'
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
              className={`text-sm font-medium tracking-wide transition-all relative py-1 uppercase ${
                currentTab === 'booking'
                  ? 'text-emerald-400'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Booking & Price Calculator
              {currentTab === 'booking' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Action Call & CTA */}
          <div id="nav-actions" className="flex items-center gap-4">
            <a
              id="nav-phone-call"
              href="tel:+254700555234"
              className="hidden lg:flex items-center gap-2 text-stone-300 hover:text-emerald-400 transition-colors py-1.5"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-mono font-medium text-stone-300 hover:text-emerald-400 transition-colors">+254 (0) 700 555 BELLY</span>
            </a>
            <button
              id="get-instant-quote-btn"
              onClick={onOpenBooking}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/45 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <CalendarRange className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Get Free Quote</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
