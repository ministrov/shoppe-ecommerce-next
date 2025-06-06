import Image from 'next/image';
import styles from './SuccessMessage.module.css';

const SuccessMessage = () => {
  return (
    <div className={styles.success}>
      <Image src={'/check.svg'} width={20} height={20} alt={'Icon check'}/>
      <p>Ваш email подписан на новости и уведомления</p>
    </div>
  );
};

export default SuccessMessage;