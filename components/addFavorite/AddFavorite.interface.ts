import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface AddFavoriteProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  productId: number;
}
