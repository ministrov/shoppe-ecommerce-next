import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearence: 'primary' | 'ghost';
  children: ReactNode;
}
