'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SelectFieldProps } from './SelectField.interface';
import styles from './SelectField.module.css';

/**
 * Компонент выпадающего списка (select) с кастомной стрелкой.
 * Поддерживает управляемое и неуправляемое состояние.
 *
 * @param {SelectFieldProps} props - Пропсы компонента.
 * @param {SelectFieldOption[]} props.options - Опции для выбора.
 * @param {string} [props.value] - Начальное выбранное значение.
 * @param {(value: string) => void} [props.onChange] - Обработчик изменения выбора.
 * @returns {JSX.Element} Элемент выпадающего списка.
 */
export const SelectField = ({ options, value, onChange }: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  /**
   * Обрабатывает изменение значения в элементе <select>.
   * Обновляет локальное состояние и вызывает внешний обработчик, если передан.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event - Событие изменения select.
   * @returns {void}
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  }
  return (
    <div className={styles.selectWrapper}>
      <select className={styles.select} id="catalog-select" value={selectedValue} onChange={handleChange}>
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} />
    </div>
  )
}
