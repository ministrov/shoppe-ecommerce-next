'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { UseScrollToTopReturn } from '@/components/scrollToTop/ScrollToTopButton.interface';

/**
 * Кастомный хук для отслеживания скролла страницы и управления кнопкой "Вернуться к началу".
 * Отслеживает позицию скролла и предоставляет функцию для плавного скролла к началу страницы.
 *
 * @param {number} [threshold=540] - Порог в пикселях, после которого кнопка становится видимой.
 *                                   По умолчанию 540px (как указано в требованиях).
 * @param {number} [scrollDuration=500] - Длительность анимации скролла в миллисекундах.
 * @param {'smooth' | 'auto'} [scrollBehavior='smooth'] - Поведение скролла.
 * @returns {UseScrollToTopReturn} Объект с состоянием видимости и функцией скролла.
 *
 * @example
 * // Базовое использование
 * const { isVisible, scrollToTop, currentScrollY } = useScrollToTop();
 *
 * @example
 * // С кастомным порогом
 * const { isVisible, scrollToTop } = useScrollToTop(300);
 *
 * @example
 * // С кастомной длительностью анимации
 * const { isVisible, scrollToTop } = useScrollToTop(540, 1000);
 */
export const useScrollToTop = (
  threshold: number = 540,
  scrollDuration: number = 500,
  scrollBehavior: 'smooth' | 'auto' = 'smooth'
): UseScrollToTopReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  /**
   * Функция для плавного скролла к началу страницы.
   * Использует requestAnimationFrame для плавной анимации.
   * Поддерживает как нативный smooth scroll, так и полифилл для старых браузеров.
   */
  const scrollToTop = useCallback(() => {
    const startPosition = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);

      // Кубическая easing-функция для более естественной анимации
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const easedProgress = easeInOutCubic(progress);
      const newPosition = startPosition * (1 - easedProgress);

      window.scrollTo(0, newPosition);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      } else {
        // После завершения анимации сбрасываем состояние hover/фокуса
        setIsVisible(false);
      }
    };

    // Если браузер поддерживает smooth scroll и мы используем нативное поведение
    if (scrollBehavior === 'smooth' && 'scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Устанавливаем таймаут для сброса видимости после завершения скролла
      setTimeout(() => setIsVisible(false), scrollDuration);
    } else {
      // Полифилл для старых браузеров
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    }
  }, [scrollDuration, scrollBehavior]);

  /**
   * Обработчик события скролла.
   * Проверяет текущую позицию скролла и обновляет состояние видимости.
   * Использует requestAnimationFrame для оптимизации производительности.
   */
  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      setCurrentScrollY(scrollY);
      setIsVisible(scrollY > threshold);
    });
  }, [threshold]);

  /**
   * Эффект для добавления и удаления обработчика события скролла.
   * Также очищает анимационный фрейм при размонтировании компонента.
   */
  useEffect(() => {
    // Инициализируем состояние при монтировании
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  return {
    isVisible,
    scrollToTop,
    currentScrollY,
  };
};