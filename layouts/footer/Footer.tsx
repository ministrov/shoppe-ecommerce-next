import Link from 'next/link';
import Image from 'next/image';
import { SocialsList } from '@/components/socialsList/SocialsList';
import { InputField } from '@/components/inputField/InputField';
import styles from './Footer.module.css';

export const Footer = () => {
  const emailFieldId = 'footer-subscribe-email';

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__top}>
        <nav aria-label="Навигация по сайту">
          <h2 className="visually-hidden">Навигация по сайту</h2>
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
        </nav>
        <div>
          <form className={styles.footer__form} action='#' method='POST'>
            <label htmlFor={emailFieldId} className="visually-hidden">
              Ваш email для акций и предложений
            </label>
            <InputField
              id={emailFieldId}
              className={styles.footer__input}
              variant='black'
              name='subscribe'
              placeholder='Ваш email для акций и предложений'
              aria-label="Ваш email для акций и предложений"
            />
            <button
              className={styles.footer__subscribe}
              type='submit'
              name='subscribe'
              aria-label="Подписаться на рассылку"
            >
              <Image src='/arrow-right.svg' width={20} height={20} alt='' />
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
    </footer>
  );
};
