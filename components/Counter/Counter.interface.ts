import { DetailedHTMLProps } from 'react';

export interface CounterProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  counter: number;
}
