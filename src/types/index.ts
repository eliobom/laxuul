export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Villa';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  capacity: {
    adults: number;
    children: number;
  };
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Reservation {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  roomType?: RoomType;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}