'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ClipboardList,
  PlayCircle,
  History,
  Zap,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';
import { useTasksHook } from './TaskPageHook';

export default function TaskPageUI() {
  const {
    tasks,
    attempts,
    handleLaunchTask,
    handleCompleteAttempt,
    selectedTask,
  } = useTasksHook();

  const getTaskAttempts = (taskId: string) =>
    attempts.filter((a) => a.taskId === taskId);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Assignment Lab</h1>
          <p className="text-muted-foreground font-medium">
            Complete specialized tasks to earn XP and climb the leaderboard.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Tasks Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-widest text-muted-foreground">
              Available Tasks
            </h2>
          </div>
          {tasks.map((task) => {
            const taskAttempts = getTaskAttempts(task.id);
            const isPassed = taskAttempts.some((a) => a.status === 'passed');

            return (
              <Card
                key={task.id}
                className="p-8 rounded-[2.5rem] border-border bg-card/50 backdrop-blur-md shadow-sm hover:bg-card transition-all group overflow-hidden relative"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                        {task.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest"
                      >
                        {task.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-xs font-black uppercase text-muted-foreground pt-4 border-t border-border/50">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Due: {task.deadline}
                      </span>
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary fill-primary" />{' '}
                        Reward: {task.baseXP} XP
                      </span>
                      <span className="flex items-center gap-2">
                        <History className="w-4 h-4" /> Attempts:{' '}
                        {taskAttempts.length}/{task.maxAttempts}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto pt-4 md:pt-0">
                    {isPassed ? (
                      <div className="flex items-center gap-3 px-6 py-4 bg-green-50 text-green-600 rounded-2xl font-black text-sm">
                        <CheckCircle2 className="w-5 h-5" /> Completed
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleLaunchTask(task.id)}
                        disabled={taskAttempts.length >= task.maxAttempts}
                        className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-black shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
                      >
                        <PlayCircle className="w-5 h-5 mr-2" /> Start Attempt
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Log / Sidebar Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-widest text-muted-foreground">
              Recent Activity
            </h2>
          </div>
          <Card className="rounded-[2.5rem] border-border bg-card/30 backdrop-blur-sm p-4 divide-y divide-border/50">
            {attempts.length === 0 ? (
              <div className="py-20 text-center opacity-40">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm font-black uppercase tracking-tighter">
                  No attempts yet
                </p>
              </div>
            ) : (
              attempts
                .slice()
                .reverse()
                .map((a) => (
                  <div
                    key={a.id}
                    className="py-6 px-4 space-y-4 animate-in fade-in slide-in-from-right-4 duration-500"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-black text-sm leading-tight text-primary">
                          Attempt #{a.attemptNumber} Result
                        </h4>
                        <p className="text-[10px] font-bold text-muted-foreground">
                          {new Date(a.completedAt).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        className={`rounded-full ${a.status === 'passed' ? 'bg-green-500' : 'bg-red-500'} text-white border-none font-black text-[10px]`}
                      >
                        {a.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Accuracy</span>
                        <span>{a.score}%</span>
                      </div>
                      <Progress
                        value={a.score}
                        className={`h-2 rounded-full ${a.status === 'passed' ? 'bg-green-100' : 'bg-red-100'}`}
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Zap className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-sm font-black">
                        +{a.xpEarned} XP{' '}
                        <span className="text-[10px] font-medium text-muted-foreground opacity-60">
                          Earned
                        </span>
                      </span>
                    </div>
                  </div>
                ))
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
