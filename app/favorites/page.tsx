'use client';

import { NoFavorites } from '@/components/noFavorites/NoFavorites';
import { useFavorites } from '@/hooks/useFavorite';
import styles from './page.module.css';

export default function Favorites() {
  const { favoritesCount, favoriteIds } = useFavorites();

  // console.log(favoriteIds.map((el) => el));
  console.log(favoriteIds);

  return (
    <div className={styles.favorites}>
      <h1 className="left">Избранное</h1>

      {favoritesCount === 0 && <NoFavorites />}

      <ul>

      </ul>
    </div>
  );
};