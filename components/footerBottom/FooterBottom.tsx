import { SocialsList } from '@/components/socialsList/SocialsList';
import { FooterBottomProps } from './FooterBottom.interface';
import cn from 'classnames';
import styles from './FooterBottom.module.css';

/**
 * Компонент нижней части футера.
 * Отображает копирайт и социальные сети.
 * Использует существующий компонент SocialsList для отображения иконок соцсетей.
 *
 * @param {FooterBottomProps} props - Пропсы компонента
 * @param {string} [props.copyrightText] - Текст копирайта
 * @param {boolean} [props.showSocials=true] - Флаг отображения социальных сетей
 * @param {string} [props.className] - Дополнительные CSS-классы для контейнера
 * @param {string} [props.socialsClassName] - Дополнительные CSS-классы для блока социальных сетей
 * @param {string} [props.copyrightClassName] - Дополнительные CSS-классы для блока копирайта
 * @returns {JSX.Element} Нижняя часть футера с копирайтом и социальными сетями
 *
 * @example
 * <FooterBottom
 *   copyrightText="© 2025 My Company"
 *   showSocials={true}
 * />
 */
export const FooterBottom = ({
  copyrightText,
  showSocials = true,
  className,
  socialsClassName,
  copyrightClassName,
}: FooterBottomProps) => {
  // Генерация текста копирайта по умолчанию
  const defaultCopyrightText = `© ${new Date().getFullYear()} Shoppe`;
  const finalCopyrightText = copyrightText || defaultCopyrightText;

  return (
    <div className={cn(styles.bottom, className)}>
      <div className={cn(styles.copyright, copyrightClassName)}>
        {finalCopyrightText}
      </div>
      {showSocials && (
        <div className={cn(styles.socials, socialsClassName)}>
          <SocialsList />
        </div>
      )}
    </div>
  );
};