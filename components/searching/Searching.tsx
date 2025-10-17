'use client';

import Image from 'next/image';
import { useId } from 'react';
import searchIcon from '../../public/search-icon-2.svg';
import styles from './Searching.module.css';

export const Searching = () => {
  const searchId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Обработка отправки формы поиска
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    console.log('Поисковый запрос:', searchQuery);
  };

  return (
    <form
      className={styles.search}
      role="search"
      onSubmit={handleSubmit}
      aria-label="Поиск по сайту"
    >
      <label htmlFor={searchId} className="visually-hidden">
        Поиск
      </label>

      <Image
        className={styles.searchIcon}
        width={14}
        height={14}
        src={searchIcon}
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

      <span id="search-description" className="visually-hidden">
        Введите поисковый запрос и нажмите Enter для выполнения поиска
      </span>
    </form>
  );
}
