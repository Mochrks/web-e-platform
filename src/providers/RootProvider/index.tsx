'use client';

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from '@/store';
import { ConnectivityProvider } from '../ConnectivityProvider';
import { IdleTimerProvider } from '../IdleTimerProvider';
import { hydrate as hydrateAuth } from '@/store/slices/authSlice';
import { hydrate as hydrateOnboarding } from '@/store/slices/onboardingSlice';

function StoreHydrator({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
    dispatch(hydrateOnboarding());
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConnectivityProvider>
          <StoreHydrator>
            <IdleTimerProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </IdleTimerProvider>
          </StoreHydrator>
        </ConnectivityProvider>
      </QueryClientProvider>
    </Provider>
  );
}
