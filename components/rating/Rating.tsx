'use client';

import { JSX, useEffect, useState, KeyboardEvent, Fragment } from 'react';
import { StarIcon } from '../starIcon/StarIcon';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';

const Rating = ({ isEditable = false, error, rating, setRating, ref, ...props }: RatingProps) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {

      return (
        <span
          key={i}
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => isEditable && handleSpace(i + 1, e)}
          role={isEditable ? 'slider' : ''}
          aria-invalid={error ? true : false}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
        >
          <StarIcon
            isEditable={isEditable}
          />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }

    setRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.code !== 'Space' || !setRating) {
      return;
    }

    setRating(i);
  };

  return (
    <div className={cn(styles.ratingWrapper, {
      [styles.error]: error
    })} ref={ref} {...props}>
      {ratingArray.map((r, i) => (<Fragment key={i}>{r}</Fragment>))}

      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
}

export default Rating;