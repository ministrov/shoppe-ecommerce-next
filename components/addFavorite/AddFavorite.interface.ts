import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface AddFavoriteProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  id: string;
  isShown: boolean;
}
