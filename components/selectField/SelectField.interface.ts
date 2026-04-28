/**
 * Опция для выпадающего списка.
 * @property {string} value - Значение опции, передаваемое при выборе.
 * @property {string} label - Отображаемый текст опции.
 */
export interface SelectFieldOption {
  value: string;
  label: string;
}

/**
 * Пропсы компонента SelectField.
 * @property {SelectFieldOption[]} options - Массив опций для отображения в выпадающем списке.
 * @property {string} [value] - Текущее выбранное значение (контролируемое).
 * @property {(value: string) => void} [onChange] - Callback-функция, вызываемая при изменении выбора.
 */
export interface SelectFieldProps {
  options: SelectFieldOption[];
  value?: string;
  onChange?: (value: string) => void;
}