import { JSX } from 'react';
import { Review } from '@/interfaces/review.interface';

export interface TabContentProps {
  activeTab: 'description' | 'reviews';
  description: string;
  reviews: Review[];
  formatDescription: (text: string) => JSX.Element[];
}
