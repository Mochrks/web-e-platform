import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { AuthResponse, RegisterResponse } from '@/types/auth';
import { clearAllCookies } from '@/lib/cookies';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';
import { useAppDispatch } from '@/store';
import {
  setCredentials,
  logout as logoutAction,
} from '@/store/slices/authSlice';
import ENDPOINTS from '@/config/endpoints';
import { getBaseUrl } from '@/config/axios';

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: any) => authService.login(payload),
    onSuccess: (response: AuthResponse) => {
      console.log('Login successful, processing redirect...', response);
      const { token, userId, username, email, role } = response.data;

      const user = { userId, username, email, role };

      // Store in Redux (this also sets cookies automatically now)
      dispatch(setCredentials({ token, user }));

      toast.success(response.message || 'Login successful!');

      const destination = '/platform/dashboard';
      console.log('Login successful, pushing to:', destination);
      router.push(destination);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: any) => authService.register(payload),
    onSuccess: (response: RegisterResponse) => {
      toast.dismiss();
      toast.success(
        response.message || 'Registration successful! Please login.'
      );
      router.push('/login');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // 1. Clear cookies and storage first (to prevent re-auth)
      clearAllCookies();
      localStorage.clear();
      sessionStorage.clear();

      // 2. Dismiss any existing toasts
      toast.dismiss();
      toast.success('Logged out successfully.');

      // 3. Redirect immediately
      router.replace('/login');

      // 4. Clear the heavy stuff (store/cache) AFTER a small delay or after redirect starts
      // This prevents the current page from crashing while it's still mounted
      setTimeout(() => {
        dispatch(logoutAction());
        queryClient.clear();
      }, 100);
    },
    onSettled: () => {
      // Don't clear here, only on success as requested
    },
  });
};

// Hook to get Google login URL
export const useGoogleLogin = () => {
  const handleGoogleLogin = () => {
    const authBaseUrl = getBaseUrl('auth');
    const url = `${authBaseUrl}${ENDPOINTS.auth.google.url}`;
    globalThis.location.href = url;
  };

  return { handleGoogleLogin };
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (response: any) => {
      toast.success(response.message || 'Reset link sent to your email.');
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: any) => authService.resetPassword(payload),
    onSuccess: (response: any) => {
      toast.success(response.message || 'Password reset successful!');
      router.push('/login');
    },
  });
};
