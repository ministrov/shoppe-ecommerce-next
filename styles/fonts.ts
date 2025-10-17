import { Cuprum } from 'next/font/google';

export const cuprum = Cuprum({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-cuprum',
});
