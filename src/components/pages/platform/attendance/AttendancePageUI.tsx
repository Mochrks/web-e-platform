'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AttendanceHeader from './components/AttendanceHeader';
import AttendanceLogs from './components/AttendanceLogs';
import { useAttendancePageHook } from './AttendancePageHook';

export default function AttendancePageUI() {
  const { isClockedIn, logs, handleClockAction } = useAttendancePageHook();

  return (
    <div className="space-y-10 pb-20 animate-fade-in">
      <AttendanceHeader
        isClockedIn={isClockedIn}
        onClockAction={handleClockAction}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <AttendanceLogs logs={logs} />

        {/* Sidebar Stats */}
        <div className="space-y-8">
          <Card className="p-8 rounded-[2.5rem] border-border bg-card shadow-sm space-y-6">
            <h4 className="text-xl font-black">Monthly Overview</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
                <span className="block text-[10px] font-black uppercase text-muted-foreground mb-1">
                  Total Days
                </span>
                <span className="text-3xl font-black">22</span>
              </div>
              <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
                <span className="block text-[10px] font-black uppercase text-muted-foreground mb-1">
                  Late Join
                </span>
                <span className="text-3xl font-black text-amber-500">01</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span>Punctuality Rate</span>
                <span className="text-primary">95%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full">
                <div className="h-full bg-primary w-[95%]" />
              </div>
            </div>
          </Card>

          <Card className="p-8 rounded-[2.5rem] border-border bg-primary text-white shadow-xl shadow-primary/20 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-white/20 rounded-2xl">
              <Clock className="w-8 h-8" aria-hidden="true" />
            </div>
            <h4 className="text-xl font-black">Consistent Learner</h4>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              You have been present for 5 consecutive days without being late.
              Gold badge unlocked!
            </p>
            <Button
              type="button"
              className="w-full bg-white text-primary hover:bg-white/90 font-black rounded-xl h-12"
            >
              Claim Rewards
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
