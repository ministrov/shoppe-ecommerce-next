import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

/**
 * Типизированный хук для dispatch.
 * Предоставляет dispatch с типом AppDispatch.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Типизированный хук для selector.
 * Предоставляет selector с типом RootState.
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Типизированный хук для store.
 * Предоставляет store с типом AppStore.
 */
export const useAppStore = useStore.withTypes<AppStore>();
