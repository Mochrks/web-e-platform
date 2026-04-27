'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TalentAvatar from '@/components/shared/avatar';
import DashboardStatCard from './components/DashboardStatCard';
import SkillItem from '@/components/shared/components/SkillItem';
import {
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Zap,
  MessageSquare,
  Monitor,
} from 'lucide-react';
import { useDashboardPageHook } from './DashboardPageHook';

export default function DashboardPageUI() {
  const { recentActivities, skillBalance, currentAllocation } =
    useDashboardPageHook();
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Use useCallback to prevent unnecessary function recreation
  const checkMobile = useCallback(() => {
    setIsMobileDevice(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  return (
    <div className="space-y-10 animate-fade-in animate-slide-up">
      {/* Hero Welcome Section */}
      <div className="relative bg-primary p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-primary/20 overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Zap className="w-64 h-64 fill-white" aria-hidden="true" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="bg-white/10 p-3 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-md border border-white/20">
            <TalentAvatar size={isMobileDevice ? 100 : 150} />
          </div>
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              Welcome Back, Reks!
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/70">
                  <span>Level 12 Specialist</span>
                  <span>8,450 / 10,000 XP</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[84.5%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                </div>
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-md px-4 py-2 rounded-xl border-none">
                <Zap className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400 border-none" />
                <span className="font-black">TOP 5%</span>
              </Badge>
            </div>

            <p className="text-white/80 font-medium text-lg md:text-xl leading-relaxed font-bold">
              Your interview readiness is looking sharp. You&apos;ve completed{' '}
              <span className="text-white font-black underline decoration-2 underline-offset-4">
                8/10 scheduled sessions
              </span>{' '}
              this week.
            </p>
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <Link href="/platform">
                <button className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm hover:bg-white/90 transition-all active:scale-95 shadow-lg">
                  Resume Simulation
                </button>
              </Link>
              <Link href="/platform/tasks">
                <button className="bg-primary-foreground/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-black text-sm hover:bg-white/10 transition-all active:scale-95">
                  View Path
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardStatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Avg. Score"
          value="84%"
          trend="+12%"
        />
        <DashboardStatCard
          icon={<Monitor className="w-6 h-6" />}
          label="Deploy Status"
          value={currentAllocation.status}
          trend={currentAllocation.client}
        />
        <DashboardStatCard
          icon={<Clock className="w-6 h-6" />}
          label="Training Time"
          value="24.5h"
          trend="Top 5%"
        />
        <DashboardStatCard
          icon={<Users className="w-6 h-6" />}
          label="Mock Interviews"
          value="06"
          trend="2 Pending"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
        {/* Activity Timeline */}
        <Card className="xl:col-span-2 p-8 rounded-[2.5rem] border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">
              Recent Activity
            </h3>
            <button className="text-xs font-black uppercase text-primary hover:underline">
              View History
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((item) => (
              <div
                key={item.title + item.time}
                className="flex items-center gap-6 p-6 rounded-3xl hover:bg-muted/50 transition-all border border-transparent hover:border-border group"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {(() => {
                    switch (item.type) {
                      case 'Assessment':
                        return <CheckCircle />;
                      case 'Meeting':
                        return <MessageSquare />;
                      default:
                        return <Zap />;
                    }
                  })()}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-foreground tracking-tight">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {item.time} •{' '}
                    <span className="text-primary font-bold">{item.type}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-primary px-4 py-2 bg-primary/10 rounded-full">
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Sidebar Dashboard Items */}
        <div className="space-y-8">
          <Card className="p-8 rounded-[2.5rem] border-border bg-card shadow-sm border-l-4 border-l-primary">
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              Next Step <ArrowUpRight className="w-4 h-4 text-primary" />
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-bold">
              Final Cultural & HR Round Simulation with our AI engine. Focus on
              your career vision.
            </p>
            <button className="w-full mt-6 bg-muted hover:bg-muted/80 p-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
              Start Module
            </button>
          </Card>

          <Card className="p-8 rounded-[2.5rem] border-border bg-card shadow-sm">
            <h4 className="text-lg font-black mb-6">Skill Balance</h4>
            <div className="space-y-6">
              {skillBalance.map((skill) => (
                <SkillItem
                  key={skill.label}
                  label={skill.label}
                  percent={skill.percent}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
