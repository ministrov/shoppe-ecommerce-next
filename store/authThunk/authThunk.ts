import { LoginRequest, LoginResponse } from '@/interfaces/auth.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, setUser } from '../features/auth/authSlice';
import fetchAPI from '@/api/auth';
import { getMockAuthResponse, shouldUseMockAuth } from '@/mocks/auth.mock';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      // Проверяем, нужно ли использовать моковый режим
      const useMockAuth = shouldUseMockAuth();
      
      let data: LoginResponse;
      
      if (useMockAuth) {
        // Используем моковые данные
        const mockResponse = getMockAuthResponse(credentials.email, credentials.password);
        
        if (!mockResponse) {
          // Имитация ошибки валидации в моковом режиме
          return rejectWithValue('Invalid email or password. For mock mode, use password with at least 8 characters.');
        }
        
        data = mockResponse;
        
        // Добавляем небольшую задержку для реалистичности
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log('Using mock authentication for:', credentials.email);
      } else {
        // Используем реальное API
        data = await fetchAPI<LoginResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
      }

      // Диспатчим действия для установки токена и пользователя
      dispatch(setToken(data.token));
      if (data.user) {
        dispatch(setUser(data.user));
      }

      return data;
    } catch (error) {
      // Возвращаем ошибку для обработки в slice
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);
