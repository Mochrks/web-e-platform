'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setDivision,
  setCompanyType,
  nextStep,
  prevStep,
  completeOnboarding,
  Division,
  CompanyType,
} from '@/store/slices/onboardingSlice';

export function useOnboardingHook() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { step, division, companyType } = useAppSelector(
    (state) => state.onboarding
  );

  const handleDivisionSelect = (id: Division) => {
    dispatch(setDivision(id));
    dispatch(nextStep());
  };

  const handleCompanyTypeSelect = (id: CompanyType) => {
    dispatch(setCompanyType(id));
    dispatch(nextStep());
  };

  const handleFinalize = () => {
    dispatch(completeOnboarding());
    router.push('/platform/dashboard');
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  const progress = (step / 3) * 100;

  return {
    step,
    division,
    companyType,
    progress,
    handleDivisionSelect,
    handleCompanyTypeSelect,
    handleFinalize,
    handleBack,
  };
}
