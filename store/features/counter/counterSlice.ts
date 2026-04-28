// import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
// import { stat } from 'fs';

/**
 * Состояние счётчика.
 */
interface CounterState {
  /** Текущее значение счётчика */
  counter: number;
}

const initialState: CounterState = {
  counter: 0,
};

/**
 * Слайс для управления простым счётчиком.
 * Демонстрационный пример использования Redux Toolkit.
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /**
     * Увеличивает счётчик на 1.
     * @param {CounterState} state - Текущее состояние
     */
    incCount: (state) => {
      state.counter++;
    },
    /**
     * Уменьшает счётчик на 1.
     * @param {CounterState} state - Текущее состояние
     */
    decCount: (state) => {
      state.counter--;
    },
  },
});

export const { incCount, decCount } = counterSlice.actions;

// Правильные типизированные селекторы
// export const selectCounter = (state: RootState) => state.counter.counter;

export default counterSlice.reducer;
