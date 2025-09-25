import { motion } from 'framer-motion';
import { TabButtonProps } from './TabButton.interface';
import styles from './TabButton.module.css';

export const TabButton = ({ label, isActive, count, onClick, layoutId }: TabButtonProps) => {
  console.log(layoutId);
  console.log(count);
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
