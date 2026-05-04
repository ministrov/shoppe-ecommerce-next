'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ButtonLinkProps } from './ButtonLink.interface';
import styles from './ButtonLink.module.css';

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

/**
 * Компонент ссылки-кнопки с поддержкой иконок, текста, счетчика и анимации активного состояния.
 * Используется для навигации в меню. Подсвечивает активную ссылку анимированной линией.
 * Поддерживает отображение счетчика (например, количество товаров в корзине) с учетом гидратации.
 * Счетчик отображается только после гидратации клиентской стороны, чтобы избежать расхождений.
 *
 * @param {ButtonLinkProps} props - Свойства компонента
 * @param {string} props.pathname - Текущий путь (pathname) для определения активной ссылки
 * @param {string} props.path - URL, на который ведет ссылка
 * @param {string} [props.iconPath] - Опциональный путь к иконке в папке public
 * @param {string} [props.text] - Опциональный текст ссылки (отображается рядом с иконкой)
 * @param {boolean} [props.isCount] - Флаг отображения счетчика (по умолчанию false)
 * @param {number} [props.count] - Числовое значение счетчика (по умолчанию 0)
 * @param {() => void} [props.onClick] - Callback, вызываемый при клике на ссылку
 * @returns {JSX.Element} Ссылка с возможными иконкой, текстом, счетчиком и индикатором активности
 *
 */
export const ButtonLink = ({ pathname, path, iconPath, text, isCount = false, count = 0, onClick }: ButtonLinkProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // На сервере не рендерим счетчик, чтобы избежать расхождений
  const shouldShowCount = isMounted && isCount;

  return (
    <Link href={path} className={styles.navLink} onClick={onClick}>
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
