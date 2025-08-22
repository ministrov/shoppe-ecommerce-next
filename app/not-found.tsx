'use client';

import { redirect } from 'next/navigation';
import { Button } from '@/components/button/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  function goHome() {
    redirect('/');
  }

  return (
    <div className={styles.error__wrapper}>
      <h1>404 ошибка</h1>

      <p className={styles.error__message}>Страница не найдена, попробуйте перейти на главную страницу</p>

      <Button ghost size='medium' onClick={goHome}>
        Главная страница
      </Button>
    </div>
  );
}
