import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string,
  ghost?: boolean,
  size?: 'medium' | 'small',
  children: ReactNode;
}
