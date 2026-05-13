'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setDivision,
  setCompanyType,
  nextStep,
  prevStep,
  completeOnboarding,
} from '@/store/slices/onboardingSlice';
import { Division, CompanyType } from '@/types/onboarding';
import { useOnboarding } from '@/hooks/api/useAuth';

export function useOnboardingHook() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { step, division, companyType } = useAppSelector(
    (state) => state.onboarding
  );
  const { user } = useAppSelector((state) => state.auth);
  const { mutate: submitOnboarding, isPending: isSubmitting } = useOnboarding();

  const handleDivisionSelect = (id: Division) => {
    dispatch(setDivision(id));
    dispatch(nextStep());
  };

  const handleCompanyTypeSelect = (id: CompanyType) => {
    dispatch(setCompanyType(id));
    dispatch(nextStep());
  };

  const handleFinalize = () => {
    if (!division || !companyType || !user) return;

    const divisionMap: Record<string, number> = {
      IT: 1,
      FINANCE: 2,
      HR: 3,
      MARKETING: 4,
      OPERATIONS: 5,
    };

    const typeMap: Record<string, number> = {
      INTERNAL: 1,
      OUTSOURCE: 2,
    };

    submitOnboarding(
      {
        userId: user.userId,
        divisionId: divisionMap[division],
        employmentTypeId: typeMap[companyType],
      },
      {
        onSuccess: () => {
          dispatch(completeOnboarding());
        },
      }
    );
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
    isSubmitting,
  };
}
