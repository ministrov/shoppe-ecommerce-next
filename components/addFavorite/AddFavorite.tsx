'use client';

import Image from 'next/image';
import React from 'react';
import { useFavorites } from '@/hooks/useFavorite';
import { AddFavoriteProps } from './AddFavorite.interface';
import styles from './AddFavorite.module.css';

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
