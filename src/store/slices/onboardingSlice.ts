import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Division, CompanyType, OnboardingState } from '@/types/onboarding';

const initialState: OnboardingState = {
  division: null,
  companyType: null,
  isOnboarded: false,
  step: 1,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setDivision: (state, action: PayloadAction<Division>) => {
      state.division = action.payload;
    },
    setCompanyType: (state, action: PayloadAction<CompanyType>) => {
      state.companyType = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    completeOnboarding: (state) => {
      state.isOnboarded = true;
    },
    resetOnboarding: (state) => {
      state.division = null;
      state.companyType = null;
      state.isOnboarded = false;
      state.step = 1;
    },
  },
});

export const {
  setDivision,
  setCompanyType,
  nextStep,
  prevStep,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
