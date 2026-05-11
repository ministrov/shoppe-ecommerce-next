import { JSX } from 'react';
import { motion } from 'framer-motion';
import styles from './TabContent.module.css';

/**
 * Интерфейс пропсов компонента TabDescription.
 */
export interface TabDescriptionProps {
  /** Текстовое описание товара */
  description: string;
  /** Функция форматирования описания (разбивает текст на строки) */
  formatDescription: (text: string) => JSX.Element[];
}

/**
 * Компонент для отображения вкладки с описанием товара.
 * Отображает форматированное описание с анимацией появления.
 *
 * @param {TabDescriptionProps} props - Свойства компонента
 * @param {string} props.description - Текстовое описание товара
 * @param {function} props.formatDescription - Функция форматирования описания
 * @returns {JSX.Element} Анимированный блок с описанием
 */
export const TabDescription = ({ description, formatDescription }: TabDescriptionProps) => (
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