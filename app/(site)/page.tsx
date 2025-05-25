import { Profile } from '@/components/profile/Profile';
import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import Circle from '@/components/circle/Circle';
import styles from './page.module.css';

export default function Home() {
  // const my_little_array = new Array(10).fill('1');
  // console.log(my_little_array.);
  return (
    <div className={styles.page}>
      <Profile name={'Anton'} text={'Hello World!'} />

      <GeolocationContainer/>

      <Circle x={20} y={20} radius={20} fill={'blue'}/>
    </div>
  );
}
