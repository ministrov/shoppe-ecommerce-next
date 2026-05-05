# Список файлов для создания

## 1. FooterNavigation
```
components/footerNavigation/
├── FooterNavigation.tsx
├── FooterNavigation.module.css
└── FooterNavigation.interface.ts
```

## 2. NewsletterSubscription
```
components/newsletterSubscription/
├── NewsletterSubscription.tsx
├── NewsletterSubscription.module.css
└── NewsletterSubscription.interface.ts
```

## 3. FormMessageWithAnimation
```
components/formMessageWithAnimation/
├── FormMessageWithAnimation.tsx
├── FormMessageWithAnimation.module.css
└── FormMessageWithAnimation.interface.ts
```

## 4. FooterBottom
```
components/footerBottom/
├── FooterBottom.tsx
├── FooterBottom.module.css
└── FooterBottom.interface.ts
```

## 5. useEmailValidation (хук)
```
hooks/
└── useEmailValidation.ts
```

## 6. Обновлённый Footer
```
layouts/footer/
├── Footer.tsx (обновлённый)
└── Footer.module.css (без изменений)
```

## Детализация файлов

### FooterNavigation.interface.ts
```typescript
export interface FooterNavigationProps {
  links: Array<{
    href: string;
    label: string;
  }>;
  className?: string;
}
```

### NewsletterSubscription.interface.ts
```typescript
export interface NewsletterSubscriptionProps {
  onSubmit?: (email: string) => Promise<void> | void;
  initialEmail?: string;
  className?: string;
  inputId?: string;
  inputPlaceholder?: string;
  buttonAriaLabel?: string;
}
```

### FormMessageWithAnimation.interface.ts
```typescript
import { MessageProps } from '@/components/message/Message.props';

export interface FormMessageWithAnimationProps extends Omit<MessageProps, 'text'> {
  message: string;
  isVisible: boolean;
  animation?: {
    initial?: object;
    animate?: object;
    exit?: object;
    transition?: object;
  };
  className?: string;
}
```

### FooterBottom.interface.ts
```typescript
export interface FooterBottomProps {
  copyrightText?: string;
  showSocials?: boolean;
  className?: string;
  socialsClassName?: string;
}
```

### useEmailValidation.ts
```typescript
import { useState, useCallback } from 'react';

export const useEmailValidation = (initialEmail = '') => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');

  const validate = useCallback((emailToValidate = email): boolean => {
    if (!emailToValidate.trim()) {
      setError('Пожалуйста, введите email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToValidate)) {
      setError('Пожалуйста, введите корректный email');
      return false;
    }
    setError('');
    return true;
  }, [email]);

  const reset = useCallback(() => {
    setEmail('');
    setError('');
  }, []);

  return {
    email,
    setEmail,
    error,
    setError,
    validate,
    reset,
  };
};
```

## Порядок реализации

1. Создать хук `useEmailValidation` (самый независимый)
2. Создать `FormMessageWithAnimation` (зависит от Message)
3. Создать `FooterNavigation` (простой компонент)
4. Создать `FooterBottom` (зависит от SocialsList)
5. Создать `NewsletterSubscription` (зависит от InputField, FormMessageWithAnimation, useEmailValidation)
6. Обновить `Footer` для использования новых компонентов

## Тестирование

После создания каждого компонента рекомендуется:
- Проверить рендеринг в Storybook или изолированно
- Убедиться, что стили соответствуют оригиналу
- Протестировать интерактивность (клики, ввод)
- Проверить анимации

## Миграционные заметки

- Сохранить все существующие CSS-классы из `Footer.module.css`
- Использовать `classnames` для комбинирования классов
- Обеспечить обратную совместимость пропсов
- Обновить импорты в `Footer.tsx` постепенно