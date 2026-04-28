'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '@/store/store';

/**
 * Провайдер Redux store для Next.js приложения.
 * Создаёт store один раз и предоставляет его дочерним компонентам.
 *
 * @param {Object} props - Свойства провайдера
 * @param {React.ReactNode} props.children - Дочерние компоненты
 * @returns {JSX.Element} Провайдер с store
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current!}>
      {children}
    </Provider>
  );
}