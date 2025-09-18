'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function AuthInitializer() {
  const { checkAuth } = useAuth();
  const isAuth = checkAuth();

  useEffect(() => {
    console.log(isAuth);
    checkAuth();
    console.log(isAuth);
  }, [checkAuth, isAuth]);

  return null;
}