import Link from 'next/link';
import Image from 'next/image';
import { socials } from './socials';
import styles from './SocialsList.module.css';

export const SocialsList = () => {
  return (
    <ul className={styles.socials}>
      {socials.map((social) => (
        <li key={social.id} className={styles.item}>
          <Link href='#'>
            <Image src={social.icon} width={20} height={20} alt={`Social icon ${social.name}`} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
