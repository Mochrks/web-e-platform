export type QuestionType = 'text' | 'voice' | 'multiple-choice' | 'code';
export type InterviewStage = 'behavioral' | 'technical' | 'coding' | 'final';
export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'java'
  | 'golang';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  stage: InterviewStage;
  timeLimit?: number; // in seconds
  options?: MultipleChoiceOption[]; // for multiple choice
  keywords?: string[]; // for evaluation
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
  starterCode: {
    javascript: string;
    typescript: string;
    java: string;
    golang: string;
  };
  testCases: {
    input: string;
    expectedOutput: string;
    description: string;
  }[];
  hints?: string[];
}

export interface EvaluationCriteria {
  clarity: number; // 0-100
  confidence: number; // 0-100
  relevance: number; // 0-100
  depth: number; // 0-100
  communication: number; // 0-100
}

export interface StageScore {
  stage: InterviewStage;
  score: number; // 0-100
  feedback: string;
  strengths: string[];
  weaknesses: string[];
}
