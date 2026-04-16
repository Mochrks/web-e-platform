'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Award,
  Target,
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
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl">
          <Trophy className="w-8 h-8 text-primary animate-bounce" />
        </div>
        <h1 className="text-5xl font-black tracking-tighter">Hall of Fame</h1>
        <p className="text-muted-foreground text-lg font-bold">
          Celebrating our top performers and most consistent contributors across
          the platform.
        </p>
      </div>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto px-4">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 flex flex-col items-center group">
          <div className="relative mb-6">
            <TalentAvatar size={140} {...topThree[1].avatarConfig} />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-zinc-300 rounded-full flex items-center justify-center border-4 border-background font-black text-black">
              2
            </div>
          </div>
          <Card className="w-full p-6 text-center rounded-[2rem] border-border bg-card/50 backdrop-blur-xl group-hover:bg-card transition-all group-hover:-translate-y-2">
            <h4 className="font-black text-xl truncate">{topThree[1].name}</h4>
            <p
              className="text-primary font-black flex items-center justify-center gap-1.5 mt-1"
              suppressHydrationWarning
            >
              <Zap className="w-4 h-4" /> {topThree[1].totalXP.toLocaleString()}{' '}
              XP
            </p>
          </Card>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 flex flex-col items-center group mb-8 md:mb-12">
          <div className="relative mb-8 transform group-hover:scale-110 transition-transform duration-500">
            <Crown className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-14 text-yellow-500 animate-pulse drop-shadow-lg" />
            <div className="relative">
              <TalentAvatar size={180} {...topThree[0].avatarConfig} />
              <Star className="absolute top-0 right-0 w-8 h-8 text-yellow-500 fill-yellow-500 animate-spin-slow" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-background font-black text-yellow-900 shadow-xl">
              1
            </div>
          </div>
          <Card className="w-full p-8 text-center rounded-[3rem] border-primary/50 bg-primary/5 ring-4 ring-primary/10 shadow-[0_0_40px_rgba(var(--primary),0.1)] group-hover:-translate-y-4 transition-all">
            <h3 className="font-black text-3xl mb-1">{topThree[0].name}</h3>
            <p
              className="text-primary text-2xl font-black flex items-center justify-center gap-2"
              suppressHydrationWarning
            >
              <Zap className="w-6 h-6" /> {topThree[0].totalXP.toLocaleString()}{' '}
              XP
            </p>
          </Card>
        </div>

        {/* Rank 3 */}
        <div className="order-3 flex flex-col items-center group">
          <div className="relative mb-6">
            <TalentAvatar size={140} {...topThree[2].avatarConfig} />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center border-4 border-background font-black text-orange-900">
              3
            </div>
          </div>
          <Card className="w-full p-6 text-center rounded-[2rem] border-border bg-card/50 backdrop-blur-xl group-hover:bg-card transition-all group-hover:-translate-y-2">
            <h4 className="font-black text-xl truncate">{topThree[2].name}</h4>
            <p
              className="text-primary font-black flex items-center justify-center gap-1.5 mt-1"
              suppressHydrationWarning
            >
              <Zap className="w-4 h-4" /> {topThree[2].totalXP.toLocaleString()}{' '}
              XP
            </p>
          </Card>
        </div>
      </div>

      {/* List for the rest */}
      <Card className="max-w-4xl mx-auto rounded-[3rem] border-border p-4 bg-card/40 backdrop-blur-md overflow-hidden">
        <div className="space-y-2">
          {others.map((entry) => (
            <div
              key={entry.employeeId}
              className="flex items-center gap-6 p-6 rounded-[2rem] hover:bg-muted/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center font-black text-xl text-muted-foreground group-hover:text-primary transition-colors">
                {entry.rank}
              </div>

              <div className="flex items-center gap-4 flex-1">
                <TalentAvatar size={56} {...entry.avatarConfig} />
                <div>
                  <h5 className="font-black text-lg">{entry.name}</h5>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Employee Profile
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 px-8 border-x border-border hidden md:flex">
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">
                    Tasks
                  </p>
                  <p className="font-black">{entry.completedTasks}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">
                    Certs
                  </p>
                  <p className="font-black text-primary">
                    {entry.certifications}
                  </p>
                </div>
              </div>

              <div className="w-32 text-right">
                <p className="font-black text-lg" suppressHydrationWarning>
                  {entry.totalXP.toLocaleString()} XP
                </p>
                <p className="text-[10px] font-black text-muted-foreground uppercase flex items-center justify-end gap-1">
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
          ))}
        </div>
      </Card>
    </div>
  );
}
