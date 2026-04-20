'use client';

import React, { useState, useEffect, useCallback } from 'react';
import InterviewSimulator from './components/simulator';
import InterviewResults from './components/results';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Badge from '@/components/shared/components/Badge';
import { BookOpen, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { useSimulationPageHook } from './SimulationPageHook';
import SidebarInterview from './components/shared/SidebarInterview';
import { InterviewStage } from '@/data/interviewData';

export default function SimulationPageUI() {
  const {
    stage,
    interviewName,
    setInterviewName,
    answers,
    overallScore,
    currentInterviewStage,
    setCurrentInterviewStage,
    completedInterviewStages,
    setCompletedInterviewStages,
    handleStart,
    handleComplete,
    handleRestart,
  } = useSimulationPageHook();

  const handleStageChange = useCallback(
    (stage: InterviewStage, completed: InterviewStage[]) => {
      setCurrentInterviewStage(stage);
      setCompletedInterviewStages(completed);
    },
    [setCurrentInterviewStage, setCompletedInterviewStages]
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {stage === 'setup' && (
        <div className="min-h-[70vh] flex items-center justify-center animate-fade-in">
          <Card className="w-full max-w-2xl p-12 rounded-[3.5rem] border-border shadow-2xl relative overflow-hidden bg-white/50 backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <BookOpen className="w-64 h-64" aria-hidden="true" />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-4 text-center md:text-left">
                <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                  Simulation Ready
                </Badge>
                <h1 className="text-5xl font-black tracking-tighter">
                  Start Your{' '}
                  <span className="text-primary italic">Practice</span> Session
                </h1>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                  Enter your interview target (e.g. Senior Frontend Developer at
                  Shopee) to begin the curated learning path.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="interview-name"
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                  >
                    Interview Career Path
                  </Label>
                  <Input
                    id="interview-name"
                    placeholder="e.g. Frontend Engineer - Mid Level"
                    value={interviewName}
                    onChange={(e) => setInterviewName(e.target.value)}
                    className="h-16 rounded-[1.5rem] border-border bg-muted/30 font-bold text-xl px-8 focus:ring-primary/40 focus:bg-background transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                    <ShieldCheck
                      className="w-8 h-8 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold opacity-80 leading-snug">
                      AI-Powered Assessment
                    </span>
                  </div>
                  <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
                    <Zap
                      className="w-8 h-8 text-indigo-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold opacity-80 leading-snug">
                      Real-time Performance Metrics
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleStart}
                  disabled={!interviewName.trim()}
                  className="w-full h-18 py-8 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Simulation{' '}
                  <Rocket className="ml-4 w-6 h-6" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {stage === 'simulating' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 hidden lg:block">
            <SidebarInterview
              currentStage={currentInterviewStage}
              completedStages={completedInterviewStages}
            />
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-card border border-border p-8 rounded-[2.5rem] shadow-sm">
              <div>
                <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">
                  Current Session
                </p>
                <h2 className="text-3xl font-black tracking-tight text-foreground/80">
                  {interviewName}
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={handleRestart}
                className="rounded-xl font-bold text-rose-500 hover:bg-rose-500/5 transition-colors"
              >
                End Session
              </Button>
            </div>

            <InterviewSimulator
              onComplete={handleComplete}
              onStageChange={handleStageChange}
            />
          </div>
        </div>
      )}

      {stage === 'results' && (
        <div className="animate-fade-in">
          <InterviewResults
            answers={answers}
            overallScore={overallScore}
            onRestart={handleRestart}
          />
        </div>
      )}
    </div>
  );
}
