'use client';

import { useState, useEffect } from 'react';
import { RangeSliderProps } from './RangeSlider.interface';
import styles from './RangeSlider.module.css';

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