// import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

// export interface InputFieldProps
//   extends DetailedHTMLProps<
//     InputHTMLAttributes<HTMLInputElement>,
//     HTMLInputElement
//   > {
//   variant: 'gray' | 'black';
//   className?: string;
// }
export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: 'gray' | 'black';
}
