'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/auth/login');
    }
  }, [token, isLoading, router]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div>Загрузка...</div>
      </div>
    );
  }

  if (!token) {
    return null; // или лоадер, пока происходит редирект
  }

  return <>{children}</>;
}