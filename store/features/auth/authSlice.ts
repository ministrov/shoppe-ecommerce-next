import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '@/store/authThunk/authThunk';
import { User } from '@/interfaces/user.interface';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Убрать проверку window из функций
const setAuthCookie = (token: string | null) => {
  if (token) {
    document.cookie = `auth-token=${token}; path=/; max-age=86400`;
  } else {
    document.cookie =
      'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

const getAuthCookie = (): string | null => {
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
      setAuthCookie(action.payload);
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
      setAuthCookie(null);
    },
    initializeAuth: (state) => {
      const token = getAuthCookie();
      if (token) {
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    // Обработка loginUser thunk
    // console.log(builder);
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Токен и пользователь уже установлены в thunk через dispatch
        console.log('Login successful:', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.token = null;
        state.user = null;
        setAuthCookie(null);
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
