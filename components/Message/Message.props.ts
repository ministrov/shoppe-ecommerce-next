import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  content: string;
  isLong?: boolean;
  isError: boolean;
}
