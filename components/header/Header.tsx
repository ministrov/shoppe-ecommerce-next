import Image from 'next/image';
import Link from 'next/link';
import Logo from '../logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo/>

      <div className={styles.mainMenu}>
        <ul>
          <li>
            <Link href={'#'}>Магазин</Link>
          </li>
          <li>
            <Link href={'#'}>О нас</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href={''}>
              <Image src={'/search.svg'} width={20} height={20} alt={''} />
            </Link>
          </li>
          <li>
            <Link href={''}>
            <Image src={'/shopping-cart.svg'} width={20} height={20} alt={''} /></Link>
          </li>
          <li>
            <Link href={''}>
            <Image src={'/heart.svg'} width={20} height={20} alt={''} /></Link>
          </li>
          <li>
            <Link href={''}>
            <Image src={'/account.svg'} width={20} height={20} alt={''} /></Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;