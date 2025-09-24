import { Review } from '@/interfaces/review.interface';

export interface ProductTabsProps {
  description: string;
  reviews: Review[];
  loading?: boolean;
}
