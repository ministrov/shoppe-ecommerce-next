import Link from 'next/link';
import { TabsProps } from './Tabs.interface';
import styles from './Tabs.module.css';

export const Tabs = ({ tabs, pathname }: TabsProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <span
          key={tab.href}
          className={`${styles.tabsItem} ${pathname === tab.href ? styles.active : ''
            }`}
        >
          <Link href={tab.href}>{tab.label}</Link>
        </span>
      ))}
    </div>
  )
}
