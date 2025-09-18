// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Получаем токен из cookies
  const token = request.cookies.get('auth-token')?.value;

  // Защищенные маршруты
  const protectedRoutes = [
    '/',
    '/catalog',
    '/favorites',
    '/orders',
    '/cart',
    '/about',
  ];
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Если маршрут защищенный и нет токена - редирект на логин
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Если уже авторизован и пытается зайти на логин/регистрацию - редирект на главную
  const authRoutes = ['/auth/login', '/auth/register'];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
