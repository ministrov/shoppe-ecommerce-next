import styles from './UserMenu.module.css';

export const UserMenu = () => {
  return (
    <ul className={styles.userList}>
      <li className={styles.userItem}>
        {/* <span className={styles.cartCount}>0</span>
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
        </Link> */}
      </li>
      <li>
        {/* <Link href={'/favorites'} className={styles.iconLink}>
          <Image src={'/heart.svg'} width={21} height={21} alt={'Cart'} />
          {pathname === '/favorites' && (
            <motion.span
              className={styles.activeIndicator}
              initial='hidden'
              animate='visible'
              variants={underlineVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}
        </Link> */}
      </li>
      <li>
        {/* <Link href={'/orders'} className={styles.iconLink}>
          <Image src={'/account.svg'} width={21} height={21} alt={'Cart'} />
          {pathname === '/orders' && (
            <motion.span
              className={styles.activeIndicator}
              initial='hidden'
              animate='visible'
              variants={underlineVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}
        </Link> */}
      </li>
    </ul>
  );
}
