import Cookies from 'js-cookie';

const isProd = process.env.NODE_ENV === 'production';

/**
 * Set a cookie with security best practices
 */
export const setCookie = (name: string, value: string, days: number = 7) => {
  Cookies.set(name, value, {
    expires: days,
    path: '/',
    secure: isProd,
    sameSite: 'lax',
  });
};

/**
 * Get a cookie value
 */
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Remove a cookie
 */
export const removeCookie = (name: string) => {
  Cookies.remove(name, { path: '/' });
};

/**
 * Clear all authentication related cookies aggressively
 */
export const clearAllCookies = () => {
  const cookiesToRemove = [
    'token',
    'role',
    'userId',
    'refreshToken',
    'JSESSIONID',
    'isOnboarded',
    'user',
  ];

  cookiesToRemove.forEach((name) => {
    // 1. Try with js-cookie using path /
    Cookies.remove(name, { path: '/' });

    // 2. Try with js-cookie without path
    Cookies.remove(name);

    // 3. Force remove via document.cookie for current domain and root path
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
  });
};
