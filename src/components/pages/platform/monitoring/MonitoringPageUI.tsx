'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, Activity, ShieldCheck, AlertCircle } from 'lucide-react';
import { useMonitoringPageHook } from './MonitoringPageHook';

export default function MonitoringPageUI() {
  const { stats } = useMonitoringPageHook();

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter text-foreground">
          Platform Monitoring
        </h1>
        <p className="text-muted-foreground font-medium italic">
          Track real-time system performance and user activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="p-6 rounded-[2rem] bg-card border-border shadow-sm flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                {stat.label}
              </p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-10 rounded-[3rem] border-border bg-card shadow-xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <Activity className="w-10 h-10 text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl font-black mb-4">Real-time Data Streaming</h2>
        <p className="max-w-md text-muted-foreground font-medium leading-relaxed">
          All system monitoring metrics are currently simulated. In a production
          environment, this dashboard would connect to your backend telemetry or
          Prometheus/Grafana sources.
        </p>
        <button className="mt-8 px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm hover:scale-105 transition-all">
          Refresh Metrics
        </button>
      </Card>
    </div>
  );
}
