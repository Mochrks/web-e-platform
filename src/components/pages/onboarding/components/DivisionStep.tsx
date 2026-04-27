'use client';

import React from 'react';
import {
  Code,
  DollarSign,
  TrendingUp,
  Users,
  Settings,
  Users2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Division } from '@/store/slices/onboardingSlice';

const divisions = [
  {
    id: 'IT',
    label: 'Information Technology',
    icon: Code,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'Finance',
    label: 'Finance & Accounting',
    icon: DollarSign,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'Sales',
    label: 'Sales & Business',
    icon: TrendingUp,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    id: 'Marketing',
    label: 'Marketing & Creative',
    icon: Users,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'HR',
    label: 'Human Resources',
    icon: Users2,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    id: 'Operations',
    label: 'Operations',
    icon: Settings,
    color: 'text-slate-500',
    bg: 'bg-slate-500/10',
  },
] as const;

interface DivisionStepProps {
  selectedDivision: Division | null;
  onSelect: (id: Division) => void;
}

export function DivisionStep({
  selectedDivision,
  onSelect,
}: Readonly<DivisionStepProps>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Select your division</h2>
        <p className="text-slate-500">Which department do you belong to?</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {divisions.map((item) => (
          <Card
            key={item.id}
            className={cn(
              'cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] border-2',
              selectedDivision === item.id
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'hover:border-primary/50'
            )}
            onClick={() => onSelect(item.id)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className={cn('p-4 rounded-2xl', item.bg)}>
                <item.icon className={cn('w-8 h-8', item.color)} />
              </div>
              <span className="font-bold text-sm tracking-tight">
                {item.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
