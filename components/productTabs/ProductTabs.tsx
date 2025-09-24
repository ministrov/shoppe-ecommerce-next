'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabsSkeleton } from '../tabSkeleton/TabSkeleton';
import { ProductTabsProps } from './ProductTabs.interface';
import { formatDescription } from '@/helpers';
import styles from './ProductTabs.module.css';

export const ProductTabs = ({ description, reviews, loading = false }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  if (loading) {
    return (
      <TabsSkeleton />
    );
  }

  return (
    <div className={styles.tabs}>
      {/* Заголовки табов с анимацией индикатора */}
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Описание
          {activeTab === 'description' && (
            <motion.div
              className={styles.activeIndicator}
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>

        <button
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Отзывы {reviews.length > 0 && <span className={styles.reviewsCount}>({reviews.length})</span>}
          {activeTab === 'reviews' && (
            <motion.div
              className={styles.activeIndicator}
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Контент табов с анимацией смены */}
      <div className={styles.tabsContent}>
        <AnimatePresence mode="wait">
          {activeTab === 'description' ? (
            <motion.div
              key="description"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabPanel}
            >
              <h3>Описание товара</h3>
              <div className={styles.description}>
                {formatDescription(description)}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabPanel}
            >
              <h3>Отзывы покупателей {reviews.length > 0 && <span className={styles.reviewsCount}>({reviews.length})</span>}</h3>
              {reviews.length > 0 ? (
                <div className={styles.reviewsList}>
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};