'use client';

import { useState, useEffect } from 'react';
import {
  useLogin,
  useGoogleLogin,
  useForgotPassword,
  useResetPassword,
} from '@/hooks/api/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginValues } from './LoginPageSchema';
import { useSearchParams } from 'next/navigation';

export type AuthView = 'login' | 'forgot' | 'reset';

export const useLoginPageHook = () => {
  const searchParams = useSearchParams();
  const [view, setView] = useState<AuthView>('login');
  const [token, setToken] = useState<string | null>(null);

  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const { mutateAsync: forgotPassword, isPending: isSendingForgot } =
    useForgotPassword();
  const { mutateAsync: resetPassword, isPending: isResettingPassword } =
    useResetPassword();
  const { handleGoogleLogin } = useGoogleLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const action = searchParams.get('action');
    const tokenParam = searchParams.get('token');

    if (action === 'reset' && tokenParam) {
      setView('reset');
      setToken(tokenParam);
    }
  }, [searchParams]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleLogin = async (values: LoginValues) => {
    try {
      await login(values);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    try {
      await forgotPassword(resetEmail);
      // We can stay on the same view but show a success message (already handled by toast)
      // Maybe return to login
      setView('login');
    } catch (error) {}
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !token) return;
    try {
      await resetPassword({ token, newPassword });
      setView('login');
    } catch (error) {}
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return {
    view,
    setView,
    form,
    isLoggingIn,
    handleLogin: form.handleSubmit(handleLogin),
    googleLogin: handleGoogleLogin,
    showPassword,
    togglePasswordVisibility,
    // Forgot Password
    resetEmail,
    setResetEmail,
    handleForgotSubmit,
    isSendingForgot,
    // Reset Password
    newPassword,
    setNewPassword,
    handleResetSubmit,
    isResettingPassword,
  };
};
