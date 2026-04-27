'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store';
import { loginSuccess } from '@/store/slices/authSlice';
import { toast } from 'sonner';

export const useLoginPageHook = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'admin'>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy authentication
    setTimeout(() => {
      if (
        (username === 'admin' && password === 'admin') ||
        (username === 'user' && password === 'user')
      ) {
        const selectedRole = username === 'admin' ? 'admin' : 'employee';

        dispatch(
          loginSuccess({
            user: {
              name: username.charAt(0).toUpperCase() + username.slice(1),
              username,
            },
            token: 'dummy-jwt-token',
            role: selectedRole,
          })
        );

        toast.success(`Login successful as ${selectedRole}`);
        router.push('/platform/dashboard');
      } else {
        toast.error('Invalid credentials', {
          description: 'Please use admin/admin or user/user',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    isLoading,
    handleLogin,
  };
};
