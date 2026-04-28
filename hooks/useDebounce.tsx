import { useState, useEffect } from 'react';

/**
 * Хук для отложенного обновления значения (debounce).
 * Возвращает значение, которое обновляется только после указанной задержки без новых изменений.
 * Полезно для уменьшения количества обработчиков (например, при поиске с вводом в реальном времени).
 *
 * @template T - Тип значения
 * @param value - Исходное значение, которое нужно «отложить»
 * @param delay - Задержка в миллисекундах
 * @returns Отложенное значение
 *
 * @example
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 300);
 * // debouncedSearch обновится только через 300 мс после последнего изменения search
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
