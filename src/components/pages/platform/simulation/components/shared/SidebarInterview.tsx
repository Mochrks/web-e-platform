'use client';

import React from 'react';
import {
  MessageSquare,
  Code2,
  Terminal,
  Briefcase,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { InterviewStage } from '@/data/interviewData';
import { Card } from '@/components/ui/card';

interface SidebarInterviewProps {
  currentStage: InterviewStage;
  completedStages: InterviewStage[];
}

const stages: {
  id: InterviewStage;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  {
    id: 'behavioral',
    label: 'Behavioral Round',
    icon: <MessageSquare className="w-5 h-5" />,
    desc: 'Soft skills & experience',
  },
  {
    id: 'technical',
    label: 'Technical Deep-dive',
    icon: <Code2 className="w-5 h-5" />,
    desc: 'Knowledge & core concepts',
  },
  {
    id: 'coding',
    label: 'Live Coding',
    icon: <Terminal className="w-5 h-5" />,
    desc: 'Problem solving & logic',
  },
  {
    id: 'final',
    label: 'Management Round',
    icon: <Briefcase className="w-5 h-5" />,
    desc: 'Culture fit & expectations',
  },
];

export default function SidebarInterview({
  currentStage,
  completedStages,
}: SidebarInterviewProps) {
  return (
    <Card className="w-full h-fit p-8 rounded-[2.5rem] border-border bg-card shadow-sm sticky top-10">
      <div className="space-y-2 mb-10">
        <h3 className="text-2xl font-black tracking-tight">
          Interview Journey
        </h3>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {completedStages.length} of {stages.length} Modules Completed
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const isActive = stage.id === currentStage;
          const isCompleted = completedStages.includes(stage.id);
          const isPending = !isActive && !isCompleted;

          return (
            <div
              key={stage.id}
              className={`
                relative p-5 rounded-3xl border transition-all duration-300 group
                ${isActive ? 'bg-primary/5 border-primary/20 shadow-md scale-[1.02]' : 'border-transparent'}
                ${isCompleted ? 'opacity-70' : ''}
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                    ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30 rotate-3' : ''}
                    ${isCompleted ? 'bg-emerald-500 text-white' : ''}
                    ${isPending ? 'bg-muted text-muted-foreground' : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    stage.icon
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-black tracking-tight ${isActive ? 'text-primary' : 'text-foreground'}`}
                    >
                      {stage.label}
                    </h4>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    {stage.desc}
                  </p>
                </div>
              </div>

              {isActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
          <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">
            Pro Tip
          </p>
          <p className="text-xs font-bold text-muted-foreground leading-relaxed">
            Maintain consistent eye contact and speak clearly. Our AI analyzes
            your confidence levels.
          </p>
        </div>
      </div>
    </Card>
  );
}
