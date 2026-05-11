import { AnimatePresence } from 'framer-motion';
import { TabContentProps } from './TabContent.interface';
import { TabDescription } from './TabDescription';
import { TabReviews } from './TabReviews';
import styles from './TabContent.module.css';

/**
 * Компонент контента вкладок (описание и отзывы).
 * Переключается между описанием товара и списком отзывов с анимацией.
 * Использует отдельные компоненты TabDescription и TabReviews.
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