import { Profile } from '@/components/profile/Profile';
import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Profile name={'Anton'} text={'Hello World!'} />

      <GeolocationContainer/>
    </div>
  );
}
