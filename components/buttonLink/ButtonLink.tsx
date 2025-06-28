import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  pathname: string;
  path: string;
  icon?: string | null;
  text: string
}

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

export const ButtonLink = ({ pathname, path, icon = null, text }: ButtonLinkProps) => {
  return (
    <Link href={path} className={styles.navLink}>
      {icon && icon}
      {text}
      {pathname === path && (
        <motion.span
          className={styles.activeIndicator}
          initial='hidden'
          animate='visible'
          variants={underlineVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
    </Link>
  );
};
