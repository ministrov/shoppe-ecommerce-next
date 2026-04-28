import { motion } from 'framer-motion';
import { TabButtonProps } from './TabButton.interface';
import styles from './TabButton.module.css';

/**
 * Компонент кнопки вкладки (таба) с поддержкой анимации активного состояния.
 * Отображает текст, опциональное количество и анимированный индикатор при активности.
 *
 * @param {TabButtonProps} props - Свойства компонента
 * @param {string} props.label - Текст кнопки
 * @param {boolean} props.isActive - Флаг активности вкладки
 * @param {number} [props.count] - Опциональное количество (например, количество отзывов)
 * @param {function} props.onClick - Обработчик клика по кнопке
 * @param {string} props.layoutId - Идентификатор для анимации активного индикатора (layoutId Framer Motion)
 * @returns {JSX.Element} Кнопка вкладки с анимацией
 *
 * @example
 * <TabButton
 *   label="Отзывы"
 *   isActive={activeTab === 'reviews'}
 *   count={reviews.length}
 *   onClick={() => setActiveTab('reviews')}
 *   layoutId="tab-indicator"
 * />
 */
export const TabButton = ({ label, isActive, count, onClick, layoutId }: TabButtonProps) => {
  return (
    <button
      className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className={styles.count}>({count})</span>
      )}
      {isActive && (
        <motion.div
          className={styles.activeIndicator}
          layoutId={layoutId}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}
