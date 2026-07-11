'use client';

import React from 'react';
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
  Briefcase,
  CheckSquare,
  Award,
} from 'lucide-react';
import { useDashboardPageHook } from './DashboardPageHook';

export default function DashboardPageUI() {
  const {
    recentActivities,
    skillBalance,
    currentAllocation,
    upcomingTasks,
    attendanceStatus,
  } = useDashboardPageHook();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Hero Welcome Section — Wise Green Band */}
      <div className="relative bg-primary p-5 sm:p-6 md:p-10 rounded-3xl overflow-hidden group">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 p-10 opacity-[0.08] group-hover:scale-110 transition-transform duration-700">
          <Zap
            className="w-56 h-56 fill-current text-primary-foreground"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8">
          {/* Avatar Container — responsive sizing via CSS */}
          <div className="bg-white/15 p-2 sm:p-3 rounded-3xl backdrop-blur-sm border border-white/10">
            <div className="hidden md:block">
              <TalentAvatar size={130} />
            </div>
            <div className="block md:hidden">
              <TalentAvatar size={90} />
            </div>
          </div>

          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-4xl text-white tracking-tight mb-2">
              Welcome Back, Reks!
            </h1>

            {/* Project Status */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <Badge className="bg-primary-foreground/15 text-primary-foreground border-none backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                {currentAllocation.role} @ {currentAllocation.client}
              </Badge>
              <Badge className="bg-primary-foreground/15 text-primary-foreground border-none backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                {attendanceStatus.status} ({attendanceStatus.timeIn})
              </Badge>
            </div>

            <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed">
              Your interview readiness is looking sharp. You&apos;ve completed{' '}
              <span className="text-primary-foreground font-semibold underline decoration-1 underline-offset-4">
                8/10 scheduled sessions
              </span>{' '}
              this week.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              <Link href="/platform">
                <button className="bg-background text-foreground px-6 py-3 rounded-3xl font-semibold text-sm hover:bg-background/90 transition-all active:scale-[0.97]">
                  Resume Simulation
                </button>
              </Link>
              <Link href="/platform/tasks">
                <button className="bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm border border-primary-foreground/20 px-6 py-3 rounded-3xl font-semibold text-sm hover:bg-primary-foreground/10 transition-all active:scale-[0.97]">
                  View Path
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardStatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Avg. Score"
          value="84%"
          trend="+12%"
        />
        <DashboardStatCard
          icon={<Monitor className="w-5 h-5" />}
          label="Deploy Status"
          value={currentAllocation.status}
          trend={currentAllocation.client}
        />
        <DashboardStatCard
          icon={<Clock className="w-5 h-5" />}
          label="Training Time"
          value="24.5h"
          trend="Top 5%"
        />
        <DashboardStatCard
          icon={<Users className="w-5 h-5" />}
          label="Mock Interviews"
          value="06"
          trend="2 Pending"
        />
      </div>

      {/* Activity & Skills Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column Container */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Activity Timeline */}
          <Card className="p-6 rounded-3xl border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold tracking-tight">
                Recent Activity
              </h3>
              <button className="text-xs font-semibold text-primary hover:underline">
                View History
              </button>
            </div>

            <div className="space-y-2">
              {recentActivities.map((item) => (
                <div
                  key={item.title + item.time}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {(() => {
                      switch (item.type) {
                        case 'Assessment':
                          return <CheckCircle className="w-5 h-5" />;
                        case 'Meeting':
                          return <MessageSquare className="w-5 h-5" />;
                        default:
                          return <Zap className="w-5 h-5" />;
                      }
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground tracking-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.time} •{' '}
                      <span className="text-primary font-medium">
                        {item.type}
                      </span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-primary px-3 py-1.5 bg-primary/10 rounded-full">
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="p-6 rounded-3xl border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold tracking-tight">
                Upcoming Tasks
              </h3>
              <Link
                href="/platform/tasks"
                className="text-xs font-semibold text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div
                  key={task.title}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground tracking-tight truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {task.deadline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {task.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Next Step Card */}
          <Card className="p-6 rounded-3xl border-border bg-card border-l-[3px] border-l-primary">
            <h4 className="text-base font-bold mb-3 flex items-center gap-2">
              Next Step <ArrowUpRight className="w-4 h-4 text-primary" />
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Final Cultural & HR Round Simulation with our AI engine. Focus on
              your career vision.
            </p>
            <button className="w-full mt-5 bg-secondary hover:bg-secondary/80 p-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]">
              Start Module
            </button>
          </Card>

          {/* Skill Balance Card */}
          <Card className="p-6 rounded-3xl border-border bg-card">
            <h4 className="text-base font-bold mb-5">Skill Balance</h4>
            <div className="space-y-5">
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
