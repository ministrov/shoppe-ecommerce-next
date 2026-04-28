'use client';

import { useId } from 'react';
import { InputFieldProps } from './InputField.interface';
import cn from 'classnames';
import styles from './InputField.module.css';

/**
 * Поле ввода с поддержкой различных визуальных вариантов.
 * Автоматически генерирует уникальный ID, если он не передан.
 *
 * @param props - Пропсы компонента
 * @param props.id - Идентификатор поля (опционально)
 * @param props.name - Имя поля (опционально, по умолчанию равен id)
 * @param props.className - Дополнительные CSS-классы
 * @param props.variant - Визуальный вариант ('gray', 'black', 'error')
 * @param props.rest - Стандартные атрибуты HTML-инпута
 * @returns React-элемент поля ввода
 *
 * @example
 * <InputField variant="gray" placeholder="Введите email" />
 * <InputField variant="error" value={value} onChange={handleChange} />
 */
export const InputField = ({ id, name, className, variant, ...props }: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <input
      id={inputId}
      name={name || inputId}
      className={cn(styles.input, className, {
        [styles.gray]: variant === 'gray',
        [styles.black]: variant === 'black',
        [styles.error]: variant === 'error'
      })}

      autoComplete='off' {...props}
    />
  );
};
