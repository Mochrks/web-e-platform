'use client';

import React from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  division: string | null;
  companyType: string | null;
  onFinalize: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function SuccessStep({
  division,
  companyType,
  onFinalize,
  onBack,
  isLoading,
}: Readonly<SuccessStepProps>) {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold">You&apos;re all set!</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We&apos;ve customized the platform for{' '}
          <span className="font-bold text-slate-900 dark:text-white capitalize">
            {division?.toLowerCase()}
          </span>{' '}
          division as an{' '}
          <span className="font-bold text-slate-900 dark:text-white capitalize">
            {companyType?.toLowerCase()}
          </span>{' '}
          employee.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border  max-w-md mx-auto space-y-4">
        <div className="flex justify-between items-center pb-4 border-b">
          <span className="text-slate-400 text-sm font-medium">Division</span>
          <span className="font-bold text-primary capitalize">
            {division?.toLowerCase()}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-slate-400 text-sm font-medium">
            Employee Type
          </span>
          <span className="font-bold text-primary capitalize">
            {companyType?.toLowerCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <Button
          size="lg"
          className="rounded-2xl h-14 font-bold text-lg gap-3"
          onClick={onFinalize}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Processing... <Loader2 className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>
              Enter Dashboard <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className=" h-14 gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Change Details
        </Button>
      </div>
    </div>
  );
}
