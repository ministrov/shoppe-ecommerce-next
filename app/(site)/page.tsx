import { Profile } from '@/components/profile/Profile';
import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import Circle from '@/components/circle/Circle';
import styles from './page.module.css';
import Button from '@/components/button/Button';

export default function Home() {
  return (
    <div className={styles.page}>
      <Profile name={'Anton'} text={'Hello World!'} />

      <GeolocationContainer />

      <Circle x={20} y={20} radius={20} fill={'blue'} />

      <Button />
    </div>
  );
}
