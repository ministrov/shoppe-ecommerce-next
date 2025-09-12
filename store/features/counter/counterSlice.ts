// import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
// import { stat } from 'fs';

interface CounterState {
  counter: number;
}

const initialState: CounterState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incCount: (state) => {
      state.counter++;
    },
    decCount: (state) => {
      state.counter--;
    },
  },
});

export const { incCount, decCount } = counterSlice.actions;

// Правильные типизированные селекторы
// export const selectCounter = (state: RootState) => state.counter.counter;

export default counterSlice.reducer;
