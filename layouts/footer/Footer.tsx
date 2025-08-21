import Link from 'next/link';
import { SocialsList } from '@/components/socialsList/SocialsList';
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
          {/* <InputField
          class="footer__input"
          placeholder="Ваш email для акций и предложений"
          variant="black"
        /> */}
          <button className={styles.footer__subscribe}></button>
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
