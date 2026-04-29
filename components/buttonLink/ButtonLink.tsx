'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ButtonLink.module.css';

/**
 * Свойства компонента ButtonLink.
 *
 * @typedef {Object} ButtonLinkProps
 * @property {string} pathname - Текущий путь (pathname) для определения активной ссылки
 * @property {string} path - URL, на который ведет ссылка
 * @property {string} [iconPath] - Опциональный путь к иконке для отображения
 * @property {string} [text] - Опциональный текст ссылки
 * @property {boolean} [isCount] - Флаг отображения счетчика
 * @property {number} [count] - Числовое значение счетчика
 */
type ButtonLinkProps = {
  pathname: string;
  path: string;
  iconPath?: string;
  text?: string;
  isCount?: boolean;
  count?: number;
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

/**
 * Компонент ссылки-кнопки с поддержкой иконок, текста, счетчика и анимации активного состояния.
 * Используется для навигации в меню. Подсвечивает активную ссылку анимированной линией.
 * Поддерживает отображение счетчика (например, количество товаров в корзине) с учетом гидратации.
 *
 * @param {ButtonLinkProps} props - Свойства компонента
 * @param {string} props.pathname - Текущий путь для определения активной ссылки
 * @param {string} props.path - URL, на который ведет ссылка
 * @param {string} [props.iconPath] - Опциональный путь к иконке для отображения
 * @param {string} [props.text] - Опциональный текст ссылки
 * @param {boolean} [props.isCount] - Флаг отображения счетчика
 * @param {number} [props.count] - Числовое значение счетчика
 * @returns {JSX.Element} Ссылка с возможными иконкой, текстом, счетчиком и индикатором активности
 *
 * @example
 * // Базовая ссылка с текстом
 * <ButtonLink pathname="/catalog" path="/catalog" text="Каталог" />
 *
 * @example
 * // Ссылка с иконкой и счетчиком
 * <ButtonLink pathname="/cart" path="/cart" iconPath="/cart.svg" isCount count={3} />
 */
export const ButtonLink = ({ pathname, path, iconPath, text, isCount = false, count = 0 }: ButtonLinkProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // На сервере не рендерим счетчик, чтобы избежать расхождений
  const shouldShowCount = isMounted && isCount;

  return (
    <Link href={path} className={styles.navLink}>
      {iconPath && <Image src={iconPath} width={21} height={21} alt={`Icon link ${iconPath}`} />}
      {<p className={styles.linkText}>{text}</p>}
      {pathname === path && (
        <motion.span
          className={styles.active}
          initial='hidden'
          animate='visible'
          variants={underlineVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}
      {/* {isCount && <span className={styles.count}>{count}</span>} */}
      {shouldShowCount && (
        <span className={styles.count}>
          {count}
        </span>
      )}
    </Link>
  );
};
