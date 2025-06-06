import { Profile } from '@/components/profile/Profile';
import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import Circle from '@/components/circle/Circle';
import Button from '@/components/button/Button';
import Message from '@/components/Message/Message';

export default function Home() {
  return (
    <div>
      <Profile name={'Anton'} text={'Hello World!'} />

      <GeolocationContainer />

      <Circle x={20} y={20} radius={20} fill={'blue'} />

      <div style={{ maxWidth: '500px'}}>
        <Button>Вход</Button>
        <Button size={'medium'} ghost>Вход</Button>
        <Button size={'small'}>Отправить</Button>
      </div>

      <Message content={'Ваш email подписан на новости и уведомления'}/>
      <Message content={'Ваш отзыв отправлен на модерацию'}/>

      <Message content={'Мы получили ваш заказ'} isLong/>
    </div>
  );
}
