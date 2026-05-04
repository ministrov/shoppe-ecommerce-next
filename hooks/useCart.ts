import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
  selectCartLoading,
  selectCartError,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
} from '@/store/features/cart/cartSlice';
import type { AppDispatch } from '@/store/store';
import { AddToCartParams, UpdateQuantityParams } from '@/interfaces/cart.interface';

/**
 * Хук для работы с корзиной товаров.
 * Предоставляет доступ к элементам корзины, общей сумме, количеству товаров, а также методам для управления корзиной.
 * Использует Redux store для управления состоянием и localStorage для персистентности.
 *
 * @returns {Object} Объект с данными и методами для работы с корзиной:
 * @returns {CartItem[]} items - Массив элементов корзины
 * @returns {number} total - Общая сумма корзины
 * @returns {number} itemsCount - Общее количество товаров (сумма quantity)
 * @returns {boolean} loading - Флаг загрузки (для будущей интеграции с API)
 * @returns {string | null} error - Сообщение об ошибке (если есть)
 * @returns {Function} addItem - Функция для добавления товара в корзину
 * @returns {Function} removeItem - Функция для удаления товара из корзины по ID элемента
 * @returns {Function} changeQuantity - Функция для изменения количества товара
 * @returns {Function} clear - Функция для полной очистки корзины
 * @returns {Function} setLoadingFlag - Функция для установки флага загрузки
 * @returns {Function} setErrorMsg - Функция для установки ошибки
 *
 * @example
 * const { items, total, addItem, removeItem } = useCart();
 * const handleAdd = (product) => {
 *   addItem({ product, quantity: 1 });
 * };
 * const handleRemove = (id) => {
 *   removeItem(id);
 * };
 */
export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemsCount = useSelector(selectCartItemsCount);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);

  const addItem = (params: AddToCartParams) => dispatch(addToCart(params));
  const removeItem = (id: string) => dispatch(removeFromCart(id));
  const changeQuantity = (params: UpdateQuantityParams) => dispatch(updateQuantity(params));
  const clear = () => dispatch(clearCart());
  const setLoadingFlag = (flag: boolean) => dispatch(setLoading(flag));
  const setErrorMsg = (msg: string | null) => dispatch(setError(msg));

  return {
    items,
    total,
    itemsCount,
    loading,
    error,
    addItem,
    removeItem,
    changeQuantity,
    clear,
    setLoadingFlag,
    setErrorMsg,
  };
};