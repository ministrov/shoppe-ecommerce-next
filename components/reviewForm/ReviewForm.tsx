'use client';

import { useState } from 'react';
import { Button } from '../button/Button';
import { InputField } from '../inputField/InputField';
import { StarIcon } from '../starIcon/StarIcon';
import styles from './ReviewForm.module.css';

export const ReviewForm = () => {
  const [textarea, setTextArea] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  return (
    <form
      className={styles.reviewForm}
      aria-labelledby="form-heading"
      noValidate
    >
      <h2 id="form-heading" className={styles.formTitle}>
        Добавить отзыв
      </h2>

      <fieldset className={styles.fieldset}>
        <legend className={styles.formLegend}>Ваш email не будет опубликован. Обязательные поля помечены *</legend>

        <textarea
          className={styles.textarea}
          value={textarea}
          onChange={(e) => setTextArea(e.target.value)}
          placeholder="Отзыв*"
          required
          aria-required="true"
        />

        <InputField
          type="text"
          name="userName"
          variant="gray"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          id="userName"
          placeholder="Ваше имя*"
          required
          aria-required="true"
        />

        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="gray"
          name="email"
          id="email"
          placeholder="Ваш email*"
          required
          aria-required="true"
          autoComplete="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // ← Валидация email
          title="Пожалуйста, введите корректный email адрес"
        />
      </fieldset>

      <div className={styles.checkboxGroup}>
        <input
          type="checkbox"
          id="saveForNextReviews"
          name="saveForNextReviews"
          required
          aria-required="true"
          className={styles.checkbox}
        />

        <label htmlFor="rememberMe" className={styles.checkboxLabel}>
          Сохранить данные для следующих отзывов
        </label>
      </div>

      <div className={styles.rating}>
        <p>Рейтинг*</p>

        <div className={styles.starIconContainer}>
          <StarIcon isEditable={false} />
          <StarIcon isEditable={false} />
          <StarIcon isEditable={false} />
          <StarIcon isEditable={false} />
          <StarIcon isEditable={false} />
        </div>
      </div>

      <Button className={styles.reviewFormBtn}>
        Отправить
      </Button>
    </form>
  )
}
