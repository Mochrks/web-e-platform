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
}: Readonly<DashboardStatCardProps>) {
  return (
    <Card className="p-6 rounded-3xl border-border bg-card flex flex-col justify-between hover:border-primary/40 transition-all cursor-default group">
      <div className="flex items-center justify-between mb-5">
        <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          {icon}
        </div>
        <span className="text-[11px] font-semibold px-3 py-1 bg-accent text-accent-foreground rounded-full">
          {trend}
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-1">
          {label}
        </p>
        <p className="text-3xl font-black tracking-tighter text-foreground">
          {value}
        </p>
      </div>
    </Card>
  );
}
