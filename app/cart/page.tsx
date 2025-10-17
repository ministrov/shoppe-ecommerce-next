'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/button/Button';
import { CartForm } from '@/components/cartForm/CartForm';
import { CartItem } from '@/components/cartItem/CartItem';
import { cartItemMocks } from '@/components/cartItem/CartItem.interface';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

export default function Cart() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.cart}>
      <h1>Корзина</h1>

      <div className={styles.wrapper}>
        <div className={styles.cartItem}>
          <ul className={styles.cartList}>
            {cartItemMocks.map((item) => (
              <li className={styles.listItem} key={item.id}>
                <CartItem
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  quantity={item.quantity}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.info}>
          <CartForm />

          <div className={styles.sum}>
            <h3>Итог</h3>

            <div className={styles.sumText}>
              <p>Стоимость</p>
              <p>$ 87,00</p>
            </div>
          </div>

          <Button>
            Оплатить
          </Button>
        </div>
      </div>
    </div>
  );
};

