import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearence: 'primary' | 'ghost';
  size: 'full' | 'medium' | 'small',
  children: ReactNode;
}
