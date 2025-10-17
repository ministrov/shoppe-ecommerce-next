import { DM_Sans } from 'next/font/google';

// Configure DM Sans with multiple weights
export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans-dm-sans',
});
