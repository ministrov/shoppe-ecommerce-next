import { JSX } from 'react';
import { Review } from '@/interfaces/review.interface';

/**
 * Свойства компонента контента вкладок.
 */
export interface TabContentProps {
  /** Активная вкладка: 'description' (описание) или 'reviews' (отзывы) */
  activeTab: 'description' | 'reviews';
  /** Текстовое описание товара */
  description: string;
  /** Массив отзывов о товаре */
  reviews: Review[];
  /** Функция форматирования описания (разбивает текст на строки) */
  formatDescription: (text: string) => JSX.Element[];
}
