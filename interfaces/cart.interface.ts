import { StaticImageData } from 'next/image';
import { Product } from './product.interface';

/**
 * Элемент корзины, представляющий товар с количеством.
 * Используется для хранения в состоянии Redux и localStorage.
 */
export interface CartItem {
  /** Уникальный идентификатор элемента корзины (генерируется) */
  id: string;
  /** ID товара из Product */
  productId: number;
  /** Название товара */
  title: string;
  /** URL изображения или StaticImageData */
  image: string | StaticImageData;
  /** Цена за единицу в числовом формате (для расчётов) */
  price: number;
  /** Количество товара в корзине */
  quantity: number;
}

/**
 * Состояние корзины в Redux store.
 */
export interface CartState {
  /** Массив элементов корзины */
  items: CartItem[];
  /** Общая сумма корзины (рассчитывается автоматически) */
  total: number;
  /** Флаг загрузки (для будущей интеграции с API) */
  loading: boolean;
  /** Сообщение об ошибке (если есть) */
  error: string | null;
}

/**
 * Параметры для добавления товара в корзину.
 */
export interface AddToCartParams {
  /** Данные товара */
  product: Product;
  /** Количество (по умолчанию 1) */
  quantity?: number;
}

/**
 * Параметры для изменения количества товара в корзине.
 */
export interface UpdateQuantityParams {
  /** ID элемента корзины */
  id: string;
  /** Новое количество (должно быть >= 1) */
  quantity: number;
}