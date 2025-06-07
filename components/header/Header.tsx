'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <header className={styles.header}>
      <Logo/>

      <div className={styles.mainMenu}>
        <ul className={styles.linksList}>
          <li className={styles.shop}>
            <Link 
              href={'/catalog'}
              className={pathname === '/catalog' ? styles.active : ''}
              >
                Магазин
              </Link>
          </li>
          <li className={styles.about}>
            <Link 
              href={'/about'}
              className={pathname === '/about' ? styles.active : ''}
            >
              О нас
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
            <Link 
              href={'/cart'}
              className={pathname === '/cart' ? styles.active : ''}
            >
              <Image src={'/shopping-cart.svg'} width={21} height={21} alt={'Icon shopping cart'} />
            </Link>
          </li>
          <li>
            <Link 
              href={'/favorites'}
              className={pathname === '/favorites' ? styles.active : ''}
            >
              <Image src={'/heart.svg'} width={21} height={21} alt={'Icon heart for favorites'} />
            </Link>
          </li>
          <li>
            <Link 
              href={'/orders'}
              className={pathname === 'orders' ? styles.active : ''}
            >
              <Image src={'/account.svg'} width={21} height={21} alt={'Icon user account'} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;