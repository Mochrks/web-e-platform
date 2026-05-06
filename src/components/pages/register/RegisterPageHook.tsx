'use client';

import { useState } from 'react';
import { useRegister } from '@/hooks/api/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterValues } from './RegisterPageSchema';

export const useRegisterPageHook = () => {
  const { mutateAsync: register, isPending: isRegistering } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      employeeNumber: '',
      phoneNumber: '',
    },
    mode: 'onChange',
  });

  const handleRegister = async (values: RegisterValues) => {
    try {
      const { confirmPassword, ...payload } = values;
      await register(payload);
    } catch (error) {
      // Error handled in hook
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return {
    form,
    isRegistering,
    handleRegister: form.handleSubmit(handleRegister),
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  };
};
