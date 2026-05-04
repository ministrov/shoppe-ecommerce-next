/**
 * Элемент меню пользователя.
 */
export interface UserMenuItem {
  /** Уникальный идентификатор элемента (строка) */
  id: string;
  /** Путь для навигации */
  path: string;
  /** Текст ссылки (опционально) */
  text?: string;
  /** Путь к иконке в public (опционально) */
  iconPath?: string;
  /** Флаг отображения счетчика */
  isCount?: boolean;
  /** Значение счетчика (если не передано, будет вычисляться автоматически) */
  count?: number;
  /** Тип элемента для автоматического подсчета (корзина, избранное) */
  countType?: 'cart' | 'favorites';
}

/**
 * Свойства компонента UserMenu.
 */
export interface UserMenuProps {
  /** Текущий путь (pathname) для определения активной ссылки */
  pathname: string;
  /** Массив элементов меню (опционально, по умолчанию используется стандартный набор) */
  items?: UserMenuItem[];
  /** Дополнительный CSS-класс для корневого элемента */
  className?: string;
  /** Callback, вызываемый при клике на элемент меню */
  onItemClick?: (item: UserMenuItem) => void;
}