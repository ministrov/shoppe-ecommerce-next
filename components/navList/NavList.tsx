import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './NavList.module.css';

type NavListProps = {
  pathname: string;
}

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

export const NavList = ({ pathname }: NavListProps) => {
  return (
    <ul className={styles.navList}>
      <li className={styles.shop}>
        <Link href={'/catalog'} className={styles.navLink}>
          Магазин
          {pathname === '/catalog' && (
            <motion.span
              className={styles.activeIndicator}
              initial='hidden'
              animate='visible'
              variants={underlineVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}
        </Link>
      </li>
      <li className={styles.about}>
        <Link href={'/about'} className={styles.navLink}>
          О нас
          {pathname === '/about' && (
            <motion.span
              className={styles.activeIndicator}
              initial='hidden'
              animate='visible'
              variants={underlineVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}
        </Link>
      </li>
    </ul>
  );
};
