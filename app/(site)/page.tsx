import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import { Button } from '@/components/button/Button';
import { Searching } from '@/components/searching/Searching';
import { Message } from '@/components/Message/Message';

export default function Home() {
  return (
    <div>
      <GeolocationContainer />

      <div style={{ maxWidth: '500px'}}>
        <Button>Вход</Button>
        <Button size={'medium'} ghost>Вход</Button>
        <Button size={'small'}>Отправить</Button>
      </div>

      <Message content={'Ваш email подписан на новости и уведомления'}/>
      <Message content={'Ваш отзыв отправлен на модерацию'}/>

      <Message content={'Мы получили ваш заказ'} isLong/>

      <Searching/>
    </div>
  );
}
