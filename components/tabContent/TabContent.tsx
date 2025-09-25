import { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewItem } from '../reviewItem/ReviewItem';
import { TabContentProps } from './TabContent.interface';
import { Review } from '@/interfaces/review.interface';
import styles from './TabContent.module.css';

export const TabContent = ({ activeTab, description, reviews, formatDescription }: TabContentProps) => {
  return (
    <div className={styles.tabsContent}>
      <AnimatePresence mode="wait">
        {activeTab === 'description' ? (
          <TabDescription
            key="description"
            description={description}
            formatDescription={formatDescription}
          />
        ) : (
          <TabReviews
            key="reviews"
            reviews={reviews}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TabDescription = ({ description, formatDescription }: {
  description: string;
  formatDescription: (text: string) => JSX.Element[];
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className={styles.tabPanel}
  >
    <div className={styles.description}>
      {formatDescription(description)}
    </div>
  </motion.div>
);

const TabReviews = ({ reviews }: { reviews: Review[] }) => (
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
  </motion.div>
);