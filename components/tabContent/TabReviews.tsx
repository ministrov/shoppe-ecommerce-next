import { motion } from 'framer-motion';
import { ReviewItem } from '../reviewItem/ReviewItem';
import { ReviewForm } from '../reviewForm/ReviewForm';
import { Review } from '@/interfaces/review.interface';
import styles from './TabContent.module.css';

/**
 * Интерфейс пропсов компонента TabReviews.
 */
export interface TabReviewsProps {
  /** Массив отзывов о товаре */
  reviews: Review[];
}

/**
 * Компонент для отображения вкладки с отзывами.
 * Отображает список отзывов или сообщение об отсутствии отзывов, а также форму добавления нового отзыва.
 * Включает анимацию появления.
 *
 * @param {TabReviewsProps} props - Свойства компонента
 * @param {Review[]} props.reviews - Массив отзывов о товаре
 * @returns {JSX.Element} Анимированный блок со списком отзывов и формой добавления
 */
export const TabReviews = ({ reviews }: TabReviewsProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className={styles.tabPanel}
  >
    {reviews.length > 0 ? (
      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    ) : (
      <motion.p
        className={styles.noReviews}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Пока нет отзывов. Будьте первым!
      </motion.p>
    )}

    <ReviewForm />
  </motion.div>
);