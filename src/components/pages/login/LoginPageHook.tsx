'use client';

import { useState } from 'react';
import { useLogin, useGoogleLogin } from '@/hooks/api/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginValues } from './LoginPageSchema';

export const useLoginPageHook = () => {
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return {
    form,
    isLoggingIn,
    handleLogin: form.handleSubmit(handleLogin),
    googleLogin: handleGoogleLogin,
    showPassword,
    togglePasswordVisibility,
  };
};
