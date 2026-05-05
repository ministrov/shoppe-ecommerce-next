'use client';

import { useState, useCallback } from 'react';

/**
 * Хук для управления состоянием поискового поля.
 * Предоставляет флаг видимости поиска и функции для управления им.
 *
 * @returns {Object} Объект с состоянием и функциями управления
 * @property {boolean} isSearchVisible - Флаг видимости поискового поля
 * @property {function} toggleSearch - Функция переключения видимости поиска
 * @property {function} showSearch - Функция показа поиска
 * @property {function} hideSearch - Функция скрытия поиска
 */
export const useSearch = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isSearchVisible: isVisible,
    toggleSearch: toggle,
    showSearch: show,
    hideSearch: hide,
  };
};