'use client';

import { useRef, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '@/store/store';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<ReturnType<typeof makeStore>>(null);

  if (typeof window !== 'undefined' && !storeRef.current) {
    storeRef.current = makeStore();
  }

  // Для SSR возвращаем children без Redux Provider
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <Provider store={storeRef.current!.store}>
      <PersistGate
        loading={null} // Можно показать loading indicator
        persistor={storeRef.current!.persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}