import Image from 'next/image';
import { PaginationProps } from './Pagination.interface';
import cn from 'classnames';
import styles from './Pagination.module.css';

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
