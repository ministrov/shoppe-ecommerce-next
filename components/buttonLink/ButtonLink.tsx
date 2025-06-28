import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  pathname: string;
  path: string;
  iconPath?: string;
  text?: string;
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

export const ButtonLink = ({ pathname, path, iconPath, text }: ButtonLinkProps) => {
  return (
    <Link href={path} className={styles.navLink}>
      {iconPath && <Image src={iconPath} width={21} height={21} alt={`Icon link ${iconPath}`} />}
      {<p className={styles.linkText}>{text}</p>}
      {pathname === path && (
        <motion.span
          className={styles.active}
          initial='hidden'
          animate='visible'
          variants={underlineVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
    </Link>
  );
};
