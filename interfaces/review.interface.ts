/**
 * Отзыв на товар.
 */
export interface Review {
  /** Уникальный идентификатор отзыва */
  id: number;
  /** Имя автора отзыва */
  name: string;
  /** ID товара, к которому относится отзыв */
  product_id: number;
  /** Оценка от 1 до 5 */
  rating: number;
  /** Текст отзыва */
  text: string;
  /** Дата создания в формате ISO строки */
  created_at: string;
}
