'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useLogout } from '@/hooks/api/useAuth';
import { useAppSelector } from '@/store';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const IdleTimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mutate: logout } = useLogout();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOnIdle = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    }
  };

  const idleTimer = useIdleTimer({
    timeout: IDLE_TIMEOUT,
    onIdle: handleOnIdle,
    debounce: 500,
    disabled: !isAuthenticated,
  });

  const handleLogout = useCallback(() => {
    setIsModalOpen(false);
    logout();
  }, [logout]);

  const handleStayLoggedIn = () => {
    setIsModalOpen(false);
    idleTimer.reset();
  };

  useEffect(() => {
    // No auto logout. We wait indefinitely for the user's manual action.
  }, [isModalOpen, handleLogout]);

  return (
    <>
      {children}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="max-w-[420px] rounded-[32px] border-none  bg-white dark:bg-neutral-900 p-8">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="text-2xl font-bold text-neutral-900 dark:text-white text-center sm:text-left">
              Session Expiring
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed text-center sm:text-left">
              You have been inactive for a while. Please select whether you want
              to stay logged in or sign out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1 sm:flex-none px-6 h-12 rounded-2xl transition-all text-sm text-white"
            >
              Logout Now
            </Button>
            <Button
              onClick={handleStayLoggedIn}
              className="flex-1 sm:flex-none px-8 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all active:scale-95   text-sm border-none"
            >
              Stay Logged In
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
