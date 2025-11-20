import { LoginRequest, LoginResponse } from '@/interfaces/auth.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, setUser } from '../features/auth/authSlice';
import fetchAPI from '@/api/auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const data = await fetchAPI<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Диспатчим действия для установки токена и пользователя
      dispatch(setToken(data.token));
      if (data.user) {
        dispatch(setUser(data.user));
      }

      return data;
    } catch (error) {
      console.log(error);
      console.log(rejectWithValue);
    }
  }
);
