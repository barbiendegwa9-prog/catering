import React from 'react';
import { Sparkles, CalendarRange, Quote, Eye, Target, Award, Heart, CheckSquare } from 'lucide-react';

interface AboutViewProps {
  onOpenBooking: () => void;
  theme?: 'dark' | 'light';
}

export default function AboutView({ onOpenBooking, theme = 'dark' }: AboutViewProps) {
  return (
    <div id="about-us-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
      {/* Header Panel */}
      <div id="about-header" className="text-center max-w-3xl mx-auto space-y-4 pt-10">
        <div className={`inline-flex items-center gap-1.5 p-1 px-3 rounded-full text-xs font-semibold border uppercase tracking-widest font-mono ${
          theme === 'dark'
            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/45'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          <Award className="w-3.5 h-3.5" />
          <span>About Happy Belly Catering</span>
        </div>
        <h1 id="about-headline" className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-stone-900'
        }`}>
          Crafting Happy Belly Catering Since 2012
        </h1>
        <p id="about-subtitle" className={`text-xs sm:text-lg leading-relaxed ${
          theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
        }`}>
          The fine culinary narrative of passionate chefs, robust hygiene controls, and state-of-the-art event planning.
        </p>
      </div>

      {/* Grid split: Editorial history */}
      <section id="company-story-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Story Illustration Grid */}
        <div className="relative order-last lg:order-first">
          {/* Main Visual */}
          <div className={`aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border ${
            theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800&auto=format&fit=crop&q=80" 
              alt="Happy guests enjoying fresh Kenyan food at a social gathering" 
              className="w-full h-full object-cover filter brightness-[0.82] hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Overlay Box */}
          <div className={`absolute -bottom-6 -right-6 p-6 rounded-2xl max-w-xs shadow-xl space-y-2 border hidden sm:block ${
            theme === 'dark'
              ? 'bg-stone-950 text-white border-stone-800'
              : 'bg-white text-stone-950 border-stone-200 shadow-xl'
          }`}>
            <p className="text-emerald-500 font-mono text-2xl font-bold">14+ Years</p>
            <p className="font-serif text-sm font-semibold">Of pristine five-star banqueting experience.</p>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>Serving over 100 private wedding and boardrooms every singular month with perfection.</p>
          </div>
        </div>

        {/* Story text */}
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2">
            <span className="text-emerald-500 text-xs font-mono tracking-widest uppercase font-bold">The History & Growth</span>
            <h2 id="story-title" className={`font-serif text-2xl sm:text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-stone-900'
            }`}>
              Our Journey to Culinary Excellence
            </h2>
          </div>

          <div className={`space-y-4 text-xs sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-stone-300' : 'text-stone-750'
          }`}>
            <p>
              Happy Belly Catering was founded in 2012 by executive master chef Julian Vane and logistics veteran Isabella Sterling. Julian arrived from prestigious European hotels with a simple vision: to bridge the gap between elegant five-star fine dining and the complex operational realities of on-site catering events.
            </p>
            <p>
              What started as an artisan test room catering for discrete private dinners soon gained repute among financial headquarters and grand event hosts. Julian’s dedication to custom, scratch-made menus combined with Isabella’s clockwork dispatch checklist meant clients didn’t just get meals—they got reassurance and absolute precision.
            </p>
            <p>
              By 2020, Happy Belly had transitioned into a full-scale culinary group housed inside integrated 8,000 square-foot prep suites equipped with high-tech steam monitors, flash cold storage facilities, and green electric heating trucks. Today, we stand proud as a premier sustainable provider of curated weddings, high-powered boardrooms, and grand holiday celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Vision statement & Mission statement inside elegant cards */}
      <section id="vision-mission-section" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6">
        
        {/* VISION CARD */}
        <div id="vision-card" className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-md border flex flex-col justify-between space-y-4 relative overflow-hidden group ${
          theme === 'dark'
            ? 'bg-stone-950 text-white border-stone-800'
            : 'bg-white text-stone-900 border-stone-200'
        }`}>
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 transition-colors" />
          
          <div className="space-y-3 relative z-10">
            <div className={`p-2.5 rounded-xl w-fit ${
              theme === 'dark' ? 'bg-stone-900 border border-stone-800 text-emerald-400' : 'bg-stone-100 border border-stone-250 text-emerald-600'
            }`}>
              <Eye className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl font-bold">Our Vision</h3>
            
            <p className={`text-xs sm:text-sm leading-relaxed font-light italic border-l-2 border-emerald-600 pl-4 py-1 ${
              theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
            }`}>
              "To become the leading provider of high-quality catering services while maintaining exceptional customer satisfaction."
            </p>
          </div>
          
          <p className={`text-xs sm:text-[13px] leading-relaxed relative z-10 pt-2 border-t ${
            theme === 'dark' ? 'text-stone-400 border-stone-800/60' : 'text-stone-600 border-stone-150'
          }`}>
            We actively work to elevate hospitality parameters daily, establishing eco-friendly sourcing and cutting-edge prep standards that set benchmark parameters nationwide.
          </p>
        </div>

        {/* MISSION CARD */}
        <div id="mission-card" className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-md border flex flex-col justify-between space-y-4 group ${
          theme === 'dark'
            ? 'bg-[#131517] border-stone-800/80 text-white'
            : 'bg-white border-stone-200 text-stone-900'
        }`}>
          <div className="space-y-3">
            <div className={`p-2.5 rounded-xl w-fit border ${
              theme === 'dark' ? 'bg-emerald-950/45 text-emerald-300 border-emerald-900/40' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <Target className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl font-bold">Our Mission</h3>
            <p className={`text-xs sm:text-[13px] leading-relaxed ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
              We pledge to provide trusted healthy, clean, and organic culinary creations customized for all event checklists, deploying rigid KeBS and Ministry of Health clean food guidelines while remaining transparently priced.
            </p>
          </div>

          {/* Key pillars checklist */}
          <div className={`space-y-2.5 pt-4 border-t ${
            theme === 'dark' ? 'border-stone-800/60' : 'border-stone-150'
          }`}>
            <div className={`flex items-center gap-2.5 text-xs font-semibold ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
              <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Sourcing 100% farm-to-table organic poultry & vegetables</span>
            </div>
            <div className={`flex items-center gap-2.5 text-xs font-semibold ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
              <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full compliance with extreme health & temperature guidelines</span>
            </div>
            <div className={`flex items-center gap-2.5 text-xs font-semibold ${theme === 'dark' ? 'text-stone-300' : 'text-stone-700'}`}>
              <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Delivering 100% customer reliability and zero hidden costs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Chef Council */}
      <section id="chef-council-section" className="space-y-12 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-emerald-500 text-xs font-mono tracking-widest uppercase font-bold">The Cuisine Craftsmen</span>
          <h2 id="chefs-title" className={`font-serif text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>
            Guided by Culinary Masterminds
          </h2>
          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
            Meet the culinary designers directing your bespoke event meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Chef 1 */}
          <div id="chef-card-1" className={`p-4 sm:p-5 rounded-xl text-center space-y-2.5 border transition-all ${
            theme === 'dark'
              ? 'bg-[#131517] border-stone-800/80 hover:border-emerald-500/20'
              : 'bg-white border-stone-200 hover:border-emerald-500/20 shadow-sm'
          }`}>
            <div className={`w-20 h-20 rounded-full border-2 border-emerald-500/30 overflow-hidden mx-auto ${
              theme === 'dark' ? 'bg-stone-900' : 'bg-stone-100'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" 
                alt="Chef Julian Vane" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className={`font-serif text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Julian Vane</h3>
              <p className="text-emerald-500 text-[11px] sm:text-xs font-mono font-bold">Co-Founder & Culinary Director</p>
            </div>
            <p className={`text-xs sm:text-[13px] leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-650'}`}>
              With 18 years of experience spearheading dining for Luxury Resorts, Julian designs recipes that prioritize fine ingredients and clean pairings.
            </p>
          </div>

          {/* Chef 2 */}
          <div id="chef-card-2" className={`p-4 sm:p-5 rounded-xl text-center space-y-2.5 border transition-all ${
            theme === 'dark'
              ? 'bg-[#131517] border-stone-800/80 hover:border-emerald-500/20'
              : 'bg-white border-stone-200 hover:border-emerald-500/20 shadow-sm'
          }`}>
            <div className={`w-20 h-20 rounded-full border-2 border-emerald-500/30 overflow-hidden mx-auto ${
              theme === 'dark' ? 'bg-stone-900' : 'bg-stone-100'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&auto=format&fit=crop&q=80" 
                alt="Chef Maria Gomez" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className={`font-serif text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Maria Gomez</h3>
              <p className="text-emerald-500 text-[11px] sm:text-xs font-mono font-bold">Head Pastry & Snack Crafter</p>
            </div>
            <p className={`text-xs sm:text-[13px] leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-650'}`}>
               An expert in high-society finger foods and bespoke artisan tarts, Maria ensures our dessert stations are miniature works of fine visual art.
            </p>
          </div>
        </div>
      </section>

      {/* Inline CTA block */}
      <section 
        id="about-cta-block" 
        className={`p-6 sm:p-12 rounded-2xl sm:rounded-3xl text-center space-y-6 max-w-4xl mx-auto shadow-xl border transition-all ${
          theme === 'dark'
            ? 'bg-emerald-900/80 border-emerald-800/50 text-white'
            : 'bg-emerald-50/90 border-emerald-200/80 text-emerald-950 shadow-md'
        }`}
      >
        <h2 className={`font-serif text-2xl sm:text-3.5xl font-bold tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-emerald-900'
        }`}>
          Ready to Host a Happy Belly Dining Experience?
        </h2>
        <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-light ${
          theme === 'dark' ? 'text-emerald-100' : 'text-emerald-850'
        }`}>
          Get in touch with our operations concierge or try our interactive pricing calculator to receive a completely customized catering quotation instantly.
        </p>
        <button
          id="about-cta-booking-btn"
          onClick={onOpenBooking}
          className={`font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer ${
            theme === 'dark'
              ? 'bg-white hover:bg-stone-100 text-emerald-800'
              : 'bg-emerald-700 hover:bg-emerald-600 text-white'
          }`}
        >
          Access Interactive Quote Engine
        </button>
      </section>
    </div>
  );
}
