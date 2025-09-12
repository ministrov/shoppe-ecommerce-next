import Image from 'next/image';
import React from 'react';
import { useFavorites } from '@/hooks/useFavorite';
import { AddFavoriteProps } from './AddFavorite.interface';
import styles from './AddFavorite.module.css';

export const AddFavorite = ({ productId }: AddFavoriteProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  console.log(productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e.target)
    toggleFavorite(productId);
  };
  // console.log(productId);
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
      <Image src={'/favorite.svg'} width={18} height={18} alt={''} />
    </button>
  )
}
