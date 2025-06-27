'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../logo/Logo';
import { Searching } from '../searching/Searching';
import styles from './Header.module.css';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%' },
  };

  const showSearching = {
    hidden: { opacity: 0 },
    visible: { opacity: open ? 1 : 0 },
  };

  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles.mainMenu}>
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

        <div className={styles.userBlock}>
          <div className={styles.searchBox}>
            <motion.div
              className={styles.searching}
              initial={'hidden'}
              animate={'visible'}
              variants={showSearching}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {open && <Searching />}
            </motion.div>
            <Image
              className={styles.searchIcon}
              src={'/search.svg'}
              width={19}
              height={19}
              alt={'Icon search'}
              onClick={() => setOpen((current) => !current)}
            />
          </div>

          <ul className={styles.userList}>
            <li className={styles.userItem}>
              <span className={styles.cartCount}>0</span>
              <Link href={'/cart'} className={styles.iconLink}>
                <Image src={'/shopping-cart.svg'} width={21} height={21} alt={'Cart'} />
                {pathname === '/cart' && (
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
            <li>
              <Link href={'/favorites'} className={styles.iconLink}>
                <Image src={'/heart.svg'} width={21} height={21} alt={'Cart'} />
                {pathname === '/favorites' && (
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
            <li>
              <Link href={'/orders'} className={styles.iconLink}>
                <Image src={'/account.svg'} width={21} height={21} alt={'Cart'} />
                {pathname === '/orders' && (
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
        </div>
      </div>
    </header>
  );
};
