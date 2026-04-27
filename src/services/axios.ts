import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

// Define base configuration
const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Security: XSRF Protection
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
};

const axiosInstance: AxiosInstance = axios.create(config);

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization token if available in localStorage/cookies
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Security: Prevent XSS by sanitizing inputs if needed
    // (Usually handled by backend, but we can add meta headers)
    if (config.headers) {
      config.headers['X-Content-Type-Options'] = 'nosniff';
      config.headers['X-Frame-Options'] = 'DENY';
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle global errors like 401 (Unauthorized)
    if (error.response?.status === 401) {
      // Redirect to login or clear session
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
