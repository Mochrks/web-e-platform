'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVerifyEmail } from '@/hooks/api/useAuth';

export const useVerifyEmailHook = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const {
    mutate: verify,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verify(token);
    }
  }, [token, verify]);

  return {
    token,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
