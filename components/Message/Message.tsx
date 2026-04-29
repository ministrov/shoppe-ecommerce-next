import Image from 'next/image';
import { MessageProps } from './Message.props';
import cn from 'classnames';
import styles from './Message.module.css';

/**
 * Компонент для отображения сообщений (успех, ошибка) с иконкой и текстом.
 * Поддерживает два типа сообщений: успешное (зелёное) и ошибочное (красное),
 * а также возможность отображения длинного сообщения с увеличенной шириной.
 *
 * @param {MessageProps} props - Пропсы компонента
 * @param {boolean} props.isError - Флаг, указывающий, является ли сообщение ошибкой
 * @param {string} props.text - Текст сообщения для отображения
 * @param {boolean} [props.isLong=false] - Флаг для отображения длинного сообщения (опционально)
 * @returns {JSX.Element} Элемент сообщения с иконкой и текстом
 *
 * @example
 * // Отображение успешного сообщения
 * <Message isError={false} text="Операция выполнена успешно" />
 *
 * @example
 * // Отображение ошибки
 * <Message isError={true} text="Произошла ошибка при загрузке данных" />
 *
 * @example
 * // Длинное сообщение об успехе
 * <Message isError={false} text="Данные успешно сохранены в базу данных" isLong={true} />
 */
export const Message = ({ isError, text, isLong = false }: MessageProps) => {
  return (
    <div className={cn(styles.message, {
      [styles['message--success']]: !isError,
      [styles['message--error']]: isError,
      [styles['message--long']]: isLong,
    })}>
      {!isError && <Image src={'/check.svg'} width={20} height={20} alt={'Icon check'} />}
      <p className={styles.text}>{text}</p>
    </div>
  );
};