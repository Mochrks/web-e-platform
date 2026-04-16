'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface DashboardStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

export default function DashboardStatCard({
  icon,
  label,
  value,
  trend,
}: DashboardStatCardProps) {
  return (
    <Card className="p-8 rounded-[2.5rem] border-border bg-card flex flex-col justify-between hover:border-primary/50 transition-all cursor-default group shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-muted text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-black px-3 py-1 bg-primary/10 text-primary rounded-full">
          {trend}
        </span>
      </div>
      <div>
        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">
          {label}
        </p>
        <p className="text-4xl font-black tracking-tighter">{value}</p>
      </div>
    </Card>
  );
}
