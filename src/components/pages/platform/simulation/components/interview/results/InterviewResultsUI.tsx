'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Star,
  ArrowLeft,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Brain,
  Mic,
  Code,
} from 'lucide-react';
import { Answer } from '../simulator/InterviewSimulatorHook';

interface InterviewResultsUIProps {
  answers: Answer[];
  overallScore: number;
  onRestart: () => void;
}

export default function InterviewResultsUI({
  answers,
  overallScore,
  onRestart,
}: InterviewResultsUIProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Strong';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Competent';
    return 'Developing';
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-8 bg-card border border-border p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center text-primary animate-bounce-subtle">
            <Trophy className="w-16 h-16" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg rotate-12">
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">
            Simulation Complete
          </p>
          <h1 className="text-5xl font-black tracking-tighter">
            Your Performance Score
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span
            className={`text-[120px] font-black leading-none tracking-tighter ${getScoreColor(overallScore)}`}
          >
            {overallScore}%
          </span>
          <span className="text-xl font-black uppercase tracking-widest opacity-60">
            {getPerformanceLabel(overallScore)}
          </span>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onRestart}
            className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-lg gap-3 shadow-xl shadow-primary/20"
          >
            <RefreshCcw className="w-5 h-5" /> Start New Simulation
          </Button>
          <Button
            variant="outline"
            className="h-16 px-10 rounded-2xl font-black text-lg gap-3"
          >
            <TrendingUp className="w-5 h-5" /> Detailed Analytics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <h2 className="text-3xl font-black tracking-tight underline decoration-primary/30 underline-offset-8">
          Question Breakdown
        </h2>
        {answers.map((answer, index) => (
          <Card
            key={index}
            className="p-10 rounded-[2.5rem] border-border bg-card shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] transition-transform group-hover:scale-110`}
            >
              {answer.codeEvaluation ? (
                <Code className="w-full h-full" />
              ) : answer.voiceAnalysis ? (
                <Mic className="w-full h-full" />
              ) : (
                <Brain className="w-full h-full" />
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-2xl shadow-sm ${answer.score >= 70 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'}`}
              >
                {answer.score}
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-2">
                    Question {index + 1}
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
                    &quot;{answer.answer.substring(0, 150)}
                    {answer.answer.length > 150 ? '...' : ''}&quot;
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-muted/50 border border-border space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                    <AlertCircle className="w-4 h-4" /> Mentor Feedback
                  </div>
                  <p className="text-sm font-bold leading-relaxed">
                    {answer.feedback}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
