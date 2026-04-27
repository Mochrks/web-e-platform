'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { DivisionStep } from '@/components/pages/onboarding/components/DivisionStep';
import { CompanyTypeStep } from '@/components/pages/onboarding/components/CompanyTypeStep';
import { SuccessStep } from '@/components/pages/onboarding/components/SuccessStep';
import { useOnboardingHook } from './OnboardingHook';

export default function OnboardingUI() {
  const {
    step,
    division,
    companyType,
    progress,
    handleDivisionSelect,
    handleCompanyTypeSelect,
    handleFinalize,
    handleBack,
  } = useOnboardingHook();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 font-outfit">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-3xl relative">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome to <span className="text-primary">E-Platform.</span>
          </h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Let&apos;s personalize your experience to match your professional
            role.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 space-y-4">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
            <span>Step {step} of 3</span>
            <span>{Math.round(progress)}% Completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Rendering */}
        {step === 1 && (
          <DivisionStep
            selectedDivision={division}
            onSelect={handleDivisionSelect}
          />
        )}

        {step === 2 && (
          <CompanyTypeStep
            selectedType={companyType}
            onSelect={handleCompanyTypeSelect}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <SuccessStep
            division={division}
            companyType={companyType}
            onFinalize={handleFinalize}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
