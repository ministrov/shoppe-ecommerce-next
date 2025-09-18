'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/button/Button';
import { useAuth } from '@/hooks/useAuth';
import { incCount, decCount } from '@/store/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Cart() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const counter = useAppSelector((state) => state.counter.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div>

      Cart

      <Button onClick={() => dispatch(incCount())}>
        +
      </Button>

      {counter}

      <Button onClick={() => dispatch(decCount())}>
        -
      </Button>
    </div>
  );
};

