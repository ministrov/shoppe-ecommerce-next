import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoriteIds,
  selectFavoritesCount,
  toggleFavorite
} from '../store/features/favorites/favoriteSlice';
import type { AppDispatch } from '@/store/store';

/**
 * Хук для работы с избранными товарами.
 * Предоставляет доступ к списку ID избранных товаров, количеству, проверке и переключению состояния.
 * Использует Redux store для управления состоянием.
 *
 * @returns {Object} Объект с данными и методами для работы с избранным:
 * @returns {number[]} favoriteIds - Массив ID товаров, добавленных в избранное
 * @returns {number} favoritesCount - Количество избранных товаров
 * @returns {Function} isFavorite - Функция, проверяющая, находится ли товар с указанным ID в избранном
 * @returns {Function} toggleFavorite - Функция для добавления/удаления товара из избранного
 *
 * @example
 * const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
 * const handleToggle = (productId) => {
 *   toggleFavorite(productId);
 * };
 * console.log(`Товар 5 в избранном: ${isFavorite(5)}`);
 */
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