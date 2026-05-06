export interface InterviewReport {
  userProfile: {
    name: string;
    email: string;
    date: string;
    position: string;
  };
  stages: {
    stage: string;
    score: number;
    questions: {
      question: string;
      answer: string;
      score: number;
      feedback: string;
    }[];
  }[];
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}
