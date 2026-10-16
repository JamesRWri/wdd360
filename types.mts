export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  cart: CartItem[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderDate: Date;
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
}