import React from 'react';
import { ProfileProps } from './profile.interface';
import styles from './profile.module.css';

export const Profile = ({ name, text}: ProfileProps) => {
  return (
    <div className={styles.profile}>
      <p className={styles.name}></p>
      <p className={styles.text}></p>
    </div>
  )
}
