import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '@/store/authThunk/authThunk';
import { User } from '@/interfaces/user.interface';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Безопасное управление токенами
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.error = null;
      setAuthToken(action.payload);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
      setAuthToken(null);
    },
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
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export default authSlice.reducer;
