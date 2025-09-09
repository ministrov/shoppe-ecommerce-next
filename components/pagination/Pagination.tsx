import { PaginationProps } from './Pagination.interface';
import styles from './Pagination.module.css';

export const Pagination = ({ page, total, onClick }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      {page > 1 && <button
        className={styles.prevButton}
        onClick={() => onClick(page - 1)}
        disabled={page === 1}
        style={{ margin: '0 10px', padding: '10px 20px' }}
      >
        Назад
      </button>}
      <span style={{ margin: '0 10px', padding: '10px' }}>
        Страница {page} из {Math.ceil(total / 6)}
      </span>
      <button
        onClick={() => onClick(page + 1)}
        disabled={page >= Math.ceil(total / 6)} // Правильная логика отключения
        style={{ margin: '0 10px', padding: '10px 20px' }}
      >
        Вперед
      </button>
    </div>
  )
}
