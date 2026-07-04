import { User, Address, MenuItem, MenuOption } from './index';

export interface Order {
  _id: string;
  orderNumber: string;
  customer: string | User;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  serviceCharge: number;
  tax: number;
  totalAmount: number;
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusHistory: OrderStatusHistory[];
  paymentMethod: 'cash' | 'card' | 'khalti' | 'esewa' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentDetails?: {
    transactionId?: string;
    paymentDate?: string;
    paymentGateway?: string;
    paymentResponse?: any;
  };
  deliveryAddress?: Address;
  assignedTo?: string;
  estimatedTime?: string;
  actualTime?: string;
  deliveryTime?: string;
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  menuItem: string | MenuItem;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  specialInstructions?: string;
  options: MenuOption[];
}

export interface OrderStatusHistory {
  status: string;
  updatedBy: string;
  timestamp: string;
  note?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: MenuOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface CheckoutData {
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  deliveryAddress?: Address;
  paymentMethod: 'cash' | 'card' | 'khalti' | 'esewa' | 'online';
  notes?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  serviceCharge: number;
  tax: number;
  totalAmount: number;
}