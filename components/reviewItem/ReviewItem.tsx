import { motion } from 'framer-motion';
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
        {/* <span className={styles.reviewAuthor}>{review.author}</span> */}
        <div className={styles.reviewRating}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>
              ★
            </span>
          ))}
        </div>
        <span className={styles.reviewDate}>
          {/* {new Date(review.date).toLocaleDateString('ru-RU')} */}
        </span>
      </div>
      <p className={styles.reviewText}>{review.text}</p>
    </motion.div>
  );
};
