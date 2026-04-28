'use client';

import { useState, useEffect } from 'react';
import { RangeSliderProps } from './RangeSlider.interface';
import styles from './RangeSlider.module.css';

/**
 * Компонент двойного слайдера для выбора диапазона значений.
 * Предоставляет визуальную полосу с двумя бегунками, позволяющими выбрать минимальное и максимальное значение.
 * Компонент поддерживает управляемый режим (controlled) — значение контролируется через проп `value` и `onChange`.
 *
 * Особенности:
 * - Визуальное отображение выбранного диапазона в виде цветной полосы
 * - Отображение текущих значений в формате "Цена: $X - $Y"
 * - Поддержка клавиатурного управления и доступности (ARIA-атрибуты)
 * - Валидация: бегунки не могут пересекаться (min <= max)
 * - Синхронизация внутреннего состояния с внешними изменениями пропса `value`
 *
 * @param {RangeSliderProps} props - Свойства компонента
 * @param {number} props.min - Минимально возможное значение диапазона (включительно)
 * @param {number} props.max - Максимально возможное значение диапазона (включительно)
 * @param {[number, number]} props.value - Текущий выбранный диапазон в формате [min, max]
 * @param {function} props.onChange - Функция обратного вызова, вызываемая при изменении диапазона. Принимает новый диапазон [min, max]
 * @param {string} [props.className=''] - Дополнительные CSS-классы для корневого элемента
 * @returns {JSX.Element} Компонент двойного слайдера
 *
 * @example
 * // Базовое использование
 * const [range, setRange] = useState([100, 500]);
 * <RangeSlider
 *   min={0}
 *   max={1000}
 *   value={range}
 *   onChange={setRange}
 * />
 *
 * @example
 * // С кастомным классом для стилизации
 * <RangeSlider
 *   min={0}
 *   max={100}
 *   value={[20, 80]}
 *   onChange={(newRange) => console.log(newRange)}
 *   className="my-slider"
 * />
 */
export const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  className = ''
}: RangeSliderProps) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  // console.log(minValue);
  // console.log(maxValue);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= maxValue) {
      setMinValue(newMin);
      onChange([newMin, maxValue]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= minValue) {
      setMaxValue(newMax);
      onChange([minValue, newMax]);
    }
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={`${styles.sliderContainer} ${className}`}>
      <div className={styles.sliderWrapper}>
        <div className={styles.track} />
        <div
          className={styles.range}
          style={{
            left: `${minPos}%`,
            width: `${maxPos - minPos}%`
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className={styles.thumb}
          aria-label="Минимальная цена"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.thumb}
          aria-label="Максимальная цена"
        />
      </div>

      <div className={styles.priceDisplay}>
        <span>{`Цена: $${minValue} - $${maxValue}`}</span>
      </div>
    </div>
  );
};