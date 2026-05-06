import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { getCookie } from '@/lib/cookies';
import { toast } from '@/lib/toast';

export const SERVICE_HOSTS: Record<string, string | undefined> = {
  auth: process.env.NEXT_PUBLIC_API_AUTH_SERVICE,
  user: process.env.NEXT_PUBLIC_API_USER_SERVICE,
  employee: process.env.NEXT_PUBLIC_API_EMPLOYEE_SERVICE,
  master: process.env.NEXT_PUBLIC_API_MASTER_SERVICE,
};

export const getBaseUrl = (service: string) => {
  const host = SERVICE_HOSTS[service] || 'http://localhost:3000/api';
  return host.endsWith('/') ? host.slice(0, -1) : host;
};

const axiosInstance: AxiosInstance = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Request Interceptor: Auth & Security Headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      getCookie('token') ||
      (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.headers) {
      config.headers['X-Content-Type-Options'] = 'nosniff';
      config.headers['X-Frame-Options'] = 'DENY';
      config.headers['X-XSS-Protection'] = '1; mode=block';
      config.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Error Handling & Session Cleanup
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response, config } = error;

    // Handle Network/CORS errors
    if (!response) {
      toast.dismiss(); // Dismiss previous toasts
      if (typeof window !== 'undefined' && !navigator.onLine) {
        toast.error('Network Offline');
      } else {
        toast.warning('Connection Failed', {
          description: 'Server unreachable. Please try again later.',
        });
      }
      return Promise.reject(error);
    }

    // Handle Session Expiry (401) - Skip for login/register
    const isAuthRequest =
      config?.url?.includes('/auth/') ||
      config?.url?.includes('/login') ||
      config?.url?.includes('/register');
    if (response.status === 401 && !isAuthRequest) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((c) => {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(
              /=.*/,
              '=;expires=' + new Date().toUTCString() + ';path=/'
            );
        });
      }
    }

    // Extract better error messages
    const data = response?.data as any;
    const errorMessage =
      data?.message || error.message || 'An unexpected error occurred.';
    const detail = data?.error || data?.details;

    console.log('API Error Toast Triggered:', errorMessage, detail);
    toast.error(errorMessage, { description: detail });

    return Promise.reject(error);
  }
);

export default axiosInstance;
