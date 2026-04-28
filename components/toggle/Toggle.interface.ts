/**
 * Свойства компонента переключателя (toggle).
 */
export interface ToggleProps {
  /** Состояние переключателя (включен/выключен) */
  isChecked: boolean;
  /** Обработчик клика по переключателю */
  onClick: () => void;
}
