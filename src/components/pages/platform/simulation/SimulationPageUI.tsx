'use client';

import React, { useState, useEffect, useCallback } from 'react';
import InterviewSimulator from './components/simulator';
import InterviewResults from './components/results';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Badge from '@/components/shared/components/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Rocket,
  ShieldCheck,
  Zap,
  BrainCircuit,
  Mic,
  Headphones,
  MessageSquare,
  Lock,
} from 'lucide-react';
import { useSimulationPageHook } from './SimulationPageHook';
import SidebarInterview from './components/shared/SidebarInterview';
import { InterviewStage } from '@/types/interview';

export default function SimulationPageUI() {
  const {
    stage,
    activeTab,
    setActiveTab,
    interviewName,
    setInterviewName,
    sessionCode,
    setSessionCode,
    assignedSessions,
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

  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(
      typeof navigator !== 'undefined' &&
        navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
    );
  }, []);

  const handleStageChange = useCallback(
    (stage: InterviewStage, completed: InterviewStage[]) => {
      setCurrentInterviewStage(stage);
      setCompletedInterviewStages(completed);
    },
    [setCurrentInterviewStage, setCompletedInterviewStages]
  );

  return (
    <div className="space-y-10 pb-10 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            AI Simulation
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            Practice soft skills and technical scenarios with an AI agent.
          </p>
        </div>
      </div>

      {stage === 'setup' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-fade-in pt-4">
          {/* Assigned Sessions Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border p-8 rounded-3xl relative overflow-hidden h-full shadow-sm">
              <h2 className="text-2xl font-black tracking-tight mb-2">
                Assigned Sessions
              </h2>
              <p className="text-muted-foreground font-medium text-sm mb-6">
                Complete these simulations assigned by your administrator.
              </p>
              <div className="space-y-4">
                {assignedSessions.map((session) => {
                  const isLocked = session.isLocked;
                  return (
                    <div
                      key={session.id}
                      className={`p-6 rounded-2xl border transition-all group relative overflow-hidden ${
                        isLocked
                          ? 'bg-muted/10 border-border/50 opacity-60 cursor-not-allowed'
                          : activeTab === session.type
                            ? 'border-primary shadow-sm bg-primary/5 cursor-pointer'
                            : 'bg-muted/30 border-border hover:border-primary/50 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (isLocked) return;
                        setInterviewName(
                          `${session.role} at ${session.company}`
                        );
                        setSessionCode(session.code);
                        setActiveTab(session.type);
                      }}
                    >
                      <div
                        className={`flex justify-between items-start mb-4 ${isLocked ? 'opacity-80' : ''}`}
                      >
                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge
                              className={`border-none text-[10px] font-black uppercase tracking-widest ${isLocked ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}
                            >
                              {session.company}
                            </Badge>
                            <Badge
                              className={`text-[10px] font-black uppercase tracking-widest border-none ${isLocked ? 'bg-muted text-muted-foreground' : session.type === 'voice' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}`}
                            >
                              {session.type === 'voice' ? (
                                <Mic className="w-3 h-3 mr-1 inline" />
                              ) : (
                                <MessageSquare className="w-3 h-3 mr-1 inline" />
                              )}
                              {session.type === 'voice'
                                ? 'Voice AI'
                                : 'Text Practice'}
                            </Badge>
                          </div>
                          <h3
                            className={`font-bold text-lg leading-tight transition-colors ${!isLocked ? 'group-hover:text-primary' : ''}`}
                          >
                            {session.role}
                          </h3>
                        </div>
                        <div
                          className={`rounded-2xl p-3 border transition-colors ${
                            isLocked
                              ? 'bg-muted border-border/50 text-muted-foreground'
                              : activeTab === session.type
                                ? 'bg-primary text-white border-primary'
                                : 'bg-background border-border group-hover:bg-primary group-hover:text-white'
                          }`}
                        >
                          {isLocked ? (
                            <Lock className="w-5 h-5" />
                          ) : (
                            <Rocket className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-between text-xs font-bold text-muted-foreground pt-4 border-t border-border/50 ${isLocked ? 'opacity-80' : ''}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck
                            className={`w-4 h-4 ${isLocked ? 'text-muted-foreground' : 'text-amber-500'}`}
                          />{' '}
                          {session.deadline}
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-lg border font-mono tracking-widest ${isLocked ? 'bg-muted/50 border-border/50 text-muted-foreground' : 'bg-background border-border'}`}
                        >
                          {isLocked ? 'LOCKED' : session.code}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-2xl p-1.5 mb-6 h-auto">
                <TabsTrigger
                  value="practice"
                  className="rounded-xl font-bold py-3 text-sm"
                >
                  Text Practice Session
                </TabsTrigger>
                <TabsTrigger
                  value="voice"
                  className="rounded-xl font-bold py-3 text-sm"
                >
                  Voice Interview AI
                </TabsTrigger>
              </TabsList>

              <TabsContent value="practice" className="mt-0">
                <Card className="w-full p-10 md:p-12 rounded-3xl border-border relative overflow-hidden bg-card shadow-sm">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <BookOpen className="w-64 h-64" aria-hidden="true" />
                  </div>

                  <div className="relative z-10 space-y-10">
                    <div className="space-y-4 text-center md:text-left">
                      <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                        Simulation Ready
                      </Badge>
                      <h1 className="text-4xl font-black tracking-tight mb-2">
                        Start Your{' '}
                        <span className="text-primary italic">Practice</span>{' '}
                        Session
                      </h1>
                      <p className="text-muted-foreground font-medium text-lg font-bold">
                        Enter your interview target and session code to begin
                        the curated learning path.
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
                          className="h-16 rounded-2xl border-border bg-muted/30 font-bold text-lg px-6 focus:ring-primary/40 focus:bg-background transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="session-code"
                          className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                        >
                          Session Code
                        </Label>
                        <Input
                          id="session-code"
                          placeholder="e.g. SHP-FE-001"
                          value={sessionCode}
                          onChange={(e) => setSessionCode(e.target.value)}
                          className="h-16 rounded-2xl border-border bg-muted/30 font-bold text-lg px-6 focus:ring-primary/40 focus:bg-background transition-all font-mono uppercase tracking-wider"
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
                        disabled={!interviewName.trim() || !sessionCode.trim()}
                        className="w-full h-18 py-8 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                      >
                        Start Simulation{' '}
                        <Rocket className="ml-4 w-6 h-6" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="voice" className="mt-0">
                <Card className="w-full p-10 md:p-12 rounded-3xl border-border relative overflow-hidden bg-emerald-600 shadow-sm text-white">
                  <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Mic className="w-64 h-64" aria-hidden="true" />
                  </div>

                  <div className="relative z-10 space-y-10">
                    <div className="space-y-4 text-center md:text-left">
                      <Badge className="bg-white/20 text-white border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                        Beta Feature
                      </Badge>
                      <h1 className="text-4xl font-black tracking-tight mb-2">
                        Voice Interview{' '}
                        <span className="italic opacity-80">with AI</span>
                      </h1>
                      <p className="text-white/80 font-medium text-lg font-bold">
                        Experience a realistic spoken interview with our
                        advanced conversational AI.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="voice-interview-name"
                          className="text-xs font-black uppercase tracking-widest text-white/70 ml-1"
                        >
                          Interview Career Path
                        </Label>
                        <Input
                          id="voice-interview-name"
                          placeholder="e.g. Frontend Engineer - Mid Level"
                          value={interviewName}
                          onChange={(e) => setInterviewName(e.target.value)}
                          className="h-16 rounded-2xl border-white/20 bg-white/10 font-bold text-lg px-6 focus:ring-white/40 focus:bg-white/20 transition-all text-white placeholder:text-white/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="voice-session-code"
                          className="text-xs font-black uppercase tracking-widest text-white/70 ml-1"
                        >
                          Session Code
                        </Label>
                        <Input
                          id="voice-session-code"
                          placeholder="e.g. SHP-FE-001"
                          value={sessionCode}
                          onChange={(e) => setSessionCode(e.target.value)}
                          className="h-16 rounded-2xl border-white/20 bg-white/10 font-bold text-lg px-6 focus:ring-white/40 focus:bg-white/20 transition-all font-mono uppercase tracking-wider text-white placeholder:text-white/40"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-white/10 border border-white/20 flex items-center gap-4">
                          <Mic
                            className="w-8 h-8 text-white"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-bold opacity-90 leading-snug">
                            Real-time Speech Recognition
                          </span>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/10 border border-white/20 flex items-center gap-4">
                          <Headphones
                            className="w-8 h-8 text-white"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-bold opacity-90 leading-snug">
                            Natural AI Voice Responses
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() =>
                          alert('Voice interview starting soon...')
                        }
                        disabled={!interviewName.trim() || !sessionCode.trim()}
                        className="w-full h-18 py-8 rounded-[2rem] bg-white hover:bg-white/90 text-emerald-700 font-black text-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                      >
                        Start Voice Session{' '}
                        <Mic className="ml-4 w-6 h-6" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-card border border-border p-8 rounded-3xl ">
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
                className="rounded-xl font-bold text-destructive hover:bg-destructive/5 transition-colors"
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
