import { MealItem, Testimonial } from './types';

// Path to the generated hero banner asset served by Vite
export const HERO_BANNER_IMG = '/src/assets/images/catering_hero_banner_1781770999477.jpg';

export const FEATURED_MEALS: MealItem[] = [
  {
    id: 'm1',
    name: 'Sukuma Wiki & Wet-Fry Goat Roast',
    description: 'Slow-cooked wet-fry Kenyan goat meat tenderized with ginger, garlic, and fresh coriander, served along seasoned supreme collard greens (Sukuma Wiki) and white corn Ugali.',
    price: 1850.00,
    category: 'meal',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Chef Special', 'Gluten Free', 'High Protein']
  },
  {
    id: 'm2',
    name: 'Nairobi Swahili Tilapia Wet-Fry',
    description: 'Lake Victoria fresh tilapia fillet deep-fried to a golden crisp, then simmered in a rich tomato, coriander (dhania), and bell-pepper coconut milk reduction cream.',
    price: 2200.00,
    category: 'meal',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Lake Victoria Fresh', 'Happy Belly Signature']
  },
  {
    id: 'm3',
    name: 'Acacia Charcoal Nyama Choma Platter',
    description: 'Premium cuts of beef and goat tenderloin marinated in fresh highland herbs and slow over-fired with genuine olive Acacia lump charcoal, paired with spicy red Kachumbari.',
    price: 2650.00,
    category: 'meal',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
    popular: false,
    features: ['Acacia Roasted', 'Nut Free']
  },
  {
    id: 'm4',
    name: 'Coastal Swahili Vegetable Biryani',
    description: 'Highly aromatic basmati rice steamed with saffron threads, cardamom, cinnamon, and whole cloves, layered with deep-simmered Kenyan garden pea, carrot, and potato curry.',
    price: 1500.00,
    category: 'meal',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    popular: false,
    features: ['Vegan', 'Gluten Free', 'Swahili Spiced']
  },
  // Snacks
  {
    id: 's1',
    name: 'Spiced Highland Beef Samosas',
    description: 'Crisp-folded, flaky golden pastry pockets stuffed to the brim with spice-infused minced lean beef, fresh scallions, cumin, and mild green chillies. Served with fresh lemon wedges.',
    price: 750.00,
    category: 'snack',
    imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Happy Belly Classic', 'Crispy Bite']
  },
  {
    id: 's2',
    name: 'Swahili Cardamon Mandazi & Viazi Karai',
    description: 'Warm fluffy puffed sweet dough triangles infused with ground cardamom, served together with crispy golden-fried potatoes coated to perfection in a zesty turmeric batter.',
    price: 800.00,
    category: 'snack',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Vegetarian', 'Sweet & Savory']
  },
  {
    id: 's3',
    name: 'Multilayered Flaky Chapati Rolls',
    description: 'Traditional handcrafted soft multi-layered flaky flatbreads rolled with light ghee, coriander folds, and red onions. Accompanied by zesty spicy tamarind dipping sauce.',
    price: 900.00,
    category: 'snack',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    popular: false,
    features: ['Vegetarian', 'Dhania Infused']
  },
  // Beverages
  {
    id: 'b1',
    name: 'Nairobi Ginger-Honey Dawa Potion',
    description: 'The ultimate brewed wellness elixir, crafted from crushed fiery ginger roots, wild raw forest honey, squeezed limes, and double-balanced sugarcane juice over crushed ice.',
    price: 500.00,
    category: 'beverage',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Wild Honey', 'Cold/Warm Brew', 'National Favorite']
  },
  {
    id: 'b2',
    name: 'Traditional Boiled Spiced Tea (Chai)',
    description: 'Handpicked Kericho black tea leaves double-boiled with high-cream whole pasture milk, crushed root ginger, cardamom pods, cinnamon sticks, and whole star anise.',
    price: 450.00,
    category: 'beverage',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    popular: false,
    features: ['Organic Milk', 'Comfort Tea']
  },
  {
    id: 'b3',
    name: 'Sugarcane & Passion-Lime Crush',
    description: 'Freshly cold-pressed sweet Kenyan Sugarcane stalks, fully infused with tropical yellow passion fruits and zesty local limes. Real, pure refreshment.',
    price: 550.00,
    category: 'beverage',
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&auto=format&fit=crop&q=80',
    popular: false,
    features: ['Vegan', 'No Refined Sugar']
  },
  // Corporate Packages
  {
    id: 'p1',
    name: 'Happy Belly Executive Karibu Feast',
    description: 'Premium curated meal combo designed for events and executive boards. Includes Highland Beef Samosas, Tilapia Wet-Fry mains, Multilayered Chapatis, and pitchers of hot/chilled Dawa.',
    price: 2400.00,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Min 10 Guests', 'Delivered Hot', 'Boardroom Standard']
  },
  {
    id: 'p2',
    name: 'Majestic Safari Grand Gala Banquet',
    description: 'The ultimate luxurious coastal and highland banquet. Features a live flame Nyama Choma carving station, Nairobi Tilapia mains, spiced Swahili Biryani rice, warm cardamon Mandazis, and custom fresh fruit and custard tarts.',
    price: 4800.00,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
    popular: true,
    features: ['Min 25 Guests', 'Full Service Staff', 'Chroma Platters Included']
  },
  {
    id: 'p3',
    name: 'Traditional Swahili Cocktail Reception',
    description: 'An elegant pass-around high-society celebration. Features miniature beef samosas, soft sweet bite mandazi puffs, skewed viazi karai, customized ginger-lime mocktail fountains, and continuous spiced Kenyan chai.',
    price: 1950.00,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80',
    popular: false,
    features: ['Min 15 Guests', 'Elegant Trays Included']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Amani Wambui',
    role: 'Corporate Relations Lead, Safaricom PLC',
    text: 'Happy Belly Catering transformed our annual executive stakeholder gala in Nairobi into a magnificent culinary journey. The quality of the Nile Tilapia fillet and the spiced Samosas was absolutely world-class. Complete hygiene and outstanding presentation!',
    rating: 5,
    date: 'April 14, 2026'
  },
  {
    id: 't2',
    name: 'Dr. Kevin Ombati',
    role: 'Groom & Event Organiser',
    text: 'We hired Happy Belly for our wedding reception of 150 guests at the Windsor Golf Hotel grounds, choosing their Majestic Safari Banquet. The Acacia Charcoal Nyama Choma and Swahili Biryani were incredible. Our guests are still praising the flavor details today!',
    rating: 5,
    date: 'May 29, 2026'
  },
  {
    id: 't3',
    name: 'Grace Kamau',
    role: 'Private Milestone Celebration, Runda',
    text: 'For my mothers 60th birthday, we ordered the Traditional Swahili Cocktail package. Crisp samosas, rich sweet cardamon mandazi, and the specialty brewed hot Ginger Dawa were a huge hit. They handle complex dietary allergies with extreme precision!',
    rating: 5,
    date: 'June 02, 2026'
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    id: 'why1',
    title: 'Fresh & Handpicked Ingredients',
    description: 'We source all our vegetables, herbs, and poultry directly from verified sustainable local organic farms. No frozen substitutes or pre-packaged marinades.'
  },
  {
    id: 'why2',
    title: 'Professional Master Chefs',
    description: 'Led by culinary experts with decades of hospitality experience, ensuring every platters visual appeal and flavor profile represents award-winning gastronomy.'
  },
  {
    id: 'why3',
    title: 'Timely & Safe Delivery',
    description: 'Equipped with temperature-controlled transit fleets, we guarantee that your hot steaks remain perfectly hot and cold drinks stay perfectly chilled upon arrival.'
  },
  {
    id: 'why4',
    title: 'Affordable & Transparent Pricing',
    description: 'Elite luxury catering should not be exclusive to multi-million portfolios. We offer flexible customized tier pricing structured for both local events and grand galas.'
  },
  {
    id: 'why5',
    title: 'Excellent Concierge Support',
    description: 'Our customer support channels are active 24/7. From last-minute guest alterations to complex custom allergies, our menu planners consult you actively.'
  }
];
