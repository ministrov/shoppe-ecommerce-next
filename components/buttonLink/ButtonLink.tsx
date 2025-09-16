'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  pathname: string;
  path: string;
  iconPath?: string;
  text?: string;
  isCount?: boolean;
  count?: number;
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

export const ButtonLink = ({ pathname, path, iconPath, text, isCount = false, count = 0 }: ButtonLinkProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // На сервере не рендерим счетчик, чтобы избежать расхождений
  const shouldShowCount = isMounted && isCount;

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
      {/* {isCount && <span className={styles.count}>{count}</span>} */}
      {shouldShowCount && (
        <span className={styles.count}>
          {count}
        </span>
      )}
    </Link>
  );
};
