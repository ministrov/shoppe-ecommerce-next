import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import { Button } from '@/components/button/Button';
import { Searching } from '@/components/searching/Searching';
import { Message } from '@/components/message/Message';

export default function Home() {
  // const fooIndex = list.map((item) => item.id).indexOf('foo');

  // console.log(fooIndex);

  // if (fooIndex === -1) {
  //   console.log('fooIndex is -1, which means that the item with id "foo" was not found in the list');
  // } else {
  //   console.log(`The item with id "foo" was found at index ${fooIndex} in the list`);
  // }
  return (
    <div>
      <GeolocationContainer />

      <div style={{ maxWidth: '500px' }}>
        <Button>Вход</Button>
        <Button size={'medium'} ghost>
          Вход
        </Button>
        <Button size={'small'}>Отправить</Button>
      </div>

      <Message content={'Ваш email подписан на новости и уведомления'} />
      <Message content={'Ваш отзыв отправлен на модерацию'} />

      <Message content={'Мы получили ваш заказ'} isLong />

      <Searching />
    </div>
  );
}
