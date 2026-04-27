'use client';

import { useState } from 'react';
import { StarIcon } from '../starIcon/StarIcon';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';

const Rating = ({ isEditable = false, error, rating, setRating, ref, ...props }: RatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!isEditable) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (!isEditable) return;
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    if (!isEditable || !setRating) return;
    setRating(index + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!isEditable || !setRating) return;
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      setRating(index + 1);
    }
  };

  // Определяем, какая звезда должна быть закрашена
  const displayRating = hoverRating !== null ? hoverRating : rating;

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