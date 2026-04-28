import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Product } from '@/interfaces/product.interface';

/**
 * Пропсы компонента ProductCard.
 */
export interface ProductCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  /** Данные товара для отображения */
  product: Product;
}
