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
  ShieldCheck, 
  Sparkles, 
  Clock, 
  FileText,
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
  theme?: 'dark' | 'light';
}

export default function BookingInquiryView({
  selectedCart,
  onIncrementItem,
  onDecrementItem,
  onRemoveItem,
  onClearCart,
  theme = 'dark'
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
  const totalFoodCost = React.useMemo(() => {
    let sum = 0;
    FEATURED_MEALS.forEach(meal => {
      const qty = selectedCart[meal.id] || 0;
      if (qty > 0) {
        // Traditional catering implies price per guest * guestCount * quantity of course servings
        sum += meal.price * qty * guestCount;
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
    <div id="booking-calculator-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12 sm:space-y-16">
      
      {/* Title */}
      <div id="booking-header" className="text-center max-w-2xl mx-auto space-y-4 pt-10">
        <div className={`inline-flex items-center gap-1.5 p-1 px-3 rounded-full text-xs font-semibold border uppercase tracking-widest font-mono ${
          theme === 'dark' 
            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-900/40' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Interactive Quote & Delivery Calculator</span>
        </div>
        <h1 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-stone-900'
        }`}>
          Configure Your Bespoke Event
        </h1>
        <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
          Use our interactive culinary engine to choose meals, set guest counts, calculate delivery logistics, and receive a secure PDF-ready estimation instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT 7 COLS: INQUIRY DETAILS & ITEMS SELECTOR */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* STEP 1: CONCIERGE EVENT SETUP */}
          <div className={`border rounded-3xl p-5 sm:p-8 shadow-md space-y-6 ${
            theme === 'dark' 
              ? 'bg-[#131517] border-stone-800/80 text-white' 
              : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className={`flex items-center gap-3 border-b pb-4 ${theme === 'dark' ? 'border-stone-800/50' : 'border-stone-150'}`}>
              <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-xs">1</span>
              <div>
                <h2 className={`font-serif text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Event Coordination Setup</h2>
                <p className={`text-[11px] sm:text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Specify event type and guest parameters to set staff tiers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Event Type */}
              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Event Typology</label>
                <select
                  id="form-event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                    theme === 'dark' 
                      ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                      : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                  }`}
                >
                  <option value="corporate" className={theme === 'dark' ? 'bg-stone-950 text-stone-200' : 'bg-white text-stone-900'}>Corporate Boardroom Buffet</option>
                  <option value="wedding" className={theme === 'dark' ? 'bg-stone-950 text-stone-200' : 'bg-white text-stone-900'}>Majestic Wedding Banquet</option>
                  <option value="birthday" className={theme === 'dark' ? 'bg-stone-950 text-stone-200' : 'bg-white text-stone-900'}>Birthday Milestone Celebration</option>
                  <option value="private_party" className={theme === 'dark' ? 'bg-stone-950 text-stone-200' : 'bg-white text-stone-900'}>Private Gala Diner</option>
                  <option value="other" className={theme === 'dark' ? 'bg-stone-950 text-stone-200' : 'bg-white text-stone-900'}>Other Bespoke Event</option>
                </select>
              </div>

              {/* Guest Count */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Expected Guests</label>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                    theme === 'dark'
                      ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30'
                      : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  }`}>
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
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-600 ${
                      theme === 'dark' ? 'bg-stone-800' : 'bg-stone-200'
                    }`}
                  />
                  <div className={`flex justify-between text-[9px] font-mono pt-1 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-450'}`}>
                    <span>10 Min</span>
                    <span>100 Standard</span>
                    <span>250 Premium</span>
                    <span>500 Max</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Delivery/Staging Date</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    id="form-delivery-date"
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                      theme === 'dark' 
                        ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                        : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Serving / Dishout Time</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <Clock className="w-4 h-4" />
                  </span>
                  <input
                    id="form-delivery-time"
                    type="time"
                    required
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                      theme === 'dark' 
                        ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                        : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: SELECTED DISHES STAGING CHECKS */}
          <div className={`border rounded-3xl p-5 sm:p-8 shadow-md space-y-6 ${
            theme === 'dark' 
              ? 'bg-[#131517] border-stone-800/80 text-white' 
              : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 ${theme === 'dark' ? 'border-stone-800/50' : 'border-stone-150'}`}>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-xs">2</span>
                <div>
                  <h2 className={`font-serif text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Configured Catering Items</h2>
                  <p className={`text-[11px] sm:text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Review dishes included in your quote. Adjust multipliers relative to guest total.</p>
                </div>
              </div>
              
              {/* Clear button */}
              {Object.keys(selectedCart).length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className={`transition-colors text-xs font-bold flex items-center gap-1 p-1 rounded-md hover:text-red-500 ${
                    theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset List</span>
                </button>
              )}
            </div>

            {/* Rendering the items */}
            {Object.keys(selectedCart).length === 0 ? (
              <div className={`text-center py-10 space-y-3 rounded-2xl border border-dashed ${
                theme === 'dark' 
                  ? 'bg-stone-950/40 border-stone-800/80' 
                  : 'bg-stone-50 border-stone-200'
              }`}>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Your quote checklist is currently empty.</p>
                <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">
                  Browse our popular meals & add them!
                </p>
              </div>
            ) : (
              <div className={`divide-y max-h-96 overflow-y-auto pr-2 space-y-4 ${
                theme === 'dark' ? 'divide-stone-800/50' : 'divide-stone-150'
              }`}>
                {FEATURED_MEALS.map((meal) => {
                  const qty = selectedCart[meal.id] || 0;
                  if (qty === 0) return null;
                  
                  return (
                    <div key={meal.id} className="flex gap-4 items-start py-4 first:pt-0 last:pb-0">
                      <div className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border ${
                        theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200'
                      }`}>
                        <img 
                          src={meal.imageUrl} 
                          alt={meal.name} 
                          className="w-full h-full object-cover filter brightness-[0.85]" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-serif font-bold text-xs sm:text-sm leading-snug ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{meal.name}</h4>
                          <span className={`font-mono font-bold text-[10px] sm:text-xs shrink-0 px-2 py-0.5 rounded border ${
                            theme === 'dark' 
                              ? 'text-stone-100 bg-stone-900 border-stone-800' 
                              : 'text-stone-900 bg-stone-50 border-stone-200'
                          }`}>
                            Ksh {(meal.price * qty * guestCount).toLocaleString()}
                          </span>
                        </div>
                        <p className={`text-[10px] sm:text-xs line-clamp-1 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>{meal.description}</p>
                        
                        {/* Control quantities inside order tool */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                          <div className={`text-[9px] sm:text-[10px] font-medium ${theme === 'dark' ? 'text-stone-500' : 'text-stone-450'}`}>
                            Ksh {meal.price.toLocaleString()} / person × {guestCount} guests × {qty} serving course
                          </div>
                          <div className={`flex items-center gap-2 px-2 py-1 rounded-lg border w-fit ${
                            theme === 'dark' ? 'bg-stone-900 border-stone-800' : 'bg-stone-50 border-stone-200'
                          }`}>
                            <button
                              type="button"
                              onClick={() => onDecrementItem(meal)}
                              className={`transition-colors p-0.5 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className={`font-mono text-xs font-bold shrink-0 min-w-4 text-center ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onIncrementItem(meal)}
                              className={`transition-colors p-0.5 ${theme === 'dark' ? 'text-stone-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="text-[10px] text-stone-300">|</span>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(meal)}
                              className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase p-0.5"
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
          <div className={`border rounded-3xl p-5 sm:p-8 shadow-md space-y-6 ${
            theme === 'dark' 
              ? 'bg-[#131517] border-stone-800/80 text-white' 
              : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className={`flex items-center gap-3 border-b pb-4 ${theme === 'dark' ? 'border-stone-800/50' : 'border-stone-150'}`}>
              <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-xs">3</span>
              <div>
                <h2 className={`font-serif text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Logistics & Client Details</h2>
                <p className={`text-[11px] sm:text-xs ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Please specify your delivery address and contact details to proceed.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Primary Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Contact Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                      <Users className="w-4 h-4" />
                    </span>
                    <input
                      id="form-customer-name"
                      type="text"
                      required
                      placeholder="e.g. Johnathan Miller"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                        theme === 'dark' 
                          ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                          : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Contact Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="form-customer-email"
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                        theme === 'dark' 
                          ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                          : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Distance slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Hotline Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      id="form-customer-phone"
                      type="tel"
                      required
                      placeholder="e.g. +254 712 345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                        theme === 'dark' 
                          ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                          : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Transit Distance (Est)</label>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                      theme === 'dark'
                        ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30'
                        : 'text-emerald-800 bg-emerald-50 border-emerald-250'
                    }`}>
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
                      className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-600 ${
                        theme === 'dark' ? 'bg-stone-800' : 'bg-stone-200'
                      }`}
                    />
                    <div className={`flex justify-between text-[9px] font-mono mt-1 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-450'}`}>
                      <span>Catering Hub (2mi)</span>
                      <span>Suburbs (25mi)</span>
                      <span>Outer Border (50mi)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Delivery Venue Address</label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-stone-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    id="form-delivery-address"
                    type="text"
                    required
                    placeholder="e.g. 500 Oak Avenue, Ngong Road, Nairobi"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                      theme === 'dark' 
                        ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                        : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                </div>
              </div>

              {/* Custom Notes & Allergens */}
              <div className="space-y-1.5">
                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Dietary Preferences & Requests</label>
                <textarea
                  id="form-notes"
                  rows={3}
                  placeholder="Include any critical food intolerances, gluten allergies, or specific staging guidelines here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none transition-colors border ${
                    theme === 'dark' 
                      ? 'bg-stone-900/60 border-stone-800 text-stone-100 focus:border-emerald-600' 
                      : 'bg-stone-50 border-stone-250 text-stone-900 focus:bg-white focus:border-emerald-600'
                  }`}
                />
              </div>
            </div>
          </div>

        </form>

        {/* RIGHT 5 COLS: LIVE ESTIMATED INVOICE */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`rounded-3xl p-6 sm:p-8 shadow-xl border space-y-6 relative overflow-hidden transition-all ${
            theme === 'dark'
              ? 'bg-stone-900 border-stone-800 text-white'
              : 'bg-white border-stone-250 text-stone-900 shadow-xl'
          }`}>
            {/* Stamp design */}
            <div className={`absolute top-4 right-4 select-none opacity-10 pointer-events-none ${theme === 'dark' ? 'text-stone-800' : 'text-stone-300'}`}>
              <FileText className="w-24 h-24 stroke-[1]" />
            </div>

            <div className={`pb-4 space-y-1 relative z-10 border-b ${theme === 'dark' ? 'border-stone-800' : 'border-stone-150'}`}>
              <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Cost Estimate</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">Inquiry Cost Sheet</h2>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-4 font-sans text-sm relative z-10">
              {/* If no items selected */}
              {totalFoodCost === 0 ? (
                <div className={`text-center py-6 space-y-2 my-4 border-y ${theme === 'dark' ? 'border-stone-800/60' : 'border-stone-150'}`}>
                  <p className={`text-xs italic ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Choose dishes on the left to activate the dynamic budget estimator.</p>
                </div>
              ) : (
                <div className={`space-y-3.5 py-4 my-2 border-y ${theme === 'dark' ? 'border-stone-800/60' : 'border-stone-150'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className={theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}>Guest Count Factor</span>
                    <span className={`font-mono font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-850'}`}>{guestCount} Guests</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className={theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}>Menu Surcharges (Dishes)</span>
                    <span className={`font-mono font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-850'}`}>Ksh {totalFoodCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className={theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}>Kitchen Staging & Staff Fee</span>
                    <span className={`font-mono font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-850'}`}>Ksh {stagingFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className={theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}>Safe Delivery Logistics ({deliveryDistance}mi)</span>
                    <span className={`font-mono font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-850'}`}>Ksh {deliveryCost.toLocaleString()}</span>
                  </div>

                  <div className={`flex justify-between items-center text-xs pt-1.5 border-t ${theme === 'dark' ? 'border-stone-800/40' : 'border-stone-150'}`}>
                    <span className={theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}>Kenyan VAT (16%)</span>
                    <span className={`font-mono font-bold ${theme === 'dark' ? 'text-stone-200' : 'text-stone-850'}`}>Ksh {taxEst.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Total Row */}
              <div className="flex items-center justify-between pt-2">
                <span className={`font-serif text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-stone-300' : 'text-stone-850'}`}>Total Estimation:</span>
                <span className={`font-mono text-xl sm:text-2xl font-extrabold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
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
                <div role="status" className="mb-4 bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5 animate-fade-in">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Inquiry Received!</p>
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

              <div className={`flex items-center justify-center gap-2 text-[10px] font-mono text-center pt-4 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>KeBS Certified / 100% Clean Food Sanitized Delivery Seal</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* HISTORIC DASHBOARD - PERSISTED IN LOCALSTORAGE */}
      <section id="submitted-inquiries-dashboard" className={`pt-12 sm:pt-16 border-t ${
        theme === 'dark' ? 'border-stone-800/60' : 'border-stone-150'
      }`}>
        <div className="space-y-1">
          <h3 className={`font-serif text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Your Submitted Inquiries ({submittedInquiries.length})</h3>
          <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>Review active event proposals requested on this browser. Refreshing of the browser does not clear these drafts.</p>
        </div>

        {submittedInquiries.length === 0 ? (
          <div className={`p-8 text-center text-xs italic rounded-2xl border ${
            theme === 'dark' 
              ? 'bg-[#131517] border-stone-800/80 text-stone-500' 
              : 'bg-white border-stone-200 text-stone-500'
          }`}>
            You have no submitted proposals or inquiries logged. Use the calculator above to finalize one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-6">
            {submittedInquiries.map((inq) => (
              <div 
                key={inq.id}
                id={`submitted-card-${inq.id}`}
                className={`p-6 rounded-2xl shadow-md border transition-all flex flex-col justify-between space-y-4 ${
                  theme === 'dark'
                    ? 'bg-[#131517] border-stone-800/80 text-white hover:border-emerald-500/20'
                    : 'bg-white border-stone-200 text-stone-900 hover:border-emerald-500/20'
                }`}
              >
                <div className={`flex items-start justify-between border-b pb-3 ${theme === 'dark' ? 'border-stone-800/50' : 'border-stone-150'}`}>
                  <div>
                    <span className={`font-mono text-xs font-semibold ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>Inquiry ID: </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-500">{inq.id}</span>
                    <p className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-stone-450' : 'text-stone-500'}`}>Submitted: {inq.createdAt}</p>
                  </div>
                  
                  {/* Status label */}
                  <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${
                    theme === 'dark'
                      ? 'bg-emerald-950/45 text-emerald-300 border-emerald-900/35'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    PENDING REVIEW
                  </span>
                </div>

                {/* Logistics metadata */}
                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <p className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>Event Typology</p>
                    <p className={`font-bold capitalize mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-stone-850'}`}>{inq.eventType}</p>
                    <p className={`mt-0.5 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{inq.guestCount} Guests</p>
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>Staging Schedule</p>
                    <p className={`font-bold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-stone-850'}`}>{inq.deliveryDate}</p>
                    <p className={`mt-0.5 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>at {inq.deliveryTime}</p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className={`text-xs p-3 rounded-xl border ${
                  theme === 'dark' ? 'bg-stone-900/40 border-stone-850' : 'bg-stone-50 border-stone-200/60'
                }`}>
                  <p className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>Delivery Address</p>
                  <p className={`font-medium truncate mt-0.5 ${theme === 'dark' ? 'text-stone-300' : 'text-stone-750'}`}>{inq.deliveryAddress}</p>
                </div>

                {/* Total Cost & Delete */}
                <div className={`flex items-center justify-between pt-3 border-t ${theme === 'dark' ? 'border-stone-800/60' : 'border-stone-150'}`}>
                  <div>
                    <span className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>Estimated Gross</span>
                    <p className={`font-mono font-extrabold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Ksh {inq.totalEstimated.toLocaleString()}</p>
                  </div>
                  
                  <button
                    id={`delete-inquiry-btn-${inq.id}`}
                    onClick={() => handleDeleteInquiry(inq.id)}
                    className={`text-stone-400 hover:text-red-500 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors p-1 cursor-pointer`}
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
