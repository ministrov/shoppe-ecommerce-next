export interface CartItemProps {
  id: string;
  title: string;
  image: string;
  description?: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

export const cartItemMocks: CartItemProps[] = [
  {
    id: '1',
    title: 'Беспроводные наушники',
    image: '/images/wireless-headphones.jpg',
    description:
      'Удобные наушники с шумоподавлением и длительным временем работы.',
    price: 3990,
    quantity: 2,
    onRemove: () => {},
    onChangeQuantity: () => {},
  },
  {
    id: '2',
    title: 'Смарт-часы Pro',
    image: '/images/smartwatch.jpg',
    description: 'Функциональные умные часы с сенсорным экраном.',
    price: 7490,
    quantity: 1,
    onRemove: () => {},
    onChangeQuantity: () => {},
  },
  {
    id: '3',
    title: 'Игровая мышь',
    image: '/images/gaming-mouse.jpg',
    description: 'Эргономичная мышь с настраиваемой подсветкой.',
    price: 2590,
    quantity: 3,
    onRemove: () => {},
    onChangeQuantity: () => {},
  },
];
