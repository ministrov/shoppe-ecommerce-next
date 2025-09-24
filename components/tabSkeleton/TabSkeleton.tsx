import styles from './TabsSkeleton.module.css';

export const TabsSkeleton = () => {
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