'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  MapPin,
  Search,
  ChevronRight,
  TrendingUp,
  Building2,
  Calendar,
  Layers,
  Star,
  Monitor,
  CheckCircle2,
  MessageCircle,
  ArrowLeft,
  History as HistoryIcon,
  User,
} from 'lucide-react';
import { useAllocationsHook } from './AllocationPageHook';

export default function AllocationPageUI() {
  const {
    role,
    allAllocations,
    searchQuery,
    setSearchQuery,
    personalCurrent,
    personalHistory,
    selectedUserId,
    setSelectedUserId,
    getEmployeeHistory,
  } = useAllocationsHook();

  // Employee Selection View (Admin viewing a specific employee's history)
  if (selectedUserId) {
    const history = getEmployeeHistory(selectedUserId);
    const employeeName = history[0]?.employeeName || 'Employee';

    return (
      <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedUserId(null)}
            className="rounded-xl w-12 h-12 p-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black">
              {employeeName}&apos;s Project History
            </h1>
            <p className="text-muted-foreground font-medium underline underline-offset-4 decoration-primary/30">
              Detailed lifecycle tracing & project mapping.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {history.map((a) => (
              <Card
                key={a.id}
                className={`p-8 rounded-[2.5rem] border-border bg-card/60 backdrop-blur-md shadow-sm transition-all border-l-8 ${a.status === 'active' ? 'border-l-primary shadow-xl shadow-primary/5' : 'border-l-emerald-500'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <Badge
                      className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none ${a.status === 'active' ? 'bg-primary text-white' : 'bg-emerald-500/10 text-emerald-500'}`}
                    >
                      {a.status.toUpperCase()}
                    </Badge>
                    <h3 className="text-2xl font-black">{a.projectName}</h3>
                    <p className="text-muted-foreground font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> {a.clientName}
                    </p>
                  </div>
                  <div className="text-right">
                    {a.performanceRating && (
                      <div className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400/10 text-yellow-600 rounded-xl font-black text-sm mb-2">
                        <Star className="w-4 h-4 fill-yellow-600" />{' '}
                        {a.performanceRating}
                      </div>
                    )}
                    <p className="text-[10px] font-black text-muted-foreground uppercase">
                      {a.startDate} — {a.endDate}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end pt-4 border-t border-border/50">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {a.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-muted rounded-lg opacity-70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" /> Role: {a.role}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {a.location}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black tracking-widest opacity-60">
                      <span>ASSIGNMENT PROGRESS</span>
                      <span>{a.progress}%</span>
                    </div>
                    <Progress value={a.progress} className="h-2 rounded-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-8 rounded-[2.5rem] bg-indigo-600 text-white border-none space-y-4">
              <h4 className="font-black text-xl">Employee Insight</h4>
              <p className="text-sm text-indigo-100 font-medium">
                Tracing indicates high retention in Financial Service sectors
                with strong proficiency in Cloud Native technologies.
              </p>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
                  <span>Sector Focus</span>
                  <span>Finance (80%)</span>
                </div>
                <Progress value={80} className="h-1.5 bg-white/20" />
              </div>
            </Card>

            <Card className="p-8 rounded-[2.5rem] bg-card border-border border-dashed border-2 text-center py-12">
              <HistoryIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-40" />
              <p className="font-black text-sm uppercase text-muted-foreground">
                No gaps in mapping found.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Employee Perspective (Personal Current & History)
  if (role === 'employee') {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter">
              My Allocations
            </h1>
            <p className="text-muted-foreground font-medium">
              Tracking your assignments, feedback, and project lifecycle.
            </p>
          </div>
          <div className="flex gap-4">
            <Card className="px-8 py-4 rounded-3xl bg-primary text-white border-none text-center shadow-xl shadow-primary/20">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Current Status
              </p>
              <p className="text-lg font-black">
                {personalCurrent ? 'At Client' : 'On Bench'}
              </p>
            </Card>
          </div>
        </div>

        {/* Full History Timeline */}
        <div className="space-y-10">
          <div className="flex items-center gap-3 px-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-muted-foreground">
              Allocation Timeline
            </h2>
          </div>

          <div className="space-y-6 relative ml-6 md:ml-0">
            {/* Vertical Line for styling */}
            <div className="absolute left-[30px] top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-emerald-500 to-muted hidden md:block" />

            {[
              ...(personalCurrent ? [personalCurrent] : []),
              ...personalHistory,
            ].map((a, i) => (
              <div
                key={a.id}
                className="relative md:pl-20 animate-in fade-in slide-in-from-left-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Marker */}
                <div
                  className={`absolute left-[20px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-background z-10 hidden md:flex items-center justify-center ${a.status === 'active' ? 'bg-primary' : 'bg-emerald-500'}`}
                >
                  {a.status === 'active' ? (
                    <Monitor className="w-3 h-3 text-white" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>

                <Card
                  className={`p-8 rounded-[3rem] border-border bg-card shadow-sm hover:shadow-xl transition-all group overflow-hidden relative ${a.status === 'active' ? 'ring-2 ring-primary bg-primary/[0.02]' : ''}`}
                >
                  <div className="flex flex-col xl:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <Badge
                          className={`rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-none ${a.status === 'active' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-emerald-500/10 text-emerald-500'}`}
                        >
                          {a.status}
                        </Badge>
                        <span className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {a.location}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors">
                          {a.projectName}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 underline underline-offset-4 decoration-primary/20 font-black text-muted-foreground">
                          <Building2 className="w-5 h-5" /> {a.clientName}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {a.techStack?.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-muted rounded-xl opacity-80 border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {a.feedback && (
                        <div className="p-6 bg-muted/30 rounded-3xl border border-dashed border-border relative">
                          <MessageCircle className="absolute -top-3 -left-3 w-8 h-8 text-primary opacity-20" />
                          <p className="text-sm italic font-bold text-muted-foreground leading-relaxed">
                            &quot;{a.feedback}&quot;
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="w-full xl:w-72 space-y-6 shrink-0 bg-muted/50 p-8 rounded-[2rem] border border-border/50 flex flex-col justify-center">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                          <span>Mapping Accuracy</span>
                          <span>{a.progress}%</span>
                        </div>
                        <Progress
                          value={a.progress}
                          className="h-3 rounded-full"
                        />
                      </div>

                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black uppercase opacity-40">
                            Start
                          </p>
                          <p className="font-black text-sm">{a.startDate}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black uppercase opacity-40">
                            End
                          </p>
                          <p className="font-black text-sm text-indigo-500">
                            {a.endDate}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-black uppercase opacity-40">
                            Lead
                          </p>
                          <p className="font-black text-sm">
                            {a.reportingManager}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Admin Resource Directory View
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-1000">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter">
            Engagement Directory
          </h1>
          <p className="text-muted-foreground text-lg font-medium underline underline-offset-8 decoration-primary/30">
            Cross-client employee mapping & technical tracing console.
          </p>
        </div>

        <div className="flex gap-4 w-full xl:w-auto">
          <Card className="flex-1 px-8 py-5 border-2 border-primary/20 bg-primary/5 rounded-[2.5rem] flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <p className="text-xs font-black uppercase opacity-60">
                Avg Stability
              </p>
              <p className="text-2xl font-black">94.2%</p>
            </div>
          </Card>
          <Button className="h-16 px-10 rounded-3xl bg-primary font-black shadow-xl shadow-primary/20">
            Create Mapping
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Filter by employee name, client, or tech stack..."
            className="pl-14 h-16 bg-card border-border rounded-[2rem] shadow-sm font-bold text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="h-16 px-8 rounded-[2rem] font-black uppercase tracking-widest text-xs"
        >
          Advanced Tracing
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allAllocations.map((a) => (
          <Card
            key={a.id}
            className="p-8 rounded-[3rem] border-border bg-card/40 backdrop-blur-md hover:bg-card hover:scale-[1.01] transition-all cursor-pointer group shadow-sm overflow-hidden"
            onClick={() => setSelectedUserId(a.employeeId)}
          >
            <div className="flex flex-col xl:flex-row items-center gap-10">
              <div className="w-20 h-20 rounded-[2rem] bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                <Briefcase className="w-10 h-10 text-muted-foreground group-hover:text-white" />
              </div>

              <div className="flex-1 space-y-2 text-center xl:text-left">
                <div className="flex items-center justify-center xl:justify-start gap-4">
                  <h3 className="text-2xl font-black tracking-tight">
                    {a.employeeName}
                  </h3>
                  <Badge
                    className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase border-none ${a.status === 'active' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-emerald-500/10 text-emerald-500'}`}
                  >
                    {a.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-8 gap-y-2">
                  <p className="font-bold text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />{' '}
                    {a.clientName}
                  </p>
                  <p className="font-bold text-muted-foreground flex items-center gap-2 text-indigo-500/80">
                    <Calendar className="w-4 h-4" /> {a.startDate} — {a.endDate}
                  </p>
                </div>
              </div>

              <div className="w-full xl:w-80 space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                  <span>TECH MAPPING STRENGTH</span>
                  <span>{a.progress}%</span>
                </div>
                <Progress value={a.progress} className="h-2 rounded-full" />
                <div className="flex gap-2">
                  {a.techStack?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-muted rounded-md opacity-60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0 hidden xl:flex">
                <Button
                  variant="ghost"
                  className="rounded-xl font-black text-xs uppercase tracking-widest text-primary hover:bg-primary/5"
                >
                  View History <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-[10px] font-medium text-muted-foreground opacity-40">
                  Tracing employee #AD-{a.employeeId.split('-')[1]}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
