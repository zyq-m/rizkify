import { LocationT } from '@/store/store';

type ItemT = {
  id: number;
  email: string;
  name: string;
  category: CategoryT;
  quantity: number;
  condition: string | null;
  expiry: Date | null;
  location: LocationT | null;
  description: string | null;
  timestamp: Date | string;
  available: boolean;
  images: { uri: string }[] | null;
  user?: User;
};

interface CardInterface {
  id: string;
  uri: string;
  name: string;
  rating: number;
  user?: User;
  quantity: number;
}

type User = {
  email: string;
  name: string | null;
  avatar: string | null;
  timestamp: Date;
  username: string;
  phone: string | null;
};

interface Chat {
  id: number;
  user: User;
  message: {
    id: number;
    text: string | null;
    createdAt: Date;
  };
  // name: string;
  // avatar: string;
  // message: string;
  // date: string;
}

interface Cart {
  item: CardInterface;
  quantity: number;
  isCheck: boolean;
}

type CategoryT = {
  id: string;
  name: string;
  image?: string;
};

export type WishList = {
  total: number;
  favourite: {
    id: number;
    item: ItemT;
  }[];
};

export type RequestedUserT = {
  id: number;
  item: ItemT;
  item_id: number;
  quantity: number;
  email: string;
  user: User;
  completed: boolean;
  timestamp: Date | string;
};

export { CardInterface, Chat, Cart, ItemT, User, CategoryT };
