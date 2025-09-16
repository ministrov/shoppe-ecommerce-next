export interface Tab {
  href: string;
  label: string;
}

export const tabs: Tab[] = [
  { href: '/auth/login', label: 'Войти' },
  { href: '/auth/register', label: 'Зарегистрироваться' },
];
