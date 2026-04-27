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
  points: number;
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
  xpEarned: number;
  completedAt: string;
  status: 'passed' | 'failed';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  baseXP: number;
  deadline: string;
  maxAttempts: number;
  requirements?: string[];
}

export interface LeaderboardEntry {
  rank: number;
  employeeId: string;
  name: string;
  avatarConfig: {
    shirtColor?: string;
    shirtType?: 'basic' | 'hoodie' | 'suit' | 'vest';
    mood?: 'happy' | 'thinking' | 'serious';
  };
  totalXP: number;
  completedTasks: number;
  certifications: number;
  trend: 'up' | 'down' | 'neutral';
}
