'use client';

import { useState, useCallback } from 'react';

/**
 * Хук для управления состоянием мобильного меню.
 * Предоставляет флаг открытия меню и функции для управления им.
 *
 * @returns {Object} Объект с состоянием и функциями управления
 * @property {boolean} isMobileMenuOpen - Флаг открытия мобильного меню
 * @property {function} toggleMobileMenu - Функция переключения состояния меню
 * @property {function} openMobileMenu - Функция открытия меню
 * @property {function} closeMobileMenu - Функция закрытия меню
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback((value?: boolean) => {
    setIsOpen((prev) => (value !== undefined ? value : !prev));
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isMobileMenuOpen: isOpen,
    toggleMobileMenu: toggle,
    openMobileMenu: open,
    closeMobileMenu: close,
  };
};