import Image from 'next/image';
import { MessageProps } from './Message.props';
import cn from 'classnames';
import styles from './Message.module.css';

export const Message = ({ isError, content, isLong = false }: MessageProps) => {
  return (
    <div className={cn(styles.message, {
      [styles['message--success']]: !isError,
      [styles['message--error']]: isError,
      [styles['message--long']]: isLong,
    })}>
      {!isError && <Image src={'/check.svg'} width={20} height={20} alt={'Icon check'} />}
      <p>{content}</p>
    </div>
  );
};