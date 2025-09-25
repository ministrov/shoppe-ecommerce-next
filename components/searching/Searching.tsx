'use client';

import Image from 'next/image';
import { useId } from 'react';
import styles from './Searching.module.css';

export const Searching = () => {
  const searchId = useId(); // Генерируем уникальный ID для связи label и input

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Обработка отправки формы поиска
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    console.log('Поисковый запрос:', searchQuery);
    // Здесь можно добавить логику поиска
  };

  return (
    <form
      className={styles.search}
      role="search"
      onSubmit={handleSubmit}
      aria-label="Поиск по сайту"
    >
      <label htmlFor={searchId} className={styles.visuallyHidden}>
        Поиск
      </label>

      <Image
        className={styles.searchIcon}
        width={12}
        height={12}
        src='/search-icon-2.svg'
        alt=""
        aria-hidden="true"
      />

      <input
        id={searchId}
        className={styles.searchInput}
        type="search"
        name="search"
        placeholder="Поиск"
        aria-describedby="search-description"
        autoComplete="off"
      />

      <span id="search-description" className={styles.visuallyHidden}>
        Введите поисковый запрос и нажмите Enter для выполнения поиска
      </span>
    </form>
  );
}
