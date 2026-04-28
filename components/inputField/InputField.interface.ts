/**
 * Пропсы компонента InputField.
 */
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Визуальный вариант поля ввода */
  variant?: 'gray' | 'black' | 'error';
}
