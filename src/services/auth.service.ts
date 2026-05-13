import { API } from '../config/apiService';
import { AuthResponse, RegisterResponse } from '@/types/auth';

export const authService = {
  login: async (payload: any): Promise<AuthResponse> => {
    const response = await API('auth.login', {
      data: payload,
    });
    return response.data;
  },
  register: async (payload: any): Promise<RegisterResponse> => {
    const response = await API('auth.register', {
      data: payload,
    });
    return response.data;
  },
  logout: async (): Promise<any> => {
    const response = await API('auth.logout');
    return response.data;
  },
  forgotPassword: async (email: string): Promise<any> => {
    const response = await API('auth.forgotPassword', {
      data: { email },
    });
    return response.data;
  },
  resetPassword: async (payload: any): Promise<any> => {
    const response = await API('auth.resetPassword', {
      data: payload,
    });
    return response.data;
  },
  verifyEmail: async (token: string): Promise<any> => {
    const response = await API('auth.verifyEmail', {
      params: { token },
    });
    return response.data;
  },
  onboarding: async (payload: any): Promise<any> => {
    const response = await API('auth.onboarding', {
      data: payload,
    });
    return response.data;
  },
};
