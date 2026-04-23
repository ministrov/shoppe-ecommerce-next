import { UserType } from '../../hooks/useDevAuth';

export interface UserButtonProps {
  /** Тип пользователя (admin, user, premium) */
  userType: UserType;
  /** Email пользователя для отображения */
  email: string;
  /** Заголовок кнопки */
  title: string;
  /** Обработчик клика */
  onClick: (userType: UserType) => void;
  /** Дополнительные CSS классы */
  className?: string;
}