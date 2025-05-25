import React from 'react';
import Image from 'next/image';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src={'/SHOPPE.svg'} width={158} height={40} alt={'logo'} />
    </div>
  );
};

export default Logo;