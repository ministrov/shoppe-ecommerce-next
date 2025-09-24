'use client';

import { useState } from 'react';
import { TabSkeleton } from '../tabSkeleton/TabSkeleton';
import { TabButton } from '../tabButton/TabButton';
import { ProductTabsProps } from './ProductTabs.interface';
import { formatDescription } from '@/helpers';
import styles from './ProductTabs.module.css';
import { TabContent } from '../tabContent/TabContent';

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


      <TabContent activeTab={activeTab} description={description} reviews={[]} formatDescription={formatDescription} />
    </div>
  );
};