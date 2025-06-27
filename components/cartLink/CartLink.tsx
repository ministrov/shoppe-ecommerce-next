import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './CartLink.module.css';

type CartLinkProps = {
  pathname: string;
}

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' },
};

export const CartLink = ({ pathname }: CartLinkProps) => {
  return (
    <li className={styles.userItem}>
      <span className={styles.cartCount}>0</span>
      <Link href={'/cart'} className={styles.iconLink}>
        <Image src={'/shopping-cart.svg'} width={21} height={21} alt={'Cart'} />
        {pathname === '/cart' && (
          <motion.span
            className={styles.activeIndicator}
            initial='hidden'
            animate='visible'
            variants={underlineVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </Link>
    </li>
  );
};
