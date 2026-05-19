import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isOnboarded = request.cookies.get('isOnboarded')?.value === 'true';
  const { pathname } = request.nextUrl;

  // 1. Define protected and public routes
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname === '/';
  const isProtectedRoute =
    pathname.startsWith('/platform') || pathname.startsWith('/onboarding');
  const isOnboardingRoute = pathname.startsWith('/onboarding');

  const isPlatformRoute = pathname.startsWith('/platform');

  // 2. If user is authenticated and tries to access login/register, redirect to dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/platform/dashboard', request.url));
  }

  // 3. If user is NOT authenticated and tries to access protected routes, redirect to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. If user is authenticated AND onboarded, prevent access to /onboarding
  if (token && isOnboarded && isOnboardingRoute) {
    return NextResponse.redirect(new URL('/platform/dashboard', request.url));
  }

  // 5. If user is authenticated BUT NOT onboarded, prevent access to /platform
  if (token && !isOnboarded && isPlatformRoute) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
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
