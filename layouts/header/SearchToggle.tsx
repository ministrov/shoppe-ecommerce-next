'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Searching } from '../../components/searching/Searching';
import styles from './Header.module.css';

/**
 * Пропсы для компонента переключения поиска.
 */
interface SearchToggleProps {
  /** Флаг видимости поискового поля */
  isVisible: boolean;
  /** Функция переключения видимости поиска */
  onToggle: () => void;
}

/**
 * Компонент переключения поиска.
 * Управляет отображением поискового поля с анимацией Framer Motion.
 * Содержит иконку поиска, при клике на которую появляется/скрывается поле поиска.
 *
 * @param {SearchToggleProps} props - Пропсы компонента
 * @returns {JSX.Element} Блок поиска с переключателем
 */
export const SearchToggle = ({ isVisible, onToggle }: SearchToggleProps) => {
  /**
   * Варианты анимации для поискового поля.
   * Мемоизированы, чтобы избежать пересоздания при каждом рендере.
   */
  const showSearching = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }),
    []
  );

  return (
    <div className={styles.searchBox}>
      <motion.div
        className={styles.searching}
        initial={'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
        variants={showSearching}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {isVisible && <Searching />}
      </motion.div>
      <Image
        className={styles.searchIcon}
        src={'/search.svg'}
        width={21}
        height={21}
        alt={'Иконка поиска'}
        onClick={onToggle}
      />
    </div>
  );
};