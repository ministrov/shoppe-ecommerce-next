import { MessageProps } from '@/components/message/Message.props';
import { TargetAndTransition, VariantLabels } from 'framer-motion';

/**
 * Интерфейс для компонента FormMessageWithAnimation.
 * Расширяет пропсы компонента Message, добавляя управление видимостью и анимацией.
 */
export interface FormMessageWithAnimationProps extends Omit<MessageProps, 'text'> {
  /** Текст сообщения для отображения */
  message: string;
  /** Флаг видимости сообщения (управляет анимацией появления/исчезновения) */
  isVisible: boolean;
  /** Настройки анимации framer-motion (опционально) */
  animation?: {
    /** Начальное состояние анимации */
    initial?: VariantLabels | TargetAndTransition;
    /** Конечное состояние анимации */
    animate?: VariantLabels | TargetAndTransition;
    /** Состояние при выходе из DOM */
    exit?: VariantLabels | TargetAndTransition;
    /** Настройки перехода */
    transition?: TargetAndTransition['transition'];
  };
  /** Дополнительные CSS-классы для контейнера сообщения */
  className?: string;
}