// hooks/useFavorites.ts
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoriteIds,
  selectFavoritesCount,
  toggleFavorite
} from '../store/favoriteSlice';
// import type { RootState } from '@/store/store';
import type { AppDispatch } from '@/store/store';

export const useFavorites = () => {
  // Типизированный dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Типизированные селекторы
  const favoriteIds = useSelector(selectFavoriteIds);
  const favoritesCount = useSelector(selectFavoritesCount);

  // Функция проверки без использования хуков внутри
  const isFavorite = (id: number): boolean => {
    return favoriteIds.includes(id);
  };

  return {
    favoriteIds, // теперь будет number[]
    favoritesCount, // number
    isFavorite, // (id: number) => boolean
    toggleFavorite: (id: number) => dispatch(toggleFavorite(id)),
  };
};