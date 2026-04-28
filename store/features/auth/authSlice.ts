import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '@/store/authThunk/authThunk';
import { User } from '@/interfaces/user.interface';

/**
 * Состояние аутентификации.
 */
interface AuthState {
  /** JWT токен пользователя */
  token: string | null;
  /** Данные пользователя */
  user: User | null;
  /** Флаг загрузки */
  isLoading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
}

/**
 * Безопасное управление токенами.
 * Сохраняет токен в sessionStorage и cookie (для совместимости).
 * @param {string | null} token - JWT токен или null для удаления
 */
const setAuthToken = (token: string | null) => {
  // В production используем Secure, HttpOnly cookies через API
  // На клиенте используем sessionStorage как более безопасную альтернативу localStorage
  if (typeof window === 'undefined') return;

  if (token) {
    // Для development - храним в sessionStorage (исчезает при закрытии вкладки)
    sessionStorage.setItem('auth-token', token);
    
    // Также устанавливаем cookie с флагами безопасности для совместимости с middleware
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? '; Secure' : '';
    const sameSiteFlag = '; SameSite=Strict';
    document.cookie = `auth-token=${token}; path=/; max-age=86400${secureFlag}${sameSiteFlag}`;
  } else {
    sessionStorage.removeItem('auth-token');
    document.cookie =
      'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

/**
 * Получает токен из sessionStorage или cookie.
 * @returns {string | null} Токен или null
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Пробуем получить из sessionStorage в первую очередь
  const sessionToken = sessionStorage.getItem('auth-token');
  if (sessionToken) return sessionToken;
  
  // Fallback к cookies для совместимости
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('auth-token=')
  );
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

/**
 * Слайс для управления аутентификацией.
 * Обрабатывает логин, логаут, сохранение токена и состояние пользователя.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Устанавливает токен аутентификации.
     * @param {AuthState} state - Текущее состояние
     * @param {PayloadAction<string>} action - Действие с токеном
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.error = null;
      setAuthToken(action.payload);
    },
    /**
     * Устанавливает данные пользователя.
     * @param {AuthState} state - Текущее состояние
     * @param {PayloadAction<User>} action - Действие с данными пользователя
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    /**
     * Устанавливает флаг загрузки.
     * @param {AuthState} state - Текущее состояние
     * @param {PayloadAction<boolean>} action - Действие с флагом
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    /**
     * Устанавливает ошибку аутентификации.
     * @param {AuthState} state - Текущее состояние
     * @param {PayloadAction<string>} action - Действие с сообщением об ошибке
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    /**
     * Выполняет выход пользователя.
     * Сбрасывает токен, пользователя и ошибки.
     * @param {AuthState} state - Текущее состояние
     */
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
      setAuthToken(null);
    },
    /**
     * Инициализирует аутентификацию из сохранённого токена.
     * @param {AuthState} state - Текущее состояние
     */
    initializeAuth: (state) => {
      const token = getAuthToken();
      if (token) {
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    // Обработка loginUser thunk
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // Токен и пользователь уже установлены в thunk через dispatch
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.token = null;
        state.user = null;
        setAuthToken(null);
      });
  },
});

export const {
  setToken,
  setUser,
  setLoading,
  setError,
  logout,
  initializeAuth,
} = authSlice.actions;

/**
 * Селектор для проверки аутентификации пользователя.
 * @param {Object} state - Состояние Redux
 * @param {AuthState} state.auth - Состояние аутентификации
 * @returns {boolean} true, если пользователь аутентифицирован
 */
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;

export default authSlice.reducer;
