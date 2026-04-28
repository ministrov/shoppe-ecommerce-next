'use client';

import Image from 'next/image';
import { useId } from 'react';
import searchIcon from '../../public/search-icon-2.svg';
import styles from './Searching.module.css';

/**
 * Компонент поисковой формы.
 * Предоставляет поле ввода для поиска по сайту с иконкой и обработкой отправки.
 * Использует `useId` для генерации уникального идентификатора поля ввода.
 * При отправке формы выводит поисковый запрос в консоль (временная реализация).
 *
 * @returns {JSX.Element} Элемент формы поиска с доступностью и семантической разметкой.
 */
export const Searching = () => {
  const searchId = useId();

  /**
   * Обрабатывает отправку поисковой формы.
   * Предотвращает стандартное поведение формы, извлекает поисковый запрос из поля `search`
   * и выводит его в консоль (временная реализация для отладки).
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {void}
   */
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
