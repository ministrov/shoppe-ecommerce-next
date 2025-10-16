import { StaticImageData } from 'next/image';

import img1 from './image-1.png';
import img2 from './image-2.png';
import img3 from './image-3.png';
export interface CartItemProps {
  id: string;
  title: string;
  image: string | StaticImageData;
  price: number | string;
  quantity: number;
  onRemove?: (id: string) => void;
  onChangeQuantity?: (id: string, quantity: number) => void;
}

export const cartItemMocks: CartItemProps[] = [
  {
    id: '1',
    title: 'Lira Earrings',
    image: img1,
    price: '$ 20,00',
    quantity: 3,
    onRemove: () => {},
    onChangeQuantity: () => {},
  },
  {
    id: '2',
    title: 'Ollie Earrings',
    image: img2,
    price: '$ 20,00',
    quantity: 1,
    onRemove: () => {},
    onChangeQuantity: () => {},
  },
  {
    id: '3',
    title: 'Игровая мышь',
    image: img3,
    price: '$ 20,00',
    quantity: 1,
    onRemove: () => {},
    onChangeQuantity: () => {},
  },
];
