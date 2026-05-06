export type Division =
  | 'IT'
  | 'Finance'
  | 'Sales'
  | 'Marketing'
  | 'HR'
  | 'Operations';

export type CompanyType = 'Internal' | 'Outsource';

export interface OnboardingState {
  division: Division | null;
  companyType: CompanyType | null;
  isOnboarded: boolean;
  step: number;
}
