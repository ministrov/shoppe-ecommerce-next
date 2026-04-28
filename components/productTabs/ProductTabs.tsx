'use client';

import { useState } from 'react';
import { TabSkeleton } from '../tabSkeleton/TabSkeleton';
import { TabButton } from '../tabButton/TabButton';
import { ProductTabsProps } from './ProductTabs.interface';
import { formatDescription } from '@/helpers';
import { TabContent } from '../tabContent/TabContent';
import styles from './ProductTabs.module.css';

/**
 * Компонент табов для отображения информации о продукте.
 * Предоставляет две вкладки: "Описание" и "Отзывы".
 * Поддерживает состояние загрузки (отображает скелетон) и плавные переходы между вкладками.
 *
 * Особенности:
 * - Автоматический выбор первой вкладки при монтировании
 * - Анимация индикатора активной вкладки с помощью Framer Motion
 * - Отображение количества отзывов на кнопке вкладки "Отзывы"
 * - Форматирование описания продукта с помощью вспомогательной функции `formatDescription`
 * - Загрузочный скелетон при `loading=true`
 *
 * @param {ProductTabsProps} props - Свойства компонента
 * @param {string} props.description - Текст описания продукта (может содержать HTML-разметку)
 * @param {Review[]} props.reviews - Массив отзывов о продукте
 * @param {boolean} [props.loading=false] - Флаг загрузки данных. Если true, отображается скелетон вместо контента
 * @returns {JSX.Element} Компонент табов продукта
 *
 * @example
 * // Базовое использование
 * <ProductTabs
 *   description="<p>Отличный продукт</p>"
 *   reviews={[
 *     { id: 1, author: 'Иван', rating: 5, text: 'Супер!' },
 *     { id: 2, author: 'Мария', rating: 4, text: 'Хорошо' }
 *   ]}
 * />
 *
 * @example
 * // Состояние загрузки
 * <ProductTabs
 *   description=""
 *   reviews={[]}
 *   loading={true}
 * />
 */
export const ProductTabs = ({ description, reviews, loading = false }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  if (loading) {
    return (
      <TabSkeleton />
    );
  }

  return (
    <div className={styles.tabs}>
      {/* Заголовки табов с анимацией индикатора */}
      <div className={styles.tabsHeader}>
        <TabButton
          label="Описание"
          isActive={activeTab === 'description'}
          onClick={() => setActiveTab('description')}
          layoutId={activeTab}
        />

        <TabButton
          label="Отзывы"
          isActive={activeTab === 'reviews'}
          count={reviews.length}
          onClick={() => setActiveTab('reviews')}
          layoutId={activeTab}
        />
      </div>


      <TabContent activeTab={activeTab} description={description} reviews={reviews} formatDescription={formatDescription} />
    </div>
  );
};