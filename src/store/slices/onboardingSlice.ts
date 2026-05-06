import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCookie, setCookie, removeCookie } from '@/lib/cookies';
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
    hydrate: (state) => {
      state.isOnboarded = getCookie('isOnboarded') === 'true';
    },
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
      if (typeof window !== 'undefined') {
        setCookie('isOnboarded', 'true', 30);
      }
    },
    resetOnboarding: (state) => {
      state.division = null;
      state.companyType = null;
      state.isOnboarded = false;
      state.step = 1;
      if (typeof window !== 'undefined') {
        removeCookie('isOnboarded');
      }
    },
  },
});

export const {
  hydrate,
  setDivision,
  setCompanyType,
  nextStep,
  prevStep,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
