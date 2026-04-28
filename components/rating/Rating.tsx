'use client';

import { useState, useEffect } from 'react';
import { StarIcon } from '../starIcon/StarIcon';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';

/**
 * Компонент рейтинга в виде пяти звёзд.
 * Поддерживает два режима: управляемый (controlled) и неуправляемый (uncontrolled).
 * В управляемом режиме рейтинг контролируется через проп `rating` и `setRating`.
 * В неуправляемом режиме компонент хранит состояние внутри себя.
 *
 * Предоставляет интерактивные возможности:
 * - Hover-эффект: при наведении показывается предварительный рейтинг
 * - Клик: устанавливает рейтинг (если `isEditable=true`). Клик на уже выбранную звезду сбрасывает рейтинг до 0
 * - Клавиатурное управление: Space или Enter при фокусе на звезде
 * - Валидация: отображение ошибки через проп `error`
 * - Доступность: роли ARIA, метки для скринридеров
 *
 * **Важно:** рейтинг должен быть целым числом от 0 до 5. Дробные значения не поддерживаются.
 *
 * @param {RatingProps} props - Свойства компонента
 * @param {number} props.rating - Текущий рейтинг (целое число от 0 до 5). 0 означает отсутствие оценки.
 * @param {boolean} [props.isEditable=false] - Можно ли изменять рейтинг. Если false, компонент работает только в режиме отображения.
 * @param {function} [props.setRating] - Функция для обновления рейтинга. Принимает новое значение (число). Если не передана, используется внутреннее состояние (uncontrolled режим).
 * @param {Object} [props.error] - Ошибка валидации. При наличии отображается красная рамка и сообщение.
 * @param {string} props.error.message - Текст сообщения об ошибке.
 * @param {Ref} [props.ref] - Ref для доступа к корневому элементу (HTMLDivElement).
 * @param {...HTMLAttributes<HTMLDivElement>} props - Все стандартные атрибуты div (className, style, id и т.д.) также поддерживаются.
 * @returns {JSX.Element} Компонент рейтинга
 *
 * @example
 * // Управляемый режим (controlled) с возможностью редактирования
 * const [rating, setRating] = useState(3);
 * <Rating rating={rating} setRating={setRating} isEditable />
 *
 * @example
 * // Неуправляемый режим (uncontrolled) — только отображение
 * <Rating rating={4} />
 *
 * @example
 * // С ошибкой валидации
 * <Rating rating={2} error={{ message: 'Пожалуйста, оцените товар' }} />
 *
 * @example
 * // Нередактируемый рейтинг (статический)
 * <Rating rating={5} isEditable={false} />
 *
 * @example
 * // С использованием ref и дополнительными атрибутами
 * const ref = useRef<HTMLDivElement>(null);
 * <Rating rating={3} ref={ref} className="my-rating" aria-label="Рейтинг товара" />
 */
const Rating = ({ isEditable = false, error, rating, setRating, ref, ...props }: RatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [internalRating, setInternalRating] = useState(rating);

  // Синхронизируем internalRating с пропом rating, когда проп изменяется
  useEffect(() => {
    if (!setRating) {
      // В uncontrolled режиме internalRating должен обновляться только если rating из пропов изменился
      // (например, при сбросе формы)
      setInternalRating(rating);
    }
  }, [rating, setRating]);

  // Используем внутренний рейтинг, если setRating не предоставлен (uncontrolled режим)
  const currentRating = setRating ? rating : internalRating;
  const handleRatingChange = setRating ? setRating : setInternalRating;

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    console.log('handleClick', { index, isEditable, setRatingProvided: !!setRating, currentRating });
    if (!isEditable) {
      console.log('isEditable false, ignoring click');
      return;
    }

    const starValue = index + 1;
    const newRating = currentRating === starValue ? 0 : starValue;
    console.log('newRating', newRating);
    handleRatingChange(newRating);
    // Сбрасываем hover после клика, чтобы сразу показать сохраненный рейтинг
    setHoverRating(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!isEditable) return;
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      const starValue = index + 1;
      const newRating = currentRating === starValue ? 0 : starValue;
      handleRatingChange(newRating);
      // Сбрасываем hover после клавиатурного выбора
      setHoverRating(null);
    }
  };

  // Определяем, какая звезда должна быть закрашена
  const displayRating = hoverRating !== null ? hoverRating : currentRating;

  return (
    <div
      className={cn(styles.ratingWrapper, {
        [styles.error]: error
      })}
      ref={ref}
      {...props}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < displayRating;
        console.log(`Star ${index + 1}: isFilled=${isFilled}, displayRating=${displayRating}, currentRating=${currentRating}, hoverRating=${hoverRating}`);

        return (
          <span
            key={index}
            className={cn(styles.star, {
              [styles.editable]: isEditable
            })}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role={isEditable ? 'button' : 'presentation'}
            tabIndex={isEditable ? 0 : -1}
            aria-label={isEditable ? `Оценить ${index + 1} из 5` : undefined}
            aria-checked={isFilled}
          >
            <StarIcon
              isEditable={isEditable}
              isFilled={isFilled}
            />
          </span>
        );
      })}

      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
}

export default Rating;