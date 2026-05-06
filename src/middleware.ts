import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Define protected and public routes
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname === '/';
  const isProtectedRoute =
    pathname.startsWith('/platform') || pathname.startsWith('/onboarding');

  // 2. If user is authenticated and tries to access login/register, redirect to dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/platform/dashboard', request.url));
  }

  // 3. If user is NOT authenticated and tries to access protected routes, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 4. Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
