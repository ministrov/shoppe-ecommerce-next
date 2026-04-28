import { Review } from '@/interfaces/review.interface';

/**
 * Свойства компонента ReviewItem.
 * Определяет данные, необходимые для отображения отзыва.
 *
 * @property {Review} review - Объект отзыва, содержащий информацию об авторе, дате, рейтинге и тексте.
 */
export interface ReviewItemProps {
  review: Review;
}
