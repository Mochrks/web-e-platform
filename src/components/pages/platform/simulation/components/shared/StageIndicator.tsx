'use client';

import React from 'react';
import {
  MessageSquare,
  Code2,
  Terminal,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { InterviewStage } from '@/data/interviewData';

interface StageIndicatorProps {
  currentStage: InterviewStage;
  completedStages: InterviewStage[];
}

const stages: { id: InterviewStage; label: string; icon: React.ReactNode }[] = [
  {
    id: 'behavioral',
    label: 'Behavioral',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  { id: 'technical', label: 'Technical', icon: <Code2 className="w-5 h-5" /> },
  {
    id: 'coding',
    label: 'Live Coding',
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    id: 'final',
    label: 'Final Round',
    icon: <Briefcase className="w-5 h-5" />,
  },
];

export default function StageIndicator({
  currentStage,
  completedStages,
}: StageIndicatorProps) {
  return (
    <div className="bauhaus-card overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Interview Journey
        </h3>
        <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {completedStages.length} of {stages.length} Completed
        </div>
      </div>
      <div className="relative w-full">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700 ease-in-out"
            style={{
              width: `${(completedStages.length / (stages.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="relative flex justify-between items-center w-full">
          {stages.map((stage, index) => {
            const isActive = stage.id === currentStage;
            const isCompleted = completedStages.includes(stage.id);
            const isPending = !isActive && !isCompleted;

            return (
              <div
                key={stage.id}
                className="flex flex-col items-center gap-3 relative z-10 group"
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500
                    ${isActive ? 'bg-primary border-primary shadow-lg shadow-primary/30 scale-110' : ''}
                    ${isCompleted ? 'bg-primary border-primary' : ''}
                    ${isPending ? 'bg-background border-muted' : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <div
                      className={`${isActive ? 'text-white' : 'text-muted-foreground'} group-hover:scale-110 transition-transform`}
                    >
                      {stage.icon}
                    </div>
                  )}
                </div>

                {/* Step Label */}
                <div
                  className={`
                  absolute -bottom-8 whitespace-nowrap text-xs sm:text-sm font-bold transition-colors duration-300
                  ${isActive ? 'text-primary' : 'text-muted-foreground'}
                `}
                >
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-6" /> {/* Spacer for label */}
    </div>
  );
}
