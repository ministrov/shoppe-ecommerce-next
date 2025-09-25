import { motion } from 'framer-motion';
import { StarIcon } from '../starIcon/StarIcon';
import { ReviewItemProps } from './ReviewItem.interface';
import styles from './ReviewItem.module.css';

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
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <p className={styles.reviewText}>{review.text}</p>
    </motion.div>
  );
};
