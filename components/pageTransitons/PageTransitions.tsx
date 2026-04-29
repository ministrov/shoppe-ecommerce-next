'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransitionProps } from './PageTransitions.interface';

/**
 * Компонент для плавных переходов между страницами с использованием анимаций Framer Motion.
 * Обёртывает содержимое страницы и применяет анимацию появления/исчезновения при смене маршрута.
 * Использует `AnimatePresence` для управления анимациями при монтировании и размонтировании.
 *
 * @param {PageTransitionProps} props - Пропсы компонента
 * @param {React.ReactNode} props.children - Дочерние элементы (контент страницы) для анимированного перехода
 * @returns {JSX.Element} Обёртка с анимацией для контента страницы
 *
 * @example
 * // Использование в layout.tsx для анимированных переходов между страницами
 * <PageTransitions>
 *   {children}
 * </PageTransitions>
 */
export const PageTransitions = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="page-content"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
