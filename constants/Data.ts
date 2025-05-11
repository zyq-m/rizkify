import { CardInterface, Cart, Chat } from './type';

const CARD_ITEM: CardInterface[] = [
  {
    id: '1',
    uri: 'https://images.pexels.com/photos/12269761/pexels-photo-12269761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'chair',
    rating: 4,
    user: {
      name: 'John',
      avatar:
        'https://images.pexels.com/photos/3049394/pexels-photo-3049394.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2',
    },
    quantity: 3,
  },
  {
    id: '2',
    uri: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'chair',
    rating: 3,
    user: {
      name: 'Alice',
      avatar:
        'https://images.pexels.com/photos/3049394/pexels-photo-3049394.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2',
    },
    quantity: 4,
  },
  {
    id: '3',
    uri: 'https://images.pexels.com/photos/3804408/pexels-photo-3804408.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'history books',
    rating: 4,
    user: {
      name: 'Lance',
      avatar:
        'https://images.pexels.com/photos/3049394/pexels-photo-3049394.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2',
    },
    quantity: 10,
  },
  {
    id: '4',
    uri: 'https://images.pexels.com/photos/7218517/pexels-photo-7218517.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'printer',
    rating: 4,
    user: {
      name: 'Anas',
      avatar:
        'https://images.pexels.com/photos/3049394/pexels-photo-3049394.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2',
    },
    quantity: 1,
  },
  {
    id: '5',
    uri: 'https://images.pexels.com/photos/268349/pexels-photo-268349.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'notebook',
    rating: 3,
    user: {
      name: 'Alia',
      avatar:
        'https://images.pexels.com/photos/3049394/pexels-photo-3049394.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2',
    },
    quantity: 6,
  },
  {
    id: '6',
    uri: 'https://images.pexels.com/photos/998591/pexels-photo-998591.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'pen',
    rating: 5,
    user: {
      name: 'Ahmad',
      avatar:
        'https://images.pexels.com/photos/3049394/pexels-photo-3049394.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=2',
    },
    quantity: 10,
  },
];

const CHAT_LIST: Chat[] = [
  {
    id: 3,
    user: {
      name: 'John',
      avatar:
        'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'user@email.com',
      timestamp: new Date(),
      phone: '',
      username: '',
    },
    message: {
      id: 1,
      text: 'Hi there. This is item is available',
      createdAt: new Date(),
    },
  },
];

const CART_LIST: Cart[] = CARD_ITEM.map((item) => ({
  item: { ...item },
  quantity: 1,
  isCheck: false,
}));

export { CARD_ITEM, CHAT_LIST, CART_LIST };
