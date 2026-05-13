export type Division = 'IT' | 'FINANCE' | 'HR' | 'MARKETING' | 'OPERATIONS';

export type CompanyType = 'INTERNAL' | 'OUTSOURCE';

export interface OnboardingState {
  division: Division | null;
  companyType: CompanyType | null;
  isOnboarded: boolean;
  step: number;
}
