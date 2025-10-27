import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Защищенные маршруты — здесь НЕ должно быть '/'
  const protectedRoutes = [
    '/catalog',
    '/favorites',
    '/orders',
    '/cart',
    '/about',
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Проверка защищенных маршрутов
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Редирект с login/register если уже авторизован
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
