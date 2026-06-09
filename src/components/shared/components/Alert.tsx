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
    bg: 'bg-[#2ead4b]',
    border: 'border-[#2ead4b]/30',
    icon: <CheckCircle2 className="w-5 h-5 text-white" />,
  },
  error: {
    bg: 'bg-[#d03238]',
    border: 'border-[#d03238]/30',
    icon: <XCircle className="w-5 h-5 text-white" />,
  },
  warning: {
    bg: 'bg-[#b86700]',
    border: 'border-[#b86700]/30',
    icon: <AlertCircle className="w-5 h-5 text-white" />,
  },
  info: {
    bg: 'bg-[#38c8ff]',
    border: 'border-[#38c8ff]/30',
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
      flex items-start gap-4 p-4 rounded-3xl  min-w-[320px] max-w-[420px]
      border ${style.bg} ${style.border} text-white z-[9999] duration-300
    `}
    >
      <div className="mt-0.5 p-1.5 bg-white/20 rounded-full">{style.icon}</div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm leading-tight tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-white/90 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
};
