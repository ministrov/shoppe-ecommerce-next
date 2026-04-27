export interface StarIconProps {
  /** Режим редактирования (влияет на tabIndex) */
  isEditable?: boolean;
  /** Состояние закрашенности звезды */
  isFilled?: boolean;
  /** Callback при изменении состояния (переключении) */
  onToggle?: (filled: boolean) => void;
}
