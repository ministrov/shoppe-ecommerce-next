# Mock Authentication System

## Overview
Система моковой аутентификации позволяет использовать приложение без работающего бэкенд-API. Это полезно для:
- Разработки frontend без зависимости от бэкенда
- Демонстрации функционала при недоступном API
- Тестирования разных пользовательских сценариев

## Как это работает

### Автоматическое переключение режимов
Система автоматически определяет, нужно ли использовать моковый режим:

1. **По переменной окружения**: `NEXT_PUBLIC_USE_MOCK_AUTH=true`
2. **По наличию API_URL**: Если `NEXT_PUBLIC_API` не определен или содержит "undefined"
3. **По окружению**: В `development` режиме моки включены по умолчанию

### Mock пользователи
Доступно три типа пользователей:

| Тип | Email | Пароль | Особенности |
|-----|-------|--------|-------------|
| **Admin** | `admin@example.com` | Любой ≥8 символов | Полные права доступа |
| **Regular User** | `user@example.com` | Любой ≥8 символов | Обычный пользователь |
| **Premium User** | `premium@example.com` | Любой ≥8 символов | Премиум функции |

## Использование

### Через форму входа
1. Перейдите на страницу `/auth/login`
2. Введите любой email (можно `admin@example.com`, `user@example.com` и т.д.)
3. Введите пароль длиной не менее 8 символов
4. Нажмите "Вход"

Система автоматически определит тип пользователя по email:
- Email содержит "admin" → Admin пользователь
- Email содержит "premium" → Premium пользователь  
- Любой другой email → Regular пользователь

### Через Dev Auth Switch (только development)
В правом нижнем углу экрана в development режиме появится кнопка "🔐 Dev Auth":

1. Нажмите "🔐 Dev Auth"
2. Выберите нужного пользователя (Admin, Regular, Premium)
3. Система автоматически авторизует выбранного пользователя
4. Для выхода нажмите "Logout"

## Настройка

### Переменные окружения
Добавьте в `.env.local`:

```bash
# Включить/выключить моковую аутентификацию
NEXT_PUBLIC_USE_MOCK_AUTH=true

# URL бэкенд API (если не задан, используется моковый режим)
NEXT_PUBLIC_API=http://localhost:3000
```

### Отключение моков в production
В production сборке моковая аутентификация автоматически отключается, если:
- `NODE_ENV=production`
- `NEXT_PUBLIC_USE_MOCK_AUTH` не установлен или равен false
- `NEXT_PUBLIC_API` корректно определен

## Техническая реализация

### Файлы
- `mocks/auth.mock.ts` - Mock данные и логика
- `store/authThunk/authThunk.ts` - Обновленный thunk с поддержкой моков
- `components/devAuthSwitch/` - Компонент для быстрого переключения пользователей
- `app/layout.tsx` - Интеграция DevAuthSwitch (только development)

### Логика переключения
```typescript
// Проверка необходимости использования моков
const useMockAuth = shouldUseMockAuth();

if (useMockAuth) {
  // Использовать mock данные
  const mockResponse = getMockAuthResponse(email, password);
} else {
  // Использовать реальное API
  const response = await fetchAPI('/auth/login', ...);
}
```

## Расширение системы

### Добавление новых mock пользователей
1. Откройте `mocks/auth.mock.ts`
2. Добавьте пользователя в `MOCK_USERS`:
```typescript
export const MOCK_USERS: Record<string, User> = {
  // ... существующие пользователи
  newUser: {
    id: 4,
    name: 'Новый Пользователь',
    email: 'new@example.com',
    phone: '+7 (999) 000-00-00',
    deliver_address: 'г. Город, ул. Новая, д. 1',
  },
};
```

3. Добавьте токен в `MOCK_TOKENS`:
```typescript
export const MOCK_TOKENS: Record<string, string> = {
  // ... существующие токены
  newUser: 'mock_newuser_token_123456',
};
```

4. Обновите логику в `getMockAuthResponse()` при необходимости

### Кастомизация логики определения пользователя
Измените функцию `getMockAuthResponse()` для реализации своей логики сопоставления email/password с mock пользователями.

## Безопасность

- Mock режим работает **только в development** по умолчанию
- В production требуется явное включение через переменные окружения
- Mock токены не имеют реальной криптографической ценности
- Система не должна использоваться в production с реальными пользовательскими данными

## Отладка

### Логи
При использовании моковой аутентификации в консоль выводятся информационные сообщения:
```
Using mock authentication for: admin@example.com
Mock login as admin: {user data}
```

### Проверка текущего режима
В консоли браузера:
```javascript
// Проверить, используется ли mock режим
console.log(shouldUseMockAuth());

// Посмотреть доступных mock пользователей  
console.log(MOCK_USERS);