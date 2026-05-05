/**
 * Интерфейс для компонента FooterBottom.
 * Определяет нижнюю часть футера с копирайтом и социальными сетями.
 */
export interface FooterBottomProps {
  /**
   * Текст копирайта.
   * По умолчанию: "© {текущий год} Shoppe"
   */
  copyrightText?: string;
  /**
   * Флаг отображения социальных сетей.
   * По умолчанию: true
   */
  showSocials?: boolean;
  /**
   * Дополнительные CSS-классы для контейнера.
   */
  className?: string;
  /**
   * Дополнительные CSS-классы для блока социальных сетей.
   */
  socialsClassName?: string;
  /**
   * Дополнительные CSS-классы для блока копирайта.
   */
  copyrightClassName?: string;
}