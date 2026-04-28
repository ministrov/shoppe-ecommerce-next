/**
 * Свойства компонента кнопки добавления в избранное.
 */
export interface AddFavoriteProps {
  /** ID продукта, который можно добавить в избранное */
  productId: number;
  /** Флаг, указывающий, должна ли кнопка быть видимой (true) или скрытой (false) */
  isShown: boolean;
}
