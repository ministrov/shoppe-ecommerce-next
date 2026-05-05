'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Message } from '@/components/message/Message';
import { FormMessageWithAnimationProps } from './FormMessageWithAnimation.interface';
import cn from 'classnames';
import styles from './FormMessageWithAnimation.module.css';

/**
 * Компонент для отображения сообщений с анимацией появления и исчезновения.
 * Использует framer-motion для плавных анимаций и компонент Message для отображения содержимого.
 * Поддерживает кастомные настройки анимации через пропсы.
 *
 * @param {FormMessageWithAnimationProps} props - Пропсы компонента
 * @param {string} props.message - Текст сообщения
 * @param {boolean} props.isVisible - Флаг видимости сообщения
 * @param {boolean} props.isError - Флаг типа сообщения (ошибка/успех)
 * @param {boolean} [props.isLong=false] - Флаг длинного сообщения
 * @param {Object} [props.animation] - Настройки анимации
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @returns {JSX.Element | null} Анимированное сообщение или null если не видимо
 *
 * @example
 * <FormMessageWithAnimation
 *   message="Вы успешно подписались!"
 *   isVisible={showSuccess}
 *   isError={false}
 *   animation={{
 *     initial: { x: 20, opacity: 0 },
 *     animate: { x: 0, opacity: 1 },
 *     exit: { x: 50, opacity: 0 },
 *     transition: { duration: 0.4 }
 *   }}
 * />
 */
export const FormMessageWithAnimation = ({
  message,
  isVisible,
  isError,
  isLong = false,
  animation,
  className,
}: FormMessageWithAnimationProps) => {
  // Стандартные настройки анимации (аналогичные используемым в Footer)
  const defaultAnimation = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' } as const,
  };

  const mergedAnimation = { ...defaultAnimation, ...animation };

  return (
    <div className={cn(styles.container, className)}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.message}
            {...mergedAnimation}
            key={message} // Используем message как ключ для правильной анимации при смене текста
          >
            <Message text={message} isError={isError} isLong={isLong} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};