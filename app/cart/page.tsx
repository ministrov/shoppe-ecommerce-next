'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { Button } from '@/components/button/Button';
import { useAuth } from '@/hooks/useAuth';
// import { incCount, decCount } from '@/store/features/counter/counterSlice';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './page.module.css';

export default function Cart() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  // const counter = useAppSelector((state) => state.counter.counter);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.cart}>
      <h1>Корзина</h1>

      <div className={styles.wrapper}>
        <div className={styles.cartItem}></div>
        <div className={styles.info}></div>
      </div>
    </div>
  );
};

