import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Защищенные маршруты - требуют аутентификации
const protectedRoutes = [
  '/',
  '/catalog',
  '/favorites',
  '/orders',
  '/cart',
  '/about',
];
// Публичные маршруты - доступны без аутентификации
const publicRoutes = ['/auth/login', '/auth/register', '/auth/restore'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Получаем токен из cookies
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!token;

  // Проверяем, является ли текущий маршрут защищенным
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Проверяем, является ли текущий маршрут публичным
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Если пользователь не аутентифицирован и пытается попасть на защищенный маршрут
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Если пользователь аутентифицирован и пытается попасть на страницу логина/регистрации
  if (isAuthenticated && isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/orders', request.url));
  }

  return NextResponse.next();
}
