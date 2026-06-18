import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Star, 
  ChevronRight, 
  ShoppingBag, 
  CheckCircle, 
  HeartHandshake, 
  BadgeDollarSign, 
  ChefHat,
  Plus,
  UtensilsCrossed
} from 'lucide-react';
import { MealItem } from '../types';
import { FEATURED_MEALS, WHY_CHOOSE_US_ITEMS, TESTIMONIALS, HERO_BANNER_IMG } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onOrderNow: () => void;
  onAddFoodToQuote: (item: MealItem) => void;
  selectedItemsCount: Record<string, number>;
}

export default function HomeView({ onOrderNow, onAddFoodToQuote, selectedItemsCount }: HomeViewProps) {
  const [activeCategory, setActiveCategory] = React.useState<'all' | 'meal' | 'snack' | 'beverage' | 'package'>('all');

  const filteredMeals = React.useMemo(() => {
    if (activeCategory === 'all') return FEATURED_MEALS;
    return FEATURED_MEALS.filter(meal => meal.category === activeCategory);
  }, [activeCategory]);

  return (
    <div id="home-view-container" className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION WITH PROFESSIONAL CATERING BANNER */}
      <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden pt-16">
        {/* Banner Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            id="hero-banner-image"
            src={HERO_BANNER_IMG}
            alt="Elite High-end Gourmet Catering Buffet Presentation"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-stone-950/50" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-700/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-emerald-400 text-xs tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Trusted Healthy Catering Partner</span>
          </div>

          <h1 id="hero-headline" className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-fade-in">
            Your Trusted Healthy Catering & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500">
              Clean, Nutrient-Rich Food
            </span>
          </h1>

          <p id="hero-slogan" className="max-w-2xl mx-auto text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Delivering the finest fresh, organic Kenyan delicacies prepared with elite hygienic controls. We craft exceptionally clean food to support your wellness lifestyle and inspire your guests at every milestone.
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-order-button"
              onClick={onOrderNow}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold uppercase text-sm tracking-widest shadow-xl shadow-emerald-700/20 hover:shadow-emerald-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4 text-white" />
              <span>Configure Menu & Order</span>
            </button>
            <button
              id="hero-request-delivery-button"
              onClick={onOrderNow}
              className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500/50 text-white hover:text-emerald-400 px-8 py-4 rounded-full font-bold uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-2 group"
            >
              <span>Request Delivery / Quote</span>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Quick trust metrics */}
          <div id="hero-metrics" className="pt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-stone-800/40">
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-emerald-400">100%</p>
              <p className="text-[10px] sm:text-xs text-stone-400 font-mono tracking-wider uppercase mt-1">Organic Sourced</p>
            </div>
            <div className="border-x border-stone-800/40">
              <p className="text-xl sm:text-2xl font-serif font-bold text-emerald-400">5 ★</p>
              <p className="text-[10px] sm:text-xs text-stone-400 font-mono tracking-wider uppercase mt-1">Hygiene Rating</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-emerald-400">12k+</p>
              <p className="text-[10px] sm:text-xs text-stone-400 font-mono tracking-wider uppercase mt-1">Guests Nourished</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME SECTION */}
      <section id="welcome-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Narrative Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 px-3.5 py-1 rounded-full text-stone-300 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Welcome to Happy Belly Catering</span>
            </div>
            
            <h2 id="welcome-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              A Legacy of Culinary Innovation, Crisp Hygiene & Absolute Reliability
            </h2>
            
            <p id="welcome-body-1" className="text-stone-300 text-base sm:text-lg leading-relaxed">
              For over a decade, we have pioneered five-star catering structures that treat food not merely as fuel, but as an interactive, multisensory performance. We craft customizable gourmet menu cards designed to spark delight and build unforgettable moments for you and your guests.
            </p>
            
            <p id="welcome-body-2" className="text-stone-400 text-sm leading-relaxed border-l-2 border-emerald-500 pl-4">
              At Happy Belly, pristine hygiene guidelines and stringent security protocols govern our master-staging kitchens. We believe the path to absolute peace-of-mind at any major celebration rests equal parts on Michelin-quality taste and strict, clockwork logistics.
            </p>
          </div>

          {/* Three pillars columns styled beautifully */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {/* Pillar 1: Quality */}
            <div id="pillar-quality" className="bg-[#131517] border border-stone-800/80 p-6 rounded-2xl shadow-md hover:border-emerald-500/20 transition-all flex items-start gap-4">
              <div className="bg-emerald-950/45 text-emerald-300 p-3 rounded-xl shrink-0 border border-emerald-900/40">
                <Award className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-bold text-white">Outstanding Quality</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Chef-vetted recipes using non-processed local ingredients, designed beautifully for custom culinary palettes.
                </p>
              </div>
            </div>

            {/* Pillar 2: Hygiene */}
            <div id="pillar-hygiene" className="bg-[#131517] border border-stone-800/80 p-6 rounded-2xl shadow-md hover:border-emerald-500/20 transition-all flex items-start gap-4">
              <div className="bg-emerald-950/45 text-emerald-400 p-3 rounded-xl shrink-0 border border-emerald-800/35">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-bold text-white">Pristine Food Hygiene</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Sterilized prep suites, sanitization controls, and direct temperature-monitored sealed hot transit.
                </p>
              </div>
            </div>

            {/* Pillar 3: Reliability */}
            <div id="pillar-reliability" className="bg-[#131517] border border-stone-800/80 p-6 rounded-2xl shadow-md hover:border-emerald-500/20 transition-all flex items-start gap-4">
              <div className="bg-indigo-950/45 text-indigo-400 p-3 rounded-xl shrink-0 border border-indigo-850/35">
                <Truck className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-bold text-white">Uncompromising Reliability</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Precision timeline staging, backup courier protocols, and dedicated event supervisors on call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section id="why-choose-us-section" className="bg-stone-900 text-white py-20 relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase">The Happy Belly Standard</p>
            <h2 id="why-choose-us-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Why Happy Belly Catering Stands Apart
            </h2>
            <p id="why-choose-us-subtitle" className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Our holistic operations checklist is designed to streamline event organization and provide premium taste parameters affordably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
              // Icon mapping based on index or title
              return (
                <div 
                  key={item.id}
                  id={`why-card-${idx}`}
                  className="bg-stone-950/80 border border-stone-800 p-8 rounded-2xl space-y-4 hover:border-emerald-500/30 transition-all group hover:shadow-lg"
                >
                  <div className="inline-flex p-3 rounded-xl bg-stone-900 text-emerald-450 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                    {idx === 0 && <CheckCircle className="w-6 h-6 stroke-[2]" />}
                    {idx === 1 && <ChefHat className="w-6 h-6 stroke-[2]" />}
                    {idx === 2 && <Truck className="w-6 h-6 stroke-[2]" />}
                    {idx === 3 && <BadgeDollarSign className="w-6 h-6 stroke-[2]" />}
                    {idx === 4 && <HeartHandshake className="w-6 h-6 stroke-[2]" />}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (THE GASTRONOMIC MENU) */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 p-1 px-3 bg-emerald-950/40 text-emerald-300 rounded-full text-xs font-medium border border-emerald-900/40">
              <CookingIndicator />
              <span>Explore Gastronomic Creations</span>
            </div>
            <h2 id="featured-products-title" className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Curated Masterpiece Catalogues
            </h2>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Browse our seasonal culinary menus. Click on items to add them directly to your Custom Event Quote & Delivery inquiry checklist!
            </p>
          </div>

          {/* Tab Filter */}
          <div id="category-tabs" className="flex flex-wrap items-center gap-2 bg-stone-900 border border-stone-800/80 p-1.5 rounded-2xl self-start md:self-end">
            {(['all', 'meal', 'snack', 'beverage', 'package'] as const).map((cat) => (
              <button
                key={cat}
                id={`tab-btn-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {cat === 'all' && 'All Food'}
                {cat === 'meal' && 'Popular Meals'}
                {cat === 'snack' && 'Snacks'}
                {cat === 'beverage' && 'Beverages'}
                {cat === 'package' && 'Corporate Packages'}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div id="products-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredMeals.map((meal) => {
              const countInCart = selectedItemsCount[meal.id] || 0;
              return (
                <motion.div
                  key={meal.id}
                  id={`product-card-${meal.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#131517] border border-stone-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col group h-full"
                >
                  {/* Photo Staging */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-900">
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlap */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />

                    {/* Left top features badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {meal.popular && (
                        <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">
                          Popular Choice
                        </span>
                      )}
                      <span className="bg-stone-900/80 backdrop-blur-sm text-stone-200 text-[8px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full">
                        {meal.category === 'meal' && 'ENTRÉE'}
                        {meal.category === 'snack' && 'HORS D’OEUVRE'}
                        {meal.category === 'beverage' && 'ELIXIR'}
                        {meal.category === 'package' && 'OFFICIAL COMBO'}
                      </span>
                    </div>

                    {/* Price tag bottom-right overlay */}
                    <div className="absolute bottom-3 right-3 bg-stone-900/95 backdrop-blur-sm shadow-md px-2.5 py-1 rounded-lg border border-stone-800 text-[11px]">
                      <span className="text-[10px] text-stone-400 font-mono">From </span>
                      <span className="text-white font-mono font-bold">
                        Ksh {meal.price.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-stone-400 font-sans">
                        {meal.category === 'package' ? '/head' : '/person'}
                      </span>
                    </div>
                  </div>

                  {/* Core Attributes */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-stone-100 group-hover:text-emerald-400 transition-colors">
                        {meal.name}
                      </h3>
                      <p className="text-stone-400 text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {meal.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2.5 border-t border-stone-800">
                      {/* Dietary / Feature bullet list */}
                      <div className="flex flex-wrap gap-1">
                        {meal.features.map((feat, i) => (
                          <span 
                            key={i} 
                            className="bg-stone-900 border border-stone-800 text-stone-300 text-[9px] px-1.5 py-0.5 rounded font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Add directly to Quotebuilder */}
                      <button
                        id={`add-to-quote-btn-${meal.id}`}
                        onClick={() => onAddFoodToQuote(meal)}
                        className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                          countInCart > 0
                            ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                            : 'bg-stone-900 hover:bg-emerald-700 hover:text-white border border-stone-800 hover:border-emerald-600 text-stone-300'
                        }`}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add To Query List {countInCart > 0 && `(${countInCart})`}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section id="testimonials-section" className="bg-stone-950/30 py-12 border-y border-stone-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase">Gastronic Appreciations</p>
            <h2 id="testimonials-title" className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Nourishing Happy Belly Events
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Real stories and rated approvals from wedding organizers, corporate clients, and private culinary lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi, idx) => (
              <div 
                key={testi.id}
                id={`testimonial-card-${testi.id}`}
                className="bg-[#131517] border border-stone-800/80 p-8 rounded-2xl shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-emerald-500">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-500 stroke-none" />
                    ))}
                  </div>
                  {/* Quote text */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                    "{testi.text}"
                  </p>
                </div>

                {/* Author profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-800/60">
                  <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-805 text-stone-300 flex items-center justify-center font-serif font-bold text-sm">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{testi.name}</h4>
                    <p className="text-stone-500 text-[10px] font-mono tracking-tight mt-0.5">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Cooking mini ornament SVG component
function CookingIndicator() {
  return (
    <svg className="w-3 h-3 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707" />
    </svg>
  );
}
