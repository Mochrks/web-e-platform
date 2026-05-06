import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface CustomToastProps {
  title: string;
  description?: string;
  type: ToastType;
}

const toastStyles: Record<
  ToastType,
  { bg: string; icon: React.ReactNode; border: string }
> = {
  success: {
    bg: 'bg-emerald-600',
    border: 'border-emerald-500/50',
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
  },
  error: {
    bg: 'bg-rose-600',
    border: 'border-rose-500/50',
    icon: <XCircle className="w-5 h-5 text-white" />,
  },
  warning: {
    bg: 'bg-amber-600',
    border: 'border-amber-500/50',
    icon: <AlertCircle className="w-5 h-5 text-white" />,
  },
  info: {
    bg: 'bg-blue-600',
    border: 'border-blue-500/50',
    icon: <Info className="w-5 h-5 text-white" />,
  },
};

export const CustomToast: React.FC<CustomToastProps> = ({
  title,
  description,
  type,
}) => {
  const style = toastStyles[type];

  return (
    <div
      className={`
      flex items-start gap-4 p-4 rounded-3xl shadow-2xl min-w-[320px] max-w-[420px]
      backdrop-blur-xl border ${style.bg} ${style.border} text-white z-[9999] duration-300
    `}
    >
      <div className="mt-0.5 p-1 bg-white/20 rounded-full">{style.icon}</div>
      <div className="flex flex-col gap-1">
        <h3 className="font-black text-sm leading-tight tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-white/90 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
