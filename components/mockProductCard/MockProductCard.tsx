import React from 'react';
import Image from 'next/image';
import { MockProductCardProps } from './MockProductCard.interface';
import styles from './MockProductCard.module.css';

export const MockProductCard = ({ product, index }: MockProductCardProps) => {
  return (
    <li className={styles.item} key={product.id}>
      <Image src={product.images[index]} width={377} height={380} alt='' />

      <p>{product.title}</p>
      <p>{product.price}</p>
    </li>
  )
}
