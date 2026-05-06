'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/lib/toast';

const ConnectivityContext = createContext<boolean>(true);

export const ConnectivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Monitor Network Status only
    const handleOnline = () => {
      setIsOnline(true);
      toast.dismiss(); // Clear offline toast
      toast.success('Internet Connected', {
        description: 'You are back online.',
        duration: 3000,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.dismiss(); // Clear any previous toast
      toast.error('Network Offline', {
        description: 'Please check your internet connection.',
      });
    };

    globalThis.addEventListener('online', handleOnline);
    globalThis.addEventListener('offline', handleOffline);

    // Initial check
    if (!navigator.onLine) setIsOnline(false);

    return () => {
      globalThis.removeEventListener('online', handleOnline);
      globalThis.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ConnectivityContext.Provider value={isOnline}>
      {children}
    </ConnectivityContext.Provider>
  );
};

export const useConnectivity = () => useContext(ConnectivityContext);
