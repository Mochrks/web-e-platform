'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Zap,
  Star,
} from 'lucide-react';
import TalentAvatar from '@/components/shared/avatar';
import { useLeaderboardHook } from './LeaderboardPageHook';

export default function LeaderboardPageUI() {
  const { topThree, others } = useLeaderboardHook();

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-2">
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-2">
          Hall of Fame
        </h1>
        <p className="text-muted-foreground font-medium text-lg font-bold">
          Celebrating our top performers and most consistent contributors across
          the platform.
        </p>
      </div>

      {/* Podium Section */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-6 max-w-4xl mx-auto px-4 mt-8">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-64">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-secondary/80 rounded-t-[3rem] rounded-b-[1rem] -z-10 -m-4"></div>
            <TalentAvatar size={100} {...topThree[1].avatarConfig} />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-zinc-300 rounded-full flex items-center justify-center border-2 border-background font-black text-black text-sm">
              2
            </div>
          </div>
          <Card className="w-full p-5 text-center rounded-3xl border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-black text-lg truncate">{topThree[1].name}</h4>
            <p
              className="text-primary font-black flex items-center justify-center gap-1.5 mt-1 text-sm"
              suppressHydrationWarning
            >
              <Zap className="w-3.5 h-3.5" />{' '}
              {topThree[1].totalXP.toLocaleString()} XP
            </p>
          </Card>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-72 mb-8 md:mb-10 relative">
          <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-primary/10 rounded-t-[4rem] rounded-b-[1.5rem] -z-10 -m-6"></div>
            <Crown className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-12 text-yellow-500 fill-yellow-500 drop-shadow-md" />
            <Star className="absolute top-0 right-0 w-6 h-6 text-yellow-500 fill-yellow-500" />
            <TalentAvatar size={130} {...topThree[0].avatarConfig} />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-background font-black text-yellow-900 text-lg">
              1
            </div>
          </div>
          <Card className="w-full p-6 text-center rounded-3xl border-primary/40 bg-primary/5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-black text-2xl mb-1">{topThree[0].name}</h3>
            <p
              className="text-primary text-xl font-black flex items-center justify-center gap-1.5"
              suppressHydrationWarning
            >
              <Zap className="w-5 h-5" /> {topThree[0].totalXP.toLocaleString()}{' '}
              XP
            </p>
          </Card>
        </div>

        {/* Rank 3 */}
        <div className="order-3 flex flex-col items-center w-full md:w-64">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-orange-100 dark:bg-orange-950/30 rounded-t-[3rem] rounded-b-[1rem] -z-10 -m-4"></div>
            <TalentAvatar size={100} {...topThree[2].avatarConfig} />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center border-2 border-background font-black text-orange-900 text-sm">
              3
            </div>
          </div>
          <Card className="w-full p-5 text-center rounded-3xl border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-black text-lg truncate">{topThree[2].name}</h4>
            <p
              className="text-primary font-black flex items-center justify-center gap-1.5 mt-1 text-sm"
              suppressHydrationWarning
            >
              <Zap className="w-3.5 h-3.5" />{' '}
              {topThree[2].totalXP.toLocaleString()} XP
            </p>
          </Card>
        </div>
      </div>

      {/* List for the rest */}
      <Card className="max-w-3xl mx-auto rounded-3xl border-border p-6 bg-card shadow-sm">
        <div className="space-y-4">
          {others.map((entry, index) => (
            <div
              key={entry.employeeId}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 rounded-2xl hover:bg-secondary/40 transition-colors ${index !== others.length - 1 ? 'border-b border-border/50 pb-6' : ''}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-black text-muted-foreground">
                  {entry.rank}
                </div>
                <TalentAvatar size={48} {...entry.avatarConfig} />
                <div>
                  <h5 className="font-bold text-base">{entry.name}</h5>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                    Employee Profile
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10">
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">
                      Tasks
                    </p>
                    <p className="font-black text-sm">{entry.completedTasks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">
                      Certs
                    </p>
                    <p className="font-black text-primary text-sm">
                      {entry.certifications}
                    </p>
                  </div>
                </div>

                <div className="text-right w-24">
                  <p className="font-black text-base" suppressHydrationWarning>
                    {entry.totalXP.toLocaleString()} XP
                  </p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center justify-end gap-1 mt-0.5">
                    {entry.trend === 'up' && (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    )}
                    {entry.trend === 'down' && (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    {entry.trend === 'neutral' && (
                      <Minus className="w-3 h-3 text-gray-400" />
                    )}
                    Trend
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
