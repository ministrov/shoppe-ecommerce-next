import Link from 'next/link';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import { socials } from '@/mocks/socials.mock';
import { SocialsListProps } from './SocialsList.interface';
import { LinkedinIcon } from './LinkedinIcon';
import cn from 'classnames';
import styles from './SocialsList.module.css';

const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
};

/**
 * Компонент списка социальных сетей.
 * Отображает иконки социальных сетей в виде горизонтального или вертикального списка ссылок.
 * Использует данные из файла `socials.mock.ts`.
 * Каждая иконка обёрнута в ссылку (Link) для навигации (в текущей реализации ведёт на "#").
 * Поддерживает настройку размера иконок, ориентации и дополнительных CSS-классов.
 * Иконки Facebook, Instagram, Twitter импортируются из библиотеки lucide-react.
 * Иконка LinkedIn импортируется из отдельного файла `LinkedinIcon.tsx` (решение проблемы с устаревшей LinkedinIcon).
 * Все иконки поддерживают изменение цвета через CSS (currentColor).
 *
 * @param {SocialsListProps} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для контейнера списка
 * @param {'horizontal' | 'vertical'} [props.variant='horizontal'] - Вариант отображения списка
 * @param {number} [props.iconSize=20] - Размер иконок социальных сетей в пикселях
 * @returns {JSX.Element} Неупорядоченный список (`<ul>`) с элементами социальных сетей.
 */
export const SocialsList = ({
  className,
  variant = 'horizontal',
  iconSize = 20,
}: SocialsListProps) => {
  const listClassName = cn(
    styles.socials,
    {
      [styles.vertical]: variant === 'vertical',
    },
    className
  );

  return (
    <ul className={listClassName}>
      {socials.map((social) => {
        const IconComponent = iconComponents[social.icon];
        return (
          <li key={social.id} className={styles.item}>
            <Link
              href='#'
              aria-label={`Перейти в ${social.name}`}
              title={`${social.name}`}
            >
              {IconComponent ? (
                <IconComponent size={iconSize} />
              ) : (
                <span>{social.name}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
