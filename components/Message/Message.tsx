import Image from 'next/image';
import { MessageProps } from './Message.props';
import cn from 'classnames';
import styles from './Message.module.css';

const Message = ({ content, isLong = false }: MessageProps) => {
  return (
    <div className={cn(styles.success, {
      [styles['success--long']]: isLong
    })}>
      <Image src={'/check.svg'} width={20} height={20} alt={'Icon check'}/>
      <p>{content}</p>
    </div>
  );
};

export default Message;