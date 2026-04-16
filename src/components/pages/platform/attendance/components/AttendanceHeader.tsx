'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fingerprint, Timer, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AttendanceHeaderProps {
  isClockedIn: boolean;
  onClockAction: () => void;
}

export default function AttendanceHeader({
  isClockedIn,
  onClockAction,
}: AttendanceHeaderProps) {
  return (
    <div className="bg-card border border-border p-10 rounded-[3rem] shadow-sm flex flex-col lg:flex-row justify-between items-center gap-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="flex-1 space-y-4 relative z-10">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full w-fit">
          <Fingerprint className="w-4 h-4" /> Talent Attendance
        </div>
        <h1 className="text-4xl font-black tracking-tight">Daily Presence</h1>
        <p className="text-muted-foreground font-medium text-lg max-w-xl leading-relaxed font-bold">
          Manage your training hours and track your consistency across the
          simulation cycle.
        </p>
      </div>

      <Card className="w-full lg:w-96 p-8 rounded-[2.5rem] bg-background border-border shadow-2xl relative z-10 flex flex-col items-center text-center space-y-6">
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-xl ${isClockedIn ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-primary text-white shadow-primary/20'}`}
        >
          <Timer
            className={`w-10 h-10 ${isClockedIn ? 'animate-pulse' : ''}`}
          />
        </div>
        <div>
          <h3 className="text-2xl font-black">
            {isClockedIn ? 'Working Now' : 'Off Duty'}
          </h3>
          <p className="text-sm text-muted-foreground font-bold mt-1">
            Current Session: 04h 22m
          </p>
        </div>
        <Button
          onClick={onClockAction}
          className={`w-full h-16 rounded-[1.5rem] font-black text-lg transition-all active:scale-95 ${isClockedIn ? 'bg-rose-500 hover:bg-rose-600' : 'bg-primary hover:bg-primary/90'}`}
        >
          {isClockedIn ? (
            <span className="flex items-center justify-center">
              Clock Out Now <ArrowDownRight className="ml-2 w-5 h-5" />
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Clock In Session <ArrowUpRight className="ml-2 w-5 h-5" />
            </span>
          )}
        </Button>
      </Card>
    </div>
  );
}
