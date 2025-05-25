import React from 'react';
import { CircleProps } from './Circle.interface';
import styles from './Circle.module.css';

const Circle = ({ x, y, radius, fill }: CircleProps) => {
  return (
    <svg className={styles.circle}>
      <circle cx={x} cy={y} r={radius} fill={fill} />
    </svg>
  );
};

export default Circle;