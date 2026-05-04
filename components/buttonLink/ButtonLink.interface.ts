/**
 * Свойства компонента ButtonLink.
 *
 * @interface ButtonLinkProps
 * @property {string} pathname - Текущий путь (pathname) для определения активной ссылки
 * @property {string} path - URL, на который ведет ссылка
 * @property {string} [iconPath] - Опциональный путь к иконке для отображения
 * @property {string} [text] - Опциональный текст ссылки
 * @property {boolean} [isCount] - Флаг отображения счетчика
 * @property {number} [count] - Числовое значение счетчика
 * @property {() => void} [onClick] - Callback, вызываемый при клике на ссылку
 */
export interface ButtonLinkProps {
  pathname: string;
  path: string;
  iconPath?: string;
  text?: string;
  isCount?: boolean;
  count?: number;
  onClick?: () => void;
}