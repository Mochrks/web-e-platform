import React from 'react';
import { toast as sonnerToast } from 'sonner';
import { CustomToast, ToastType } from '@/components/shared/components/Alert';

interface ToastOptions {
  description?: string;
  duration?: number;
}

const showToast = (title: string, type: ToastType, options?: ToastOptions) => {
  sonnerToast.custom(
    (id) =>
      React.createElement(CustomToast, {
        title,
        description: options?.description,
        type,
      }),
    {
      duration: options?.duration || 3000,
      position: 'top-center',
    }
  );
};

export const toast = {
  success: (title: string, options?: ToastOptions) =>
    showToast(title, 'success', options),
  error: (title: string, options?: ToastOptions) =>
    showToast(title, 'error', options),
  warning: (title: string, options?: ToastOptions) =>
    showToast(title, 'warning', options),
  info: (title: string, options?: ToastOptions) =>
    showToast(title, 'info', options),
  dismiss: () => sonnerToast.dismiss(),
};
