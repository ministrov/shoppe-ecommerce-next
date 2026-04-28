import styles from './TabSkeleton.module.css';

/**
 * Компонент-скелетон для загрузки вкладок.
 * Используется для отображения плейсхолдера во время загрузки данных.
 *
 * @returns {JSX.Element} Скелетон с заголовками вкладок и контентом
 */
export const TabSkeleton = () => {
  return (
    <div className={styles.tabs}>
      <div className={styles.tabsHeader}>
        <div className={`${styles.tabButton} ${styles.skeleton}`}>Описание</div>
        <div className={`${styles.tabButton} ${styles.skeleton}`}>Отзывы</div>
      </div>
      <div className={styles.tabsContent}>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>
    </div>
  );
};