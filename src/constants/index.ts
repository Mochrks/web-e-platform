export const APP_CONFIG = {
  NAME: 'E-Platform',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  THEME: 'theme',
  USER_DATA: 'userData',
};

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
