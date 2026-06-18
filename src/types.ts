export interface MealItem {
  id: string;
  name: string;
  description: string;
  price: number; // per person or per unit
  category: 'meal' | 'snack' | 'beverage' | 'package';
  imageUrl: string;
  popular: boolean;
  features: string[]; // e.g. ["Organic", "Gluten Free", "Chef Special"]
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

export type EventType = 'wedding' | 'corporate' | 'birthday' | 'private_party' | 'other';

export interface BookingInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: EventType;
  guestCount: number;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  selectedItems: {
    itemId: string;
    quantity: number;
  }[];
  totalEstimated: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
