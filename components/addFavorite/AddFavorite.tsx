'use client';

import Image from 'next/image';
import React from 'react';
import { useFavorites } from '@/hooks/useFavorite';
import { AddFavoriteProps } from './AddFavorite.interface';
import styles from './AddFavorite.module.css';

/**
 * Компонент кнопки добавления/удаления товара из избранного.
 * Использует хук `useFavorites` для управления состоянием избранного.
 * Кнопка может быть скрыта или показана в зависимости от пропсов и текущего состояния.
 *
 * @param {AddFavoriteProps} props - Свойства компонента
 * @param {number} props.productId - ID продукта, который можно добавить в избранное
 * @param {boolean} props.isShown - Флаг, указывающий, должна ли кнопка быть видимой (true) или скрытой (false)
 * @returns {JSX.Element} Кнопка с иконкой сердца
 *
 * @example
 * // Показать кнопку всегда
 * <AddFavorite productId={123} isShown={true} />
 *
 * @example
 * // Скрыть кнопку, если товар не в избранном
 * <AddFavorite productId={456} isShown={false} />
 */
export const AddFavorite = ({ productId, isShown }: AddFavoriteProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  const shouldShow = isShown || isFavorite(productId);
  const favorite = isFavorite(productId);

  return (
    <button
      className={`${styles.favButton} ${!shouldShow ? styles.hidden : ''}`}
      onClick={handleClick}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      suppressHydrationWarning
    >
      <Image
        src={'/favorite.svg'}
        width={18}
        height={18}
        alt={favorite ? 'Remove from favorites' : 'Add to favorites'}
        suppressHydrationWarning
      />
    </button>
  )
}
