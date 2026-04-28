import { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewItem } from '../reviewItem/ReviewItem';
import { TabContentProps } from './TabContent.interface';
import { ReviewForm } from '../reviewForm/ReviewForm';
import { Review } from '@/interfaces/review.interface';
import styles from './TabContent.module.css';

/**
 * Компонент контента вкладок (описание и отзывы).
 * Переключается между описанием товара и списком отзывов с анимацией.
 *
 * @param {TabContentProps} props - Свойства компонента
 * @param {'description' | 'reviews'} props.activeTab - Активная вкладка
 * @param {string} props.description - Текстовое описание товара
 * @param {Review[]} props.reviews - Массив отзывов о товаре
 * @param {function} props.formatDescription - Функция форматирования описания
 * @returns {JSX.Element} Контейнер с анимированным контентом вкладок
 */
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

/**
 * Внутренний компонент для отображения вкладки с описанием товара.
 *
 * @param {Object} props - Свойства компонента
 * @param {string} props.description - Текстовое описание товара
 * @param {function} props.formatDescription - Функция форматирования описания
 * @returns {JSX.Element} Анимированный блок с описанием
 */
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

/**
 * Внутренний компонент для отображения вкладки с отзывами.
 *
 * @param {Object} props - Свойства компонента
 * @param {Review[]} props.reviews - Массив отзывов о товаре
 * @returns {JSX.Element} Анимированный блок со списком отзывов и формой добавления
 */
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

    <ReviewForm />
  </motion.div>
);