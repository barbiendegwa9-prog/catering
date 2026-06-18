import React from 'react';
import { Sparkles, CalendarRange, Quote, Eye, Target, Award, Heart, CheckSquare } from 'lucide-react';

interface AboutViewProps {
  onOpenBooking: () => void;
}

export default function AboutView({ onOpenBooking }: AboutViewProps) {
  return (
    <div id="about-us-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
      {/* Header Panel */}
      <div id="about-header" className="text-center max-w-3xl mx-auto space-y-4 pt-10">
        <div className="inline-flex items-center gap-1.5 p-1 px-3 bg-emerald-950/40 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-900/45 uppercase tracking-widest font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>About Happy Belly Catering</span>
        </div>
        <h1 id="about-headline" className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Crafting Happy Belly Catering Since 2012
        </h1>
        <p id="about-subtitle" className="text-stone-400 text-base sm:text-lg leading-relaxed">
          The fine culinary narrative of passionate chefs, robust hygiene controls, and state-of-the-art event planning.
        </p>
      </div>

      {/* Grid split: Editorial history */}
      <section id="company-story-section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Story Illustration Grid */}
        <div className="relative order-last lg:order-first">
          {/* Main Visual */}
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-stone-900 border border-stone-800">
            <img 
              src="https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800&auto=format&fit=crop&q=80" 
              alt="Happy guests enjoying fresh Kenyan food at a social gathering" 
              className="w-full h-full object-cover filter brightness-[0.82] hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Overlay Box */}
          <div className="absolute -bottom-6 -right-6 bg-stone-950 text-white p-6 rounded-2xl max-w-xs shadow-xl space-y-2 border border-stone-800 hidden sm:block">
            <p className="text-emerald-400 font-mono text-2xl font-bold">14+ Years</p>
            <p className="font-serif text-sm font-semibold">Of pristine five-star banqueting experience.</p>
            <p className="text-xs text-stone-400 leading-relaxed">Serving over 100 private wedding and boardrooms every singular month with perfection.</p>
          </div>
        </div>

        {/* Story text */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">The History & Growth</span>
            <h2 id="story-title" className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Our Journey to Culinary Excellence
            </h2>
          </div>

          <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
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
      <section id="vision-mission-section" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* VISION CARD */}
        <div id="vision-card" className="bg-stone-950 text-white p-8 sm:p-10 rounded-3xl shadow-md border border-stone-800 flex flex-col justify-between space-y-8 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 transition-colors" />
          
          <div className="space-y-4 relative z-10">
            <div className="bg-stone-900 border border-stone-800 text-emerald-400 p-3.5 rounded-2xl w-fit">
              <Eye className="w-6 h-6 stroke-[2]" />
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Our Vision</h3>
            
            {/* The exact copy: "To become the leading provider of high-quality catering services while maintaining exceptional customer satisfaction" */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light italic border-l-2 border-emerald-600 pl-4 py-1">
              "To become the leading provider of high-quality catering services while maintaining exceptional customer satisfaction."
            </p>
          </div>
          
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed relative z-10 pt-2 border-t border-stone-800/60">
            We actively work to elevate hospitality parameters daily, establishing eco-friendly sourcing and cutting-edge prep standards that set benchmark parameters nationwide.
          </p>
        </div>

        {/* MISSION CARD */}
        <div id="mission-card" className="bg-[#131517] border border-stone-800/80 p-8 sm:p-10 rounded-3xl shadow-md flex flex-col justify-between space-y-8 group">
          <div className="space-y-4">
            <div className="bg-emerald-950/45 text-emerald-300 p-3.5 rounded-2xl w-fit border border-emerald-900/40">
              <Target className="w-6 h-6 stroke-[2]" />
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Our Mission</h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              We pledge to provide trusted healthy, clean, and organic culinary creations customized for all event checklists, deploying rigid KeBS and Ministry of Health clean food guidelines while remaining transparently priced.
            </p>
          </div>

          {/* Key pillars checklist */}
          <div className="space-y-2.5 pt-4 border-t border-stone-800/60">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-300">
              <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Sourcing 100% farm-to-table organic poultry & vegetables</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-300">
              <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full compliance with extreme health & temperature guidelines</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-300">
              <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Delivering 100% customer reliability and zero hidden costs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Chef Council */}
      <section id="chef-council-section" className="space-y-12 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">The Cuisine Craftsmen</span>
          <h2 id="chefs-title" className="font-serif text-3xl font-bold text-white">
            Guided by Culinary Masterminds
          </h2>
          <p className="text-stone-400 text-sm">
            Meet the culinary designers directing your bespoke event meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Chef 1 */}
          <div id="chef-card-1" className="bg-[#131517] border border-stone-800/80 p-6 rounded-2xl text-center space-y-4 hover:border-emerald-500/20 transition-all">
            <div className="w-24 h-24 rounded-full bg-stone-900 border-2 border-emerald-500/30 overflow-hidden mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" 
                alt="Chef Julian Vane" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Julian Vane</h3>
              <p className="text-emerald-400 text-xs font-mono font-medium">Co-Founder & Culinary Director</p>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              With 18 years of experience spearheading dining for Luxury Resorts, Julian designs recipes that prioritize fine ingredients and clean pairings.
            </p>
          </div>

          {/* Chef 2 */}
          <div id="chef-card-2" className="bg-[#131517] border border-stone-800/80 p-6 rounded-2xl text-center space-y-4 hover:border-emerald-500/20 transition-all">
            <div className="w-24 h-24 rounded-full bg-stone-900 border-2 border-emerald-500/30 overflow-hidden mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&auto=format&fit=crop&q=80" 
                alt="Chef Maria Gomez" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Maria Gomez</h3>
              <p className="text-emerald-400 text-xs font-mono font-medium">Head Pastry & Snack Crafter</p>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
               An expert in high-society finger foods and bespoke artisan tarts, Maria ensures our dessert stations are miniature works of fine visual art.
            </p>
          </div>
        </div>
      </section>

      {/* Inline CTA block */}
      <section id="about-cta-block" className="bg-emerald-900/80 border border-emerald-800/50 p-8 sm:p-12 rounded-3xl text-center text-white space-y-6 max-w-4xl mx-auto shadow-xl">
        <h2 className="font-serif text-2xl sm:text-3.5xl font-bold tracking-tight">
          Ready to Host a Happy Belly Dining Experience?
        </h2>
        <p className="max-w-2xl mx-auto text-emerald-100 text-sm leading-relaxed font-light">
          Get in touch with our operations concierge or try our interactive pricing calculator to receive a completely customized catering quotation instantly.
        </p>
        <button
          id="about-cta-booking-btn"
          onClick={onOpenBooking}
          className="bg-white hover:bg-stone-100 text-emerald-800 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Access Interactive Quote Engine
        </button>
      </section>
    </div>
  );
}
