import React from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  DollarSign, 
  BadgeAlert,
  ArrowRight
} from 'lucide-react';
import { MealItem, BookingInquiry, EventType } from '../types';
import { FEATURED_MEALS } from '../data';

interface BookingInquiryViewProps {
  selectedCart: Record<string, number>;
  onIncrementItem: (item: MealItem) => void;
  onDecrementItem: (item: MealItem) => void;
  onRemoveItem: (item: MealItem) => void;
  onClearCart: () => void;
}

export default function BookingInquiryView({
  selectedCart,
  onIncrementItem,
  onDecrementItem,
  onRemoveItem,
  onClearCart
}: BookingInquiryViewProps) {
  
  // Form fields
  const [customerName, setCustomerName] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [eventType, setEventType] = React.useState<EventType>('corporate');
  const [guestCount, setGuestCount] = React.useState<number>(25);
  const [deliveryDate, setDeliveryDate] = React.useState('');
  const [deliveryTime, setDeliveryTime] = React.useState('12:00');
  const [deliveryAddress, setDeliveryAddress] = React.useState('');
  const [deliveryDistance, setDeliveryDistance] = React.useState<number>(8); // simulated miles
  const [notes, setNotes] = React.useState('');
  
  // Submission lists (persistent in localStorage)
  const [submittedInquiries, setSubmittedInquiries] = React.useState<BookingInquiry[]>([]);

  // Feedback states
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  // Load inquiries on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('happy_belly_catering_bookings');
    if (saved) {
      try {
        setSubmittedInquiries(JSON.parse(saved));
      } catch (err) {
        console.error('Error reading localStorage for bookings', err);
      }
    }
    
    // Set a default minimum tomorrow's date for deliveryDate
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDeliveryDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync to localStorage
  const saveInquiries = (list: BookingInquiry[]) => {
    setSubmittedInquiries(list);
    localStorage.setItem('happy_belly_catering_bookings', JSON.stringify(list));
  };

  // Calculations
  const cartSubtotal = React.useMemo(() => {
    let sum = 0;
    FEATURED_MEALS.forEach(meal => {
      const qty = selectedCart[meal.id] || 0;
      if (qty > 0) {
        sum += meal.price * qty;
      }
    });
    return sum;
  }, [selectedCart]);

  // Food totals adjusted per guest for options that represent per-guest pricing
  const totalFoodCost = React.useMemo(() => {
    let sum = 0;
    FEATURED_MEALS.forEach(meal => {
      const qty = selectedCart[meal.id] || 0;
      if (qty > 0) {
        // If it's a corporate package or main meal, we multiply by guest count if quantity is treated as per-guest,
        // or we treat the quantity as the multiplier directly! Let's treat the quantity as a multiplier 
        // to keep logic extremely simple & intuitive for the user, and show total item prices clearly.
        sum += meal.price * qty * guestCount; // Traditional catering implies $X per guest * guestCount
      }
    });
    return sum;
  }, [selectedCart, guestCount]);

  // Staffing, kitchen setup, staging fees based on guests (realistic catering billing)
  const stagingFee = React.useMemo(() => {
    if (totalFoodCost === 0) return 0;
    // Ksh 450 per guest with a minimum setup staging price of Ksh 15,000
    return Math.max(15000, guestCount * 450);
  }, [totalFoodCost, guestCount]);

  // Delivery logistics based on distance
  const deliveryCost = React.useMemo(() => {
    if (totalFoodCost === 0) return 0;
    // Ksh 2,500 baseline + Ksh 150 per mile
    return 2500 + (deliveryDistance * 150);
  }, [totalFoodCost, deliveryDistance]);

  const taxEst = React.useMemo(() => {
    return (totalFoodCost + stagingFee + deliveryCost) * 0.16; // 16.0% Kenyan VAT (Value Added Tax)
  }, [totalFoodCost, stagingFee, deliveryCost]);

  const grandTotal = React.useMemo(() => {
    return totalFoodCost + stagingFee + deliveryCost + taxEst;
  }, [totalFoodCost, stagingFee, deliveryCost, taxEst]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!customerName.trim()) {
      setFormError('Please enter a primary contact name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setFormError('Please enter a valid telephone hotline.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please specify the delivery address where operations will stage.');
      return;
    }
    if (Object.keys(selectedCart).length === 0 || totalFoodCost === 0) {
      setFormError('Please choose at least one popular meal, snack, or package from our inventory.');
      return;
    }

    const newInquiry: BookingInquiry = {
      id: `HBELLY-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerEmail,
      customerPhone,
      eventType,
      guestCount,
      deliveryDate,
      deliveryTime,
      deliveryAddress,
      selectedItems: Object.entries(selectedCart)
        .filter(([_, qty]) => qty > 0)
        .map(([itemId, qty]) => ({ itemId, quantity: qty })),
      totalEstimated: grandTotal,
      notes,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newInquiry, ...submittedInquiries];
    saveInquiries(updated);

    // Feedback
    setFormSuccess(true);
    onClearCart(); // Empty the cart/quote builder
    setNotes('');

    // Reset feedback after some seconds
    setTimeout(() => {
      setFormSuccess(false);
    }, 7000);
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Are you sure you would like to cancel your catering inquiry estimation?')) {
      const updated = submittedInquiries.filter(i => i.id !== id);
      saveInquiries(updated);
    }
  };

  return (
    <div id="booking-calculator-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
      
      {/* Title */}
      <div id="booking-header" className="text-center max-w-2xl mx-auto space-y-4 pt-10">
        <div className="inline-flex items-center gap-1.5 p-1 px-3 bg-emerald-950/40 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-900/40 uppercase tracking-widest font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>Interactive Quote & Delivery Calculator</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Configure Your Bespoke Event
        </h1>
        <p className="text-stone-400 text-sm leading-relaxed">
          Use our interactive culinary engine to choose meals, set guest counts, calculate delivery logistics, and receive a secure PDF-ready estimation instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT 7 COLS: INQUIRY DETAILS & ITEMS SELECTOR */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: CONCIERGE EVENT SETUP */}
          <div className="bg-[#131517] border border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-800/50 pb-4">
              <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-xs">1</span>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white">Event Coordination Setup</h2>
                <p className="text-stone-400 text-xs">Specify event type and guest parameters to set staff tiers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Event Typology</label>
                <select
                  id="form-event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full bg-stone-900/60 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                >
                  <option value="corporate" className="bg-stone-900">Corporate Boardroom Buffet</option>
                  <option value="wedding" className="bg-stone-900">Majestic Wedding Banquet</option>
                  <option value="birthday" className="bg-stone-900">Birthday Milestone Celebration</option>
                  <option value="private_party" className="bg-stone-900">Private Gala Diner</option>
                  <option value="other" className="bg-stone-900">Other Bespoke Event</option>
                </select>
              </div>

              {/* Guest Count */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Expected Guest Count</label>
                  <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded-md">
                    {guestCount} Guests
                  </span>
                </div>
                <div className="pt-2">
                  <input
                    id="form-guest-count-slider"
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono pt-1">
                    <span>10 Min</span>
                    <span>100 Standard</span>
                    <span>250 Premium</span>
                    <span>500 Grand Max</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Delivery/Staging Date</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-500">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    id="form-delivery-date"
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-stone-900/60 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Serving / Dishout Time</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-500">
                    <Clock className="w-4 h-4" />
                  </span>
                  <input
                    id="form-delivery-time"
                    type="time"
                    required
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full bg-stone-900/60 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: SELECTED DISHES STAGING CHECKS */}
          <div className="bg-[#131517] border border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800/50 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-xs">2</span>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white">Configured Catering Items</h2>
                  <p className="text-stone-400 text-xs">Review dishes included in your quote. Adjust multipliers relative to guest total.</p>
                </div>
              </div>
              
              {/* Clear button */}
              {Object.keys(selectedCart).length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-red-400 transition-colors text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset List</span>
                </button>
              )}
            </div>

            {/* Rendering the items */}
            {Object.keys(selectedCart).length === 0 ? (
              <div className="text-center py-10 space-y-3 bg-stone-950/40 rounded-2xl border border-dashed border-stone-800/80">
                <p className="text-stone-400 text-sm">Your quote checklist is currently empty.</p>
                <p className="text-emerald-400 text-xs font-semibold">
                  Browse our popular meals, snacks, or packages and add them!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-800/50 max-h-96 overflow-y-auto pr-2 space-y-4">
                {FEATURED_MEALS.map((meal) => {
                  const qty = selectedCart[meal.id] || 0;
                  if (qty === 0) return null;
                  
                  return (
                    <div key={meal.id} className="flex gap-4 items-start py-4 first:pt-0 last:pb-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shrink-0">
                        <img 
                          src={meal.imageUrl} 
                          alt={meal.name} 
                          className="w-full h-full object-cover filter brightness-[0.85]" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-white font-serif font-bold text-sm leading-snug">{meal.name}</h4>
                          <span className="font-mono text-stone-100 bg-stone-900 border border-stone-800 font-semibold text-xs shrink-0 px-2 py-0.5 rounded">
                            Ksh {(meal.price * qty * guestCount).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-stone-450 text-[11px] line-clamp-1">{meal.description}</p>
                        
                        {/* Control quantities inside order tool */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="text-[10px] text-stone-450 font-medium">
                            Ksh {meal.price.toLocaleString()} / person × {guestCount} guests × {qty} serving course
                          </div>
                          <div className="flex items-center gap-2.5 bg-stone-900 border border-stone-800 px-2 py-1 rounded-lg">
                            <button
                              type="button"
                              onClick={() => onDecrementItem(meal)}
                              className="text-stone-450 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-stone-100 shrink-0 min-w-4 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onIncrementItem(meal)}
                              className="text-stone-450 hover:text-white transition-colors"
                            >
                              <Plus className="w-3" />
                            </button>
                            <span className="text-[10px] text-stone-700">|</span>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(meal)}
                              className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* STEP 3: CONTACT & LOGISTICS INFORMATION */}
          <div className="bg-[#131517] border border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-800/50 pb-4">
              <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-xs">3</span>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white">Logistics & Client Details</h2>
                <p className="text-stone-400 text-xs">Please specify your delivery address and contact details to proceed.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Primary Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Contact Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-500">
                      <Users className="w-4 h-4" />
                    </span>
                    <input
                      id="form-customer-name"
                      type="text"
                      required
                      placeholder="e.g. Johnathan Miller"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-900/60 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Contact Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="form-customer-email"
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-stone-900/60 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Distance slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Hotline Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-500">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      id="form-customer-phone"
                      type="tel"
                      required
                      placeholder="e.g. +254 712 345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-stone-900/60 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Transit Distance (Est)</label>
                    <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 rounded">
                      {deliveryDistance} Miles
                    </span>
                  </div>
                  <div className="pt-2">
                    <input
                      id="form-distance-slider"
                      type="range"
                      min="2"
                      max="50"
                      value={deliveryDistance}
                      onChange={(e) => setDeliveryDistance(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-[9px] text-stone-500 font-mono mt-1">
                      <span>Catering Hub (2mi)</span>
                      <span>Suburbs (25mi)</span>
                      <span>Outer Border (50mi)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Delivery Staging Venue Address</label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-stone-500">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    id="form-delivery-address"
                    type="text"
                    required
                    placeholder="e.g. 500 Oak Avenue, Grand Plaza Suite, Seattle WA"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-stone-900/60 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Custom Notes & Allergens */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">Dietary Preferences & Special Requests</label>
                <textarea
                  id="form-notes"
                  rows={3}
                  placeholder="Include any critical food intolerances, gluten allergies, or specific staging guidelines here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-900/60 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

        </form>

        {/* RIGHT 5 COLS: LIVE ESTIMATED INVOICE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 space-y-6 relative overflow-hidden">
            {/* Stamp design */}
            <div className="absolute top-4 right-4 text-stone-800 select-none opacity-20 pointer-events-none">
              <FileText className="w-24 h-24 stroke-[1]" />
            </div>

            <div className="border-b border-stone-800 pb-4 space-y-1 relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Cost Estimate</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">Inquiry Cost Sheet</h2>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-4 font-sans text-sm relative z-10">
              {/* If no items selected */}
              {totalFoodCost === 0 ? (
                <div className="text-center py-6 space-y-2 border-y border-stone-800/60 my-4">
                  <p className="text-stone-400 text-xs italic">Choose dishes on the left to activate the dynamic budget estimator.</p>
                </div>
              ) : (
                <div className="space-y-3.5 border-y border-stone-800/60 py-4 my-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Guest Count Factor</span>
                    <span className="font-mono text-stone-200 font-bold">{guestCount} Guests</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Menu Surcharges (Dishes Subtotal)</span>
                    <span className="font-mono text-stone-200">Ksh {totalFoodCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="text-stone-400 flex items-center gap-1">
                      <span>Kitchen Staging & Staff Fee</span>
                    </div>
                    <span className="font-mono text-stone-200">Ksh {stagingFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400">Safe Delivery Logistics ({deliveryDistance}mi)</span>
                    <span className="font-mono text-stone-200">Ksh {deliveryCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1.5 border-t border-stone-800/40">
                    <span className="text-stone-400">Kenyan VAT (16%)</span>
                    <span className="font-mono text-stone-200">Ksh {taxEst.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Total Row */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-stone-300 font-serif text-lg font-bold">Total Estimation:</span>
                <span className="text-emerald-400 font-mono text-2xl font-extrabold">
                  Ksh {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Banner */}
            <div className="pt-4 relative z-10">
              {/* Warnings */}
              {formError && (
                <div className="mb-4 bg-red-950/40 border border-red-500/30 p-3 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <BadgeAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Success box */}
              {formSuccess && (
                <div role="status" className="mb-4 bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Inquiry Received!</p>
                    <p className="text-emerald-300/80 mt-0.5">Your bespoke setup is queued under review. Check details below in the submitted inquiries log.</p>
                  </div>
                </div>
              )}

              <button
                id="submit-inquiry-btn"
                onClick={handleSubmit}
                disabled={totalFoodCost === 0}
                className={`w-full py-4 px-6 rounded-xl font-bold uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  totalFoodCost > 0
                    ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md hover:-translate-y-0.5'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                <span>Request Delivery & Book Setup</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-mono text-center pt-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>KeBS Certified / 100% Clean Food Sanitized Delivery Seal</span>
              </div>
            </div>
          </div>
        </div>

      </div>      {/* HISTORIC DASHBOARD - PERSISTED IN LOCALSTORAGE */}
      <section id="submitted-inquiries-dashboard" className="border-t border-stone-800/60 pt-16 space-y-8">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Your Submitted Inquiries ({submittedInquiries.length})</h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-1">Review active event proposals requested on this browser. Refreshing of the browser does not clear these drafts.</p>
        </div>

        {submittedInquiries.length === 0 ? (
          <div className="bg-[#131517] border border-stone-800/80 rounded-2xl p-8 text-center text-stone-450 text-xs italic">
            You have no submitted proposals or inquiries logged. Use the calculator above to finalize one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submittedInquiries.map((inq) => (
              <div 
                key={inq.id}
                id={`submitted-card-${inq.id}`}
                className="bg-[#131517] border border-stone-800/80 p-6 rounded-2xl shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between border-b border-stone-800/50 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-stone-450">Inquiry ID: </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-400">{inq.id}</span>
                    <p className="text-[10px] text-stone-400 mt-0.5">Submitted of {inq.createdAt}</p>
                  </div>
                  
                  {/* Status label */}
                  <span className="bg-emerald-950/45 text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-900/35">
                    PENDING REVIEW
                  </span>
                </div>

                {/* Logistics metadata */}
                <div className="grid grid-cols-2 gap-4 text-xs font-sans text-stone-300">
                  <div>
                    <p className="text-[10.5px] text-stone-500 uppercase font-semibold">Event Parameters</p>
                    <p className="font-bold text-white capitalize mt-0.5">{inq.eventType}</p>
                    <p className="text-stone-400 mt-0.5">{inq.guestCount} Guests</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] text-stone-500 uppercase font-semibold">Staging Schedule</p>
                    <p className="font-bold text-white mt-0.5">{inq.deliveryDate}</p>
                    <p className="text-stone-400 mt-0.5">at {inq.deliveryTime}</p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="text-xs bg-stone-900/40 border border-stone-850 p-3 rounded-xl">
                  <p className="text-[10px] text-stone-500 uppercase font-semibold">Delivery Address</p>
                  <p className="text-stone-300 font-medium truncate mt-0.5">{inq.deliveryAddress}</p>
                </div>

                {/* Total Cost & Delete */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-800/60">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold">Estimated Gross</span>
                    <p className="font-mono font-extrabold text-white text-base">Ksh {inq.totalEstimated.toLocaleString()}</p>
                  </div>
                  
                  <button
                    id={`delete-inquiry-btn-${inq.id}`}
                    onClick={() => handleDeleteInquiry(inq.id)}
                    className="text-stone-400 hover:text-red-400 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Proposal</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
