import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLong?: boolean;
  isError: boolean;
  text: string;
}
