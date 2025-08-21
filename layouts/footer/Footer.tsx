import Link from 'next/link';
import Image from 'next/image';
import { SocialsList } from '@/components/socialsList/SocialsList';
import { InputField } from '@/components/inputField/InputField';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <hr />
      <div className={styles.footer__top}>
        <ul>
          <li>
            <Link href='#'>Контакты</Link>
          </li>
          <li>
            <Link href='#'>Условия покупки</Link>
          </li>
          <li>
            <Link href='#'>Доставка и возврат</Link>
          </li>
        </ul>
        <div className={styles.footer__form}>
          <form action='#' method='POST'>
            <InputField className={styles.footer__input} placeholder='Ваш email для акций и предложений' />
            <button className={styles.footer__subscribe} type='submit' name='subscribe'>
              <Image src='/arrow-right.svg' width={20} height={20} alt='Subscribe icon' />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <div className={styles.footer__copyright}>© {new Date().getFullYear()} Shoppe</div>
        <div className={styles.footer__social}>
          <SocialsList />
        </div>
      </div>
    </div>
  );
};
