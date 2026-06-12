export interface Allocation {
  id: string;
  employeeId: string;
  employeeName: string;
  clientName: string;
  clientLogo?: string;
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'on-bench' | 'upcoming';
  progress: number;
  techStack?: string[];
  reportingManager?: string;
  allocationType: 'Full-time' | 'Part-time' | 'Consultation';
  location: 'On-site' | 'Remote' | 'Hybrid';
  performanceRating?: number;
  feedback?: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  status: 'available' | 'ongoing' | 'completed';
  enrolledDate?: string;
  expiryDate?: string;
  assignedTo?: string[];
}

export interface TaskAttempt {
  id: string;
  taskId: string;
  employeeId: string;
  attemptNumber: number;
  score: number;
  maxScore: number;
  completedAt: string;
  status: 'passed' | 'failed';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  deadline: string;
  maxAttempts: number;
  requirements?: string[];
}
