import Image from 'next/image';
import { MessageProps } from './Message.props';
import styles from './Message.module.css';

const Message = ({ content }: MessageProps) => {
  return (
    <div className={styles.success}>
      <Image src={'/check.svg'} width={20} height={20} alt={'Icon check'}/>
      <p>{content}</p>
    </div>
  );
};

export default Message;