import Image from 'next/image';
import { PaginationProps } from './Pagination.interface';
import cn from 'classnames';
import styles from './Pagination.module.css';

/**
 * Компонент пагинации для навигации по страницам контента.
 * Отображает кнопки с номерами страниц, кнопки "предыдущая" и "следующая".
 * Подсвечивает активную страницу и вычисляет общее количество страниц на основе общего числа элементов и лимита.
 *
 * @param {PaginationProps} props - Пропсы компонента
 * @param {number} props.page - Текущая активная страница (начинается с 1)
 * @param {number} props.total - Общее количество элементов для пагинации
 * @param {(page: number) => void} props.onClick - Функция обратного вызова при клике на страницу
 * @param {number} [props.limit=6] - Количество элементов на одной странице (опционально, по умолчанию 6)
 * @returns {JSX.Element} Контейнер с кнопками пагинации
 *
 * @example
 * // Использование с 50 элементами, лимитом 10 и текущей страницей 3
 * <Pagination page={3} total={50} onClick={(page) => setPage(page)} limit={10} />
 */
export const Pagination = ({ page, total, onClick, limit = 6 }: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  return (
    <div className={styles.pagination}>
      {page > 1 && <button
        className={cn(styles.button, styles.prevButton)}
        onClick={() => onClick(page - 1)}
        disabled={page === 1}
      >
        <Image src={'/next.svg'} width={6} height={10} alt={'Previous page button'} />
      </button>}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
        <button
          key={pageNumber}
          className={cn(styles.button, {
            [styles.active]: page === pageNumber
          })}
          onClick={() => onClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={cn(styles.button, styles.nextButton)}
        onClick={() => onClick(page + 1)}
        disabled={page >= Math.ceil(total / 6)} // Правильная логика отключения
      >
        <Image src={'/next.svg'} width={6} height={10} alt={'Next page button'} />
      </button>
    </div>
  )
}
