import { redirect } from 'next/navigation';
import { Button } from '@/components/button/Button';
import styles from './PageNotFound.module.css';

/**
 * Компонент страницы 404 (Страница не найдена).
 * Отображает сообщение об ошибке 404 и кнопку для перехода на главную страницу.
 * Используется в обработчиках ошибок Next.js или при ручном отображении отсутствующей страницы.
 *
 * @returns {JSX.Element} Контейнер с заголовком, сообщением и кнопкой
 *
 * @example
 * // Использование в error.tsx или как отдельная страница
 * <PageNotFound />
 */
export const PageNotFound = () => {
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
  )
}
