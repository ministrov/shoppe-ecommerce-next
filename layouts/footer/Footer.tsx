'use client';

import { FooterNavigation } from '@/components/footerNavigation/FooterNavigation';
import { NewsletterSubscription } from '@/components/newsletterSubscription/NewsletterSubscription';
import { FooterBottom } from '@/components/footerBottom/FooterBottom';
import styles from './Footer.module.css';

/**
 * Компонент подвала сайта.
 * Содержит навигационные ссылки, форму подписки на рассылку и социальные сети.
 * Реализует валидацию email и отображение сообщений об ошибках/успехе.
 * Использует декомпозированные компоненты для улучшения поддерживаемости.
 *
 * @returns {JSX.Element} Подвал сайта
 */
export const Footer = () => {
  // Данные для навигационных ссылок
  const navigationLinks = [
    { href: '#', label: 'Контакты' },
    { href: '#', label: 'Условия покупки' },
    { href: '#', label: 'Доставка и возврат' },
  ];

  // Обработчик отправки формы подписки (имитация)
  const handleSubscribe = async (email: string) => {
    // Здесь должен быть реальный запрос к API подписки
    await new Promise(resolve => setTimeout(resolve, 800)); // имитация задержки
    console.log('Подписка оформлена для:', email);
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__top}>
        <FooterNavigation
          links={navigationLinks}
          ariaLabel="Навигация по сайту"
        />
        {/* <div>
          
        </div> */}
        <NewsletterSubscription
          onSubmit={handleSubscribe}
          inputId="footer-subscribe-email"
          inputPlaceholder="Ваш email для акций и предложений"
          buttonAriaLabel="Подписаться на рассылку"
          customErrorMessages={{
            empty: 'Пожалуйста, введите email',
            invalid: 'Пожалуйста, введите корректный email',
            submitError: 'Произошла ошибка при подписке. Попробуйте позже.',
            success: 'Вы успешно подписались на рассылку!',
          }}
          showMessages={true}
          successMessageDuration={3000}
        />
      </div>
      <div className={styles.footer__bottom}>
        <FooterBottom
          copyrightText={`© ${new Date().getFullYear()} Shoppe`}
          showSocials={true}
          copyrightClassName={styles.footer__copyright}
          socialsClassName={styles.footer__social}
        />
      </div>
    </footer>
  );
};
