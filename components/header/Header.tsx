'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%' }
  };

  console.log(pathname);
  return (
    <header className={styles.header}>
      <Logo/>

      <div className={styles.mainMenu}>
        <ul className={styles.linksList}>
          <li className={styles.shop}>
            <Link href={'/catalog'} className={styles.navLink}>
              Магазин
              {pathname === '/catalog' && (
                <motion.span
                  className={styles.activeIndicator}
                  initial="hidden"
                  animate="visible"
                  variants={underlineVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                  initial="hidden"
                  animate="visible"
                  variants={underlineVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              )}
            </Link>
          </li>
        </ul>

        <ul className={styles.iconList}>
          <li>
            <Link href={'#'}>
              <Image src={'/search.svg'} width={19} height={19} alt={'Icon search'} />
            </Link>
          </li>
          <li>
            {/* <Link 
              href={'/cart'}
              className={pathname === '/cart' ? styles.active : ''}
            >
              <Image src={'/shopping-cart.svg'} width={21} height={21} alt={'Icon shopping cart'} />
            </Link> */}
            <Link href={'/cart'} className={styles.iconLink}>
              <Image src={'/shopping-cart.svg'} width={21} height={21} alt={'Cart'} />
              {pathname === '/cart' && (
                <motion.span
                  className={styles.iconActiveIndicator}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </li>
          <li>
            {/* <Link 
              href={'/favorites'}
              className={pathname === '/favorites' ? styles.active : ''}
            >
              <Image src={'/heart.svg'} width={21} height={21} alt={'Icon heart for favorites'} />
            </Link> */}
            <Link href={'/favorites'} className={styles.iconLink}>
              <Image src={'/heart.svg'} width={21} height={21} alt={'Cart'} />
              {pathname === '/favorites' && (
                <motion.span
                  className={styles.iconActiveIndicator}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </li>
          <li>
            {/* <Link 
              href={'/orders'}
              className={pathname === '/orders' ? styles.active : ''}
            >
              <Image src={'/account.svg'} width={21} height={21} alt={'Icon user account'} />
            </Link> */}
            <Link href={'/orders'} className={styles.iconLink}>
              <Image src={'/account.svg'} width={21} height={21} alt={'Cart'} />
              {pathname === '/orders' && (
                <motion.span
                  className={styles.iconActiveIndicator}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;