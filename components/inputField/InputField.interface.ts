import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant: 'gray' | 'black';
  className?: string;
}
