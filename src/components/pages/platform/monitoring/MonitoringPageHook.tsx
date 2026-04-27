'use client';

import React from 'react';
import { BarChart3, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

export const useMonitoringPageHook = () => {
  const stats = [
    {
      label: 'CPU Usage',
      value: '12.5%',
      icon: <Activity className="w-6 h-6" />,
    },
    {
      label: 'Active Sessions',
      value: '1,284',
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      label: 'API Uptime',
      value: '99.98%',
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      label: 'Error Rate',
      value: '0.04%',
      icon: <AlertCircle className="w-6 h-6" />,
    },
  ];

  return {
    stats,
  };
};
