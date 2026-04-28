import Link from 'next/link';
import Image from 'next/image';
import { socials } from '@/mocks/socials.mock';
import styles from './SocialsList.module.css';

/**
 * Компонент списка социальных сетей.
 * Отображает иконки социальных сетей в виде горизонтального списка ссылок.
 * Использует данные из файла `socials.ts`.
 * Каждая иконка обёрнута в ссылку (Link) для навигации (в текущей реализации ведёт на "#").
 *
 * @param {SocialsListProps} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для контейнера списка
 * @param {'horizontal' | 'vertical'} [props.variant='horizontal'] - Вариант отображения списка
 * @param {number} [props.iconSize=20] - Размер иконок социальных сетей в пикселях
 * @returns {JSX.Element} Неупорядоченный список (`<ul>`) с элементами социальных сетей.
 */
export const SocialsList = () => {
  return (
    <ul className={styles.socials}>
      {socials.map((social) => (
        <li key={social.id} className={styles.item}>
          <Link href='#'>
            <Image src={social.icon} width={20} height={20} alt={`Social icon ${social.name}`} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
