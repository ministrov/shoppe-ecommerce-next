import GeolocationContainer from '@/components/geolocationContainer/GeolocationContainer';
import { Button } from '@/components/button/Button';
import { Searching } from '@/components/searching/Searching';
// import { Message } from '@/components/message/Message';

export default function Home() {
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

      <h1>
        Hello world!
      </h1>

      <Searching />

      {/* <Message content={'dfdfdfdfde'} /> */}
    </div>
  );
}
