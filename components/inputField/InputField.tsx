'use client';

import { useId } from 'react';
import { InputFieldProps } from './InputField.interface';
import cn from 'classnames';
import styles from './InputField.module.css';

export const InputField = ({ id, name, className, variant, ...props }: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <input
      id={inputId}
      name={name || inputId}
      className={cn(styles.input, className, {
        [styles.gray]: variant === 'gray',
        [styles.black]: variant === 'black'
      })}

      autoComplete='off' {...props}
    />
  );
};
