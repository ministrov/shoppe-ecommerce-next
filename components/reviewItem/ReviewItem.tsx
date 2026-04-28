import { motion } from 'framer-motion';
import { StarIcon } from '../starIcon/StarIcon';
import { ReviewItemProps } from './ReviewItem.interface';
import styles from './ReviewItem.module.css';

/**
 * Компонент отзыва о товаре.
 * Отображает информацию об авторе, дате, рейтинге (звёзды) и тексте отзыва.
 * Использует анимации Framer Motion для плавного появления.
 *
 * @param {ReviewItemProps} props - Свойства компонента.
 * @param {Review} props.review - Объект отзыва, содержащий имя, дату, рейтинг и текст.
 * @returns {JSX.Element} Элемент карточки отзыва с оформлением.
 */
export const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <motion.div
      className={styles.reviewItem}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.reviewHeader}>
        <span className={styles.reviewAuthor}>{review.name}</span>
        <span className={styles.reviewDate}>
          {new Date(review.created_at).toLocaleDateString('ru-RU')}
        </span>
      </div>
      <div className={styles.reviewRating}>
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            isFilled={index < review.rating}
          />
        ))}
      </div>
      <p className={styles.reviewText}>{review.text}</p>
    </motion.div>
  );
};
