import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.css';

/**
 * Компонент логотипа сайта.
 * Отображает SVG-логотип "SHOPPE" с ссылкой на главную страницу.
 * Использует приоритетную загрузку изображения для улучшения производительности.
 *
 * @returns {JSX.Element} Логотип с ссылкой на главную страницу
 *
 * @example
 * // Использование в header или layout
 * <Logo />
 */
export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link className={styles.link} href={'/'} >
        <Image
          src={'/SHOPPE.svg'}
          width={158}
          height={40}
          alt={'logo'}
          priority
          fetchPriority="high"
        />
      </Link>
    </div>
  );
};