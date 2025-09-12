'use client';

import { NoFavorites } from '@/components/noFavorites/NoFavorites';
import { useFavorites } from '@/hooks/useFavorite';
import styles from './page.module.css';

export default function Favorites() {
  const { favoritesCount } = useFavorites();

  return <div className={styles.favorites}>
    <h1 className="left">Избранное</h1>

    {favoritesCount === 0 && <NoFavorites />}
  </div>;
};