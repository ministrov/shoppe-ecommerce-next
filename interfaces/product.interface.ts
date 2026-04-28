import { Category } from './category.interface';
import { Review } from './review.interface';

/**
 * Товар в интернет-магазине.
 */
export interface Product {
  /** Уникальный идентификатор товара */
  id: number;
  /** Название товара */
  name: string;
  /** Цена в рублях */
  price: number;
  /** Краткое описание (для карточек) */
  short_description: string;
  /** Полное описание (для страницы товара) */
  long_description: string;
  /** Артикул (SKU) */
  sku: string;
  /** Размер скидки в процентах (0–100) */
  discount: number;
  /** Массив URL изображений товара */
  images: string[];
  /** ID категории товара */
  category_id: number;
  /** Объект категории товара */
  category: Category;
  /** Дата создания в формате ISO строки */
  created_at: string;
  /** Дата последнего обновления в формате ISO строки */
  updated_at: string;
}

/**
 * Ответ сервера на запрос списка товаров с пагинацией.
 */
export interface GetProductsResponse {
  /** Массив товаров */
  products: Product[];
  /** Общее количество товаров (без учёта limit/offset) */
  total: number;
  /** Лимит на страницу */
  limit: number;
  /** Смещение (пагинация) */
  offset: number;
}

/**
 * Ответ сервера на запрос конкретного товара.
 */
export interface GetProductResponse {
  /** Данные товара */
  product: Product;
  /** Массив отзывов к товару */
  reviews: Review[];
}
