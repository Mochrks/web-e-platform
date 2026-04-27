'use client';

import React from 'react';
import { Briefcase, Building2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CompanyType } from '@/store/slices/onboardingSlice';

const companyTypes = [
  {
    id: 'Internal',
    label: 'Internal Employee',
    description: 'Directly employed by the main organization.',
    icon: Building2,
  },
  {
    id: 'Outsource',
    label: 'Outsource Partner',
    description: 'Contracted through an external service provider.',
    icon: Briefcase,
  },
] as const;

interface CompanyTypeStepProps {
  selectedType: CompanyType | null;
  onSelect: (id: CompanyType) => void;
  onBack: () => void;
}

export function CompanyTypeStep({
  selectedType,
  onSelect,
  onBack,
}: Readonly<CompanyTypeStepProps>) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">What is your employment type?</h2>
        <p className="text-slate-500">
          This helps us determine your platform permissions.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
        {companyTypes.map((item) => (
          <Card
            key={item.id}
            className={cn(
              'cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border-2',
              selectedType === item.id
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'hover:border-primary/50'
            )}
            onClick={() => onSelect(item.id)}
          >
            <CardContent className="p-6 flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-zinc-800">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight">
                  {item.label}
                </h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
      </div>
    </div>
  );
}
