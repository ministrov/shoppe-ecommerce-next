import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: 'medium' | 'small',
  children: ReactNode;
}
