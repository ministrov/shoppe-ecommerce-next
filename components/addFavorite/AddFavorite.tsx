import Image from 'next/image';
import React from 'react';
import { useFavorites } from '@/hooks/useFavorite';
import { AddFavoriteProps } from './AddFavorite.interface';
import styles from './AddFavorite.module.css';

export const AddFavorite = ({ productId, isShown }: AddFavoriteProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  // console.log(isShown);
  console.log(isFavorite);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  const shouldShow = isShown || isFavorite(productId);

  if (!shouldShow) {
    return null;
  }

  return (
    <button
      className={styles.favButton}
      onClick={handleClick}
      aria-label={
        isFavorite(productId)
          ? 'Remove from favorites'
          : 'Add to favorites'
      }
    >
      <Image src={'/favorite.svg'} width={18} height={18} alt={isFavorite(productId) ? 'Remove from favorites' : 'Add to favorites'} />
    </button>
  )
}
