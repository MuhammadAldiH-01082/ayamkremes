export type Category = 'Semua' | 'Paket Ayam Kremes' | 'Ayam Bakar Kremes' | 'Nasi Kuning' | 'Nasi Tumpeng' | 'Lainnya';

export interface Variation {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  isMain?: boolean;
  variations?: Variation[];
  spiceLevel?: number; // 0 to 5
  badge?: string;
  portion?: string;
  includes?: string[];
  minOrder?: number;
  createdAt: any;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discountPercent: number;
  active: boolean;
  createdAt: any;
}

export interface CateringInquiry {
  fullName: string;
  whatsappNumber: string;
  eventType: string;
  eventDate: string;
  paxCount: number;
  selectedPackage: string;
  deliveryLocation: string;
  additionalNotes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: any;
}

export interface ChatRoom {
  id: string;
  userName: string;
  userEmail: string;
  lastMessage?: string;
  lastUpdatedAt: any;
  unreadCount?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedVariation?: Variation;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: any;
}


