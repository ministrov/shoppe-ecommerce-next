import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href={'/'} >
        <Image src={'/SHOPPE.svg'} width={158} height={40} alt={'logo'} priority/>
      </Link>
    </div>
  );
};

export default Logo;