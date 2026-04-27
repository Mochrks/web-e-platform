'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface AttendanceLog {
  id: number;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'Present' | 'Late' | 'Absent';
  location: string;
}

interface AttendanceLogsProps {
  logs: AttendanceLog[];
}

export default function AttendanceLogs({
  logs,
}: Readonly<AttendanceLogsProps>) {
  return (
    <div className="xl:col-span-2 space-y-8">
      <div className="flex items-center justify-between px-4">
        <h3 className="text-2xl font-black tracking-tight">Attendance Logs</h3>
        <Button
          variant="ghost"
          className="text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5"
        >
          Download Report
        </Button>
      </div>

      <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Date
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Clock In
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Clock Out
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Location
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="group hover:bg-muted/30 transition-all"
                >
                  <td className="p-6 text-sm font-bold whitespace-nowrap">
                    {log.date}
                  </td>
                  <td className="p-6 text-sm font-bold text-emerald-500 whitespace-nowrap">
                    {log.clockIn}
                  </td>
                  <td className="p-6 text-sm font-bold text-rose-500 whitespace-nowrap">
                    {log.clockOut}
                  </td>
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <MapPin className="w-3 h-3" aria-hidden="true" />{' '}
                      {log.location}
                    </div>
                  </td>
                  <td className="p-6 text-center whitespace-nowrap">
                    <Badge
                      className={`
                              rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest
                              ${log.status === 'Present' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                            `}
                    >
                      {log.status === 'Present' ? (
                        <CheckCircle2
                          className="w-3 h-3 mr-1.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertCircle
                          className="w-3 h-3 mr-1.5"
                          aria-hidden="true"
                        />
                      )}
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
