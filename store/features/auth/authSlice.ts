import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '@/store/authThunk/authThunk';
import { User } from '@/interfaces/user.interface';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

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
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log(state);
      console.log(action);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log(state);
      console.log(action);
    },
    setError: (state, action: PayloadAction<string>) => {
      console.log(state);
      console.log(action);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Обработка loginUser thunk
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
  },
});

export const { setToken, setUser, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
