import Image from 'next/image';
import Link from 'next/link';
import Logo from '../logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo/>

      <div className={styles.mainMenu}>
        <ul className={styles.linksList}>
          <li className={styles.shop}>
            <Link href={'#'}>Магазин</Link>
          </li>
          <li className={styles.about}>
            <Link href={'#'}>О нас</Link>
          </li>
        </ul>

        <ul className={styles.iconList}>
          <li>
            <Link href={''}>
              <Image src={'/search.svg'} width={19} height={19} alt={''} />
            </Link>
          </li>
          <li>
            <Link href={''}>
            <Image src={'/shopping-cart.svg'} width={21} height={21} alt={''} /></Link>
          </li>
          <li>
            <Link href={''}>
            <Image src={'/heart.svg'} width={21} height={21} alt={''} /></Link>
          </li>
          <li>
            <Link href={''}>
            <Image src={'/account.svg'} width={21} height={21} alt={''} /></Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;