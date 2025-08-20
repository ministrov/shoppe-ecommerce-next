import Link from 'next/link';
import Image from 'next/image';
import { socials } from './socials';
import styles from './SocialList.module.css';

export const SocialList = () => {
  return (
    <ul className={styles.socials}>
      {socials.map((social) => (
        <li key={social.id}>
          <Link href='#'>
            <Image src={social.icon} width={20} height={20} alt={`Social icon ${social.name}`} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
