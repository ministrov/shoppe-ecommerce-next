import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CartItem, CartState, AddToCartParams, UpdateQuantityParams } from '@/interfaces/cart.interface';

const STORAGE_KEY = 'cartItems';

/**
 * Загружает корзину из localStorage.
 * @returns {CartItem[]} Массив элементов корзины
 */
const loadFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Ошибка загрузки корзины из localStorage:', error);
    return [];
  }
};

/**
 * Сохраняет корзину в localStorage.
 * @param {CartItem[]} items - Массив элементов корзины
 */
const saveToLocalStorage = (items: CartItem[]): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Ошибка сохранения корзины в localStorage:', error);
  }
};

/**
 * Рассчитывает общую сумму корзины на основе элементов.
 * @param {CartItem[]} items - Массив элементов корзины
 * @returns {number} Общая сумма
 */
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const initialState: CartState = {
  items: loadFromLocalStorage(),
  total: 0, // будет пересчитано после загрузки
  loading: false,
  error: null,
};

// Пересчитываем total после загрузки из localStorage
initialState.total = calculateTotal(initialState.items);

/**
 * Слайс для управления состоянием корзины.
 * Сохраняет данные в localStorage для персистентности.
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Добавляет товар в корзину или увеличивает количество, если товар уже есть.
     * @param {CartState} state - Текущее состояние
     * @param {PayloadAction<AddToCartParams>} action - Действие с данными товара
     */
    addToCart: (state, action: PayloadAction<AddToCartParams>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        // Увеличиваем количество существующего товара
        existingItem.quantity += quantity;
      } else {
        // Создаём новый элемент корзины
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`, // уникальный ID
          productId: product.id,
          title: product.name,
          image: product.images[0] || '',
          price: product.price,
          quantity,
        };
        state.items.push(newItem);
      }

      // Пересчитываем общую сумму
      state.total = calculateTotal(state.items);
      // Сохраняем в localStorage
      saveToLocalStorage(state.items);
    },

    /**
     * Удаляет товар из корзины по ID элемента корзины.
     * @param {CartState} state - Текущее состояние
     * @param {PayloadAction<string>} action - Действие с ID элемента корзины
     */
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.total = calculateTotal(state.items);
      saveToLocalStorage(state.items);
    },

    /**
     * Изменяет количество товара в корзине.
     * Если количество становится 0, товар удаляется.
     * @param {CartState} state - Текущее состояние
     * @param {PayloadAction<UpdateQuantityParams>} action - Действие с ID и новым количеством
     */
    updateQuantity: (state, action: PayloadAction<UpdateQuantityParams>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (!item) return;

      if (quantity <= 0) {
        // Удаляем товар, если количество <= 0
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        item.quantity = quantity;
      }

      state.total = calculateTotal(state.items);
      saveToLocalStorage(state.items);
    },

    /**
     * Очищает корзину полностью.
     * @param {CartState} state - Текущее состояние
     */
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveToLocalStorage([]);
    },

    /**
     * Устанавливает флаг загрузки.
     * @param {CartState} state - Текущее состояние
     * @param {PayloadAction<boolean>} action - Действие с флагом
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Устанавливает ошибку.
     * @param {CartState} state - Текущее состояние
     * @param {PayloadAction<string | null>} action - Действие с сообщением об ошибке
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

/**
 * Селектор для получения всех элементов корзины.
 * @param {RootState} state - Корневое состояние
 * @returns {CartItem[]} Массив элементов корзины
 */
export const selectCartItems = (state: RootState) => state.cart.items;

/**
 * Селектор для получения общей суммы корзины.
 * @param {RootState} state - Корневое состояние
 * @returns {number} Общая сумма
 */
export const selectCartTotal = (state: RootState) => state.cart.total;

/**
 * Селектор для получения количества товаров в корзине (сумма quantity).
 * @param {RootState} state - Корневое состояние
 * @returns {number} Количество товаров
 */
export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

/**
 * Селектор для получения флага загрузки.
 * @param {RootState} state - Корневое состояние
 * @returns {boolean} Флаг загрузки
 */
export const selectCartLoading = (state: RootState) => state.cart.loading;

/**
 * Селектор для получения ошибки.
 * @param {RootState} state - Корневое состояние
 * @returns {string | null} Сообщение об ошибке
 */
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;