'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/button/Button';
import { CartForm } from '@/components/cartForm/CartForm';
import { CartItem } from '@/components/cartItem/CartItem';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import styles from './page.module.css';

export default function Cart() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { items, total, removeItem, changeQuantity } = useCart();

  // Обработчики, совместимые с CartItem
  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleChangeQuantity = (id: string, quantity: number) => {
    changeQuantity({ id, quantity });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // Если корзина пуста, показываем сообщение
  const isEmpty = items.length === 0;

  // Форматирование суммы в долларах с двумя знаками после запятой
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(total);

  return (
    <section className={styles.cart}>
      <h1>Корзина</h1>

      <div className={styles.wrapper}>
        <div className={styles.cartItem}>
          {isEmpty ? (
            <div className={styles.emptyCart}>
              <div className={styles.noFavorites}>
                <h2 className={styles.noFavoritesTitle}>Ваша корзина пуста</h2>
              </div>
              <Button onClick={() => router.push('/catalog')}>
                Перейти в каталог
              </Button>
            </div>
          ) : (
            <ul className={styles.cartList}>
              {items.map((item) => (
                <li className={styles.listItem} key={item.id}>
                  <CartItem
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    }).format(item.price)}
                    quantity={item.quantity}
                    onRemove={handleRemove}
                    onChangeQuantity={handleChangeQuantity}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.info}>
          <CartForm />

          {!isEmpty && (
            <>
              <div className={styles.sum}>
                <h3>Итог</h3>

                <div className={styles.sumText}>
                  <p>Стоимость</p>
                  <p>{formattedTotal}</p>
                </div>
              </div>

              <Button>
                Оплатить
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

