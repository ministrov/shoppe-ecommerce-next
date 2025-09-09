import Image from 'next/image';
import { PaginationProps } from './Pagination.interface';
import cn from 'classnames';
import styles from './Pagination.module.css';

export const Pagination = ({ page, total, onClick }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      {page > 1 && <button
        className={cn(styles.button, styles.prevButton)}
        onClick={() => onClick(page - 1)}
        disabled={page === 1}
      >
        <Image src={'/next.svg'} width={6} height={10} alt={'Previous page button'} />
      </button>}
      <span style={{ margin: '0 10px', padding: '10px' }}>
        Страница {page} из {Math.ceil(total / 6)}
      </span>
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
